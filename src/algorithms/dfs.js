// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.isVisited = true;
  
  let flag = dfs_util(grid,startNode,finishNode,visitedNodesInOrder);
  return visitedNodesInOrder;
}

function dfs_util(grid, startNode, finishNode,visitedNodesInOrder) {

  const unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid);

  visitedNodesInOrder.push(startNode);
  if (startNode === finishNode) return true;

  for (let neighbor of unvisitedNeighbors) {
    if(neighbor.isWall){ neighbor.isVisited=true; continue; }

    neighbor.previousNode = startNode;  
    neighbor.isVisited=true;   

    let tmp=dfs_util(grid,neighbor,finishNode,visitedNodesInOrder);
    if(tmp === true){ return true; }
  }

  return false;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);  
  
  return neighbors.filter(neighbor => neighbor.isVisited==0 );
}

