import React from 'react';
import logo from './logo.svg';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer.jsx';
import sample from './PathfindingVisualizer/sample';
import 'bootstrap/dist/css/bootstrap.min.css';
/*import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
*/

function App() {
  return (
  	//<div>
  	/*<div className="App">
  		<modall> </modall>
  	</div>*/

    <div className="App">
      <PathfindingVisualizer> </PathfindingVisualizer>
    </div>
    //</div>
  );
}

export default App;
