import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  run,
  pointSegmentDistance,
  segmentRectangleDistance,
  intersectsRectangle,
} from '../src/engine.js';
const fixture = () =>
  JSON.parse(readFileSync(new URL('../examples/nominal.json', import.meta.url)));
const rectangle = { id: 'box', min: [1, 1], max: [2, 2] };
test('known corridor clearance matches the circumscribed-radius calculation', () => {
  const r = run(fixture());
  assert.ok(Math.abs(r.minimumClearanceM - (1 - Math.hypot(0.7, 0.31) / 2 - 0.15)) < 1e-6);
  assert.equal(r.collisionFreeInModel, true);
  assert.equal(r.lengthM, 6);
});
test('an obstacle between clear waypoints is detected continuously', () => {
  const x = fixture();
  x.path = [
    [0, 0],
    [3, 0],
  ];
  x.obstacles = [{ id: 'middle', min: [1.4, -0.1], max: [1.6, 0.1] }];
  assert.equal(run(x).collisionFreeInModel, false);
});
test('point-to-segment distance uses perpendicular projection', () =>
  assert.equal(pointSegmentDistance([1, 2], [0, 0], [2, 0]), 2));
test('point projection clamps to segment endpoints', () =>
  assert.equal(pointSegmentDistance([3, 0], [0, 0], [2, 0]), 1));
test('zero-length segments have ordinary point distance', () =>
  assert.equal(pointSegmentDistance([3, 4], [0, 0], [0, 0]), 5));
test('horizontal crossing intersects a rectangle', () =>
  assert.equal(intersectsRectangle([0, 1.5], [3, 1.5], rectangle), true));
test('vertical parallel separation is handled without division by zero', () =>
  assert.equal(intersectsRectangle([0, 0], [0, 3], rectangle), false));
test('corner touching counts as intersection', () =>
  assert.equal(intersectsRectangle([0, 0], [1, 1], rectangle), true));
test('a segment entirely inside a rectangle has zero distance', () =>
  assert.equal(segmentRectangleDistance([1.2, 1.2], [1.8, 1.8], rectangle), 0));
test('diagonal corner distance is Euclidean, not square inflation', () =>
  assert.ok(Math.abs(segmentRectangleDistance([0, 0], [0, 0], rectangle) - Math.sqrt(2)) < 1e-12));
test('parallel corridor distance is exactly one metre', () =>
  assert.equal(segmentRectangleDistance([0, 0], [3, 0], rectangle), 1));
test('reversing the path preserves clearance', () => {
  const x = fixture();
  const r = run(x);
  x.path.reverse();
  assert.equal(run(x).minimumClearanceM, r.minimumClearanceM);
});
test('translation preserves distances and collision status', () => {
  const x = fixture(),
    before = run(x);
  x.path.forEach((p) => {
    p[0] += 40;
    p[1] -= 12;
  });
  x.obstacles.forEach((o) => {
    for (const p of [o.min, o.max]) {
      p[0] += 40;
      p[1] -= 12;
    }
  });
  assert.equal(run(x).minimumClearanceM, before.minimumClearanceM);
});
test('increasing margin cannot increase clearance', () => {
  const x = fixture(),
    r = run(x);
  x.marginM += 0.2;
  assert.ok(Math.abs(run(x).minimumClearanceM - r.minimumClearanceM + 0.2) < 1e-6);
});
test('no obstacle set does not establish a collision-free environment', () => {
  const x = fixture();
  x.obstacles = [];
  const r = run(x);
  assert.equal(r.minimumClearanceM, null);
  assert.equal(r.collisionFreeInModel, false);
});
test('one waypoint still checks the stationary footprint', () => {
  const x = fixture();
  x.path = [[0, 0]];
  const r = run(x);
  assert.equal(r.records.length, 1);
  assert.equal(r.lengthM, 0);
});
test('inverted rectangle bounds are rejected', () => {
  const x = fixture();
  x.obstacles[0].min[0] = 50;
  assert.throws(() => run(x), { code: 'RECTANGLE' });
});
test('repeated waypoints do not produce NaN', () => {
  const x = fixture();
  x.path = [
    [0, 0],
    [0, 0],
  ];
  const r = run(x);
  assert.ok(Number.isFinite(r.minimumClearanceM));
});
test('adding a collinear waypoint does not alter clearance', () => {
  const x = fixture();
  const r = run(x);
  x.path.splice(1, 0, [1.5, 0]);
  assert.equal(run(x).minimumClearanceM, r.minimumClearanceM);
});
test('stationary interior points have zero distance to the rectangle', () =>
  assert.equal(segmentRectangleDistance([1.5, 1.5], [1.5, 1.5], rectangle), 0));
