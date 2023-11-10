/**
 * Implement the isSingleton method which receives a factory function
 */

class SingletonTester
{
  static isSingleton(generator)
  {
    const instance1 = generator()
    const instance2 = generator()
    return instance1 === instance2
  }
}
