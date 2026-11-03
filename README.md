# Studyverse

Aplicação de salas de estudo com chat em tempo real, proposta para a A3 de Computação Gráfica e Realidade Virtual. A interface usa React, Bootstrap e CSS com vidro translúcido, gradientes e iluminação; o servidor usa Node.js, Socket.IO e MongoDB.

## Primeira versão

Crie uma sala, informe um nome e converse com outras pessoas na mesma sala. O servidor salva as mensagens no MongoDB e entrega mensagens novas em tempo real. As últimas 100 mensagens são carregadas ao entrar. O nome é livre: esta versão **não possui autenticação**, perfis ou moderação e não deve ser usada para informações sensíveis.

## Executar no computador

Requisitos: Node.js, npm e um MongoDB em execução, local ou remoto.

1. Execute `npm install` na pasta principal.
2. Copie `back/.env.example` para `back/.env` e defina `MONGODB_URI` com a conexão do banco.
3. Copie `front/.env.example` para `front/.env` e ajuste `VITE_API_URL` se necessário.
4. Execute `npm run dev`. Acesse o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Próximos passos

- Adicionar autenticação, proteção contra abuso e moderação antes de disponibilizar a aplicação ao público.
- Pesquisar vagas reais e documentar as competências escolhidas.
- Acrescentar GIFs ou vídeos demonstrando o vidro, as animações e a iluminação, conforme o enunciado da A3.
- Evoluir acessibilidade, testes e recursos de foco.

