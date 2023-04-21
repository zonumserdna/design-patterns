/** Dependency inversion principle (DIP)
 * DIP doesn't have anything directly to do with dependency injection. Dependency injection is
 * somewhat a consequence of DIP.
 * 
 * DIP
 * 
 * Basically defines a relationship that you should have between low level modules (like an storage
 * for example) and high level modules
 * 
 * DIP states that high level modules (such as Research) should not directly depend on low level modules
 * (such as Relationships), they should depend on abstractions instead. More specifically, it should not
 * be depending on some sort of data, which should really be private (this.data = []; should be private)
 * it shouldn't be accessible to anyone because it's nobody's business how relationships actually store
 * the data.
 * So, the idea is that you're supposed to be depending on abstractions.
 * 
 * Abstractions
 * 
 * By abstractions we typically mean either abstract classes or interfaces
 * else
 * 
 * Low level module
 * 
 * something that is closed to the metal (close-to-the-metal means database software that works in
 * close proximity to and with knowledge of the actual instruction set and addresses of the hardware
 * system that it is built to run on), in the example below it is defined exactly the way that relationships
 * can be stored because they can be stored in a map, array and all sorts of other different types
 * 
 * High level module
 * 
 * Isn't a module that is concerned with low level thinks like storage. I is concerned with high
 * level stuff like getting the data out, like for example how to do research
 * 
 * The key problem
 * 
 * We can notice that we are using the low level data storage directly in Research
 * (let relations = relationships.data;), what this means is: Imagine we decided that having an array
 * for storing relationships is not a good idea and decided to replace it with a map or some tree
 * structure something more sophisticated, what this means is not only you have to refactor things
 * in Relationships (this.data = [];) but we have also have to refactor things in Research
 * (let relations = relationships.data;) because the high level module depends on the implementation
 * details of the low level module and we really don't want this.
 * 
 * What we can do
 * 
 * Insert some kind of abstraction so that we know the relationships are accessible but you don't
 * access them by going through the storage
 * 
 * Why?
 * We moved the logic to search a relationship from high level module to low level module
 * because the storage itself might change (SRP states that a class should have one reason to change),
 * so if the storage changes we want to stay and just modify that class, not the entire application.
 * Then we implemented the findAllChildrenOf
 */

/** Summary
 * * High level modules (such as Research) should not directly depend on low level modules
 * * Abstractions: either abstract classes or interfaces else
 * * If the storage structure is replaced then high level modules should not change
 */

enum ERelationship {
  parent = 'parent',
  child = 'child',
  sibling = 'sibling'
}

class Person
{
  private name = ''
  constructor(name: string)
  {
    this.name = name;
  }
}

// LOW-LEVEL (STORAGE)
interface RelationshipBrowser
{
  findAllChildrenOf(name: string): Array<any>
}

class Relationships implements RelationshipBrowser
{
  // should be private
  private data: Array<any>
  constructor()
  {
    this.data = [];
  }

  addParentAndChild(parent: Person, child: Person)
  {
    this.data.push({
      from: parent,
      type: ERelationship.parent,
      to: child
    });
    this.data.push({
      from: child,
      type: ERelationship.child,
      to: parent
    });
  }


  findAllChildrenOf(name: string) {
    return this.data.filter(r =>
      r.from.name === name &&
      r.type === ERelationship.parent
    ).map(r => r.to);
  }
}

// HIGH-LEVEL (RESEARCH)

export class Research
{
  /*
  constructor(relationships: Relationships)
  {
    // problem: direct dependence ↓↓↓↓ on storage mechanic
    let relations = relationships.data;
    for (let rel of relations.filter(r =>
      r.from.name === 'John' &&
      r.type === ERelationship.parent
    ))
    {
      console.log(`John has a child named ${rel.to.name}`);
    }
  }
  */
  // /*
  constructor(browser: RelationshipBrowser)
  {
    for (let p of browser.findAllChildrenOf('John'))
    {
      console.log(`John has a child named ${p.name}`);
    }
  }
  // */
}

let dad = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

// low-level module
let rels = new Relationships();
rels.addParentAndChild(dad, child1);
rels.addParentAndChild(dad, child2);

new Research(rels);