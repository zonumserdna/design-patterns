class Sentence
{
  constructor(plainText)
  {
    this.plainText = plainText;
  }

  at(index)
  {
    this.wordFormatter = new WordFormater(index)
    return this.wordFormatter
  }

  toString()
  {
    if (this.wordFormatter && this.wordFormatter.capitalize) {
      const splitted = this.plainText.split(' ')
      splitted[this.wordFormatter.index] = splitted[this.wordFormatter.index].toUpperCase()
      return splitted.join(' ')
    } else {
      return this.plainText
    }
  }
}

class WordFormater {
  constructor(index) {
    this.index = index;
    this.capitalize = false
  }
}

let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString());