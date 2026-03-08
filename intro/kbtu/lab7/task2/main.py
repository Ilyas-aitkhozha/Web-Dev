from models import Animal, Dog, Cat


def main():
    animal1 = Animal("Charlie", 5, "brown")
    dog1 = Dog("Buddy", 3, "black", "Labrador")
    cat1 = Cat("Luna", 2, "white", True)
    animals = [animal1, dog1, cat1]
    for a in animals:
        print(a)
        print(a.eat())
        print(a.sleep())
        print(a.speak())
        print()
    print("child class methods(only unique):")
    print(dog1.fetch())
    print(cat1.climb())
if __name__ == "__main__":
    main()