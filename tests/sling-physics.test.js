import {describe,it,expect} from 'vitest';
import Matter from 'matter-js';
import {createArena,launchProjectile,updatePhysics,impactDamage,PROJECTILES,PHYSICS} from '../back/sling/physics.js';
import {predictTrajectory} from '../front/src/sling/trajectory.js';

describe('física da batalha de estilingue',()=>{
 it('cria torres equilibradas, com peças variadas que permanecem estáveis',()=>{
  const {engine,blocks}=createArena();
  expect(new Set(blocks.map(b=>`${b.w}x${b.h}`)).size).toBeGreaterThan(3);
  for(let i=0;i<7;i++){expect(blocks[i].maxHp).toBe(blocks[i+7].maxHp);expect(blocks[i].body.position.x+blocks[i+7].body.position.x).toBeCloseTo(1000,1)}
  const before=blocks.map(b=>({...b.body.position}));
  for(let i=0;i<300;i++)Matter.Engine.update(engine,PHYSICS.step);
  blocks.forEach((b,i)=>expect(Math.hypot(b.body.position.x-before[i].x,b.body.position.y-before[i].y)).toBeLessThan(1));
 });
 it.each(PROJECTILES)('mostra uma trajetória coerente com a física para $name',type=>{
  for(const wind of [-5,0,5]){
   const engine=Matter.Engine.create();engine.gravity.y=PHYSICS.gravity;engine.gravity.scale=PHYSICS.gravityScale;
   const drag={dx:-.8,dy:.5},ball=launchProjectile(engine,type,0,drag.dx,drag.dy),predicted=predictTrajectory({x:230,y:350},drag,type.speed,wind,type.windFactor);
   for(let step=0;step<Math.min(predicted.length,5)*5;step++){updatePhysics(engine,ball,wind,type);if(step%5===4){const point=predicted[(step-4)/5];expect(ball.position.x).toBeCloseTo(point.x,2);expect(ball.position.y).toBeCloseTo(point.y,2)}}
  }
 });
 it('aplica o vento na direção correta e reduz seu efeito no projétil pesado',()=>{
  const flight=(type,wind)=>{const engine=Matter.Engine.create();engine.gravity.y=PHYSICS.gravity;engine.gravity.scale=PHYSICS.gravityScale;const ball=launchProjectile(engine,type,0,-.8,.4);for(let i=0;i<30;i++)updatePhysics(engine,ball,wind,type);return ball.position.x};
  const light=PROJECTILES[0],heavy=PROJECTILES[1],neutral=flight(light,0);
  expect(flight(light,-5)).toBeLessThan(neutral);expect(flight(light,5)).toBeGreaterThan(neutral);
  expect(flight(heavy,5)-flight(heavy,0)).toBeLessThan(flight(light,5)-neutral);
 });
 it('transfere movimento para a torre e limita o dano por impacto',()=>{
  const {engine,blocks}=createArena(),type=PROJECTILES[0],ball=launchProjectile(engine,type,0,-.95,.3);let contacts=0;
  Matter.Events.on(engine,'collisionStart',e=>{for(const p of e.pairs)if((p.bodyA===ball&&p.bodyB.plugin.block?.side===1)||(p.bodyB===ball&&p.bodyA.plugin.block?.side===1))contacts++});
  for(let i=0;i<200;i++)updatePhysics(engine,ball,0,type);
  expect(contacts).toBeGreaterThan(0);expect(impactDamage(20,type)).toBeGreaterThan(impactDamage(2,type));expect(impactDamage(1000,type)).toBeLessThanOrEqual(65);
  expect(blocks.every(b=>Number.isFinite(b.body.position.x)&&Number.isFinite(b.body.position.y))).toBe(true);
 });
});
