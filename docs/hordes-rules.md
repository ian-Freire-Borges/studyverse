# Torres & Hordas — regras

- O servidor controla os recursos, cartas, unidades, caminhos e dano. Cada cliente recebe apenas sua própria mão.
- Cada jogador começa com 2 carnes, 3 gemas e 0 mana. No início de cada turno do jogador, sua torre gera 1 carne, 1 gema e 1 mana.
- Terrenos custam 2 gemas para construir, exceto a Forja e o Treino de Mago, que custam 3 gemas, o Campo de Aranhas, o Vulcão e a Torre Defensiva, que custam 4, e o Campo de Titã, que custa 10, a até dois hexágonos da torre; monstros podem ser invocados a até três. Pode-se jogar qualquer quantidade de cartas por turno enquanto houver recursos e espaço disponíveis.
- Fazenda: 3 HP, produz 1 carne a cada turno do dono após a construção. Mina de Gemas: 3 HP, produz 1 gema a cada turno do dono após a construção.
- Terreno de Zumbis: 3 HP, tenta produzir 1 zumbi por 1 carne a cada dois turnos do dono após a construção. Terreno de Arqueiros: 2 HP, tenta produzir 1 arqueiro por 2 carnes no mesmo intervalo. Se a casa estiver ocupada ou faltar carne, a produção é perdida sem consumo.
- Golpe Devastador custa 2 manas e causa 4 de dano a uma unidade ou terreno inimigo. Não atinge torres ou aliados. É possível jogar várias magias e terrenos no mesmo turno.
- O mapa usa hexágonos, com seis vizinhos por casa. A movimentação e o alcance usam distância hexagonal. A visão é bloqueada por estruturas e torres. A navegação usa A* e evita obstáculos.
- Cada jogador tem seu próprio baralho e descarte. Cada baralho contém 32 terrenos de zumbis, 28 fazendas, 20 terrenos de arqueiros, 20 minas, 12 forjas, 12 vulcões, 12 torres defensivas, 12 golens, 16 golpes e 12 conversões. Cada jogador começa com duas cartas aleatórias e compra até duas cartas por rodada, sem limite de cartas na mão. O Golem pode aparecer no sorteio.
- Cada turno dura 45 segundos. Uma desconexão pausa a partida por até 30 segundos. A partir da rodada 36, torres perdem 1 HP por rodada. A partida fica em memória.
- O equilíbrio da economia deve ser avaliado em partidas com pessoas; medições de versões anteriores não se aplicam a estas regras.

- Golem é uma carta de monstro: custa 4 carnes, é invocado em uma casa livre a até dois hexágonos da torre, tem 4 de vida, causa 4 de dano corpo a corpo e se move uma casa. Além do ataque normal, arremessa automaticamente uma pedra por turno contra o inimigo ou estrutura mais próxima a até três hexágonos, causando 4 de dano; torres inimigas também podem ser atingidas.

- Selecione um monstro para ver sua rota e escolher sua torre. Terrenos produtores transmitem a torre escolhida aos monstros produzidos. Cada alvo pode ser alterado a qualquer momento. Monstros priorizam a criatura inimiga alcançável mais próxima; se não houver, procuram a estrutura inimiga alcançável mais próxima.

- A ordem de turnos é sorteada uma única vez no início da partida e permanece igual nas rodadas seguintes. Jogadores eliminados são retirados da ordem.

- Em cada ataque normal, contra-ataque ou pedra do Golem, atacante e alvo lançam 1d6. O dano só acontece se o dado do atacante for maior; empate e defesa maior bloqueiam o golpe. A magia Golpe Devastador conserva seu efeito direto.

- Forja: terreno de 3 HP que custa 3 gemas e cria aleatoriamente uma carta de Espada ou Escudo a cada turno do dono. Espada aumenta o dano de um monstro aliado em 2; Escudo absorve até 2 pontos de dano, inclusive corpo a corpo e magias. Equipamentos não custam recursos ao serem usados. Espadas e escudos acumulam no mesmo monstro: cada espada adiciona 2 de dano e cada escudo adiciona 2 de proteção.

- Conversão custa 3 manas e transforma um monstro inimigo vivo em aliado, preservando sua vida e habilidades. Não afeta torres nem estruturas e respeita o limite de unidades.
- Vulcão custa 4 gemas e possui 5 HP; a cada 3 turnos do dono tenta gerar um demônio de fogo por 3 carnes. O demônio tem 5 HP, 5 de dano e movimenta até 5 hexágonos por turno; se errar o primeiro ataque, tenta uma segunda vez.

- Torre Defensiva: custa 4 gemas, tem 10 HP e, no início de cada turno do dono após sua construção, ataca uma vez por turno a até 4 casas, priorizando a criatura inimiga mais próxima e, na ausência de criaturas, a estrutura mais próxima, causando 3 de dano se vencer a disputa de dados. Torres principais inimigas também podem ser atingidas.

- No próprio turno, o jogador pode devolver uma carta da mão ao próprio baralho e comprar outra até três vezes. O limite reinicia em cada turno; se não houver outra carta no baralho nem no descarte, a troca fica indisponível.

- Campo de Titã custa 10 gemas, tem 5 HP e gera um Titã a cada 5 turnos por 10 carnes. O Titã tem 10 de vida, 10 de dano, anda até 4 casas, pode atacar até três vezes por turno e é imune a magias ofensivas. Se não puder ser invocado no turno previsto, o campo tenta novamente a cada turno até conseguir.
- Planta é um monstro que custa 4 carnes e 2 gemas, possui 6 de vida e 6 de dano, não anda e não pode ser alvo de ataques à distância ou magias hostis. Pode combater corpo a corpo.

- Campo de Aranhas custa 4 gemas e tem 3 HP. A cada turno gera uma aranha por 1 carne; ela tem 1 de vida, 2 de dano, anda até 4 casas e ataca até duas vezes.

- Herói: cada baralho tem uma carta. Custa 10 carnes, 10 gemas e 10 manas; tem 12 de vida e 5 de dano. Seu ataque sempre acerta e recupera vida igual ao dano efetivo, até 100. Teleporta para perto do inimigo mais próximo quando há um espaço livre adjacente; sem inimigos, move até 5 casas em direção às estruturas. A mesma carta não invoca outro Herói enquanto o anterior estiver vivo.

- A mão não tem limite de cartas; compras e equipamentos da Forja são adicionados normalmente.

- Treino de Mago: custa 3 gemas e gera um mago por 1 carne a cada 2 turnos. O mago tem 1 de vida, anda 1 casa e prende uma criatura inimiga a até 4 casas, causando 1 de dano por turno. Enquanto mantém a corrente, não anda nem muda de alvo. O alvo fica impedido de se mover até morrer ou a corrente ser interrompida.

- Antes da partida, cada jogador pode escolher Humanos, Orcs ou Mortos-vivos. A classe altera apenas nomes e aparência; custos, baralhos, atributos e habilidades permanecem iguais. A escolha é compartilhada com a sala e preservada durante a reconexão.
