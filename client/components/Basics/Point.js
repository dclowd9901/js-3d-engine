import Vector from './Vector';

export default class Point {

  constructor(x, y, z) {
    this.tuple = [x,y,z];
  }

  addVector(vector) {
    this.tuple[0] += vector.tuple[0];
    this.tuple[1] += vector.tuple[1];
    this.tuple[2] += vector.tuple[2];

    return this
  }
  
  subtractVector(vector) {
    this.tuple[0] -= vector.tuple[0];
    this.tuple[1] -= vector.tuple[1];
    this.tuple[2] -= vector.tuple[2];

    return this;
  }

  subtractPoint(point) {
    var x = this.tuple[0] - point.tuple[0],
        y = this.tuple[1] - point.tuple[1],
        z = this.tuple[2] - point.tuple[2];

    return new Vector(x,y,z); 
  }

  setPoint(point) {
    this.tuple[0] = point.tuple[0];
    this.tuple[1] = point.tuple[1];
    this.tuple[2] = point.tuple[2];
  }

  //later this will call a function from a graphics API, but for now
  //this should just be printing the points coordinates to the screen
  drawPoint() {
    console.log(this.tuple);
  }
}