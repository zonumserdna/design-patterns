/**
 * Instead of using a property as common (mapping into a field), use it as an
   instance of a class and do whatever you need when setting the value
 */
class Property
{
  constructor(value, name='')
  {
    this._value = value;
    this.name = name;
  }

  get value() { return this._value; }
  set value(newValue)
  {
    if (this._value === newValue)
      return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature
{
  constructor()
  {
    this._agility = new Property(10, 'agility');
  }

  get agility() { return this._agility.value; }
  set agility(value) {
    this._agility.value = value;
  }
}

let c = new Creature();
c.agility = 12;
c.agility = 13;
c.agility = 13;

/**
 * librería externa con cierta lógica externa pero no modificable
 * 
 * añado una lógica propia a través de una clase con la misma interfaz de la librería que me ayude a hacer algo
 * 
 * GOF Ganf of Four
 * 
 * Essence of Software Engineering, The: Applying the SEMAT Kernel: Applying the SEMAT Kernel
 */