export const cars = [
  {
    name: "BMW",
    model: 2002,
    price: 30000000,
    sold: false,
    mileage: 50,
  },
  {
    name: "Benz",
    model: 2028,
    price: 200,
    sold: false,
    mileage: 5,
  },
  {
    name: "Audi",
    model: 2020,
    price: 20000,
    sold: true,
    mileage: 100,
  },
];

// console.log(cars);
// console.log("type of price is " + typeof cars[1].price);
// console.log("type of sold state is " + typeof cars[1].sold);
// console.log("type of name is " + typeof cars[1].name);
// console.log(cars[0].name + " costs $" + cars[0].price);

// for (const car of cars) {
//     if (car.mileage > 50) {
//         console.log(car.name + " mileage is Excellent: " + car.mileage);
//     } else if (car.mileage > 20 && car.mileage <= 50) {
//         console.log("mileage is Good " + car.mileage);
//     } else{
//         console.log("mileage is Poor " + car.mileage);
//     }

//     switch (car.sold) {
//         case true:
//             console.log(car.name + " is sold " + "$" + car.price)
//             break;
//         default:
//             console.log(car.name + " is available " + "$" + car.price)
//             break;
//     }
// }

// const expensiveCar = (car) =>
//   console.log(`${car.name} is Expensive $${car.price}`);

// function availableCars(cars) {
//     for (let i = 0; i < cars.length; i++) {
//             utilityToolKit(cars[i])
//             if (cars[i].price > 5000) {
//                 expensiveCar(cars[i])
//             }
//         }
// }

// availableCars(cars)

// function utilityToolKit(car) {
//     if (!car.sold) {
//         console.log(`${car.name} (${car.model}) - $${car.price} - Available`)
//     }
// }

// // 1. Summary of any single car
export function getCarSummary(car) {
  // return a formatted string
  if (typeof car !== "object" || car === null || Array.isArray(car)) {
    throw new Error(`type of ${car} is not an object`);
  }
  const { name, model, price, sold } = car;
  if (name == null || model == null || price == null || sold == null) {
    throw new Error("All keys are empty");
  }
  return `${name} (${model}) - $${price} - ${sold ? "sold" : "available"}`;
}

// // 2. Filter unsold cars
export function getUnsoldCars(cars) {
  // return an array of only unsold cars
  return cars.filter((car) => car.sold === false);
}

// // 3. Find most expensive
export const getMostExpensive = (cars) => {
  // return the car object with the highest price
  if (cars.length === 0) {
    throw new Error("Empty array");
  }
  return cars.reduce((mostExpensive, currentCar) => {
    return currentCar.price > mostExpensive.price ? currentCar : mostExpensive;
  });
};

export function getTotalUnsoldCars(cars) {
  if (!Array.isArray(cars)) {
    throw new Error("Invalid argument type");
  }
  return cars.filter(car => car.sold !== true).reduce((total, car) => total + car.price, 0);
}

function getNewSummaries(cars) {
  return cars.map((car) => ({ ...car, summary: getCarSummary(car) }));
}

// try {
//   console.log(getCarSummary(cars[0]));
//   console.log(getMostExpensive(cars));
//   console.log(getUnsoldCars(cars));
//   console.log(getTotalUnsoldCars(cars));
//   console.log(getNewSummaries(cars));
// } catch (error) {
//   console.log("Something went wrong: " + error.message);
// }
// console.log("total unsold cars",getTotalUnsoldCars(cars));
// try {
//   console.log(getCarSummary("i am not an object"));
// } catch (error) {
//   console.log("Caught: " + error.message);
// }

// A CarLot class that holds a collection of cars and has methods to: add a car,
// get all unsold cars, get the most expensive car, and get the total value of
// unsold cars

class Car {
  constructor(name, model, price, sold, mileage) {
    this.name = name;
    this.model = model;
    this.price = price;
    this.sold = sold;
    this.mileage = mileage;
  }

  summary() {
    return `${this.name} (${this.model}) - $${this.price} - mileage
    ${this.mileage} - ${this.sold ? "sold" : "available"}`;
  }

