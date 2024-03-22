/*

Memento Coding Exercise
A TokenMachine  is in charge of keeping tokens. Each Token  is a reference type with a single numeric value. The machine supports adding tokens and, when it does, it returns a memento representing the state of that system at that given time.

You are asked to fill in the gaps and implement the Memento design pattern for this scenario. Pay close attention to the situation where a token is fed in as a reference and its value is subsequently changed on that reference - you still need to return the correct system snapshot!

*/

class Token
{
  constructor(value=0)
  {
    this.value = value;
  }
}

class Memento
{
  constructor()
  {
    this.tokens = [];
  }
}

class TokenMachine
{
  constructor()
  {
    this.tokens = [];
  }

  addTokenValue(value)
  {
    return this.addToken(new Token(value));
  }

  addToken(token)
  {
    this.tokens.push(token);
    let m = new Memento();
    m.tokens = this.tokens.map(t => new Token(t.value));
    return m;
  }

  revert(m)
  {
    this.tokens = m.tokens.map(t => new Token(t.value));
  }
}

describe('memento', function()
{
  it('single token test', function()
  {
    let tm = new TokenMachine();
    let m = tm.addTokenValue(123);
    tm.addTokenValue(456);
    tm.revert(m);
    expect(tm.tokens.length).toEqual(1);
    expect(tm.tokens[0].value).toEqual(123);
  });

  it('two token test', function() {
    let tm = new TokenMachine();
    tm.addTokenValue(1);
    let m = tm.addTokenValue(2);
    tm.addTokenValue(3);
    tm.revert(m);
    expect(tm.tokens.length).toEqual(2);
    expect(tm.tokens[0].value).toEqual(1);
    expect(tm.tokens[1].value).toEqual(2);
  });

  it('fiddle token test', function()
  {
    let tm = new TokenMachine();
    console.log('made a token with value 111 and kept a reference');
    let token = new Token(111);
    console.log('added this token to the list');
    tm.addToken(token);
    let m = tm.addTokenValue(222);
    console.log('changed this token\'s value to 333 :)');
    token.value = 333;
    tm.revert(m);

    expect(tm.tokens.length).toEqual(2);
    expect(tm.tokens[0].value).toEqual(111);
  });
});