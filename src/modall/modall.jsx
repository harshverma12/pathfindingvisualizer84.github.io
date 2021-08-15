import React, {Component} from 'react';
import './modall.css';

export default class modall extends Component {
  constructor(props)
  {
    super(props);
    this.state={};
  }

  render() {    
      return (
        <div className="fk">
          foo
          <button >
            props.name
          </button>
        </div>
      );
  }
}

