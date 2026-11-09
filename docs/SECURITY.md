# Segurança

A API utiliza JWT, senha de sala com bcrypt e validação de acesso antes de entrar no canal. O servidor controla posições, bombas, vidas e resultados. O Socket.IO rejeita Origins presentes fora de `CLIENT_ORIGIN`, aceita clientes sem cabeçalho Origin mediante autenticação, limita payload a 16 KiB e limita inputs de Bomb Arena a 20 por segundo por socket. O núcleo rejeita ações desconhecidas, sequência antiga e inputs após o fim.

Foram testadas origem de navegador indevida, senha incorreta, comandos malformados, comando duplicado, quinto jogador e disputa pela última vaga. Isso não substitui pentest, análise OWASP completa, auditoria de segredo, execução real do CodeQL ou proteção distribuída de abuso. O limite é por socket, não por conta ou IP; ausências de Origin e ligações múltiplas são riscos a considerar. Não incluir tokens ou senhas nos logs.

`npm audit --omit=dev` retornou zero vulnerabilidades na execução local. O audit completo reportou sete alertas moderados transitivos em ferramentas de desenvolvimento (minimatch no ESLint/Stryker e qs em typed-rest-client usado pelo Stryker); a análise usa arquivos e padrões do próprio projeto; os avisos precisam ser revistos e as dependências atualizadas quando houver correção compatível. Não foram observados alertas altos ou críticos no audit executado.

O fluxo CodeQL e o Dependabot estão configurados no repositório, mas ainda não foram executados no GitHub nesta sessão. A checagem TypeScript estrita com `checkJs` cobre somente `back/bomb/core.js`; não é tipagem estrita de todo o aplicativo.
