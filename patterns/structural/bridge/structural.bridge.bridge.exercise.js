class Shape
{
  constructor(renderer, name)
  {
    this.renderer = renderer;
    this.name = name;
  }

  toString() {
    return `Drawing ${this.name} as ${this.renderer.toString()}`;
  }
}

class Triangle extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'triangle');
  }
}

class Square extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'square');
  }
}

class Renderer {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return this.type || '<renderer>';
  }
}

class VectorRenderer extends Renderer
{
  constructor() {
    super('lines')
  }
}

class RasterRenderer extends Renderer
{
  constructor() {
    super('pixels')
  }
}

console.log(new Triangle(new VectorRenderer()).toString());
console.log(new Square(new VectorRenderer()).toString());

console.log(new Triangle(new RasterRenderer()).toString());
console.log(new Square(new RasterRenderer()).toString());