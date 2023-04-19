/** Liskov Substitution principle (LSP)
 * 
 * Barbara Liskov
 * 
 * The idea under this principle is that if you have some method which takes some
 * base type, it should also equally be able to take derived type
 * 
 * Liskov Substitution Principle states that objects of a superclass should be
 * replaceable with objects of its subclasses without breaking the application. In
 * other words, what we want is to have the objects of our subclasses behaving the
 * same way as the objects of our superclass.
 * 
 * Let's imagine that first we had a RectangleBad class and then we decided to introduce
 * a new concept called SquareBad, but whenever working with SquareBad, you want to enforce
 * that the square always has the same width and height, so it is going to extends
 * RectangleBad but it is going to have a different constructor.
 * The problem is that id you assume that the square height and width are always the same,
 * you have to enforce it somehow because otherwise what I can do is something like create
 * a new SquareBad which size is 5, log this which give as a nice 5x5 square, next we decided
 * change width to 10, which give us a wrong 10x5 square, strictly speaking it's no longer a
 * square, it is a rectangle but its type is still a square.
 * 
 * How can we fix this?
 * 
 * Well, one really dangerous way of fixing this problem would be to rewrite both rectangle
 * as well as square to use getters and setters instead of just ordinary fields as we are.
 * So we put everything into sort of underscore with and underscore height and then what we would
 * do is we would actually make getters and setters accordingly. So whe we modify the square it
 * always keeps itself as square since the setters sets both width and height, this might seem like
 * really good way of keeping a square as opposed to have the square magically turning into a
 * rectangle while still being a square.
 * 
 * What is the problem?
 * 
 * It is that you can have functions which work with a base class rectangle but it failed completely
 * with a derived class as square.
 * 
 * We essentially broken the useIt function but the function should work well since it takes a
 * a rectangle, then it should be able to take any inheritor of rectangles such as a square
 * and that is the point of LSP
 * 
 * The risk of LSP says that
 * 
 * If you have a function which takes a base class it should be able to take a derived class
 * without breaking the functionality
 * 
 * Sometimes you can introduce a derived class which breaks existing functionality
 * 
 * So inherit Square from rectangle is entirely wrong.
 * 
 * To make a square then maybe there is a factory method that we can make, it is just a possibility
 * 

 class RectangleBad {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  get area() {
    return this.width * this.height
  }

  toString() {
    return `${this.width}x${this.height}`
  }
}

class SquareBad extends RectangleBad{
  constructor(size) {
    super(size, size)
  }
}

const rc1 = new RectangleBad(2,3)
console.log(rc1.toString());

const sq1 = new SquareBad(5)
console.log(sq1.toString())
sq1.width = 10
console.log(sq1.toString())
 */

class Rectangle
{
  constructor(width, height)
  {
    this._width = width;
    this._height = height;
  }

  get width() { return this._width; }
  get height() { return this._height; }

  set width(value) { this._width = value; }
  set height(value) { this._height = value; }

  get area()
  {
    return this._width * this._height;
  }

  toString()
  {
    return `${this._width}×${this._height}`;
  }
}

/*
class Square extends Rectangle
{
  constructor(size)
  {
    super(size, size);
  }

  set width(value)
  {
    this._width = this._height = value;
  }

  set height(value)
  {
    this._width = this._height = value;
  }
}

const rc2 = new Rectangle(2,3)
console.log(rc2.toString());

const sq2 = new Square(5)
console.log(sq2.toString())
sq2.width = 10
console.log(sq2.toString())
*/

let useIt = function(rc)
{
  let width = rc._width;
  const newHeight = 20
  rc.height = newHeight;
  console.log(
    `Expected area of ${width}x${newHeight} ${width*newHeight}, ` +
    `got ${rc.toString()} ${rc.area}`
  );
};

console.log('----')
let rc = new Rectangle(2,3);
useIt(rc);
/*
let sq = new Square(5);
useIt(sq);
*/