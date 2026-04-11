// Your Task
// Build a car dealership notification and pricing system — different from my examples. It must use all four patterns:

// Singleton for a DealershipConfig that stores dealership name, location, and currency — only one config should ever exist
// Factory for creating different vehicle types — the caller just says what type they want
// Observer for dealership events — when a car is added or sold, multiple listeners react independently (e.g. log it, update a count, send a "notification")
// Strategy for pricing — the same car can be priced differently depending on the strategy applied (e.g. discounted, taxed, premium)

// All four must work together in a final demo that creates vehicles, configures the dealership, reacts to events, and prices a vehicle three different ways.

class Car {
  constructor(name, price) {
    this.type = "car";
    this.name = name;
    this.price = price;
  }
}
class Truck {
  constructor(name, price) {
    this.type = "truck";
    this.name = name;
    this.price = price;
  }
}

class Motorcycle {
  constructor(name, price) {
    this.type = "motorcycle";
    this.name = name;
    this.price = price;
  }
}

class DealershipConfig {
  static #instance = null;
  constructor(name, location, currency) {
    if (DealershipConfig.#instance) return DealershipConfig.#instance;
    this.name = name;
    this.location = location;
    this.currency = currency;
    DealershipConfig.#instance = this;
  }
  static getInstance(name, location, currency) {
    return new DealershipConfig(name, location, currency);
  }
}

class VehicleFactory {
  static create(type, name, price) {
    switch (type) {
      case "car":
        return new Car(name, price);
      case "truck":
        return new Truck(name, price);
      case "motorcycle":
        return new Motorcycle(name, price);
      default:
        throw new Error("Invalid Vehicle type ", type);
    }
  }
}

class EventEmitter {
  #listener = {}
  on(event, callback){
    if(!this.#listener[event]) this.#listener[event] = []
    this.#listener[event].push(callback)
  }
  emit(event, data){
    (this.#listener[event] || []).forEach( cb => cb(data));
  }
  off(event, callback){
    this.#listener[event] = (this.#listener || []).filter(cb => cb !== callback)
  }
}

const withDiscount = (price) => price * 0.8;
const withTax = (price) => price * 1.075;
const withPremium = (price) => price * 1.2;

class PriceCalculator{
  constructor(strategy){
    this.strategy = strategy
  }
  calculate(price){
    return this.strategy(price)
  }
}

const config = DealershipConfig.getInstance("Automobiles", "USA", "USD")
const configb = DealershipConfig.getInstance("Automobiles", "Canada", "CAD");
console.log(config === configb)

const car = VehicleFactory.create('car', "civic", 2000)
const truck = VehicleFactory.create("truck", "CAT", 5000);
const motorcycle = VehicleFactory.create("motorcycle", "civic", 2000);

const emitter = new EventEmitter()

emitter.on('soldCar', (order) => console.log(`[LOGS]: order place for ${order.name} - $${order.price}`))
emitter.on("soldCar", (order) =>
  console.log(`[INFO]: order place for ${order.name} shipped to ${config.location}`),
);


const calc = new PriceCalculator(withDiscount)
console.log(calc.calculate(car.price))
emitter.emit('soldCar', car)