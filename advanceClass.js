class Vehicle {
  #speed = 100;
  #fuelLevel = 100;
  constructor(amount) {
    if (new.target === Vehicle) {
      throw new Error("Vehicle is abstract — cannot instantiate directly");
    }
    this.amount = amount;
  }

  move() {
    throw new Error("move() must be implemented by subclass");
  }
  refuel(amount) {
    if (amount <= 0) throw new Error("Invalid fuel amount");

    this.#fuelLevel = Math.min(100, this.#fuelLevel + amount);
  }
  getFuel() {
    return this.#fuelLevel;
  }
}

const Trackable = (Base) =>
  class extends Base {
    #location = { lat: 0, lng: 0 };

    updateLocation(lat, lng) {
      this.#location = { lat, lng };
    }

    getLocation() {
      return this.#location;
    }
  };

class Car extends Trackable(Vehicle) {
  constructor(type, mileage) {
    super();
    this.type = type;
    this.mileage = mileage;
  }

  move() {
    return `${this.type} car driving with ${this.mileage} mileage`;
  }
}

class Truck extends Trackable(Vehicle) {
  constructor(name, payloadCapacity) {
    super();
    this.name = name;
    this.payloadCapacity = payloadCapacity;
  }

  move() {
    return `${this.name} truck carrying ${this.payloadCapacity}kg`;
  }
}

class Motorcycle extends Vehicle {
  constructor(engineCC) {
    super();
    this.engineCC = engineCC;
  }

  move() {
    return `Motorcycle with ${this.engineCC}cc zooming`;
  }
}

class Fleet {
  constructor() {
    this.vehicles = [];
  }

  add(vehicle) {
    this.vehicles.push(vehicle);
  }

  getByType(type) {
    return this.vehicles.filter((v) => v instanceof type);
  }

  totalFuel() {
    return this.vehicles.reduce((sum, v) => sum + v.getFuel(), 0);
  }

  refuelAll(amount) {
    this.vehicles.forEach((v) => v.refuel(amount));
  }
}

const fleet = new Fleet();

fleet.add(new Car("Sedan", 20));
fleet.add(new Truck("CAT", 1000));
fleet.add(new Motorcycle(600));

fleet.vehicles.forEach((v) => console.log(v.move()));
