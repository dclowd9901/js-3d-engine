import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class Canvas extends React.Component {

  componentDidMount() {
    this.canvasEl = ReactDOM.findDOMNode(this.refs.canvas);
    this.ctx3D = this.canvasEl.getContext('webgl');

    this.ctx3D.viewport(0,0, this.canvasEl.width, this.canvasEl.height);
    this.ctx3D.clearColor(0.9, 0.9, 0.9, 1);

    var vs = this.compileVertexShader();
    var fs = this.compileFragmentShader();
    this.createProgram([vs, fs]);
  }

  clear() {
    this.ctx3D.clear(this.ctx3D.COLOR_BUFFER_BIT);
  }

  compileVertexShader() {
    var v = document.getElementById("vertex").firstChild.nodeValue;
    var vs = this.ctx3D.createShader(this.ctx3D.VERTEX_SHADER);
    this.ctx3D.shaderSource(vs, v);
    this.ctx3D.compileShader(vs);

     // Check for any compilation error
    if (!this.ctx3D.getShaderParameter(vs, this.ctx3D.COMPILE_STATUS)) {
        console.log(this.ctx3D.getShaderInfoLog(vs));
        return null;
    }

    return vs;
  }

  compileFragmentShader() {
    var f = document.getElementById("fragment").firstChild.nodeValue;
    var fs = this.ctx3D.createShader(this.ctx3D.FRAGMENT_SHADER);
    this.ctx3D.shaderSource(fs, f);
    this.ctx3D.compileShader(fs);

    if (!this.ctx3D.getShaderParameter(fs, this.ctx3D.COMPILE_STATUS))
        console.log(this.ctx3D.getShaderInfoLog(fs)); 

    return fs;
  }

  createProgram(shaders) {
    this.program = this.ctx3D.createProgram();
    var i = 0, len = shaders.length;

    for (; i < len; i++) {
      this.ctx3D.attachShader(this.program, shaders[i]);
    }

    this.ctx3D.linkProgram(this.program);

    if (!this.ctx3D.getProgramParameter(this.program, this.ctx3D.LINK_STATUS)) {
      console.log(this.ctx3D.getProgramInfoLog(this.program));    
    }
  }

  flattenedPoints(points) {
    var ret = [];

    _.each(points, function(point) {
      ret.push(point.tuple);
    });

    return [].concat.apply([], ret);
  }

  draw3DPoints(points) {
    var vbuffer = this.ctx3D.createBuffer(),
        f32points = new Float32Array(this.flattenedPoints(points));

    console.log(f32points);
    console.log(points);

    this.ctx3D.bindBuffer(this.ctx3D.ARRAY_BUFFER, vbuffer);
    this.ctx3D.bufferData(this.ctx3D.ARRAY_BUFFER, f32points, this.ctx3D.STATIC_DRAW);

    this.ctx3D.useProgram(this.program);
     
    this.program.uColor = this.ctx3D.getUniformLocation(this.program, "uColor");
    this.ctx3D.uniform4fv(this.program.uColor, [0.0, 0.0, 0.0, 1.0]); 

    this.program.aVertexPosition = this.ctx3D.getAttribLocation(this.program, "aVertexPosition");
    this.ctx3D.enableVertexAttribArray(this.program.aVertexPosition);
    this.ctx3D.vertexAttribPointer(this.program.aVertexPosition, 3, this.ctx3D.FLOAT, false, 0, 0);

    this.ctx3D.drawArrays(this.ctx3D.POINTS, 0, points.length);
  }

  render () {
    return (
      <canvas
        ref="canvas"
        >
      </canvas>);
  }
}