  set markSold(state) {
    if (this.sold == true && state == true) throw new Error("Car sold already");
    this.sold = state;
  }
}

class CarLot {
  constructor(cars) {
    if (!Array.isArray(cars)) {
      throw new Error("Invalid argument type");
    }
    this.cars = cars;
  }
  unSoldCars() {
    return this.cars.filter((car) => car.sold === false);
  }
  addCar(data) {
    if (!(data instanceof Car)) throw new Error("Must be a Car Instance");
    return this.cars.push(data);
  }

  mostExpensiveCar() {
    return this.cars.reduce((mostExpensive, currentCar) => {
      return currentCar.price > mostExpensive.price
        ? currentCar
        : mostExpensive;
    });
  }
  totalValueOfUnsoldCars() {
    return this.cars
      .filter((car) => car.sold === false)
      .reduce((total, car) => total + car.price, 0);
  }

  static cheaperCar(car1, car2) {
    if (!(car1 instanceof Car) || !(car2 instanceof Car)) {
      throw new Error("Must be Instance of Car");
    }
    if (car1.price < car2.price) {
      return car1;
    } else {
      return car2;
    }
  }
}

const dealershipGroup = {
  name: "AutoGroup Nigeria",
  lots: [
    {
      name: "Lagos Lot",
      cars: [
        new Car("BMW", 2002, 20000, false, 100),
        new Car("Benz", 2018, 15000, true, 50),
      ],
      subLots: [
        {
          name: "Lagos Annex",
          cars: [new Car("Audi", 2020, 25000, false, 30)],
          subLots: [],
        },
      ],
    },
    {
      name: "Abuja Lot",
      cars: [
        new Car("Toyota", 2019, 10000, false, 80),
        new Car("Honda", 2021, 12000, true, 20),
      ],
      subLots: [],
    },
  ],
};

// const car = new Car("BMW", 2000, 20000, false, 100);
// console.log(car.summary());
// const newCar = new CarLot(cars);
// console.log(
//   newCar.addCar(new Car("Toyota", "1888", 20000, false, 100)),
// );
// console.log(newCar.mostExpensiveCar());

// console.log(newCar.totalValueOfUnsoldCars());
// const car1 = new Car("Toyota", "1888", 20000, false, 100);
// const car2 = new Car("Toyota", "1888", 10000, false, 100);
// console.log(CarLot.cheaperCar(car1, car2));

function linearSearch(cars, name) {
  for (const car of cars) {
    if (car.name === name) {
      return car;
    }
  }
  return null;
}

// console.log(linearSearch(cars, 'Benz'))

function bubbleSort(cars) {
  let result = [...cars];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j].price > result[j + 1].price) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  return result;
}

// console.log(bubbleSort(cars))

function binarySearch(cars, price) {
  let left = 0;
  let right = cars.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (price === cars[mid].price) {
      return cars[mid];
    } else if (cars[mid].price < price) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;
}

// console.log(binarySearch((bubbleSort(cars)), 200));

function recursiveTotalPrice(n) {
  if (n <= 0) return 0;
  if (n > cars.length) return null;

  return cars[n - 1].price + recursiveTotalPrice(n - 1);
}

console.log(recursiveTotalPrice(2));

function searchDealership(lot, carName) {
  // step 1: search cars in this lot
  // hint: use .find() on lot.cars
  const Car = lot.cars.find(car => car.name === carName);
  // if found, return it
  if (Car) return Car;
  // step 2: if not found, loop through lot.subLots
  // call searchDealership on each subLot
  for (const subLot of lot.subLots) {
    const found = searchDealership(subLot, carName);
    if (found) return found;
  }
  // if any of those calls returns something, return it
  // if nothing found anywhere, return null
  return null
}

// call it like this
console.log(searchDealership(dealershipGroup.lots[0], "Audi"));

function infinite(n) {
  return infinite(n + 1); // no base case — what happens?
}

try {
  infinite(0);
} catch (error) {
  console.log(error.message); // what does JavaScript say?
}