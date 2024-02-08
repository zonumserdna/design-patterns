/**
 * A unique kind of proxy that shows that you can have a resource even though in reality you may not have
 * Masquerades as a real object while not exactly being real
 * In the example below, proxy allows making the work exactly until the point it is required, it means something
 * masquerade as present whereas it might not really be there until the moment it is needed.
 */
class Image
{
  constructor(url)
  {
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  draw()
  {
    console.log(`Drawing image ${this.url}`);
  }
}

class LazyImage
{
  constructor(url)
  {
    this.url = url;
  }

  draw()
  {
    if (!this.image)
      this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img)
{
  console.log('About to draw the image');
  img.draw();
  console.log('Done drawing the image');
}

// let img = new Image('http://pokemon.com/pikachu.png');
let img = new LazyImage('http://pokemon.com/pikachu.png');
// drawImage(img);