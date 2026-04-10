// Your Task
// Build a car dealership notification and pricing system — different from my examples. It must use all four patterns:

// Singleton for a DealershipConfig that stores dealership name, location, and currency — only one config should ever exist
// Factory for creating different vehicle types — the caller just says what type they want
// Observer for dealership events — when a car is added or sold, multiple listeners react independently (e.g. log it, update a count, send a "notification")
// Strategy for pricing — the same car can be priced differently depending on the strategy applied (e.g. discounted, taxed, premium)

// All four must work together in a final demo that creates vehicles, configures the dealership, reacts to events, and prices a vehicle three different ways.

import { Car, Truck, Motorcycle } from "advanceClass";

class DealershipConfig {
  static #instance = null;
  constructor(name, location, currency) {
    if (DealershipConfig.#instance) return DealershipConfig.#instance;
    DealershipConfig.#instance = this;
    this.name = name;
    this.location = location;
    this.currency = currency;
  }
}

class VehicleTypes {
  static getVehicle(type) {
    switch (type) {
      case "car":
        return new Car();
      case "Truck":
        return new Truck();
      case "Motorcycle":
        return new Motorcycle();
      default:
        throw new Error("Invalid Vehicle type");
    }
  }
}


class DealershipEvent {
    constructor(parameters) {
        
    }
}