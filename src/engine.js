import {
  base,
  number,
  list,
  object,
  identifier,
  unique,
  requireThat,
  metric,
  finding,
  round,
  report,
} from './validation.js';

function point(value, name) {
  list(value, name, 2, 2);
  value.forEach((v) => number(v, name, -100000, 100000));
}

export function validate(input) {
  base(input, ['bodyLengthM', 'bodyWidthM', 'marginM', 'path', 'obstacles']);
  number(input.bodyLengthM, 'bodyLengthM', 0.01, 20);
  number(input.bodyWidthM, 'bodyWidthM', 0.01, 20);
  number(input.marginM, 'marginM', 0, 5);
  list(input.path, 'path', 1, 2000);
  input.path.forEach((p, i) => point(p, `path[${i}]`));
  list(input.obstacles, 'obstacles', 0, 1000);
  requireThat(
    Math.max(1, input.path.length - 1) * input.obstacles.length <= 200000,
    'COMPLEXITY',
    'The scenario exceeds 200,000 segment/obstacle checks.',
    'O cenário excede 200.000 verificações de segmento/obstáculo.',
  );
  input.obstacles.forEach((o) => {
    object(o, 'obstacle', ['id', 'min', 'max']);
    identifier(o.id, 'id');
    point(o.min, 'min');
    point(o.max, 'max');
    requireThat(
      o.min[0] < o.max[0] && o.min[1] < o.max[1],
      'RECTANGLE',
      'Obstacle bounds must have positive width and height.',
      'Os limites do obstáculo devem ter largura e altura positivas.',
    );
  });
  unique(
    input.obstacles.map((o) => o.id),
    'obstacles',
  );
  return input;
}

export function pointSegmentDistance(p, a, b) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const lengthSquared = dx * dx + dy * dy;
  const t =
    lengthSquared === 0
      ? 0
      : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lengthSquared));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Slab intersection includes touching boundaries and handles zero-length paths. */
export function intersectsRectangle(a, b, rectangle) {
  let enter = 0,
    exit = 1;
  for (let axis = 0; axis < 2; axis++) {
    const delta = b[axis] - a[axis];
    if (delta === 0) {
      if (a[axis] < rectangle.min[axis] || a[axis] > rectangle.max[axis]) return false;
    } else {
      let near = (rectangle.min[axis] - a[axis]) / delta;
      let far = (rectangle.max[axis] - a[axis]) / delta;
      if (near > far) [near, far] = [far, near];
      enter = Math.max(enter, near);
      exit = Math.min(exit, far);
      if (enter > exit) return false;
    }
  }
  return true;
}

/** Exact Euclidean segment-to-axis-aligned-rectangle distance in the 2D model. */
export function segmentRectangleDistance(a, b, rectangle) {
  if (intersectsRectangle(a, b, rectangle)) return 0;
  const [x0, y0] = rectangle.min,
    [x1, y1] = rectangle.max;
  const vertices = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  let minimum = Infinity;
  for (let i = 0; i < 4; i++) {
    const c = vertices[i],
      d = vertices[(i + 1) % 4];
    minimum = Math.min(
      minimum,
      pointSegmentDistance(a, c, d),
      pointSegmentDistance(b, c, d),
      pointSegmentDistance(c, a, b),
      pointSegmentDistance(d, a, b),
    );
  }
  return minimum;
}

export function run(input) {
  validate(input);
  const radiusM = Math.hypot(input.bodyLengthM, input.bodyWidthM) / 2 + input.marginM;
  const records = [],
    findings = [];
  let minimumClearanceM = Infinity,
    lengthM = 0;
  const count = Math.max(1, input.path.length - 1);
  for (let i = 0; i < count; i++) {
    const a = input.path[i],
      b = input.path[i + 1] ?? a;
    lengthM += Math.hypot(a[0] - b[0], a[1] - b[1]);
    let minimum = Infinity,
      nearestObstacleId = null;
    const conflicts = [];
    for (const obstacle of input.obstacles) {
      const clearance = segmentRectangleDistance(a, b, obstacle) - radiusM;
      if (clearance < minimum) {
        minimum = clearance;
        nearestObstacleId = obstacle.id;
      }
      if (clearance <= 1e-9) conflicts.push(obstacle.id);
    }
    minimumClearanceM = Math.min(minimumClearanceM, minimum);
    records.push({
      segment: i,
      from: [...a],
      to: [...b],
      nearestObstacleId,
      clearanceM: Number.isFinite(minimum) ? round(minimum) : null,
      conflicts,
    });
    if (conflicts.length)
      findings.push(
        finding(
          'error',
          'ENVELOPE_INTERSECTION',
          `Segment ${i} touches or overlaps ${conflicts.length} obstacle envelopes.`,
          `O segmento ${i} toca ou sobrepõe a envoltória de ${conflicts.length} obstáculos.`,
          { segment: i, obstacleIds: conflicts },
        ),
      );
  }
  if (!input.obstacles.length)
    findings.push(
      finding(
        'info',
        'NO_OBSTACLES',
        'No obstacles were supplied; clearance is undefined.',
        'Nenhum obstáculo foi informado; o espaço livre é indefinido.',
      ),
    );
  const conflicts = records.filter((r) => r.conflicts.length).length;
  return report(
    input,
    'go2-pro-clearance-bench',
    [
      metric('radiusM', 'Envelope radius', 'Raio da envoltória', round(radiusM, 3), 'm'),
      metric(
        'minimumClearanceM',
        'Minimum clearance',
        'Menor espaço livre',
        Number.isFinite(minimumClearanceM) ? round(minimumClearanceM, 3) : null,
        'm',
      ),
      metric('conflicts', 'Conflicting segments', 'Segmentos em conflito', conflicts),
      metric('lengthM', 'Path length', 'Comprimento do trajeto', round(lengthM, 3), 'm'),
    ],
    findings,
    records,
    {
      radiusM: round(radiusM),
      minimumClearanceM: Number.isFinite(minimumClearanceM) ? round(minimumClearanceM) : null,
      lengthM: round(lengthM),
      collisionFreeInModel: conflicts === 0 && input.obstacles.length > 0,
      obstacles: input.obstacles.map((o) => ({ id: o.id, min: [...o.min], max: [...o.max] })),
      path: input.path.map((p) => [...p]),
    },
  );
}
