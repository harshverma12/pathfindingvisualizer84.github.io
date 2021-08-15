// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function bidirectional_bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const que1 = []; que1.push(startNode); startNode.isVisited=1;
  const que2 = []; que2.push(finishNode);  finishNode.isVisited=2;

  while (que1.length>0 && que2.length>0) {

    const closestNode1 = que1.shift();
    const closestNode2 = que2.shift();
    
    visitedNodesInOrder.push(closestNode1);
    visitedNodesInOrder.push(closestNode2);
    
    if (closestNode1.istargetNode) return [visitedNodesInOrder,closestNode1];
    if (closestNode2.istargetNode) return [visitedNodesInOrder,closestNode2];

    updateUnvisitedNeighbors1(closestNode1,grid,que1);
    updateUnvisitedNeighbors2(closestNode2,grid,que2);

  }
  const tmpnode=null;
  return [visitedNodesInOrder,tmpnode];
}

function updateUnvisitedNeighbors1(node,grid,que) {
  const unvisitedNeighbors = getUnvisitedNeighbors1(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    if(neighbor.istargetNode){ continue; }     
    if(neighbor.isVisited === 2)
    {
     neighbor.istargetNode=true;
     let tmpnode=neighbor.previousNode;
     neighbor.prevNode2=tmpnode;
     neighbor.previousNode=node;
    }
    neighbor.previousNode = node; 
    neighbor.isVisited=1;  
    que.push(neighbor);
  }
}

function updateUnvisitedNeighbors2(node,grid,que) {
  const unvisitedNeighbors = getUnvisitedNeighbors2(node, grid);
  for (let neighbor of unvisitedNeighbors) {
    if(neighbor.istargetNode){ continue; }
    
    if(neighbor.isVisited === 1){ neighbor.prevNode2=node; neighbor.istargetNode=true; }
    if(!neighbor.istargetNode){ neighbor.previousNode = node; } 
    neighbor.isVisited=2;  
    que.push(neighbor);
  }
}

function getUnvisitedNeighbors1(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => (neighbor.isVisited!==1 && !neighbor.isWall));
}

function getUnvisitedNeighbors2(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => (neighbor.isVisited!==2 && !neighbor.isWall));
}

export function Shortest_Bidirectional_Bfs_PathOrder(midnode) {

  const nodesInShortestPathOrder = [];
  if(!midnode){ return nodesInShortestPathOrder; }
  let currentNode = midnode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  currentNode = midnode.prevNode2;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}