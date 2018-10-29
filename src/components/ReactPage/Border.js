import React, { Component } from 'react';
import './MainPage.css';

class Border extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.resize = this.resize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);
    this.state = { width: this.props.width, height: this.props.height };
  }
  componentDidMount() {
    document.querySelector('.test-panel').style.height =
      window.innerHeight - this.state.height + 'px';
    document.querySelector('.bottom-panel').style.height =
      window.innerHeight - document.querySelector('.top-panel').clientHeight + 'px';
  }
  startResize(e) {
    if (e.target.contains(this.ref.current)) {
      window.addEventListener('mousemove', this.resize);
      window.addEventListener('mouseup', this.endResize);
    }
  }
  resize(e) {
    this.setState({
      width: this.props.allowWidth ? e.clientX - this.ref.current.offsetLeft : this.state.width,
      height: this.props.allowHeight ? e.clientY - this.ref.current.offsetTop : this.state.height
    });
    // Todo: need to get rid of real dom
    document.querySelector('.test-panel').style.height =
      window.innerHeight - document.querySelector('.code-panel').clientHeight + 'px';
    document.querySelector('.bottom-panel').style.height =
      window.innerHeight - document.querySelector('.top-panel').clientHeight + 'px';
  }
  endResize(e) {
    window.removeEventListener('mousemove', this.resize);
    window.removeEventListener('mouseup', this.endResize);
    window.dispatchEvent(new Event('resize'));
  }
  render() {
    return (
      <div
        ref={this.ref}
        className={`border ${this.props.className ? this.props.className : ''}`}
        onMouseDown={this.startResize}
        style={
          {
            width: this.state.width + 'px',
            height: this.state.height + 'px'
          }
        }
      >
        { this.props.children }
      </div>
    )
  }
}

export default Border;