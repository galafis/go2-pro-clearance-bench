import { svg, label, esc, fmt, text } from './ui.js';
export const interpretation = {
  en: 'A circumscribed disc sweeps each complete straight path segment. Results apply only to the supplied 2D geometry. Moving legs, people, headroom, slopes, localization errors and braking behavior are not represented by this model.',
  pt: 'Um disco circunscrito percorre cada segmento reto completo do trajeto. Os resultados valem somente para a geometria 2D informada. Movimento das pernas, pessoas, altura livre, inclinações, erros de localização e frenagem não são representados por este modelo.',
};
export const cursorMax = (r) => Math.max(0, r.records.length - 1);
export function render(r, lang, cursor) {
  const points = [...r.path, ...r.obstacles.flatMap((o) => [o.min, o.max])];
  const pad = r.radiusM + 0.3,
    xmin = Math.min(...points.map((p) => p[0])) - pad,
    xmax = Math.max(...points.map((p) => p[0])) + pad,
    ymin = Math.min(...points.map((p) => p[1])) - pad,
    ymax = Math.max(...points.map((p) => p[1])) + pad;
  const scale = Math.min(650 / (xmax - xmin), 215 / (ymax - ymin)),
    x = (v) => 55 + (v - xmin) * scale,
    y = (v) => 258 - (v - ymin) * scale;
  let content = label(
    20,
    24,
    text(
      'Plan view · disc envelope / complete path segments',
      'Vista superior · disco de referência / segmentos completos',
      lang,
    ),
  );
  for (const o of r.obstacles)
    content += `<rect x="${x(o.min[0])}" y="${y(o.max[1])}" width="${(o.max[0] - o.min[0]) * scale}" height="${(o.max[1] - o.min[1]) * scale}" fill="#a5b4bc" stroke="#768a96"/>`;
  for (const segment of r.records) {
    const selected = segment.segment === cursor,
      color = segment.conflicts.length ? '#b2454a' : 'var(--accent)';
    content += `<line x1="${x(segment.from[0])}" y1="${y(segment.from[1])}" x2="${x(segment.to[0])}" y2="${y(segment.to[1])}" stroke="${color}" stroke-width="${r.radiusM * 2 * scale}" opacity="${selected ? 0.24 : 0.08}" stroke-linecap="round"/><line x1="${x(segment.from[0])}" y1="${y(segment.from[1])}" x2="${x(segment.to[0])}" y2="${y(segment.to[1])}" stroke="${color}" stroke-width="${selected ? 4 : 2}"/>`;
  }
  r.path
    .slice(0, 200)
    .forEach(
      (p, i) =>
        (content +=
          `<circle class="point" cx="${x(p[0])}" cy="${y(p[1])}" r="4"/>` +
          label(x(p[0]), y(p[1]) - 10, i, 'text-anchor="middle"')),
    );
  const s = r.records[cursor];
  return (
    svg(
      content,
      text(
        'Path segments and their swept circular envelope',
        'Segmentos do trajeto e sua envoltória circular percorrida',
        lang,
      ),
    ) +
    `<p class="visual-note"><strong>${esc(text('Segment', 'Segmento', lang))} ${cursor}</strong> · ${esc(text('Clearance', 'Espaço livre', lang))}: ${esc(fmt(s.clearanceM, lang, 3))} m · ${esc(text('Conflicts', 'Conflitos', lang))}: ${esc(s.conflicts.length ? s.conflicts.join(', ') : text('none in supplied geometry', 'nenhum na geometria informada', lang))}.</p>`
  );
}
