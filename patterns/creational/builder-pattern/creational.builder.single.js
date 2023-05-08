/**
 * Builder essentially is a separate component that helps you to build tags on top of tags
 * 
 * static create method
 * 
 * - Indicates to the users they should not be working with the Tag directly
 * - This introduce coupling, we have a bidirectional dependency between builder and object that builds
 * - It is a slight violation of OCP because if you imagine another builder being constructed, you may
 *   want to make another create method that does something different
 */

class Tag
{
  static get indentSize() { return 2; }

  constructor(name='', text='')
  {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent)
  {
    let html = [];
    let i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0)
    {
      html.push(' '.repeat(Tag.indentSize * (indent+1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children)
      html.push(child.toStringImpl(indent+1));

    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString()
  {
    return this.toStringImpl(0);
  }

  static create(name)
  {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder
{
  constructor(rootName)
  {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent
  addChild(childName, childText)
  {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent
  addChildFluent(childName, childText)
  {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString()
  {
    return this.root.toString();
  }

  clear()
  {
    this.root = new Tag(this.rootName);
  }

  build()
  {
    return this.root;
  }
}

// just a single paragraph using string concatenation
/*
const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html.join(''));
*/
// a list with 2 words in it
const words = ['hello', 'world'];
/*
html = [];
html.push('<ul>\n');
for (let word of words)
  html.push(`  <li>${word}</li>\n`);
html.push('</ul>');
console.log(html.join(''));
*/

// ordinary non-fluent builder

//let builder = new HtmlBuilder('ul');
let builder = Tag.create('ul');
/*
for (let word of words)
  builder.addChild('li', word);
//console.log(builder.toString());
let tag = builder.build();
console.log(tag.toString());
*/
// fluent builder
// /*
builder.clear();
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'abc')
  .addChildFluent('li', 'baz');
console.log(builder.toString());
// */