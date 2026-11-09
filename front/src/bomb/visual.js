// Visible direction follows actual interpolated movement, including prediction.
export function visualMotion(position,target,lastDirection='down'){
 const dx=target.x-position.x,dy=target.y-position.y;
 if(Math.abs(dx)+Math.abs(dy)<=1)return {moving:false,direction:lastDirection};
 return {moving:true,direction:Math.abs(dx)>=Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up')};
}
export function acceptSnapshot(sequence,state){
 if(Number.isSafeInteger(state.sequence)){if(state.sequence<=sequence.current)return false;sequence.current=state.sequence}
 return true;
}
