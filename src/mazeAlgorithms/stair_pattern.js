export function stair_pattern(width, height)
{
	const mazeNodesInOrder=[]; 
	let i=height-1,j=0;

	while(i>=0)
	{
		mazeNodesInOrder.push([i,j]);
		i--; j++;
	}

	i++; j--;
	while(i<height-1)
	{
		mazeNodesInOrder.push([i,j]);
		i++; j++;
	}

	i--; j--;
	while(i>=2 && j<=width-2)
	{
		mazeNodesInOrder.push([i,j]);
		i--; j++;
	}

    return mazeNodesInOrder;
}