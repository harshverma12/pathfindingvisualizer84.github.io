// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const que = []; que.push(startNode);

  while (que.length>0) {

    const closestNode = que.shift();
    closestNode.isVisited = true;

    if(closestNode.isWall){ continue; }
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode,grid,que);
    
  }

  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node,grid,que) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;  
    neighbor.isVisited=true;  
    que.push(neighbor);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited );
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

