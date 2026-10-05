import { createSwimmers, stepSwimmers } from './pondSimulation';

test('koi keep swimming inside the pond over a long session', () => {
  const fish = createSwimmers();
  const start = fish.map(({ x, z }) => ({ x, z }));
  const food = [];
  for (let frame = 1; frame <= 7200; frame += 1) {
    stepSwimmers(fish, food, { x: 20, z: 20 }, frame / 30, 1 / 30);
    fish.forEach((item) => {
      expect(Number.isFinite(item.heading)).toBe(true);
      expect(Math.hypot(item.x / 7.8, item.z / 5.6)).toBeLessThanOrEqual(1.000001);
    });
  }
  fish.forEach((item, index) => expect(Math.hypot(item.x - start[index].x, item.z - start[index].z)).toBeGreaterThan(.1));
});

test('koi approach and eat food while old food disappears', () => {
  const fish = [createSwimmers()[0]];
  Object.assign(fish[0], { x: 0, z: 0, heading: 0 });
  const food = [{ x: 0, z: 2, born: 0 }, { x: 5, z: 5, born: -20 }];
  for (let frame = 1; frame <= 90; frame += 1) stepSwimmers(fish, food, null, frame / 30, 1 / 30);
  expect(food).toHaveLength(0);
  expect(fish[0].z).toBeGreaterThan(1);
});

test('a long frame does not teleport fish and a zero delta does not move them', () => {
  const fish = createSwimmers();
  const start = fish.map(({ x, z }) => ({ x, z }));
  stepSwimmers(fish, [], null, 1, 0);
  expect(fish.map(({ x, z }) => ({ x, z }))).toEqual(start);
  stepSwimmers(fish, [], null, 100, 100);
  fish.forEach((item, index) => expect(Math.hypot(item.x - start[index].x, item.z - start[index].z)).toBeLessThan(.1));
});
