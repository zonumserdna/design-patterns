|----------------------------------------------------------------|
|                              SOLID                             |
|----------------------|-------------|---------------------------|
|      Creational      |  Structural |         Behavioral        |
|----------------------|-------------|---------------------------|
| * Builder            | * Adapter   | * Chain of responsibility |
| * Factories          | * Bridge    | * Command                 |
|   * Abstract Factory | * Composite | * Interpreter             |
|   * Factory Method   | * Decorator | * Iterator                |
| * Prototype          | * Facade    | * Mediator                |
| * Singleton          | * Flyweight | * Memento                 |
|                      | * Proxy     | * Observer                |
|                      |             | * State                   |
|                      |             | * Strategy                |
|                      |             | * Template method         |
|                      |             | * Visitor                 |
|----------------------|-------------|---------------------------|

- Design patterns are common architectural approaches that have been observed in software engineering 
  and were replicated across different languages

- SOLID design principles
    SOLID, Introduced by Robert C. Martin (Uncle bob), are a Set of software design principles of object
    oriented design that are often referenced in design patterns
    - Books (Robert C. Martin)
        - Agile principles, patterns, and practices in C#
        - Agile software development principles, patterns, and practices
    - These design principles are frequently referred to in modern design patterns

    Single responsibility principle
    
        - A class should only have one reason to change
        - Separation of concerns: a system which handle different kinds of concerns it makes sense to put them
          in different classes so that these can be refactored independently, for example, or replaced by
          something else.
          Different classes handling different, independent tasks/problems
    
    Open closed principle

        - Classes should be open for extension but closed for modification
        - The idea here is that if we're coming back into an already written, already tested class and
          modifying things in order to extend functionality, this is probably not the best way to go and
          you should consider using the OOP and inheritance instead of just modifying existing code
    
    Liskov substitution principle
    
        - You should be able to substitute a base type for a subtype
    
    Interface segregation principle

        - Don't put too much into an interface; split into different interfaces
        - YAGNI: You Ain't Going to Need It => meaning that you are not going to need certain
          methods implemented, so why force other people to implement the interface in the first
          place?
        - We don't want the implementor to put lots of stubs and throwing exceptions out of not
          implemented method

    Dependency inversion principle
    
        - High level modules should not depend upon low-level modules; use abstractions
        - Have everything done through abstractions