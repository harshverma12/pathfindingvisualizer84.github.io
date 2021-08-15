export function random_weights(width, height)
{
	const mazeNodesInOrder=[]; 

	for(let i=0; i<height; i++)
    {
      for(let j=0; j<width; j++)
      {
        if(randomIntFromInterval(0,4)===0){ mazeNodesInOrder.push([i,j])};  
      }
    }
  return mazeNodesInOrder;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}