/** Open closed principle (OCP)
 * 
 * Essentially the open closed principle states that classes are open for extension but
 * closed for modification. The whole idea of this principle is once a class is defined,
 * once is tested, once is put it into production you don't modify that class anymore.
 * Classes are opened for extension but closed for modification meaning that you never
 * jump to a class and start to modify it unless you absolutely have to, for example if
 * there is a bug in there. Modify a class is not a good idea, other people may use
 * the class and when it is modified may mean a breaking change
 * 
 * Modification example
 * 
 * Initially we had a ProductFilter that filtered by color, now Let's imagine
 * there is a boss that says now I want to filter by size then we modify the ProductFilter
 * class by adding a filterBySize method. After some months the boss wants to add a filter
 * by size an color :( 
 * 
 * The class ProductFilter that have already been tested (qc, unit, e2e etc.), might have 
 * already been deployed somewhere was modified, changes were made to it. This is considered
 * not as good as actually extension is
 * 
 * By extension we mean inheritance, a class inherits from another class and automatically
 * acquires some of its fields
 * 
 * State space explosion
 * 
 * It means that this entire approach doesn't work to infinity meaning that every time
 * business wants to add a feature we will need to modify a class, in this example the 
 * ProductFilter class.
 * 
 * Imagine that instead of having size and color, you have 3 criteria (price for example) 
 * and you want to filter combining those using && or || operations. There is no way we're going
 * to write 7 different methods for actually performing this kind of filtering, it's not
 * practical, you have to have a different kind of architecture for this kind of architecture
 * 
 * In the example below we applied the specification pattern, this will take us away from this
 * approach of exploding numbers of methods, and it's going to allow us to write something which
 * is very modular and very easy to work with
 * 
 * The idea is that whenever you want to have a particular filtering criteria, you specify a
 * separate class which defines that sort of filtering and that class is called specification.
 * 
 * In the example below was created ColorSpecification and SizeSpecification, you might think it
 * is a bit of an overkill, this is too much perhaps for us to kind of construct. But the consequence
 * is that now every single filter is untied from another. So that the ColorSpecification is not related
 * to SizeSpecification meaning that if you need a new specification you don't modify any existing 
 * class you just make a new class, which also has a constructor, which takes some criteria and has
 * the isSatisfied method.
 * 
 * This approach is better because it is a lot more flexible
 * 
 * If we need filter products using more than one criteria we build combinators like AndSpecification
 */

/** Summary 
 * * States that classes are open for extension but closed for modification
 * * A tested production class should not be modified anymore
 * * State space explosion
*/
const Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

const Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
  huge: 'huge'
});

class Product
{
  constructor(name, color, size)
  {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter
{
  filterByColor(products, color)
  {
    return products.filter(p => p.color === color);
  }

  // filterBySize(products, size)
  // {
  //   return products.filter(p => p.size === size);
  // }

  // filterBySizeAndColor(products, size, color)
  // {
  //   return products.filter(p =>
  //     p.size === size && p.color === color);
  // }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree  = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green))
  console.log(` * ${p.name} is green`);

// ↑↑↑ BEFORE
/*
// ↓↓↓ AFTER

// general interface for a specification
class ColorSpecification
{
  constructor(color)
  {
    this.color = color;
  }

  isSatisfied(item)
  {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size)
  {
    this.size = size;
  }

  isSatisfied(item)
  {
    return item.size === this.size;
  }
}

class BetterFilter
{
  filter(items, spec)
  {
    return items.filter(x => spec.isSatisfied(x));
  }
}

// specification combinator
class AndSpecification
{
  constructor(...specs)
  {
    this.specs = specs;
  }

  isSatisfied(item)
  {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products,
  new ColorSpecification(Color.green)))
{
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of bf.filter(products,
  new SizeSpecification(Size.large)))
{
  console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, spec))
  console.log(` * ${p.name} is large and green`);
*/