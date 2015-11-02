import React from 'react';
import Canvas from './Display/Canvas.jsx';
import Keyboard from './Controls/Keyboard.jsx';
import Point from './Basics/Point.js';

export default class App extends React.Component {

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.createPointArray();
    this.redrawScreen();
  }

  onAllPoints(fn) {
    var i = 0, len = this.points.length;

    for (; i < len; i++) {
      fn(this.points[i]);
    }
  }

  createPointArray() {
    var len = 100, i = 0;

    this.points = [];

    for (; i < len; i++) {
      this.points.push(new Point(
        (Math.random() < 0.5 ? -1 : 1) * (Math.random()), 
        (Math.random() < 0.5 ? -1 : 1) * (Math.random()), 
        (Math.random() < 0.5 ? -1 : 1) * (Math.random())));
    }
  }

  redrawScreen() {
    this.canvas.clear();
    this.canvas.draw3DPoints(this.points);

    // this.onAllPoints(function drawPoint(point) {
    //   point.drawPoint(this.canvas);
    // }.bind(this));    
  }

  zoomOut() {
    var origin = new Point(0,0,0);

    this.onAllPoints(function scaleDownByHalf(point) {
      var tempVector = point.subtractPoint(origin);

      point.setPoint(origin);
      point.addVector(tempVector.scale(0.5,0.5,0.5));
    });
  }

  zoomIn() {
    var origin = new Point(0,0,0);

    this.onAllPoints(function scaleByDouble(point) {
      var tempVector = point.subtractPoint(origin);
      point.setPoint(origin);
      point.addVector(tempVector.scale(2,2,2));
    });
  }

  rotate() {
    var origin = new Point(0,0,0);

    this.onAllPoints(function byFifteenDegrees(point) {
      var tempVector = point.subtractPoint(origin);

      point.setPoint(origin);
      point.addVector(tempVector.rotateYZ(15));   
    });
  }

  handleKeyPressed(key) {

    switch(key) {
      case 'd':
        this.createPointArray();
        this.redrawScreen();
        break;
      case 'a':
        this.zoomOut();
        this.redrawScreen();
        break;
      case 's':
        this.zoomIn();
        this.redrawScreen();
        break;
      case 'r':
        this.rotate();
        this.redrawScreen();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Keyboard
        keyPressed={this.handleKeyPressed.bind(this)}
      ><Canvas 
        ref="canvas"
        /></Keyboard>
    );
  }
}
