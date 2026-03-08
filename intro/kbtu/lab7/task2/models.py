class Animal:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color
    def eat(self):
        return self.name + " is eating."
    def sleep(self):
        return self.name + " is sleeping."
    def speak(self):
        return self.name + " makes a sound."
    def __str__(self):
        return "Animal: " + self.name + ", Age: " + str(self.age) + ", Color: " + self.color

class Dog(Animal):
    def __init__(self, name, age, color, breed):
        super().__init__(name, age, color)
        self.breed = breed
    def speak(self):
        return self.name + " says: Woof woof!"
    def fetch(self):
        return self.name + " is fetching the ball."
    def __str__(self):
        return "Dog: " + self.name + ", Age: " + str(self.age) + ", Color: " + self.color + ", Breed: " + self.breed


class Cat(Animal):
    def __init__(self, name, age, color, indoor):
        super().__init__(name, age, color)
        self.indoor = indoor
    def speak(self):
        return self.name + " says: Meow!"
    def climb(self):
        return self.name + " is climbing the tree."
    def __str__(self):
        return "Cat: " + self.name + ", Age: " + str(self.age) + ", Color: " + self.color + ", Indoor: " + str(self.indoor)