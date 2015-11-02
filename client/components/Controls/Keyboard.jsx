import React from 'react';

export default class Keyboard extends React.Component {

  setDefaultProps() {
    return {
      keyPressed() {}
    }
  }

  handleKeyPress(e) {
    this.props.keyPressed(e.key);
  }

  render () {
    return (
      <div
        onKeyPress={this.handleKeyPress.bind(this)}
        tabIndex="1"
        >
        {this.props.children}
      </div>
    );
  }
}

Keyboard.propTypes = {
  keyPressed: React.PropTypes.func
};