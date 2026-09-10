import { readFile, writeFile } from 'node:fs/promises';
import { fromTelemetry } from '../src/telemetry-adapter.js';
const [tracePath, geometryPath, outputPath, ...rest] = process.argv.slice(2);
try {
  if (!tracePath || !geometryPath || rest.length)
    throw new Error(
      'Usage / Uso: node scripts/from-telemetry.mjs <telemetry.report.json> <geometry-scenario.json> [output.json]',
    );
  const load = async (path) => {
    const data = await readFile(path, 'utf8');
    if (Buffer.byteLength(data) > 1000000)
      throw new Error('Input / Entrada: maximum / máximo 1 MB');
    return JSON.parse(data);
  };
  const output =
    JSON.stringify(fromTelemetry(await load(tracePath), await load(geometryPath)), null, 2) + '\n';
  if (outputPath) await writeFile(outputPath, output, 'utf8');
  else process.stdout.write(output);
} catch (error) {
  console.error(
    JSON.stringify({ error: error.code || 'INPUT', message: error.localized || error.message }),
  );
  process.exitCode = 1;
}
