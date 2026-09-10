# Integration · Integração

## English

Measure a controlled layout and coordinate frame, document the platform configuration, and replace the simplified footprint with an empirically justified envelope. Compare software findings with operator-supervised observations. Record mismatches, uncertainty and interruptions before considering any physical guidance study.

The public interface is a versioned scenario and report pair. Keep the scenario, report, source label and repository release together. Do not substitute private device messages for this schema or infer compatibility from similar field names. Device integration remains a separately scoped adapter.

## Português

Meça um ambiente controlado e seu sistema de coordenadas, documente a configuração da plataforma e substitua a envoltória simplificada por uma referência justificada por medições. Compare os resultados do software com observações supervisionadas por operador. Registre divergências, incertezas e interrupções antes de considerar estudos de orientação física.

A interface pública é um par versionado de cenário e relatório. Mantenha juntos cenário, relatório, rótulo de origem e versão do repositório. Não substitua o esquema por mensagens privadas de dispositivos nem deduza compatibilidade de campos parecidos. A integração com dispositivos permanece um adaptador de escopo separado.

## Implemented artifact exchange · Troca de artefatos implementada

Go2 PRO Clearance Bench includes `src/telemetry-adapter.js` and `scripts/from-telemetry.mjs`. They accept a report from Go2 PRO Telemetry Replay plus a clearance scenario containing the obstacle geometry and footprint assumptions.  
O Go2 PRO Clearance Bench inclui `src/telemetry-adapter.js` e `scripts/from-telemetry.mjs`. Eles aceitam um relatório do Go2 PRO Telemetry Replay e um cenário de espaço livre contendo geometria dos obstáculos e hipóteses da envoltória.

Run inside the Clearance Bench repository, using a telemetry report generated separately:  
Execute dentro do repositório Clearance Bench, usando um relatório de telemetria gerado separadamente:

```sh
node scripts/from-telemetry.mjs telemetry.report.json examples/nominal.json combined.json
node scripts/analyze.mjs combined.json combined.report.json
```

The adapter replaces the path with recorded coordinates. It rejects gaps, invalid anchors, nonincreasing timestamps and mismatched source labels. At least two and at most 2,000 samples are accepted. The geometry and trace must already use the same metre-based coordinate frame; no registration or frame transform is performed. Keep the original report and geometry file alongside the converted scenario.  
O adaptador substitui o trajeto pelas coordenadas registradas. Rejeita lacunas, referências inválidas, instantes não crescentes e rótulos de origem incompatíveis. Aceita de duas a 2.000 amostras. Geometria e trajetória devem usar o mesmo sistema de coordenadas em metros; não há alinhamento nem transformação de referência. Mantenha relatório original e arquivo de geometria junto ao cenário convertido.
