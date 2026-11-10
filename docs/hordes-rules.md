# Torres & Hordas — regras

- O servidor controla os recursos, cartas, unidades, caminhos e dano. Cada cliente recebe apenas sua própria mão.
- Cada jogador começa com 2 carnes, 3 gemas e 0 mana. No início de cada turno do jogador, sua torre gera 1 carne, 1 gema e 1 mana.
- Terrenos custam 2 gemas para construir, exceto o Vulcão que custa 4 gemas, a até dois hexágonos da torre. Pode-se jogar qualquer quantidade de cartas por turno enquanto houver recursos e espaço disponíveis.
- Fazenda: 3 HP, produz 1 carne a cada turno do dono após a construção. Mina de Gemas: 3 HP, produz 1 gema a cada turno do dono após a construção.
- Terreno de Zumbis: 3 HP, tenta produzir 1 zumbi por 1 carne a cada dois turnos do dono após a construção. Terreno de Arqueiros: 2 HP, tenta produzir 1 arqueiro por 2 carnes no mesmo intervalo. Se a casa estiver ocupada ou faltar carne, a produção é perdida sem consumo.
- Golpe Devastador custa 2 manas e causa 4 de dano a uma unidade ou terreno inimigo. Não atinge torres ou aliados. É possível jogar várias magias e terrenos no mesmo turno.
- O mapa usa hexágonos, com seis vizinhos por casa. A movimentação e o alcance usam distância hexagonal. A visão é bloqueada por estruturas e torres. A navegação usa A* e evita obstáculos.
- O baralho contém 32 terrenos de zumbis, 28 fazendas, 20 terrenos de arqueiros, 20 minas, 12 forjas, 12 vulcões, 12 muros, 12 golens, 16 golpes e 12 conversões. Cada jogador começa com duas cartas aleatórias e compra até duas cartas por rodada, com limite de cinco na mão. O Golem pode aparecer no sorteio.
- Cada turno dura 45 segundos. Uma desconexão pausa a partida por até 30 segundos. A partir da rodada 36, torres perdem 1 HP por rodada. A partida fica em memória.
- O equilíbrio da economia deve ser avaliado em partidas com pessoas; medições de versões anteriores não se aplicam a estas regras.

- Golem é uma carta de monstro: custa 4 carnes, é invocado em uma casa livre a até dois hexágonos da torre, tem 4 de vida, causa 4 de dano corpo a corpo e se move uma casa. Além do ataque normal, arremessa automaticamente uma pedra por turno contra o inimigo ou estrutura mais próxima a até três hexágonos, causando 4 de dano; torres inimigas também podem ser atingidas.

- Selecione um monstro para ver sua rota e escolher sua torre. Terrenos produtores transmitem a torre escolhida aos monstros produzidos. Cada alvo pode ser alterado a qualquer momento. Monstros priorizam a criatura inimiga alcançável mais próxima; se não houver, procuram a estrutura inimiga alcançável mais próxima.

- A ordem de turnos é sorteada uma única vez no início da partida e permanece igual nas rodadas seguintes. Jogadores eliminados são retirados da ordem.

- Em cada ataque normal, contra-ataque ou pedra do Golem, atacante e alvo lançam 1d6. O dano só acontece se o dado do atacante for maior; empate e defesa maior bloqueiam o golpe. A magia Golpe Devastador conserva seu efeito direto.

- Forja: terreno de 3 HP que custa 2 gemas. Zumbis gerados em uma casa hexagonal adjacente a uma Forja aliada recebem escudo permanente contra danos de arqueiros. O escudo permanece após a Forja ser destruída e não protege de outros ataques ou magias.

- Conversão custa 3 manas e transforma um monstro inimigo vivo em aliado, preservando sua vida e habilidades. Não afeta torres nem estruturas e respeita o limite de unidades.
- Vulcão custa 4 gemas e possui 3 HP; a cada 3 turnos do dono tenta gerar um demônio de fogo por 3 carnes. O demônio tem 5 HP, 5 de dano e movimenta até 5 hexágonos por turno.

- Muro: terreno que custa 2 gemas, bloqueia a passagem de todas as unidades e a linha de visão. Não pode ser alvo de ataques ou magias e não sofre dano.
