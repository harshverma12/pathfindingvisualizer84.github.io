import React, {Component} from 'react';
import Node from './Node/Node.jsx';
import clear_Board from './Node/Node.jsx';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar} from '../algorithms/astar';
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import {random_weights} from '../mazeAlgorithms/random_weight';
import {recursive_divide} from '../mazeAlgorithms/recursive_division';
import {stair_pattern} from '../mazeAlgorithms/stair_pattern';
import {bidirectional_bfs,Shortest_Bidirectional_Bfs_PathOrder} from '../algorithms/bidirectional_bfs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import modall from '../modall/modall.jsx';
import sample from './sample.jsx';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'


import './PathfindingVisualizer.css';

let START_NODE_ROW = 9;
let START_NODE_COL = 9;
let FINISH_NODE_ROW = 9;
let FINISH_NODE_COL = 35;
let NO_COL = 45,NO_ROW=19;


export default class PathfindingVisualizer extends Component {

  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: 0,
      isW:0,
      show:true,
      setShow:false,
      currentAlgoNo:0,
      currentAlgoName:"Visualize!",
      isdisable:true,
      clearflag:0,
    };
    this.clearBoard = this.clearBoard.bind(this);
    this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    //this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    let fl;
    if(row===START_NODE_ROW && col===START_NODE_COL) 
    { fl=0; }
    else if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL)
    {fl=1;}
    else if(this.state.isW===1)
    { fl=3; }
    else { fl=2; }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col,fl);
    this.setState({grid: newGrid, mouseIsPressed: fl+1});
    if(fl===0 || fl===1){ this.handleMove(); }
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed===0) return;
    let fl=this.state.mouseIsPressed-1;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col,fl);
    this.setState({grid: newGrid});
    if(fl===0 || fl===1){ this.handleMove(); }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: 0});
  }

  colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
  {

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length)
      {
        this.colorShortestPath(nodesInShortestPathOrder);
        return;
      }
        const node = visitedNodesInOrder[i];

        if(node.isStart){ document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-visited-start-simple';}
        else if(node.isFinish){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited-finish-simple'; }
        else if(node.isWeight){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited-weight-simple'; }
        else{  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited-simple';  }      
    }
  }

  colorShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      
        const node = nodesInShortestPathOrder[i];
        if(node.isStart){ document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-shortest-path-start-simple';}
        else if(node.isFinish){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path-finish-simple'; }
        else{  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path-simple';  }
    }
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        if(node.isStart){ document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-visited-start';}
        else if(node.isFinish){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited-finish'; }
        else if(node.isWeight){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited-weight'; }
        else{  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';  }
      }, 5 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if(node.isStart){ document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-shortest-path-start';}
        else if(node.isFinish){  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path-finish'; }
        else{  document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';  }
      }, 50 * i);
    }
  }

  animateRandomMaze(nodesInMaze,flag)
  {
    const {grid} = this.state;
    for (let i = 0; i < nodesInMaze.length; i++) {
      const [x,y] = nodesInMaze[i];
      const node=grid[x][y];
      if(x===START_NODE_ROW && y===START_NODE_COL){ continue; }
      if(x===FINISH_NODE_ROW && y===FINISH_NODE_COL){ continue; }

      if(flag===0){  node.isWall=true;  }
      else{  node.isWeight=true;  }
        
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-maze-path'; 
     
    }    
  }

  animateMazeWalls(nodesInMaze,flag) {
    const {grid} = this.state;
    for (let i = 0; i < nodesInMaze.length; i++) {
      const [x,y] = nodesInMaze[i];
      const node=grid[x][y];
      if(x===START_NODE_ROW && y===START_NODE_COL){ continue; }
      if(x===FINISH_NODE_ROW && y===FINISH_NODE_COL){ continue; }
      setTimeout(() => {

        if(flag===0){  node.isWall=true;  }
        else{  node.isWeight=true;  }
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-maze-path';
        //}
      }, 50 * i);
    }               
  }

  clearBoard() {

    this.setState({isdisable:true});
    const gridd=this.state.grid;

    gridd[START_NODE_ROW][START_NODE_COL].isStart=false;
    gridd[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish=false;

    START_NODE_ROW = 9;
    START_NODE_COL = 9;
    FINISH_NODE_ROW = 9;
    FINISH_NODE_COL = 35;

    gridd[START_NODE_ROW][START_NODE_COL].isStart=true;
    gridd[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish=true;    

    for(let i=0; i<NO_ROW; i++)
    {
      for(let j=0; j<NO_COL; j++)
      {

        const tmpnode=gridd[i][j];

        if(gridd[i][j].isStart )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-start'; }
        else if(gridd[i][j].isFinish )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-finish'; }
        else
        {  document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node'; }
        

        gridd[i][j].distance=Infinity;
        gridd[i][j].isVisited=0;
        gridd[i][j].isWall=false;
        gridd[i][j].isWeight=false;
        gridd[i][j].istargetNode =false;
        gridd[i][j].previousNode = null;
        gridd[i][j].prevNode2 = null;
  
      }
    }
    this.setState({grid: gridd,clearflag:1});
    this.setState({isdisable:false});
  }



  clearPath()
  {
    this.setState({isdisable:true});
    const gridd=this.state.grid;

    for(let i=0; i<NO_ROW; i++)
    {
      for(let j=0; j<NO_COL; j++)
      {

        const tmpnode=gridd[i][j];

        if(gridd[i][j].isStart )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-start'; }
        else if(gridd[i][j].isFinish )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-finish'; }
        else if(gridd[i][j].isWall )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-wall'; }
        else if(gridd[i][j].isWeight )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-weight'; }
        else
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node'; }
        

        gridd[i][j].distance=Infinity;
        gridd[i][j].isVisited=0;
        gridd[i][j].istargetNode =false;
        gridd[i][j].previousNode = null;
        gridd[i][j].prevNode2 = null;
  
      }
    }
    this.setState({isdisable:false});
    this.setState({clearflag:1});
  }


  clearWallsWeights()
  {
    this.setState({isdisable:true});
    const gridd=this.state.grid;

    for(let i=0; i<NO_ROW; i++)
    {
      for(let j=0; j<NO_COL; j++)
      {

        const tmpnode=gridd[i][j];

        if(gridd[i][j].isStart )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-start'; }
        else if(gridd[i][j].isFinish )
        {   document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node node-finish'; }
        else
        {  document.getElementById(`node-${tmpnode.row}-${tmpnode.col}`).className ='node'; }
        

        gridd[i][j].distance=Infinity;
        gridd[i][j].isVisited=0;
        gridd[i][j].isWall=false;
        gridd[i][j].isWeight=false;
        gridd[i][j].istargetNode =false;
        gridd[i][j].previousNode = null;
        gridd[i][j].prevNode2 = null;

  
      }
    }
    this.setState({grid: gridd,clearflag:1});
    this.setState({isdisable:false});
  }

  visualizeDijkstra(flag) {

    this.clearPath();  
    this.setState({isdisable:true});

    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if(flag === 0){ this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    else{ this.colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    this.setState({clearflag:0});
    this.setState({isdisable:false});
  }

  visualizeDfs(flag) {
    this.setState({isdisable:true});
    this.clearPath();   
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if(flag === 0){ this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    else{ this.colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    this.setState({clearflag:0});
    this.setState({isdisable:false});
  }

  visualizeBfs(flag) {
    this.setState({isdisable:true});
    this.clearPath();   
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if(flag === 0){ this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    else{ this.colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    this.setState({clearflag:0});
    this.setState({isdisable:false});
  }

  visualizeAstar(flag) {
    this.setState({isdisable:true});
    this.clearPath();   
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if(flag === 0){ this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    else{ this.colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    this.setState({clearflag:0});
    this.setState({isdisable:false});
  }

  visualizeBiderectional_bfs(flag) {
    this.setState({isdisable:true});
    this.clearPath();   
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodesInOrder,midNode] = bidirectional_bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = Shortest_Bidirectional_Bfs_PathOrder(midNode);
    if(flag === 0){ this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    else{ this.colorAlgo(visitedNodesInOrder, nodesInShortestPathOrder); }
    this.setState({clearflag:0});
    this.setState({isdisable:false});
  }

  handleClose(){
    
    this.setState({show:false}); 
  }


  handleShow (){
    this.setState({show:true}); 
  }
  

  visualizeRecursive_division() {
    this.setState({isdisable:true});
    this.clearWallsWeights();   
    const wid=NO_COL; const height=NO_ROW;

    const mazeNodesInOrder=recursive_divide(wid,height);    
    this.animateMazeWalls(mazeNodesInOrder,0);
    this.setState({isdisable:false});
  }

  visualizeWall_maze() {
    this.setState({isdisable:true});
    this.clearWallsWeights();   
    const wid=NO_COL; const height=NO_ROW;

    const mazeNodesInOrder=random_weights(wid,height);    
    this.animateRandomMaze(mazeNodesInOrder,0);
    this.setState({isdisable:false});
  }

  visualizeWeight_maze() {
    this.setState({isdisable:true});
    this.clearWallsWeights();   
    const wid=NO_COL; const height=NO_ROW;

    const mazeNodesInOrder=random_weights(wid,height);    
    this.animateRandomMaze(mazeNodesInOrder,1);
    this.setState({isdisable:false});
  }

  visualizeStair_maze() {
    this.setState({isdisable:true});
    this.clearWallsWeights();   
    const wid=NO_COL; const height=NO_ROW;

    const mazeNodesInOrder=stair_pattern(wid,height);    
    this.animateRandomMaze(mazeNodesInOrder,0);
    this.setState({isdisable:false});
  }

  handleVisulize()
  {
    this.setState({isdisable:true});
    const fl=this.state.currentAlgoNo;
    if(fl===1){ this.visualizeDijkstra(0); }
    else if(fl===2){ this.visualizeAstar(0); }
    else if(fl===3){ this.visualizeBfs(0); }
    else if(fl===4){ this.visualizeDfs(0); }
    else if(fl===5){ this.visualizeBiderectional_bfs(0); }
    else//fl===0
    {  this.setState({currentAlgoName:"Pick an Algorithm !"}); }
    this.setState({isdisable:false});
  }

  handleMove()
  {
    if(this.state.clearflag){ return; }
    const fl=this.state.currentAlgoNo;
    if(fl===1){ this.visualizeDijkstra(1); }
    else if(fl===2){ this.visualizeAstar(1); }
    else if(fl===3){ this.visualizeBfs(1); }
    else if(fl===4){ this.visualizeDfs(1); }
    else if(fl===5){ this.visualizeBiderectional_bfs(1); }
  }

  handledisable()
  {
    const fl=this.state.isdisable;
    document.getElementById("but1").disabled=fl;
    document.getElementById("but2").disabled=fl;
    document.getElementById("but3").disabled=fl;
    document.getElementById("but4").disabled=fl;
    document.getElementById("but5").disabled=fl;
    document.getElementById("but6").disabled=fl;
    document.getElementById("but7").disabled=fl;
    document.getElementById("but8").disabled=fl;
    document.getElementById("but9").disabled=fl;
    document.getElementById("but10").disabled=fl;
    document.getElementById("but11").disabled=fl;
    document.getElementById("but12").disabled=fl;
  }

  

  render() {
    const {grid, mouseIsPressed} = this.state;
    const show=this.state.show;
    //this.handledisable();   

    return (

      <>
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Pathfinding-Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown className="inner_nav" title="Algoritms" id="collasible-nav-dropdown">
                <NavDropdown.Item id="but1" onClick={() => this.setState({currentAlgoNo:1,currentAlgoName:"Visualize Dijkstra's!"})}>
                Dijkstra's Algorithm</NavDropdown.Item>
                <NavDropdown.Item id="but2" onClick={() => this.setState({currentAlgoNo:2,currentAlgoName:"Visualize A*!"})}>
                A* Search</NavDropdown.Item>
                <NavDropdown.Item id="but3" onClick={() => this.setState({currentAlgoNo:3,currentAlgoName:"Visualize BFS!"})}>
                Breadth-First Search</NavDropdown.Item>
                <NavDropdown.Item id="but4" onClick={() => this.setState({currentAlgoNo:4,currentAlgoName:"Visualize DFS!"})}>
                Depth-First Search</NavDropdown.Item>
                <NavDropdown.Item id="but5" onClick={() => this.setState({currentAlgoNo:5,currentAlgoName:"Visualize Bidirectional-BFS!"})}>
                Bidirectional Bfs</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Mazes & Patterns" id="collasible-nav-dropdown">
                <NavDropdown.Item id="but6" onClick={() => this.visualizeRecursive_division()}>Recursive division</NavDropdown.Item>
                <NavDropdown.Item id="but7" onClick={() => this.visualizeWall_maze()}>Basic Random Maze</NavDropdown.Item>
                <NavDropdown.Item id="but8" onClick={() => this.visualizeWeight_maze()}>Basic Weight Maze</NavDropdown.Item>
                <NavDropdown.Item id="but9" onClick={() => this.visualizeStair_maze()}>Stair Pattern Maze</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link id="but1" onClick={() => this.handleVisulize()}>{this.state.currentAlgoName}</Nav.Link>

              <NavDropdown title="Clear Options" id="collasible-nav-dropdown">
                <NavDropdown.Item id="but10" onClick={() => this.clearBoard()}>Clear Board</NavDropdown.Item>
                <NavDropdown.Item id="but11" onClick={() => this.clearWallsWeights()}>Clear Walls and Weights</NavDropdown.Item>
                <NavDropdown.Item id="but12" onClick={() => this.clearPath()}>Clear Path</NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
            <Nav>
              <Nav.Link >Tutorial</Nav.Link>
              <NavDropdown title="Walls OR Weights" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => this.setState({isW:0}) }>Walls</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.setState({isW:1}) }>Weights</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/*

        <Button variant="primary" onClick={this.handleShow}>
        Launch demo modal
        </Button>
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      */}


        <div className="grid" >

          {grid.map((row, rowIdx) => {
            return (

              <div key={rowIdx} >
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall,isWeight} = node;
                  return (

                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWeight={isWeight}
                      mouseIsPressed={mouseIsPressed}
                      onKeyDown={this.handleKeyPress}
                      onKeyUp={this.handleKeyUp} 
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NO_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_COL; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: 0,
    isWall: false,
    isWeight:false,
    istargetNode:false,
    previousNode: null,
    prevNode2: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col,fl) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
  };
  if(fl===0)
  {
    newGrid[START_NODE_ROW][START_NODE_COL].isStart=false;
    newNode.isStart = true;
    START_NODE_ROW=row; START_NODE_COL=col;
  }
  else if(fl===1)
  {
    newGrid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish=false;
    newNode.isFinish = true;
    FINISH_NODE_ROW=row; FINISH_NODE_COL=col;
  }
  else if(fl===2)
  { 
    newNode.isWall = !node.isWall;  
  }
  else if(fl===3)
  {
    newNode.isWeight = !node.isWeight;
  }

  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithNoVisited = (grid) => {
  const newGrid = getInitialGrid();
  for(let i=0; i<NO_ROW; i++)
  {
    for(let j=0; j<NO_COL; j++)
    {
      const node = newGrid[i][j];

      if(grid[i][j].isStart )
      {   document.getElementById(`node-${node.row}-${node.col}`).className ='node node-start'; }
      else if(grid[i][j].isFinish )
      {   document.getElementById(`node-${node.row}-${node.col}`).className ='node node-finish'; }
      else if(grid[i][j].isVisited && !grid[i][j].isWall )
      {   document.getElementById(`node-${node.row}-${node.col}`).className ='node node'; }
    

      const newNode = {
        ...node,
        iswall: grid[i][j].isWall,
      };
      newGrid[i][j] = newNode;
    }
  }
  return newGrid;
};