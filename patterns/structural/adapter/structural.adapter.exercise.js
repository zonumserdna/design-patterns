class Square
{
  constructor(side)
  {
    this.side = side;
  }
}

class Rectangle {
    constructor(width, height) {
        this._width = width
        this._height = height
    }
}

class SquareToRectangleAdapter extends Rectangle {
    constructor(square) {
        super();
        this._width = this._height = square.side
    }
}

function area(rectangle)
{
  return rectangle._width * rectangle._height;
}

// build an adapter called SquareToRectangleAdapter
// s.t. we could call
//
// let sq = new Square(123);
// area(new SquareToRectangleAdapter(sq));

let sq = new Square(10);
console.log(area(new SquareToRectangleAdapter(sq)));