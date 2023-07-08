const { ShipFactory } = require('../index.js');

test('creates a ship with correct length', () => {
  const ship = ShipFactory(3);
  expect(ship.getHits()).toBe(0);
  expect(ship.getSunkStatus()).toBe(false);
});

test('creates a ship with correct name', () => {
    const ship = ShipFactory(3, 'submarine');
    expect(ship.name).toBe('submarine');
})

test('increments hits and updates sunk status correctly', () => {
  const ship = ShipFactory(2);
  ship.hit();
  expect(ship.getHits()).toBe(1);
  expect(ship.getSunkStatus()).toBe(false);

  ship.hit();
  expect(ship.getHits()).toBe(2);
  expect(ship.getSunkStatus()).toBe(true);
});
