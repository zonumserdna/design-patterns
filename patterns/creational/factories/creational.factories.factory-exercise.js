class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static get factory() {
        return new PersonFactory()
    }
}

class PersonFactory {
    static id = 0
    createPerson(name) {
        const person = new Person(PersonFactory.id, name)
        PersonFactory.id += 1
        return person
    }
}

const p1 = Person.factory.createPerson('John')
const p2 = Person.factory.createPerson('Jane')

console.log(p1, p2)