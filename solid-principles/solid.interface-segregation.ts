/** Interface segregation principle (ISP)
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


interface Doc
{
  path: string
}

interface Machine
{
  print(doc: Doc): void
  fax(doc: Doc): void
  scan(doc: Doc): void
}

class Doc implements Doc {
  
}

class MultiFunctionPrinter implements Machine
{
  print(doc: Doc) {
    //
  }

  fax(doc: Doc) {
    //
  }

  scan(doc: Doc) {
    //
  }
}

class NotImplementedError extends Error
{
  constructor(name: string)
  {
    let msg = `${name} is not implemented!`;
    super(msg);
    // maintain proper stack trace
    if ((Error as any).captureStackTrace)
      (Error as any).captureStackTrace(this, NotImplementedError);
    // your custom stuff here :)
  }
}

class OldFashionedPrinter implements Machine
{
  print(doc: Doc) {
    // ok
  }

  fax(doc: Doc) {
    // do nothing
  }

  scan(doc: Doc) {
    // throw new Error('not implemented!');
    throw new NotImplementedError(
      'OldFashionedPrinter.scan')
  }
}

// solution
interface Printer
{
  print(): void
}

interface Scanner
{
  scan(): void
}

export class Photocopier implements Printer, Scanner
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

let printer = new OldFashionedPrinter();
printer.fax(new Doc()); // nothing happens
// printer.scan(new Doc()); // error thrown