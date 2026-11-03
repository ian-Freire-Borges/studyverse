import { MongoMemoryServer } from 'mongodb-memory-server';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { io } from 'socket.io-client';
import { chromium } from '@playwright/test';
const db=await MongoMemoryServer.create();
const api=spawn(process.execPath,['server/index.js'],{env:{...process.env,MONGODB_URI:db.getUri(),PORT:'3301',CLIENT_ORIGIN:'http://localhost:3417'},stdio:'inherit'});
const ui=spawn(process.execPath,['../node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','3417','--strictPort'],{cwd:'client',env:{...process.env,VITE_API_URL:'http://localhost:3301'},stdio:'inherit'});
let browser;
try {
 for (let i=0;i<60;i++){try{if((await fetch('http://localhost:3301/api/health')).ok && (await fetch('http://localhost:3417')).ok) break;}catch{} await new Promise(r=>setTimeout(r,500));if(i===59)throw new Error('Serviços não iniciaram');}
 const makeRoom=async name=>{const r=await fetch('http://localhost:3301/api/rooms',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name})});assert.equal(r.status,201);return r.json()};
 const a=await makeRoom('Teste compartilhado'), b=await makeRoom('Outra sala');
 const clients=await Promise.all([0,1,2].map(()=>new Promise((resolve,reject)=>{const s=io('http://localhost:3301',{timeout:5000});s.on('connect',()=>resolve(s));s.on('connect_error',reject)})));
 const emit=(s,event,data)=>new Promise(resolve=>s.emit(event,data,resolve));
 for(const [i,s] of clients.entries()) assert.equal((await emit(s,'room:join',i===2?b._id:a._id)).ok,true);
 let isolated=true;clients[2].on('message:new',()=>isolated=false);
 const received=new Promise(resolve=>clients[1].once('message:new',resolve));
 assert.equal((await emit(clients[0],'message:send',{author:'Ana',text:'Olá, turma!'})).ok,true);
 assert.equal((await received).text,'Olá, turma!');
 await new Promise(r=>setTimeout(r,300));assert.ok(isolated,'Mensagem vazou para outra sala');
 const history=await (await fetch(`http://localhost:3301/api/rooms/${a._id}/messages`)).json();assert.equal(history[0].text,'Olá, turma!');
 assert.ok((await emit(clients[0],'message:send',{author:'',text:'teste'})).error);
 clients.forEach(s=>s.disconnect());
 browser=await chromium.launch({headless:true,channel:'chrome'});
 for(const viewport of [{width:390,height:844},{width:1366,height:768}]) {const page=await browser.newPage({viewport});await page.goto('http://localhost:3417');await page.getByRole('button',{name:/Teste compartilhado/}).click();await page.getByText('Olá, turma!').waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow horizontal ${viewport.width}`);await page.getByLabel('Seu nome').fill('Bia');await page.getByLabel('Mensagem',{exact:true}).fill('Mensagem pela tela');await page.getByRole('button',{name:/Enviar/}).click();await page.getByText('Mensagem pela tela').first().waitFor();await page.screenshot({path:`tests/screen-${viewport.width}.png`,fullPage:true});await page.close();}
 console.log('PASSOU: salas, envio em tempo real, isolamento, histórico, validação e telas mobile/desktop');
} finally {await browser?.close();api.kill();ui.kill();await db.stop();}


