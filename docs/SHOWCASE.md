# Guided evidence tour · Visita guiada às evidências

[README](../README.md) · [Validation / Validação](../docs/VALIDATION.md)

## The question · A pergunta

**EN:** Can a clear pair of waypoints hide a collision between them?

**PT:** Dois pontos livres podem esconder um conflito entre eles?

## First result · Primeiro resultado

Envelope radius / Raio da envoltÃ³ria: **0.533 m**; Minimum clearance / Menor espaÃ§o livre: **-0.533 m**; Conflicting segments / Segmentos em conflito: **1 **

**EN:** These are committed examples of software behavior. Follow the installation and execution commands in the [README](../README.md#english); the source inputs and expected outputs below allow inspection before installation.

**PT:** São exemplos versionados do comportamento do software. Siga a instalação e os comandos do [README](../README.md#portugues); as entradas e saídas abaixo permitem inspecionar o resultado antes de instalar.

## Compare one assumption · Compare uma premissa

**EN:** Compare the wide corridor with the between-waypoints obstacle and the narrow corridor. Keep the original input, change a copy, rerun the implementation and compare the complete output, including warnings and excluded records.

**PT:** Compare corredor amplo, obstáculo entre pontos e corredor estreito. Preserve a entrada original, altere uma cópia, execute novamente e compare a saída completa, incluindo avisos e registros excluídos.

## Inputs and expected outputs · Entradas e saídas esperadas

| Input · Entrada | Expected output · Saída esperada | Inspect · Inspecione |
| --- | --- | --- |
| [between-waypoints.json](../examples/between-waypoints.json) | [between-waypoints.report.json](../examples/between-waypoints.report.json) | Envelope radius / Raio da envoltÃ³ria: **0.533 m**; Minimum clearance / Menor espaÃ§o livre: **-0.533 m**; Conflicting segments / Segmentos em conflito: **1 ** |
| [narrow-corridor.json](../examples/narrow-corridor.json) | [narrow-corridor.report.json](../examples/narrow-corridor.report.json) | Envelope radius / Raio da envoltÃ³ria: **0.533 m**; Minimum clearance / Menor espaÃ§o livre: **-0.033 m**; Conflicting segments / Segmentos em conflito: **2 ** |
| [nominal.json](../examples/nominal.json) | [nominal.report.json](../examples/nominal.report.json) | Envelope radius / Raio da envoltÃ³ria: **0.533 m**; Minimum clearance / Menor espaÃ§o livre: **0.467 m**; Conflicting segments / Segmentos em conflito: **0 ** |

## Review the evidence · Revise as evidências

1. **Input / Entrada:** identify units, identifiers and assumptions before interpreting a result. / Identifique unidades, identificadores e premissas antes de interpretar o resultado.
2. **Implementation / Implementação:** follow the domain code linked in the README. / Acompanhe o código de domínio indicado no README.
3. **Output / Saída:** compare both the headline and the complete record. / Compare o destaque e o registro completo.
4. **Checks / Verificações:** read [validation notes](../docs/VALIDATION.md) and the current workflow result. / Leia as [notas de validação](../docs/VALIDATION.md) e o resultado atual da automação.

**EN:** The banner illustrates the workflow; it is not a screenshot. Example values describe the supplied scenarios. They do not establish physical performance, institutional endorsement or an outcome beyond the documented software scope. Domain-specific assumptions and limitations remain in the README and method documents.

**PT:** O banner ilustra o fluxo; não é uma captura de tela. Os valores descrevem os cenários fornecidos. Não estabelecem desempenho físico, endosso institucional ou resultado além do escopo documentado do software. Premissas e limites do domínio permanecem no README e nos documentos de método.
