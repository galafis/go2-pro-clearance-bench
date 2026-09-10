# Research scope · Escopo de pesquisa

## English

A continuous-path geometry workbench that checks a conservative circular envelope against axis-aligned obstacles. It evaluates complete line segments, so an obstacle between two clear waypoints is still detected.

The Unitree Go2 PRO is the reference platform for the planned supervised research workflow. This release provides offline software evidence and does not claim an implemented hardware connection.

Measure a controlled layout and coordinate frame, document the platform configuration, and replace the simplified footprint with an empirically justified envelope. Compare software findings with operator-supervised observations. Record mismatches, uncertainty and interruptions before considering any physical guidance study.

## Português

Uma bancada geométrica de trajetos contínuos que verifica uma envoltória circular conservadora contra obstáculos alinhados aos eixos. Avalia segmentos completos; assim, um obstáculo entre dois pontos livres também é detectado.

O Unitree Go2 PRO é a plataforma de referência para o fluxo de pesquisa supervisionada planejado. Esta versão produz evidências de software offline e não afirma possuir conexão implementada com hardware.

Meça um ambiente controlado e seu sistema de coordenadas, documente a configuração da plataforma e substitua a envoltória simplificada por uma referência justificada por medições. Compare os resultados do software com observações supervisionadas por operador. Registre divergências, incertezas e interrupções antes de considerar estudos de orientação física.

## Readiness · Estágio de desenvolvimento

| Layer · Etapa                                                     | Status · Estado                            | Evidence · Evidência                                                                                          |
| ----------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Domain software · Software de domínio                             | Implemented · Implementado                 | Engine, tests, examples and reports · Mecanismo, testes, exemplos e relatórios                                |
| Browser and CLI · Navegador e linha de comando                    | Implemented · Implementado                 | Same calculation in both interfaces · Mesmo cálculo nas duas interfaces                                       |
| Vendor/device adapter · Adaptador de fabricante/dispositivo       | Future, conditional · Futuro, condicionado | Requires supported interface and separate implementation · Exige interface compatível e implementação própria |
| Physical validation · Validação física                            | Planned · Planejada                        | Measured, controlled comparison protocol · Protocolo medido de comparação controlada                          |
| Participant or field study · Estudo com participantes ou em campo | Not established · Não estabelecido         | Requires separate review and evidence · Exige revisão e evidências próprias                                   |

## Boundaries · Limites

The model is two-dimensional and static. It excludes moving legs, people, vertical clearance, steps, slopes, localization uncertainty and braking. A negative value is an envelope-overlap indicator, not a measured penetration depth. A collision-free result applies only to supplied geometry and cannot be used as a physical guidance guarantee.

O modelo é bidimensional e estático. Exclui pernas em movimento, pessoas, altura livre, degraus, inclinações, incerteza de localização e frenagem. Um valor negativo indica sobreposição da envoltória, não profundidade de penetração medida. Um resultado livre de colisão vale apenas para a geometria informada e não garante orientação física.

Independent public research work. No vendor endorsement, institutional partnership, emergency-use validation, clinical efficacy or physical guidance guarantee is claimed.  
Trabalho público independente de pesquisa. Não se afirma endosso do fabricante, parceria institucional, validação para emergências, eficácia clínica ou garantia de orientação física.

## Platform reference · Referência da plataforma

Standard PRO is not listed for secondary development; custom access requires confirmation.  
A versão PRO padrão não é listada para desenvolvimento secundário; o acesso personalizado exige confirmação. [Unitree Go2 configuration table · Tabela oficial de configuração](https://www.unitree.com/go2/) — checked / consultada: 2026-09-10.

The existence of an SDK does not establish that a particular purchased configuration exposes its interfaces.  
A existência de um SDK não comprova que uma configuração adquirida ofereça suas interfaces. [Official SDK repository · Repositório oficial do SDK](https://github.com/unitreerobotics/unitree_sdk2).

The nominal 0.70 × 0.31 m rectangle follows the published standing dimensions, not a measured dynamic footprint.  
O retângulo nominal de 0,70 × 0,31 m segue as dimensões estáticas publicadas, não uma envoltória dinâmica medida. [Official dimensions · Dimensões oficiais](https://www.unitree.com/go2/).
