'use strict';

// import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
// import IndexComponent from 'components/Index/IndexComponent.jsx';

//React.render(<IndexComponent items={[1,2,3]} />, document.body);

// import Point from './components/Basics/Point';
// import Vector from './components/Basics/Vector';

// var point1 = new Point(1,2,1);
// var point2 = new Point(0,4,4);
// var vector1 = new Vector(2,0,0);
// var vector2;

// point1.drawPoint(); // should display (1,2,1)
// point2.drawPoint(); // should display (0,4,4)

// vector2 = point1.subtractPoint(point2);
// vector1 = vector1.addVector(vector2);

// point1.addVector(vector1);
// point1.drawPoint(); // should display (4,0,-2)

// point2.subtractVector(vector2);
// point2.drawPoint(); // should display (-1,6,7)
// 

import App from './components/App.jsx';

ReactDOM.render(<App />, document.body);