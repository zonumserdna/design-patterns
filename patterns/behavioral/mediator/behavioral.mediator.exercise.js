/**
Our system has any number of instances of Participant  classes. Each Participant has a value integer attribute, initially zero.

A participant can say()  a particular value, which is broadcast to all other participants. At this point in time, every other participant is obliged to increase their value  by the value being broadcast.

Example:

Two participants start with values 0 and 0 respectively

Participant 1 broadcasts the value 3. We now have Participant 1 value = 0, Participant 2 value = 3

Participant 2 broadcasts the value 2. We now have Participant 1 value = 2, Participant 2 value = 3
 */

class Event
{
  constructor()
  {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler)
  {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx)
  {
    this.handlers.delete(idx);
  }

  fire(sender, args)
  {
    this.handlers.forEach(function (v, k)
    {
      v(sender, args);
    });
  }
}

class Mediator
{
  constructor()
  {
    this.alert = new Event();
  }

  broadcast(sender, n)
  {
    this.alert.fire(sender, n);
  }
}

class Participant
{
  constructor(mediator)
  {
    this.mediator = mediator;
    this.value = 0;
    mediator.alert.subscribe(
      this.alert.bind(this)
    );
  }

  alert(sender, n)
  {
    if (sender !== this)
      this.value += n;
  }

  say(n)
  {
    this.mediator.broadcast(this, n);
  }
}

describe('mediator', function()
{
  it('should handle number alerts', function()
  {
    let mediator = new Mediator();
    let p1 = new Participant(mediator);
    let p2 = new Participant(mediator);

    expect(p1.value).toEqual(0);
    expect(p2.value).toEqual(0);

    p1.say(2);

    expect(p1.value).toEqual(0);
    expect(p2.value).toEqual(2);

    p2.say(4);

    expect(p1.value).toEqual(4);
    expect(p2.value).toEqual(2);
  });
});