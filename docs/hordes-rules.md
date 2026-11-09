# Torres & Hordas — regras da expansão

- O servidor controla dados, cartas, carne, terrenos, unidades, caminhos e dano. Cada cliente recebe somente suas próprias cartas.
- Cada jogador começa com **2 carnes**, valor configurável. Na abertura de cada turno, as fazendas existentes desde um turno anterior produzem 1 carne cada. Em seguida, os terrenos tentam gerar unidades, em ordem de construção. A geração começa no turno seguinte ao da construção.
- Terreno de Zumbis: 3 HP, gera um zumbi por 1 carne. Zumbi: 2 HP, 1 dano, 2 casas e um ataque por turno.
- Fazenda: 3 HP, produz 1 carne por turno do dono. Terreno de Arqueiros: 2 HP, gera um arqueiro por 2 carnes. Arqueiro: 2 HP, 2 de dano, uma casa de movimento e alcance Manhattan de até 3, com linha de visão bloqueada por estruturas e torres.
- Golpe Devastador causa exatamente 4 de dano a uma unidade ou terreno inimigo. Torres e alvos aliados são rejeitados no servidor. É possível usar um golpe e construir um terreno no mesmo turno; cada limite vale uma vez por turno. A carta utilizada vai ao descarte.
- O baralho inicial configurável contém 32 terrenos de zumbis, 28 fazendas, 20 terrenos de arqueiros e 16 golpes. Compram-se até duas cartas por rodada, até o limite de cinco na mão.
- Se a casa estiver ocupada, o saldo for insuficiente ou o jogador atingir o limite de seis unidades, a produção é perdida naquele turno e nenhuma carne é gasta. As unidades não se sobrepõem. Terrenos destruídos vão ao descarte; unidades existentes continuam ativas.
- A navegação usa A* ortogonal com distância Manhattan, desempate determinístico e cache limitado por ocupação e destino. Estruturas, torres e unidades bloqueiam células; rotas são recalculadas quando a ocupação muda. Se o alvo estiver inacessível, tenta-se outra torre; combatem-se bloqueadores quando aplicável.
- O turno tem 45 segundos; a desconexão de jogador vivo pausa por até 30 segundos. Depois desse prazo, o ausente perde a torre. A partir da rodada 36, cada torre viva perde 1 HP por rodada para evitar partidas intermináveis. A partida fica em memória e não sobrevive à reinicialização do servidor.
- Os recursos de Kenney e DezrasDragons (CC0) e suas licenças estão em `front/public/assets/hordes`. Os sons sintéticos são opcionais e começam somente após a pessoa ativá-los.

## Verificação e desempenho

Use `npm run test:hordes` para as regras e propriedades, `npm run test:hordes:e2e` para partidas e testes visuais no navegador, e `npm run test:hordes:benchmark` para medir A* com 24 unidades. O benchmark é local e não representa uma garantia para outros aparelhos. A configuração e o equilíbrio das novas cartas ainda precisam ser avaliados em partidas com pessoas; os números das simulações da versão anterior não se aplicam a esta economia.

Em uma medição local de 400 consultas com 24 unidades, houve 36 buscas efetivas e 364 reaproveitamentos de cache; o tempo p95 por consulta foi de aproximadamente 0,057 ms e foram visitados 340 nós nas buscas efetivas. Em outra amostra curta com quatro páginas Chrome simultâneas e 19 unidades observadas, as páginas registraram cerca de 61 FPS. Essas medições não substituem testes em celulares reais ou sessões prolongadas.

Uma amostra de 50 partidas automáticas por configuração terminou sem partidas presas, mas apresentou 14 empates com dois jogadores, 31 com três e 45 com quatro. Os bots são simples, mas essa frequência indica que o balanceamento da economia e das novas cartas ainda precisa de avaliação em partidas reais.
- Para reduzir idas e voltas, os quatro pontos anteriores da unidade recebem custo adicional na busca; obstáculos continuam sendo respeitados e um caminho alternativo é recalculado quando necessário.
