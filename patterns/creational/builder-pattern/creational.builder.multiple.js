/**
 * - Sometimes it is not enough a single builder to build up an object, sometimes you want to have
 *   different aspects of an object build up using different builders
 * - How do those builders interact with others?
 * - How does the whole thing work?
 * - Sub builders extends ParentBuilder because each sub builder must have the getters declared in
 *   parent so that when builder is used we can use each of them fluently
 * - Getters in parent builder creates sub builders passing the object as parameter to keep
 *   building the same instance of that object
 * - Person is created in constructor(person=new Person()) of PersonBuilder because sub builders
 *   uses super to keep building this instance
 */

class Person
{
  constructor()
  {
    // address info
    this.streetAddress = this.postcode = this.city = '';

    // employment info
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString()
  {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n`
      + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

class PersonBuilder
{
  constructor(person=new Person())
  {
    this.person = person;
  }

  get lives()
  {
    return new PersonAddressBuilder(this.person);
  }

  get works()
  {
    return new PersonJobBuilder(this.person);
  }

  build()
  {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder
{
  constructor(person)
  {
    super(person);
  }

  at(companyName)
  {
    this.person.companyName = companyName;
    return this;
  }

  asA(position)
  {
    this.person.position = position;
    return this;
  }

  earning(annualIncome)
  {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressBuilder extends PersonBuilder
{
  constructor(person)
  {
    super(person);
  }

  at(streetAddress)
  {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode)
  {
    this.person.postcode = postcode;
    return this;
  }

  in(city)
  {
    this.person.city = city;
    return this;
  }
}

let pb = new PersonBuilder();
let person = pb
  .lives.at('123 London Road').in('London').withPostcode('SW12BC')
  .works.at('Fabrikam').asA('Engineer').earning(123000)
  .build();
console.log(person.toString());
