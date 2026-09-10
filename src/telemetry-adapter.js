import { validate } from './engine.js';
import { object, choice, list, number, integer, requireThat } from './validation.js';

/** Convert only a contiguous valid trace; never bridge an excluded interval. */
export function fromTelemetry(telemetry, geometry) {
  validate(geometry);
  requireThat(
    telemetry?.schemaVersion === 1 && telemetry?.projectId === 'go2-pro-telemetry-replay',
    'REPORT_TYPE',
    'Expected a version 1 telemetry replay report.',
    'É necessário um relatório de reprodução de telemetria na versão 1.',
  );
  choice(telemetry.source, 'source', ['synthetic', 'manual']);
  requireThat(
    telemetry.source === geometry.source,
    'SOURCE_MISMATCH',
    'Trace and geometry must use the same provenance label.',
    'Trajetória e geometria devem usar o mesmo rótulo de origem.',
  );
  list(telemetry.records, 'records', 2, 2000);
  let previousTime = -1;
  const path = telemetry.records.map((record, index) => {
    requireThat(
      record !== null && typeof record === 'object',
      'RECORD',
      'Invalid telemetry record.',
      'Registro de telemetria inválido.',
    );
    integer(record.atMs, 'atMs', 0, 86400000);
    requireThat(
      record.atMs > previousTime,
      'TIME_ORDER',
      'Trace timestamps must increase strictly.',
      'Os instantes da trajetória devem ser estritamente crescentes.',
    );
    previousTime = record.atMs;
    number(record.xM, 'xM', -100000, 100000);
    number(record.yM, 'yM', -100000, 100000);
    requireThat(
      record.quality === 'valid' && (index === 0 || record.segmentIncluded === true),
      'TRACE_GAP',
      'The trace contains an invalid or excluded interval; select a contiguous valid trace first.',
      'A trajetória contém um intervalo inválido ou excluído; selecione primeiro um trecho contínuo válido.',
    );
    return [record.xM, record.yM];
  });
  const result = { ...structuredClone(geometry), path };
  validate(result);
  return result;
}
