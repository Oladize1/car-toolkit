const cars = [
  {
    name: "BMW",
    model: 2002,
    price: 3000,
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
function getCarSummary(car) {
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
function getUnsoldCars(cars) {
  // return an array of only unsold cars
  return cars.filter((car) => car.sold === false);
}

// // 3. Find most expensive
const getMostExpensive = (cars) => {
  // return the car object with the highest price
  if (cars.length === 0) {
    throw new Error("Empty array");
  }
  return cars.reduce((mostExpensive, currentCar) => {
    return currentCar.price > mostExpensive.price ? currentCar : mostExpensive;
  });
};

function getTotalUnsoldCars(cars) {
  if (!Array.isArray(cars)) {
    throw new Error("Invalid argument type");
  }
  return cars.reduce((total, car) => total + car.price, 0);
}

function getNewSummaries(cars) {
  return cars.map((car) => ({ ...car, summary: getCarSummary(car) }));
}

try {
  console.log(getCarSummary(cars[0]));
  console.log(getMostExpensive(cars));
  console.log(getUnsoldCars(cars[0]));
  console.log(getTotalUnsoldCars(cars));
  console.log(getNewSummaries(cars));
} catch (error) {
  console.log("Something went wrong: " + error.message);
}

try {
  console.log(getCarSummary("i am not an object"));
} catch (error) {
  console.log("Caught: " + error.message);
}