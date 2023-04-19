/**
 * Interface segregation principle
 * 
 * Clients should not be forced to depend on interfaces that they don't use
 * Code should not be forced to depend on methods it does not use
 * 
 * Principle of least surprise
 * 
 * This principle states is that when people use your API, they should not be surprised, they
 * should not be seeing some magic behavior or a lack of behavior, you don't want them to be
 * surprised you want them to get predictable results so that they are happy if they are
 * getting some weird data or some weird behaviors or if they see requirements to call A before
 * they call B and that sort of stuff, that violates this principle
 * 
 * We can just implement an interface and avoid put anything in methods which we doesn't need
 * to be implemented (leave as blank methods) but this violates the principle of least surprise.
 * Leaving fax or scan methods blank in OldFashionedPrinter violates this principle and make
 * people's lives miserable. Even OldFashionedPrinter has that name somebody can try calling fax
 * or scan since them are in its interface and will get no result.
 * 
 * We can just comment fax and thrown a error in OldFashionedPrinter unfortunately it is sill somewhat
 * user unfriendly. And the reason why it is user unfriendly is because by defining the interface Machine
 * to be to full of stuff we don't need, we are forcing the clients to either leave methods blank or throw
 * errors out of those methods and this is where ISP comes in.
 * 
 * ISP states that you have to segregate or split up interfaces into different parts so that people don't
 * implement more than what they needed
 * 
 * Blank typescript project
 * https://javascript.plainenglish.io/how-to-start-a-blank-typescript-project-1d260f7e2aa8
 */


var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor (...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this,(new mixin));
      });
    }
  }
  let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
      })
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Document
{

}

class Machine
{
  constructor()
  {
    if (this.constructor.name === 'Machine')
      throw new Error('Machine is abstract!');
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine
{
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class NotImplementedError extends Error
{
  constructor(name)
  {
    let msg = `${name} is not implemented!`;
    super(msg);
    // maintain proper stack trace
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError);
    // your custom stuff here :)
  }
}

class OldFashionedPrinter extends Machine
{
  print(doc) {
    // ok
  }

  // omitting this is the same as no-op impl

  // fax(doc) {
  //   // do nothing
  // }

  scan(doc) {
    // throw new Error('not implemented!');
    throw new NotImplementedError(
      'OldFashionedPrinter.scan')
  }
}

// solution
class Printer
{
  constructor()
  {
    if (this.constructor.name === 'Printer')
      throw new Error('Printer is abstract!');
  }

  print(){}
}

class Scanner
{
  constructor()
  {
    if (this.constructor.name === 'Scanner')
      throw new Error('Scanner is abstract!');
  }

  scan(){}
}

class Photocopier extends aggregation(Printer, Scanner)
{
  print()
  {
    // IDE won't help you here
  }

  scan()
  {
    //
  }
}

// we don't allow this!
// let m = new Machine();

let printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
// printer.scan(); // error thrown