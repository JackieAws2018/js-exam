import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  resetConsole
} from '../../actions/console';
import './Console.css';

const isError = (e) => e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message === 'string';

class Console extends Component {
  constructor(props) {
    super(props);
    this.resetConsole = this.props.resetConsole;
  }
  render() {
    return (
      <div className={this.props.className ? this.props.className : ''}>
        Console:
        {
          this.props.console.map(({ args }, index1) => 
            <div className="console" key={index1}>
              {
                args.map((text, index2) => 
                  <div className="text" key={index2}>
                    { 
                      typeof text === 'object' && !isError(text)
                        ? JSON.stringify(text, null, 2)
                        : `${text}`.trim() === '' ? <br/> : `${text}`.trim()
                    }
                  </div>
                )
              }
            </div> )
        }
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      console: state.console
    };
  },
  dispatch => {
    return {
      resetConsole: () => dispatch(resetConsole())
    };
  }
)(Console);

