import {
  getCarSummary,
  getMostExpensive,
  getUnsoldCars,
  getTotalUnsoldCars,
} from "./index";

const testCars = [
  { name: "BMW", model: 2002, price: 20000, sold: false, mileage: 50 },
  { name: "Benz", model: 2028, price: 200, sold: false, mileage: 5 },
  { name: "Audi", model: 2020, price: 25000, sold: true, mileage: 100 },
];

describe("returns the correct formatted string for a sold and unsold car", () => {
  test("single car summary", () => {
    const car = { name: "BMW", model: 2002, price: 20000, sold: false };
    expect(getCarSummary(car)).toBe("BMW (2002) - $20000 - available");
  });

  test("throws when passed null, a string, or an object missing name", () => {
    const car = { model: 2002, price: 20000, sold: false };
    expect(() => getCarSummary(car)).toThrow();
    expect(() => getCarSummary(null)).toThrow();
    expect(() => getCarSummary("string")).toThrow();
  });
});

describe("Unsold cars function", () => {
  test(" returns only unsold cars", () => {
    expect(getUnsoldCars(testCars)).toEqual([
      { name: "BMW", model: 2002, price: 20000, sold: false, mileage: 50 },
      { name: "Benz", model: 2028, price: 200, sold: false, mileage: 5 },
    ]);
  });

  test("return empty array", () => {
    expect(
      getUnsoldCars([
        {
          name: "BMW",
          model: 2002,
          price: 30000000,
          sold: true,
          mileage: 50,
        },
        {
          name: "Benz",
          model: 2028,
          price: 200,
          sold: true,
          mileage: 5,
        },
      ]),
    ).toEqual([]);
  });
});

describe("Expensive car function", () => {
  test("get the most expensive car", () => {
    expect(getMostExpensive(testCars)).toEqual({
      name: "Audi",
      model: 2020,
      price: 25000,
      sold: true,
      mileage: 100,
    });
  });

  test("throws on an empty array", () => {
    expect(() => getMostExpensive([])).toThrow();
  });
});

describe("Unsold Value function", () => {
  test("returns the correct sum", () => {
    expect(getTotalUnsoldCars(testCars)).toEqual(20200);
  });
  test(" returns 0 when there are no unsold cars", () => {
    expect(
      getTotalUnsoldCars([
        {
          name: "BMW",
          model: 2002,
          price: 30000000,
          sold: true,
          mileage: 50,
        },
        {
          name: "Benz",
          model: 2028,
          price: 200,
          sold: true,
          mileage: 5,
        },
      ]),
    ).toBe(0);
  });
});
