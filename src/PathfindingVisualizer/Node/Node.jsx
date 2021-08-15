import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {


  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      isWeight,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isWeight
      ? 'node-weight'
      : ''; 

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp} 
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        tabIndex="0"></div>
    );
  }
}