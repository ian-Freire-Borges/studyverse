# Relatório de carga local

Clientes oficiais Socket.IO, quatro contas reutilizadas em salas distintas, servidor e MongoDB temporário locais. Cada patamar teve aproximadamente 3,4–3,5 segundos de amostra com quatro conexões e comandos de movimento por sala. Ambiente descrito na linha de base.

| Salas | Conexões | Snapshots observados | p95/p99 da distribuição dos p95 do núcleo por sala (ms) | JSON médio por snapshot | Memória | CPU aproximada de um núcleo |
|---:|---:|---:|---:|---:|---:|---:|
| 10 | 40 | 380 | 0,030 / 0,030 | 1.671 bytes | 82 MiB | 8,3% |
| 25 | 100 | 866 | 0,023 / 0,026 | 1.672 bytes | 92 MiB | 7,2% |
| 50 | 200 | 1.750 | 0,021 / 0,023 | 1.672 bytes | 115 MiB | 20,6% |
| 100 | 400 | 3.505 | 0,012 / 0,016 | 1.673 bytes | 148 MiB | 28,6% |

Não houve desconexões observadas. A amostra é curta e não inclui explosões em todas as salas; não demonstra capacidade de produção. Os percentis são percentis dos p95 informados pelas salas para a função de regras, não p95 global de ticks, e excluem serialização/rede e atraso do event loop. O tamanho é JSON antes do transporte; CPU é estimativa de tempo de processo e memória é conjunto de trabalho. Reproduzir: `npm run test:bomb:load`, em ambiente isolado, nunca produção. Uma tentativa anterior fez entradas HTTP repetidas e recebeu HTTP 429; o gerador passou a usar a entrada pública pelo Socket.IO.
