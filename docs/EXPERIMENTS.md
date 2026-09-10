# Worked examples · Exemplos comentados

[README](../README.md)

**English:** These are executable synthetic scenarios. Each command recomputes the committed report. Change one field at a time, retain the source file and inspect unfavorable findings as well as headline metrics.

**Português:** Estes são cenários sintéticos executáveis. Cada comando recalcula o relatório versionado. Altere um campo por vez, preserve a entrada e inspecione achados desfavoráveis junto das métricas principais.

## Wide corridor · Corredor amplo

```sh
node scripts/analyze.mjs examples/nominal.json report.json
```

[Scenario / Cenário](../examples/nominal.json) · [Expected report / Relatório esperado](../examples/nominal.report.json) · `complete`

| Metric · Métrica                             | Expected · Esperado |
| -------------------------------------------- | ------------------- |
| Envelope radius / Raio da envoltória         | 0.533 m             |
| Minimum clearance / Menor espaço livre       | 0.467 m             |
| Conflicting segments / Segmentos em conflito | 0                   |
| Path length / Comprimento do trajeto         | 6 m                 |

## Obstacle between waypoints · Obstáculo entre pontos

```sh
node scripts/analyze.mjs examples/between-waypoints.json report.json
```

[Scenario / Cenário](../examples/between-waypoints.json) · [Expected report / Relatório esperado](../examples/between-waypoints.report.json) · `review-required`

| Metric · Métrica                             | Expected · Esperado |
| -------------------------------------------- | ------------------- |
| Envelope radius / Raio da envoltória         | 0.533 m             |
| Minimum clearance / Menor espaço livre       | -0.533 m            |
| Conflicting segments / Segmentos em conflito | 1                   |
| Path length / Comprimento do trajeto         | 6 m                 |

- `ENVELOPE_INTERSECTION`: Segment 0 touches or overlaps 1 obstacle envelopes. / O segmento 0 toca ou sobrepõe a envoltória de 1 obstáculos.

## Narrow corridor · Corredor estreito

```sh
node scripts/analyze.mjs examples/narrow-corridor.json report.json
```

[Scenario / Cenário](../examples/narrow-corridor.json) · [Expected report / Relatório esperado](../examples/narrow-corridor.report.json) · `review-required`

| Metric · Métrica                             | Expected · Esperado |
| -------------------------------------------- | ------------------- |
| Envelope radius / Raio da envoltória         | 0.533 m             |
| Minimum clearance / Menor espaço livre       | -0.033 m            |
| Conflicting segments / Segmentos em conflito | 2                   |
| Path length / Comprimento do trajeto         | 6 m                 |

- `ENVELOPE_INTERSECTION`: Segment 0 touches or overlaps 2 obstacle envelopes. / O segmento 0 toca ou sobrepõe a envoltória de 2 obstáculos.
- `ENVELOPE_INTERSECTION`: Segment 1 touches or overlaps 2 obstacle envelopes. / O segmento 1 toca ou sobrepõe a envoltória de 2 obstáculos.
