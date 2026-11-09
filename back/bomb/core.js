// Deterministic game rules: no network, wall-clock time or rendering dependencies.
/**
 * @typedef {{id:string,name:string,avatar:number}} User
 * @typedef {User & {x:number,y:number,facing:string,lives:number,range:number,capacity:number,speed:number,shield:number,invulnerableUntil:number,nextMove:number,lastSeq:number,alive:boolean}} Player
 * @typedef {{id:number,owner:string,x:number,y:number,range:number,detonate:number}} Bomb
 * @typedef {{x:number,y:number,until:number}} Flame
 * @typedef {{id:number,x:number,y:number,kind:string}} Item
 * @typedef {{seed:number,initialSeed:number,tick:number,phase:string,grid:number[],players:Player[],bombs:Bomb[],flames:Flame[],items:Item[],nextId:number,winner:string|null,reason:string|null}} Game
 * @typedef {{seq:number,action:'up'|'down'|'left'|'right'|'bomb'}} Input
 */
export const WIDTH=13, HEIGHT=11, TICK_HZ=20, MAX_TICKS=180*TICK_HZ;
const SPAWNS=[[1,1],[11,9],[11,1],[1,9]],DIRS=[[1,0],[-1,0],[0,1],[0,-1]],TILE={EMPTY:0,WALL:1,CRATE:2};
export {TILE};
/** @param {Game} s */
function nextRandom(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296}
/** @param {number} seed @param {User[]} users @returns {Game} */
export function createGame(seed,users){if(!Array.isArray(users)||users.length<2||users.length>4||new Set(users.map(u=>u.id)).size!==users.length)throw Error('A partida exige de 2 a 4 jogadores distintos');/** @type {Game} */ const s={seed:seed>>>0,initialSeed:seed>>>0,tick:0,phase:'playing',grid:Array(WIDTH*HEIGHT).fill(0),players:users.map((u,i)=>({id:u.id,name:u.name,avatar:u.avatar,x:SPAWNS[i][0],y:SPAWNS[i][1],facing:'down',lives:1,range:2,capacity:1,speed:4,shield:0,invulnerableUntil:0,nextMove:0,lastSeq:-1,alive:true})),bombs:[],flames:[],items:[],nextId:1,winner:null,reason:null};
 for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){let safe=SPAWNS.some(([sx,sy])=>Math.abs(sx-x)+Math.abs(sy-y)<=2),wall=x===0||y===0||x===WIDTH-1||y===HEIGHT-1||(x%2===0&&y%2===0);s.grid[y*WIDTH+x]=wall?TILE.WALL:(!safe&&nextRandom(s)<.55?TILE.CRATE:TILE.EMPTY)}return s}
/** @param {Game} s @param {number} x @param {number} y */
function tile(s,x,y){return x<0||y<0||x>=WIDTH||y>=HEIGHT?TILE.WALL:s.grid[y*WIDTH+x]}
/** @param {Game} s @param {number} x @param {number} y */
function bombAt(s,x,y){return s.bombs.find(b=>b.x===x&&b.y===y)}
/** @param {Game} s @param {string} id @param {Input} input */
export function applyInput(s,id,input){const p=s.players.find(q=>q.id===id);if(s.phase!=='playing'||!p?.alive||!input||!Number.isSafeInteger(input.seq)||input.seq<0||input.seq<=p.lastSeq)return false;if(input.action!=='bomb'&&!['up','down','left','right'].includes(input.action))return false;p.lastSeq=input.seq;if(input.action==='bomb'){if(s.bombs.filter(b=>b.owner===id).length>=p.capacity||bombAt(s,p.x,p.y))return false;s.bombs.push({id:s.nextId++,owner:id,x:p.x,y:p.y,range:p.range,detonate:s.tick+50});return true}if(s.tick<p.nextMove)return false;const [dx,dy]=({up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]})[input.action],x=p.x+dx,y=p.y+dy;if(tile(s,x,y)!==TILE.EMPTY||bombAt(s,x,y))return false;p.x=x;p.y=y;p.facing=input.action;p.nextMove=s.tick+p.speed;const item=s.items.find(v=>v.x===x&&v.y===y);if(item){s.items=s.items.filter(v=>v.id!==item.id);if(item.kind==='range')p.range=Math.min(5,p.range+1);if(item.kind==='bomb')p.capacity=Math.min(3,p.capacity+1);if(item.kind==='speed')p.speed=Math.max(2,p.speed-1);if(item.kind==='shield')p.shield=Math.min(2,p.shield+1)}return true}
/** @param {Game} s @param {Bomb} b @param {Bomb[]} queue @param {Set<number>} queued @param {Set<string>} flames */
function explode(s,b,queue,queued,flames){let cells=[[b.x,b.y]];for(const [dx,dy] of DIRS)for(let n=1;n<=b.range;n++){const x=b.x+dx*n,y=b.y+dy*n,t=tile(s,x,y);if(t===TILE.WALL)break;cells.push([x,y]);const chain=bombAt(s,x,y);if(chain&&!queued.has(chain.id)){queued.add(chain.id);queue.push(chain)}if(t===TILE.CRATE){s.grid[y*WIDTH+x]=TILE.EMPTY;if(nextRandom(s)<.3){const kinds=['range','bomb','speed','shield'];s.items.push({id:s.nextId++,x,y,kind:kinds[Math.floor(nextRandom(s)*kinds.length)]})}break}}for(const [x,y] of cells)flames.add(x+','+y) }
/** @param {Game} s */
function finish(s){const alive=s.players.filter(p=>p.alive);if(alive.length<=1){s.phase='finished';s.winner=alive[0]?.id||null;s.reason=alive.length?'last':'simultaneous';return}if(s.tick>=MAX_TICKS){s.phase='finished';s.winner=null;s.reason='timeout'}}
/** @param {Game} s */
export function step(s){if(s.phase!=='playing')return;s.tick++;s.flames=s.flames.filter(f=>f.until>s.tick);const queue=s.bombs.filter(b=>b.detonate<=s.tick||s.flames.some(f=>f.x===b.x&&f.y===b.y)).sort((a,b)=>a.id-b.id),queued=new Set(queue.map(b=>b.id)),cells=new Set();while(queue.length){const b=queue.shift();if(!b||!s.bombs.some(v=>v.id===b.id))continue;s.bombs=s.bombs.filter(v=>v.id!==b.id);explode(s,b,queue,queued,cells)}for(const value of cells){const [x,y]=value.split(',').map(Number);s.flames.push({x,y,until:s.tick+8})}for(const p of s.players){if(!p.alive||p.invulnerableUntil>s.tick)continue;if(s.flames.some(f=>f.x===p.x&&f.y===p.y)){if(p.shield>0)p.shield--;else p.lives=Math.max(0,p.lives-1);p.invulnerableUntil=s.tick+40;if(p.lives===0)p.alive=false}}finish(s)}
/** @param {Game} s @param {string[]} ids */
export function removePlayers(s,ids){if(s.phase!=='playing')return;const missing=new Set(ids);for(const p of s.players)if(missing.has(p.id)){p.alive=false;p.lives=0}if(s.phase==='playing')finish(s)}
/** @param {Game} s @param {string} id */
export function removePlayer(s,id){removePlayers(s,[id])}
/** @param {Game} s */
export function snapshot(s){return {tick:s.tick,phase:s.phase,width:WIDTH,height:HEIGHT,grid:s.grid,players:s.players.map(({nextMove,...p})=>p),bombs:s.bombs,flames:s.flames,items:s.items,winner:s.winner,reason:s.reason,maxTicks:MAX_TICKS}}
