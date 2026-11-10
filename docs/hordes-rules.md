# Torres & Hordas — regras

- O servidor controla os recursos, cartas, unidades, caminhos e dano. Cada cliente recebe apenas sua própria mão.
- Cada jogador começa com 2 carnes, 3 gemas e 0 mana. No início de cada turno do jogador, sua torre gera 1 carne, 1 gema e 1 mana.
- Cada terreno custa 2 gemas para construir, a até dois hexágonos da torre. Pode-se jogar qualquer quantidade de cartas por turno enquanto houver recursos e espaço disponíveis.
- Fazenda: 3 HP, produz 1 carne a cada turno do dono após a construção. Mina de Gemas: 3 HP, produz 1 gema a cada turno do dono após a construção.
- Terreno de Zumbis: 3 HP, tenta produzir 1 zumbi por 1 carne a cada dois turnos do dono após a construção. Terreno de Arqueiros: 2 HP, tenta produzir 1 arqueiro por 2 carnes no mesmo intervalo. Se a casa estiver ocupada ou faltar carne, a produção é perdida sem consumo.
- Golpe Devastador custa 2 manas e causa 4 de dano a uma unidade ou terreno inimigo. Não atinge torres ou aliados. É possível jogar várias magias e terrenos no mesmo turno.
- O mapa usa hexágonos, com seis vizinhos por casa. A movimentação e o alcance usam distância hexagonal. A visão é bloqueada por estruturas e torres. A navegação usa A* e evita obstáculos.
- O baralho contém 32 terrenos de zumbis, 28 fazendas, 20 terrenos de arqueiros, 20 minas, 12 golens e 16 golpes. Cada jogador começa com duas cartas aleatórias e compra até duas cartas por rodada, com limite de cinco na mão. O Golem pode aparecer no sorteio.
- Cada turno dura 45 segundos. Uma desconexão pausa a partida por até 30 segundos. A partir da rodada 36, torres perdem 1 HP por rodada. A partida fica em memória.
- O equilíbrio da economia deve ser avaliado em partidas com pessoas; medições de versões anteriores não se aplicam a estas regras.

- Golem é uma carta de monstro: custa 4 carnes, é invocado em uma casa livre a até dois hexágonos da torre, tem 4 de vida, causa 4 de dano corpo a corpo e se move uma casa. Além do ataque normal, arremessa automaticamente uma pedra por turno contra o inimigo ou estrutura mais próxima a até três hexágonos, causando 4 de dano; torres inimigas também podem ser atingidas.
