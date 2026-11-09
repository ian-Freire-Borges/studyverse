# Relatório de QA

Executados localmente: 15 testes de núcleo no Vitest, incluindo 200 execuções geradas pelo fast-check; E2E com autenticação, sala privada, quatro sessões gráficas, disputa concorrente pela última vaga, quinto jogador recusado, origem indevida, comando malformado e duplicado, bomba, dano, teclado, toque emulado, reconexão, vitória/derrota e revanche; build e ESLint do código novo. Passaram a regressão local de chat e amigos, uma partida de quiz e um teste do estilingue simultâneo a uma partida de Bomb Arena.

Pendências: partidas completas com 3/4 em diferentes navegadores, replay persistente com hash, mutação abrangente, chaos e falha de processo, rede degradada real, carga com quatro por sala, validação adicional de estabilidade, caso necessária (foi executada amostra de 120 segundos; o usuário dispensou o teste de uma hora), comparação visual automatizada, aparelhos físicos e avaliação com usuários. Capturas e traces do Playwright são gravados em pasta temporária e, na CI configurada, enviados como artefatos. Não há vídeos automatizados nesta versão.

Na revisão posterior, foi corrigido um caso em que desconexões simultâneas poderiam escolher como vencedor um jogador também ausente; as remoções agora são avaliadas em conjunto. O núcleo também bloqueia mudanças após o fim da partida. Os casos têm testes automatizados.

Teste curto de mutação com Stryker nos limites da grade e na decisão de fim de jogo: 44 mutações, 41 detectadas e três sobreviventes (93,18%). Os três sobreviventes alteram limites verticais que continuam bloqueados pela leitura fora do array; devem ser revisados ao expandir o núcleo. Evidência: `docs/evidence/bomb-mutation.json`. Esse escopo não avalia todo o núcleo.
