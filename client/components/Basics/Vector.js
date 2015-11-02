export default class Vector {
  constructor(x, y, z) {
    this.tuple = [x,y,z];
  }

  addVector(vector) {
    this.tuple[0] += vector.tuple[0];
    this.tuple[1] += vector.tuple[1];
    this.tuple[2] += vector.tuple[2];

    return this;
  }

  subtractVector(vector) {
    this.tuple[0] -= vector.tuple[0];
    this.tuple[1] -= vector.tuple[1];
    this.tuple[2] -= vector.tuple[2];

    return this;
  }

  rotateXY(deg) {
    var radians = this.getRadiansFromDegrees(deg),

        a = [
          Math.cos(radians)*this.tuple[0] - Math.sin(radians)*this.tuple[1] + 0,
          Math.sin(radians)*this.tuple[0] + Math.cos(radians)*this.tuple[1] + 0,
          0 + 0 + this.tuple[2]
        ];

    return new Vector(a[0], a[1], a[2]);
  }

  rotateXZ(deg) {
    var radians = this.getRadiansFromDegrees(deg),

        a = [
          Math.cos(radians)*this.tuple[0] + 0 + Math.sin(radians)*this.tuple[2],
          0 + this.tuple[1] + 0,
          -Math.sin(radians)*this.tuple[0] + 0 + Math.cos(radians)*this.tuple[2]
        ];

    return new Vector(a[0], a[1], a[2]);
  }

  rotateYZ(deg) {
    var radians = this.getRadiansFromDegrees(deg),

        a = [
          this.tuple[0] + 0 + 0,
          0 + Math.cos(radians)*this.tuple[1] - Math.sin(radians)*this.tuple[2],
          0 + Math.sin(radians)*this.tuple[1] + Math.cos(radians)*this.tuple[2]
        ];

    return new Vector(a[0], a[1], a[2]);
  }

  scale(sx, sy, sz) {
    sx *= this.tuple[0];
    sy *= this.tuple[1];
    sz *= this.tuple[2];;

    return new Vector(sx, sy, sz);
  }  

  getRadiansFromDegrees(deg) {
    return (deg * (Math.PI/180));
  }
}