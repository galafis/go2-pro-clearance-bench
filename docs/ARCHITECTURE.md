# Architecture · Arquitetura

[README](../README.md) · [Data contract · Contrato de dados](DATA_CONTRACT.md)

## English

The domain engine in `src/engine.js` is independent of the document, network and local storage. The same `run(input)` function powers the browser and command-line interface. Awaiting it works for every project, including the asynchronous journal hashing operation.

```text
scenario JSON → strict validation → deterministic domain engine → report
                                                           ↘ bilingual view
```

- The envelope radius is half the body-rectangle diagonal plus marginM. It conservatively covers all orientations of that supplied rectangle, not the full moving robot.
- A slab-intersection test first identifies centerline intersection with an obstacle. Otherwise compute the minimum Euclidean distance between the path segment and the four rectangle edges.
- Subtract the envelope radius from centerline distance. Zero or negative clearance counts as contact or overlap; comparisons use a 1e-9 m numerical tolerance.
- Each complete segment is checked, including its interior. There is no waypoint-only collision approximation or time-sampling interval.
- One waypoint represents a stationary disc. An empty obstacle list produces undefined clearance and cannot establish a collision-free environment.
- The telemetry adapter rejects excluded intervals, invalid samples, nonincreasing timestamps and source-label mismatches. Geometry and trace must already share one coordinate frame.

### Model

```text
radius = hypot(bodyLengthM, bodyWidthM) / 2 + marginM; clearance = distance(segment, rectangle) − radius
```

Inputs are checked before computation and are not mutated. Unknown keys are rejected at the validated scenario and nested-domain boundaries. Reports contain no wall-clock creation timestamp, so the same input produces identical JSON under the same analysis version. UI formatting changes decimal separators without changing exported numeric values.

The browser parses imports locally, limits them to 1 MB, renders supplied text through escaping, and discards stale asynchronous results using a revision counter. It retains only the language preference automatically. Charts are previews; complete records remain in exports. The local development server binds to `127.0.0.1` and rejects hidden or out-of-root paths.

## Português

O mecanismo de domínio em `src/engine.js` é independente do documento, da rede e do armazenamento local. A mesma função `run(input)` atende ao navegador e à interface de linha de comando. Ela pode ser aguardada com `await` em todos os projetos, inclusive no cálculo assíncrono dos hashes do registro.

```text
cenário JSON → validação estrita → mecanismo determinístico → relatório
                                                       ↘ visualização bilíngue
```

- O raio da envoltória é metade da diagonal do retângulo do corpo mais marginM. Ele cobre conservadoramente todas as orientações desse retângulo informado, não o robô inteiro em movimento.
- Primeiro, um teste de interseção por faixas identifica se a linha central atravessa o obstáculo. Caso contrário, calcule a menor distância euclidiana entre o segmento do trajeto e as quatro bordas do retângulo.
- Subtraia o raio da envoltória da distância à linha central. Espaço livre zero ou negativo representa contato ou sobreposição; as comparações usam tolerância numérica de 1e-9 m.
- Cada segmento completo é verificado, inclusive seu interior. Não há aproximação de colisão apenas nos pontos nem intervalo de amostragem temporal.
- Um único ponto representa um disco estacionário. Uma lista vazia de obstáculos produz espaço livre indefinido e não comprova ambiente livre de colisão.
- O adaptador de telemetria rejeita intervalos excluídos, amostras inválidas, instantes não crescentes e rótulos de origem incompatíveis. Geometria e trajetória já devem compartilhar o mesmo sistema de coordenadas.

As entradas são verificadas antes do cálculo e não são alteradas. Chaves desconhecidas são rejeitadas no cenário e nas estruturas de domínio validadas. Os relatórios não incluem horário real de criação; assim, a mesma entrada produz JSON idêntico sob a mesma versão da análise. A formatação visual altera separadores decimais sem alterar os valores numéricos exportados.

O navegador lê as importações localmente, limita-as a 1 MB, escapa textos informados antes da exibição e descarta resultados assíncronos antigos com um contador de revisão. Apenas a preferência de idioma é armazenada automaticamente. Os gráficos são prévias; os registros completos permanecem na exportação. O servidor local atende em `127.0.0.1` e rejeita caminhos ocultos ou externos à pasta.

## Files · Arquivos

| Path · Caminho        | Responsibility · Responsabilidade                                                       |
| --------------------- | --------------------------------------------------------------------------------------- |
| `src/engine.js`       | Domain behavior · Comportamento de domínio                                              |
| `src/validation.js`   | Strict primitives and report contract · Validação e contrato do relatório               |
| `src/view.js`         | Project-specific chart and interpretation · Gráfico e interpretação próprios do projeto |
| `src/app.js`          | Browser workflow, imports and language · Fluxo do navegador, importações e idioma       |
| `src/ui.js`           | Escaping, formatting and downloads · Escape de texto, formatação e downloads            |
| `scripts/analyze.mjs` | Command-line adapter · Adaptador de linha de comando                                    |
| `tests/`              | Behavioral and contract checks · Verificações de comportamento e contrato               |
| `examples/`           | Synthetic inputs and expected reports · Entradas sintéticas e relatórios esperados      |
