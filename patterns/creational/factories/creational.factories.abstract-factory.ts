/**
 * The general idea of the abstract factory design pattern is that you can have a hierarchy of objects
 * and you can have a related hierarchy of types, then you can group the factories and expose them as
 * some sort of list
 * 
 * In the example below, Tea and Coffee are a hierarchy of drinks (HotDrink) and has a corresponding hierarchy
 * of factories (HotDrinkFactory) which are used to manufacture those drinks. Thinking about of tea or coffee
 * factory, it could be a single coffee machine
 */

const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const async = require('async');

interface HotDrink
{
  consume(): void;
}

class Tea implements HotDrink
{
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee implements HotDrink
{
  consume()
  {
    console.log(`This coffee is delicious!`);
  }
}

abstract class HotDrinkFactory
{
  abstract prepare(amount: number): void /* abstract */
}

class CoffeeFactory extends HotDrinkFactory
{
  prepare(amount: number) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

class TeaFactory extends HotDrinkFactory
{
  prepare(amount: number) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

let AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
});

class HotDrinkMachine
{
  factories: any;
  constructor()
  {
    this.factories = {};
    for (let drink in AvailableDrink)
    {
      this.factories[drink] = new (AvailableDrink as any)[drink]();
    }
  }

  makeDrink(type: string)
  {
    switch (type)
    {
      case 'tea':
        return new TeaFactory().prepare(200);
      case 'coffee':
        return new CoffeeFactory().prepare(50);
      default:
        throw new Error(`Don't know how to make ${type}`);
    }
  }

  interact(consumer: any)
  {
    rl.question('Please specify drink and amount ' +
      '(e.g., tea 50): ', (answer: string) => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

let machine = new HotDrinkMachine();
/*
rl.question('which drink? ', function(answer: string)
{
  let drink = machine.makeDrink(answer);
  drink.consume();

  rl.close();
});
*/

// /*
machine.interact(
  function (drink: any) {
    drink.consume();
  }
);
// */