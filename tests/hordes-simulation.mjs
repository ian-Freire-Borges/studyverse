import {createGame,place,castStrike,castConvert,applyEquipment,exchangeCard,resolveTurn} from '../back/hordes/core.js';
import {hexDistance} from '../back/hordes/navigation.js';
const games=Math.max(1,Number(process.env.HORDES_GAMES)||1000);
const playerCounts=(process.env.HORDES_PLAYER_COUNTS||'2,3,4').split(',').map(Number).filter(n=>[2,3,4].includes(n));
for(const n of playerCounts){
 const wins=Array(n).fill(0),plays={},scores={draws:0,rounds:0,unfinished:0,turns:0,firstWins:0,actions:0};const started=Date.now();
 for(let seed=0;seed<games;seed++){
  const s=createGame(seed,Array.from({length:n},(_,i)=>({id:String(i),name:String(i),avatar:0}))),leader=s.order[0];
  for(let turn=0;turn<350&&s.phase==='playing';turn++){
   const id=s.order[s.turn],p=s.players.find(v=>v.id===id);let actions=0,exchanges=0;
   for(let cycle=0;cycle<15;cycle++){
    const owned=s.terrains.filter(t=>t.owner===id),foes=[...s.units,...s.terrains].filter(v=>v.owner!==id&&v.hp>0).sort((a,b)=>hexDistance(p,a)-hexDistance(p,b)||String(a.id).localeCompare(String(b.id))),units=s.units.filter(u=>u.owner===id),has=type=>owned.some(t=>t.type===type);
    const rank=c=>({farm:has('farm')?4:14,gem:has('gem')?4:13,zombie:8,archer:8,mageField:8,spiderField:8,defenseTower:8,forge:6,volcano:7,titanField:7,hero:12,golem:9,plant:9,strike:9,convert:10,sword:10,shield:10})[c.type]||0;
    const ordered=[...p.hand].sort((a,b)=>rank(b)-rank(a)||a.id.localeCompare(b.id));let played=false;
    for(const card of ordered){let ok=false;
     if(card.type==='strike'||card.type==='convert')for(const foe of foes){ok=card.type==='strike'?castStrike(s,id,card.id,foe.id):castConvert(s,id,card.id,foe.id);if(ok)break}
     else if(['sword','shield'].includes(card.type))for(const ally of units){if(applyEquipment(s,id,card.id,ally.id)){ok=true;break}}
     else {const targets=s.players.filter(q=>q.alive&&q.id!==id),closest=targets.sort((a,b)=>hexDistance(p,a)-hexDistance(p,b))[0],spots=[];for(let y=0;y<13;y++)for(let x=0;x<13;x++)if(hexDistance(p,{x,y})<=3)spots.push({x,y});spots.sort((a,b)=>hexDistance(a,closest)-hexDistance(b,closest)||a.y-b.y||a.x-b.x);for(const spot of spots)if(place(s,id,card.id,spot.x,spot.y)){ok=true;break}}
     if(ok){plays[card.type]=(plays[card.type]||0)+1;actions++;played=true;break}
    }
    if(!played){if(exchanges<3&&p.hand.length&&exchangeCard(s,id,p.hand[0].id)){exchanges++;continue}break}
   }
   scores.turns++;scores.actions+=actions;resolveTurn(s,id);
  }
  scores.rounds+=s.round;if(s.phase!=='finished')scores.unfinished++;else if(s.winner===null)scores.draws++;else{wins[Number(s.winner)]++;if(s.winner===leader)scores.firstWins++}
 }
 console.log(JSON.stringify({players:n,games,wins,draws:scores.draws,avgRounds:+(scores.rounds/games).toFixed(2),unfinished:scores.unfinished,firstWins:scores.firstWins,actions:scores.actions,turns:scores.turns,plays,elapsedMs:Date.now()-started}));
}
