import Database from "better-sqlite3";
const db = new Database("cars.db");

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model INTEGER,
    price REAL,
    sold INTEGER DEFAULT 0,
    mileage INTEGER
  )
`);

// Insert
function addCar(name, model, price, mileage) {
  if (!name || !model || !price || !mileage) {
    throw new Error("All fields are required");
  }
  try {
    const newCar = db
      .prepare(
        `
      INSERT INTO cars (name, model, price, mileage)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(name, model, price, mileage);
    return newCar;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add new Car to db");
  }
}

console.log(addCar("BMW", 2002, 20000, 100));

// Query
function getAllCars() {
  try {
    const cars = db.prepare("SELECT * FROM cars").all();
    return cars;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get all cars from db");
  }
}

console.log(getAllCars());

// Query one
function getUnsoldCars(){
    try {
        const unSoldCars = db.prepare("SELECT * FROM cars WHERE sold = 0").all();
        return unSoldCars
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get all unsold cars")
    }
}

console.log(getUnsoldCars())

// Update
function markAsSold(name) {
  if (!name) {
    throw new Error("name field required");
  }
  try {
    const car = db.prepare("SELECT * FROM cars WHERE name = ?").get(name);
    if (!car) {
        throw new Error(`${name} is not Found`);
    }
    const sold = db.prepare("UPDATE cars SET sold = 1 WHERE name = ?").run(name);
    return sold
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update car status");
  }
}

console.log(markAsSold('BMW'))

// Delete
function deleteSoldCars(){
    try {
        const result = db.prepare("DELETE FROM cars WHERE sold = 1").run();
        return `${result.changes} car(s) deleted`;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete all sold cars");
    }
}

deleteSoldCars()