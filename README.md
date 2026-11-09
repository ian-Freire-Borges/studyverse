# Studyverse

Aplicação de salas para conversar e jogar em tempo real, proposta para a A3 de Computação Gráfica e Realidade Virtual. A interface usa React, Bootstrap e CSS com vidro translúcido, gradientes e iluminação; o servidor usa Node.js, Socket.IO e MongoDB.

## Primeira versão

Cadastre-se com nome, e-mail e senha e escolha um avatar ilustrado. Depois entre em uma sala para conversar em tempo real. O servidor salva as últimas mensagens no MongoDB. As senhas são armazenadas como hashes; a versão inicial ainda não possui recuperação de senha, verificação de e-mail ou moderação.

Cada conta tem um código único de oito dígitos, gerado automaticamente. Na aba Amigos e pessoas é possível buscar por nome, adicionar pelo código e remover amigos. Adicionar alguém inclui as duas contas nas listas, sem solicitação de aceite nesta versão.

Salas podem ser criadas com ou sem senha e com um dos quatro temas visuais: Cosmos, Aurora, Solar e Oceano. O criador pode excluir sua sala; cada pessoa pode editar ou apagar as próprias mensagens. Salas antigas não registraram criador e, portanto, não podem ser excluídas pelo aplicativo até que a propriedade seja definida com segurança.

Salas de quiz permitem duelos de dois jogadores, com dez perguntas por partida, turnos alternados, 20 segundos por resposta e retorno à sala ao final. É possível escolher a categoria e compartilhar um convite. O servidor controla as respostas e a pontuação; uma desconexão temporária pausa a partida para reconexão. As partidas em andamento ficam na memória do servidor e são reiniciadas se ele for reiniciado.

O modo Estilingue 1v1 tem arenas escolhidas na criação da sala, 12 lançamentos alternados e 20 segundos por turno. Arraste para trás ou use os controles de ângulo e força. A física e o dano são calculados no servidor; uma queda de conexão pausa o jogo por até 90 segundos. Assim como no quiz, partidas em andamento ficam na memória e são perdidas se o servidor reiniciar.

## Executar no computador

Requisitos: Node.js, npm e um MongoDB em execução, local ou remoto.

1. Execute `npm install` na pasta principal.
2. Copie `back/.env.example` para `back/.env` e defina `MONGODB_URI` com a conexão do banco e `JWT_SECRET` com uma chave aleatória privada de pelo menos 32 caracteres.
3. Copie `front/.env.example` para `front/.env` e ajuste `VITE_API_URL` se necessário.
4. Execute `npm run dev`. Acesse o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Próximos passos

- Adicionar recuperação de senha, verificação de e-mail, moderação e proteção adicional contra abuso antes do uso público.
- Pesquisar vagas reais e documentar as competências escolhidas.
- Acrescentar GIFs ou vídeos demonstrando o vidro, as animações e a iluminação, conforme o enunciado da A3.
- Evoluir acessibilidade, testes e recursos de foco.
