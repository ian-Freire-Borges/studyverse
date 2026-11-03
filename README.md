# Studyverse

Aplicação de salas de estudo com chat em tempo real, proposta para a A3 de Computação Gráfica e Realidade Virtual. A interface usa React, Bootstrap e CSS com vidro translúcido, gradientes e iluminação; o servidor usa Node.js, Socket.IO e MongoDB.

## Primeira versão

Crie uma sala, informe um nome e converse com outras pessoas na mesma sala. O servidor salva as mensagens no MongoDB e entrega mensagens novas em tempo real. As últimas 100 mensagens são carregadas ao entrar. O nome é livre: esta versão **não possui autenticação**, perfis ou moderação e não deve ser usada para informações sensíveis.

## Executar no computador

Requisitos: Node.js, npm e um MongoDB em execução, local ou remoto.

1. Execute `npm install` na pasta principal.
2. Copie `server/.env.example` para `server/.env` e defina `MONGODB_URI` com a conexão do banco.
3. Copie `client/.env.example` para `client/.env` e ajuste `VITE_API_URL` se necessário.
4. Execute `npm run dev`. Acesse o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Acesso entre máquinas

Para acesso pela internet, hospede o frontend e o servidor Node.js (com suporte a conexões Socket.IO) e use um MongoDB acessível pelo servidor. Configure `MONGODB_URI` e `CLIENT_ORIGIN` no servidor; este último deve conter a origem HTTPS exata do frontend, sem barra final. Configure `VITE_API_URL` com a URL HTTPS pública do servidor **antes de gerar o frontend** com `npm run build`. O frontend é gerado em `client/dist`; inicie o servidor com `npm start` na raiz. Jamais coloque credenciais do banco no frontend ou no GitHub. GitHub armazena o código, mas não executa por si só o servidor e o banco.

Para testes na mesma rede, use o endereço IP da máquina servidora no `VITE_API_URL` e ajuste `CLIENT_ORIGIN` para a origem usada pelo navegador. Os dispositivos precisam conseguir acessar as portas dos serviços.

## Próximos passos

- Adicionar autenticação, proteção contra abuso e moderação antes de disponibilizar a aplicação ao público.
- Pesquisar vagas reais e documentar as competências escolhidas.
- Acrescentar GIFs ou vídeos demonstrando o vidro, as animações e a iluminação, conforme o enunciado da A3.
- Evoluir acessibilidade, testes e recursos de foco.

## Testes

Execute `npm test` para verificar salas, entrega em tempo real entre clientes, isolamento, histórico e uso da interface em tamanhos de celular e computador. O teste cria um MongoDB temporário e requer Google Chrome instalado; na primeira execução, pode baixar o executável do MongoDB. Execute também `npm run build` para verificar a compilação de produção.
