
let wid,hig;

function choose_orientation(width, height){

  //let t=randomIntFromInterval(0,1);
  //console.log(t);
  //return t;

  if(width < height)
  {  return 1;  }
  else if(height < width)
  {  return 0;  }
  else
  { return randomIntFromInterval(0,1);  }

}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function recursive_divide(width, height)
{
  const set1= new Set();
  const mazeNodesInOrder=[]; 
  wid=width; hig=height;
  for(let i=0; i<width; i++){ mazeNodesInOrder.push([0,i]); set1.add((wid*0)+i); }
  for(let i=0; i<height; i++){ mazeNodesInOrder.push([i,0]); mazeNodesInOrder.push([i,width-1]);  set1.add((wid*i)+0); set1.add((wid*i)+width-1);}
  for(let i=0; i<width; i++){ mazeNodesInOrder.push([height-1,i]); set1.add((wid*(height-1))+i); }

  divide(mazeNodesInOrder,set1,1,1,width-2,height-2);
  return mazeNodesInOrder;
}

 
// --------------------------------------------------------------------
// 4. The recursive-division algorithm itself
// --------------------------------------------------------------------

function divide(grid,set1, x, y, width, height){

  if( width < 2 || height < 2){ return; } 
  if( width === 2 && height === 2){ return; } 

  console.log(wid);

  let orientation=choose_orientation(width,height);
  const horizontal = orientation;

  if(width===2){ orientation=1; }
  else if(height===2){ orientation=0; }

  // where will the wall be drawn from?
  let wx = x + (horizontal ? 0 : randomIntFromInterval(1,width-2));
  let wy = y + (horizontal ? randomIntFromInterval(1,height-2) : 0);

  if(horizontal){
   if(wx-1>=0 && set1.has((wy*wid)+wx-1) === false )
   {
    if(wy-1 > y){  wy-=1; }
    else if(wy+1 < y+height-1){ wy+=1; } 
    else{ return; }
   }
  }
  else{
   if(wy-1>=0 && set1.has((wy-1)*wid + wx) === false )
   {
    if(wx-1>x){  wx-=1; }
    else if(wx+1 < x+width-1){ wx+=1; } 
    else{ return; }
   }
  }

  // where will the passage through the wall exist?
  let px = wx + (horizontal ? randomIntFromInterval(0,width-1) : 0);
  let py = wy + (horizontal ? 0 : randomIntFromInterval(0,height-1));

  if(horizontal && !set1.has((wy*wid)+wx+width) ) { px=wx+(width-1); }
  else if(!horizontal && !set1.has( ((wy+height)*wid)+wx)  ){ py=wy+(height-1); }

  // what direction will the wall be drawn?
  let dx = horizontal ? 1 : 0;
  let dy = horizontal ? 0 : 1;

  // how long will the wall be?
  let length = horizontal ? width : height;

  // what direction is perpendicular to the wall?
  // dir = horizontal ? S : E

  for(let i=0; i<length; i++){
    if( (wx !== px || wy !== py) )
    { grid.push([wy,wx]); set1.add((wid*wy)+wx); }
    wx += dx;
    wy += dy;
  }

  let nx=x,ny= y; //console.log(ny,nx,"1");
  let [w,h]= horizontal ? [width, wy-y] : [wx-x, height];
  divide(grid,set1, nx, ny, w, h);

  [nx,ny] = horizontal ? [x, wy+1] : [wx+1, y];
  //console.log(ny,nx,"2");
  [w,h] = horizontal ? [width, y+height-wy-1] : [x+width-wx-1, height];
  divide(grid,set1, nx, ny, w, h);
  
}
