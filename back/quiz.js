import { makeQuestions } from './quiz-questions.js';

// Matches are held by the running server. No answer key is sent to clients before a question ends.
export function setupQuiz(io, Room) {
 const games=new Map();
 const questionMs=20000, countdownMs=3000, feedbackMs=2200;
 const roomChannel=id=>'quiz:'+id;
 const socketsFor=(game,id)=>[...game.sockets.values()].filter(p=>p===id).length;
 function state(g,forUser){const q=g.questions?.[g.index];return {roomId:g.id,phase:g.phase,players:g.players.map(p=>({...p,online:socketsFor(g,p.id)>0})),index:g.index,total:10,turn:g.players[g.index%2]?.id||null,deadline:g.deadline,category:g.category,question:g.phase==='playing'&&q?{text:q.question,options:q.options}:null,last:g.last||null,winner:g.winner||null,you:forUser};}
 function broadcast(g){for(const [socketId,userId] of g.sockets){io.to(socketId).emit('quiz:state',state(g,userId));}}
 function clear(g){if(g.timer)clearTimeout(g.timer);g.timer=null;}
 function stop(g){clear(g);games.delete(g.id);}
 function finish(g,winner=null){clear(g);g.phase='finished';g.deadline=null;g.winner=winner;broadcast(g);}
 function nextQuestion(g){g.last=null;g.phase='playing';g.deadline=Date.now()+questionMs;broadcast(g);clear(g);g.timer=setTimeout(()=>answer(g,null,true),questionMs);}
 function answer(g,choice,timeout=false){if(g.phase!=='playing')return;clear(g);const q=g.questions[g.index];const correct=!timeout&&choice===q.answer;const player=g.players[g.index%2];if(correct)player.score+=100;g.last={question:q.question,options:q.options,choice,correctAnswer:q.answer,correct,timeout,playerId:player.id};g.phase='feedback';g.deadline=null;broadcast(g);g.timer=setTimeout(()=>{g.index++;if(g.index>=10)finish(g);else nextQuestion(g);},feedbackMs);}
 function launch(g){clear(g);g.questions=makeQuestions(g.category);g.index=0;g.last=null;g.winner=null;g.players.forEach(p=>p.score=0);g.phase='countdown';g.deadline=Date.now()+countdownMs;broadcast(g);g.timer=setTimeout(()=>nextQuestion(g),countdownMs);}
 function pause(g){if(!['playing','countdown','feedback'].includes(g.phase))return;g.previousPhase=g.phase;g.remaining=g.deadline?Math.max(0,g.deadline-Date.now()):2200;g.phase='paused';g.deadline=null;clear(g);broadcast(g);g.timer=setTimeout(()=>{const absent=g.players.find(p=>!socketsFor(g,p.id));if(absent){const other=g.players.find(p=>p.id!==absent.id);finish(g,other?.id||null);}},90000);}
 function resume(g){if(g.phase!=='paused'||g.players.some(p=>!socketsFor(g,p.id)))return;clear(g);const prior=g.previousPhase;g.phase=prior;g.deadline=prior==='feedback'?null:Date.now()+g.remaining;broadcast(g);g.timer=setTimeout(()=>{if(prior==='playing')answer(g,null,true);else if(prior==='countdown')nextQuestion(g);else{g.index++;if(g.index>=10)finish(g);else nextQuestion(g);}},g.remaining);}
 async function join(socket,ack){try{const id=socket.data.room;if(!id)return ack({error:'Entre na sala primeiro.'});const r=await Room.findById(id);if(!r||r.type!=='quiz')return ack({error:'Esta sala não é de jogo.'});let g=games.get(id);if(!g){g={id,creator:String(r.creator),category:r.category,players:[],sockets:new Map(),phase:'waiting',index:0,timer:null};games.set(id,g);}const u=socket.data.user;if(!g.players.some(p=>p.id===u.id)){if(g.players.length>=2)return ack({error:'A sala já tem dois jogadores.'});if(g.phase!=='waiting')return ack({error:'A partida já começou.'});g.players.push({id:u.id,name:u.name,avatar:u.avatar,score:0});}g.sockets.set(socket.id,u.id);socket.data.quizRoom=id;socket.join(roomChannel(id));resume(g);broadcast(g);ack({ok:true});}catch{ack({error:'Não foi possível entrar no jogo.'});}}
 function leave(socket){const id=socket.data.quizRoom,g=games.get(id);socket.data.quizRoom=null;if(!g)return;g.sockets.delete(socket.id);socket.leave(roomChannel(id));const uid=socket.data.user.id;if(!socketsFor(g,uid)){if(g.phase==='waiting'){g.players=g.players.filter(p=>p.id!==uid);if(!g.players.length){stop(g);return;}}else if(g.phase!=='finished')pause(g);}broadcast(g);}
 io.on('connection',socket=>{
  socket.on('quiz:join',(ack=()=>{})=>join(socket,ack));
  socket.on('quiz:leave',()=>leave(socket));
  socket.on('quiz:start',(ack=()=>{})=>{const g=games.get(socket.data.quizRoom);if(!g||g.creator!==socket.data.user.id||g.phase!=='waiting'||g.players.length!==2||g.players.some(p=>!socketsFor(g,p.id)))return ack({error:'Apenas o criador pode iniciar com dois jogadores conectados.'});launch(g);ack({ok:true});});
  socket.on('quiz:answer',(choice,ack=()=>{})=>{const g=games.get(socket.data.quizRoom);if(!g||g.phase!=='playing'||g.players[g.index%2]?.id!==socket.data.user.id)return ack({error:'Não é sua vez.'});if(Date.now()>=g.deadline){answer(g,null,true);return ack({error:'Tempo esgotado.'});}if(!Number.isInteger(choice)||choice<0||choice>3)return ack({error:'Escolha uma alternativa válida.'});answer(g,choice);ack({ok:true});});
  socket.on('quiz:lobby',(ack=()=>{})=>{const g=games.get(socket.data.quizRoom),id=socket.data.user.id;if(!g||g.phase!=='finished'||!g.players.some(p=>p.id===id))return ack({error:'Não foi possível voltar à sala.'});clear(g);g.players=g.players.filter(p=>socketsFor(g,p.id));g.players.forEach(p=>p.score=0);g.phase='waiting';g.index=0;g.last=null;g.winner=null;g.questions=null;g.deadline=null;broadcast(g);ack({ok:true});});
  socket.on('disconnect',()=>leave(socket));
 });
 return {leave,remove(id){const g=games.get(String(id));if(g)stop(g);}};
}
