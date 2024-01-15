class Bird
{
  constructor(age=0)
  {
    this.age = age;
  }

  fly()
  {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard
{
  constructor(age=0)
  {
    this.age = age;
  }

  crawl()
  {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon
{
  constructor(age=0)
  {
    this.bird = new Bird(age);
    this.lizard = new Lizard(age);
  }

  set age(age) {
    this.bird.age = age;
    this.lizard.age = age;
  }

  fly() {
    return this.bird.fly();
  }

  crawl() {
    return this.lizard.crawl();
  }
}