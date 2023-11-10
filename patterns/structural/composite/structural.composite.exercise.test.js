class SingleValue
{
  constructor(value)
  {
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next:() => ({
        value: this,
        done: returned++
      })
    }
  }
}

class ManyValues
{
    constructor() {
      this.values = [];
    }

    push(value) {
      this.values.push(new SingleValue(value));
    }

    [Symbol.iterator]() {
      let index = 0;
      const count = this.values.length;
      return {
        next:() => ({
          value: this.values[index],
          done: index++ === count
        })
      }
    }
}

let sum = function(containers)
{
  let result = 0
  containers.forEach((container) => {
    for (let c of container) {
      result += c.value
    }
  });

  return result;
};

describe('composite', function()
{
  it('should sum up different objects', function()
  {
    let singleValue = new SingleValue(11);
    let otherValues = new ManyValues();
    otherValues.push(22);
    otherValues.push(33);
    expect(sum([singleValue, otherValues])).toEqual(66);
  });
});