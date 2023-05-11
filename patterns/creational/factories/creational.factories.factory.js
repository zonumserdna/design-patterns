/**
 * Some problems with class Point solution
 *  - Argument names (a, b) don't really tell what is expected to be provided, x or y coordinate,
 *    rho or theta
 *  - What happen if you want to add a third coordinate system to initialize, like spherical coordinates.
 *    It means a violation of the OCP because we need to modify the CoordinateSystem enum and Point class
 *  - We will prevent this by using factory methods
 * 
 * Factory method (FM)
 * 
 * It is quite simply a method which allows us to create an object, and the great thing about FM is it doesn't
 * have to be called constructor, it can be called virtually anything you want
 * It is quite often  a static method for creating objects, it is very explicit about the naming of the method
 * and the parameters
 * Other benefits: We don't have to return a Point directly from the FM, obviously which is returned has to be 
 * related to the Point, but we can return something special like a proxy to a point or an inheritor of Point,
 * so we are not restricted by type, it can return undefined if it is required too
 * 
 * Factory
 * 
 * Separation of concerns or the SRP
 * If we have this separate responsibility of creating objects using a factory and the factory might have no
 * methods inside that are doing some sort of calculations, or storing etc. It might make sense to follow the
 * single responsibility principle and take them out of the object and put them into a separate class
 * 
 * It is just a separate class or component which responsibility is to create objects of a particular type
 * giving a kind of flexibility, for example: if we also have a three dimensional points it's really up to you
 * whether you want like a point 2D factory or a point 3D factory or if you want a single factory which creates
 * 2 types of objects.
 * 
 * We have to use common sense!
 * 
 * Note: It is not required that a factory has to have a 1:1 correspondence with the object, it is flexible
 * 
 * It is really up to you how to expose the factories, below we can see 2 examples
 * - PointFactory newPolarPoint is exposed as a static
 * - PointFactory newCartesianPoint is a public method that can be used through the PointFactory instance
 *   exposed through the Point factory getter. This getter can suggest to the user that they should not be
 *   using the constructor but he should be using a factory instead. This introduces a bit of coupling because
 *   the Factory and the object are coupled together and it breaks the OCP but it gives you the benefit of a
 *   nicer API
 */

CoordinateSystem = {
  CARTESIAN : 0,
  POLAR : 1
};

class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  // constructor(a, b, cs=CoordinateSystem.CARTESIAN)
  // {
  //   switch (cs)
  //   {
  //     case CoordinateSystem.CARTESIAN:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.POLAR:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }
  //
  //   // steps to add a new system
  //   // 1. augment CoordinateSystem
  //   // 2. change ctor
  // }

  // FM 1
  static newCartesianPoint(x, y)
  {
    return new Point(x, y);
  }

  // FM 2
  static newPolarPoint(rho, theta)
  {
    return new Point(rho*Math.cos(theta), rho*Math.sin(theta));
  }

  static get factory()
  {
    return new PointFactory();
  }
}

// Factory
class PointFactory
{
  // not necessarily static
  newCartesianPoint(x, y)
  {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta)
  {
    return new Point(rho*Math.cos(theta), rho*Math.sin(theta));
  }
}
/*
let p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
console.log(p1);
*/

// Factory method
let p2 = Point.newPolarPoint(1, Math.PI/2);
console.log(p2);

// Point → PointFactory
let p3 = PointFactory.newPolarPoint(5, Math.PI/2);
console.log(p3);

// this line will not work if newCartesianPoint is static!
let p4 = Point.factory.newCartesianPoint(2, 3);
console.log(p4);