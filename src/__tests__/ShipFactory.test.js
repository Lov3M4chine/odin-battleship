const { ShipFactory } = require ("../modules/factories/ShipFactory.js");

test('newly created ship has zero hits and is not sunk', () => {
  const ship = ShipFactory('submarine', 3);
  expect(ship.getHits()).toBe(0);
  expect(ship.isSunk()).toBe(false);
});

test('creates a ship with the specified name', () => {
  const ship = ShipFactory('submarine', 3);
  expect(ship.name).toBe('submarine');
})

test('increments hits and updates sunk status correctly when hit', () => {
  const ship = ShipFactory('submarine', 2);
  ship.hit();
  expect(ship.getHits()).toBe(1);
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.getHits()).toBe(2);
  expect(ship.isSunk()).toBe(true);
});

test('throws an error when length is not a positive integer', () => {
  expect(() => ShipFactory('three')).toThrow();
  expect(() => ShipFactory(-3)).toThrow();
});

test('throws an error when name is not a non-empty string', () => {
  expect(() => ShipFactory("", 3)).toThrow();
  expect(() => ShipFactory(3, 123)).toThrow();
});
