# Torres & Hordas — regras

- O servidor controla os recursos, cartas, unidades, caminhos e dano. Cada cliente recebe apenas sua própria mão.
- Cada jogador começa com 2 carnes, 3 gemas e 0 mana. No início do turno do jogador nas rodadas pares, sua torre gera 1 gema e 1 mana.
- Cada terreno custa 2 gemas para construir, a até dois hexágonos da torre. Só é permitida uma construção por turno.
- Fazenda: 3 HP, produz 1 carne a cada turno do dono após a construção. Mina de Gemas: 3 HP, produz 1 gema a cada turno do dono após a construção.
- Terreno de Zumbis: 3 HP, tenta produzir 1 zumbi por 1 carne a cada dois turnos do dono após a construção. Terreno de Arqueiros: 2 HP, tenta produzir 1 arqueiro por 2 carnes no mesmo intervalo. Se a casa estiver ocupada ou faltar carne, a produção é perdida sem consumo.
- Golpe Devastador custa 2 manas e causa 4 de dano a uma unidade ou terreno inimigo. Não atinge torres ou aliados. É possível jogar um golpe e construir um terreno no mesmo turno.
- O mapa usa hexágonos, com seis vizinhos por casa. A movimentação e o alcance usam distância hexagonal. A visão é bloqueada por estruturas e torres. A navegação usa A* e evita obstáculos.
- O baralho contém 32 terrenos de zumbis, 28 fazendas, 20 terrenos de arqueiros, 20 minas e 16 golpes. Compram-se até duas cartas por rodada, até cinco na mão.
- Cada turno dura 45 segundos. Uma desconexão pausa a partida por até 30 segundos. A partir da rodada 36, torres perdem 1 HP por rodada. A partida fica em memória.
- O equilíbrio da economia deve ser avaliado em partidas com pessoas; medições de versões anteriores não se aplicam a estas regras.
