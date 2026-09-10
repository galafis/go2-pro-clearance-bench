import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromTelemetry } from '../src/telemetry-adapter.js';
const geometry = () =>
  JSON.parse(readFileSync(new URL('../examples/nominal.json', import.meta.url)));
const trace = () => ({
  schemaVersion: 1,
  projectId: 'go2-pro-telemetry-replay',
  source: 'synthetic',
  records: [
    { atMs: 0, xM: 0, yM: 0, quality: 'valid', segmentIncluded: false },
    { atMs: 1000, xM: 0.5, yM: 0, quality: 'valid', segmentIncluded: true },
  ],
});
test('telemetry conversion preserves geometry and replaces only the path', () => {
  const g = geometry(),
    r = fromTelemetry(trace(), g);
  assert.deepEqual(r.path, [
    [0, 0],
    [0.5, 0],
  ]);
  assert.deepEqual(r.obstacles, g.obstacles);
  assert.equal(r.bodyWidthM, g.bodyWidthM);
});
test('adapter rejects excluded gaps instead of connecting them', () => {
  const t = trace();
  t.records[1].segmentIncluded = false;
  assert.throws(() => fromTelemetry(t, geometry()), { code: 'TRACE_GAP' });
});
test('adapter rejects invalid position anchors', () => {
  const t = trace();
  t.records[0].quality = 'invalid';
  assert.throws(() => fromTelemetry(t, geometry()), { code: 'TRACE_GAP' });
});
test('adapter cannot relabel manual records as synthetic', () => {
  const t = trace();
  t.source = 'manual';
  assert.throws(() => fromTelemetry(t, geometry()), { code: 'SOURCE_MISMATCH' });
});
test('adapter rejects reports from another project', () => {
  const t = trace();
  t.projectId = 'another-project';
  assert.throws(() => fromTelemetry(t, geometry()), { code: 'REPORT_TYPE' });
});
test('adapter rejects repeated timestamps', () => {
  const t = trace();
  t.records[1].atMs = 0;
  assert.throws(() => fromTelemetry(t, geometry()), { code: 'TIME_ORDER' });
});
test('adapter copies geometry without sharing mutable obstacle arrays', () => {
  const g = geometry(),
    r = fromTelemetry(trace(), g);
  r.obstacles[0].min[0] = 999;
  assert.notEqual(g.obstacles[0].min[0], 999);
});
