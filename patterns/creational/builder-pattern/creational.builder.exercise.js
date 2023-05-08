class Class {
  constructor(name) {
      this.name = name
      this.properties = []
      this.indent = ' '.repeat(2)
  }

  addConstructor() {
    if (this.properties.length > 0) {
      return `${this.indent}constructor(${this.properties.join(', ')}) {` +
      this.properties.map(p => `\n${this.indent + this.indent}this.${p} = ${p};`).join('') +
      `\n${this.indent}}`
    }
    return ''
  }

  addClosingStatement() {
    if (this.properties.length > 0) {
      return `\n}`
    }
    return '}'
  }
  
  toString() {
    const constructor = this.addConstructor()
    return `class ${this.name} {\n` +
    constructor +
    this.addClosingStatement()
  }
}

class CodeBuilder
{
  constructor(className)
  {
    this.root = new Class(className)
  }

  addField(name)
  {
      this.root.properties.push(name)
      return this;
  }

  toString()
  {
      return this.root.toString()
  }
}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());