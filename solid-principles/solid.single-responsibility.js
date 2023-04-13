/**
 * Single responsibility principle
 * 
 * It tells you that a class should only have a single primary responsibility
 * and as a consequence, it should only have one reason to change. That reason
 * being somehow related to its responsibility.
 * 
 * In other words it's a bad idea to add more than one responsibility to a class
 * 
 * Example
 * 
 * In the code below let's imagine we have some behaviors specific to serialization,
 * specific to the saving and writing idea and let's suppose that instead of doing 2
 * strings ('I cried today.', 'I ate a bug.'), you want to remove those indices before
 * you have the entry serialized or whenever you save. And let's suppose you also want
 * to have some processing when you load them, maybe you save them with the indices,
 * but you load them without the indices, those are the common operations "load" and
 * "loadFromUrl".
 * Now the problem with all of these is that imagine that a journal isn't the only
 * class in your system, imagine that you have 10 different types that you want to
 * serialize to files and load from files and maybe load from somewhere.
 * 
 * Q: How can you have common operations on all of these?
 * A: It's going to be very difficult
 * 
 * So it might make sense to take all of these operations related to persistence,
 * because that's what it is (persistent stuff). You might want to take all of them,
 * remove them from Journal class and just add them to a separate PersistenceManager class
 * that can subsequently be generalized for handling different types of objects, not just
 * journal entries but other things as well.
 * 
 * Anti pattern (shows up which is bad as opposed to good)
 * 
 * GOD OBJECT: is basically this one huge, massive class that has lots and lots of 
 * responsibilities, lots of spaghetti code, very difficult to figure out. So the single
 * responsibility principle is the exact opposite of that, it's the idea you basically
 * have to have just one responsibility and if you need additional responsibilities, then
 * you just make other classes, they don't really cost you anything
 * 
 * Separation of concerns
 * 
 * is what you do when you refactor, for example, let's suppose we find a really complicated
 * algorithm, what you're trying to do is you try to split it up into several different parts
 * which are somehow related. So separation of concerns is the idea to have different concerns
 * like persistance, some sort or post-processing. Then you separate those into separate
 * components to make the entire system easier to figure out, to manage, to refactor as well
 * 
 */

const fs = require('fs');

class Journal
{
  constructor() {
    this.entries = {};
  }

  addEntry(text)
  {
    const c = ++Journal.count;
    const entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index)
  {
    delete this.entries[index];
  }

  toString()
  {
    return Object.values(this.entries).join('\n');
  }

  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}
Journal.count = 0;

class PersistenceManager
{
  preprocess(j)
  {
    //
  }

  saveToFile(journal, filename)
  {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');
console.log(j.toString());

let p =new PersistenceManager();
let filename = `${__dirname.replace('/solid-principles', '')}/temp/journal.txt`;
// let filename = 'c:/temp/journal.txt';
p.saveToFile(j, filename);
