# Torres & Hordas — regras e limites da implementação

- As mãos, a ordem do baralho e os resultados são controlados no servidor. Cada cliente recebe apenas a própria mão.
- A rodada rola D20 para jogadores vivos; empates são rolados novamente apenas entre empatados. A mão comporta até cinco cartas, e cada terreno produz a partir da rodada seguinte.
- A produção é perdida quando a casa do terreno está ocupada ou o jogador já controla 6 unidades. Unidades não se sobrepõem e terrenos permanecem até a eliminação do dono.
- Uma unidade que encontra um inimigo adjacente ataca, e o defensor vivo pode contra-atacar uma vez naquele turno. Quando há bloqueio, a busca procura uma posição adjacente a um adversário.
- O turno tem 45 segundos; uma desconexão de jogador vivo pausa a partida por até 30 segundos. Após esse prazo, o jogador ausente perde a torre e suas cartas e terrenos são descartados.
- Para impedir partidas sem fim, a partir da rodada 36 cada torre viva perde um ponto por rodada. Se todas caírem juntas, o resultado é empate. Esse limite é uma regra adicional de morte súbita e deve ser avaliado no balanceamento.
- A partida é mantida em memória: uma reinicialização do servidor encerra partidas em andamento.
- Sprites de Kenney (CC0), com licenças junto aos arquivos em `front/public/assets/hordes`.

## Resultado preliminar de balanceamento

Simulação com 1.000 partidas por quantidade de jogadores, usando bots simples que priorizam terrenos voltados ao centro e alternam alvos. O limite foi de seis zumbis por jogador. Nenhuma partida ficou sem terminar; os números não representam probabilidades definitivas para jogadores humanos.

| Jogadores | Vitórias por posição | Empates | Média de rodadas | Máximo de unidades |
| --- | --- | --- | --- | --- |
| 2 | 474 / 472 | 54 | 36,1 | 12 |
| 3 | 314 / 368 / 39 | 279 | 44,9 | 18 |
| 4 | 49 / 33 / 150 / 163 | 605 | 46,3 | 24 |

As configurações com três e quatro jogadores ainda precisam de balanceamento: há diferenças entre posições e muitos empates na estratégia simulada. Os novos terrenos poderão alterar esse resultado. A simulação pode ser reproduzida com `npm run test:hordes:simulation`.

Na mesma simulação, o primeiro colocado na iniciativa inicial venceu 491, 228 e 98 partidas, respectivamente. Não houve turnos em que todas as unidades do jogador ficassem imóveis e sem combate (entre 70.921, 129.622 e 177.497 turnos observados, respectivamente). Esse indicador não substitui uma análise de bloqueios individuais.

Uma amostra local com quatro páginas Chrome simultâneas, 24 unidades observadas e uma página em tamanho de celular registrou 60, 59, 60 e 60 quadros por segundo durante um segundo. O heap informado pelo navegador ficou aproximadamente entre 8 e 9,5 MB por página. É uma medição curta em um único computador; não demonstra desempenho em celulares reais nem ausência de vazamentos em sessões longas.
