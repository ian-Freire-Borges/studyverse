# Plano de testes

| Verificação | Ferramenta | Frequência / estado |
|---|---|---|
| Regras e invariantes, incluindo 200 sequências geradas com seed 1621 | Vitest + fast-check | `npm run test:bomb`, CI |
| Salas, cinco contas, concorrência, navegador, teclado, toque, resultado e revanche | Playwright + MongoDB temporário | `npm run test:bomb:e2e`, CI |
| Carga local progressiva 10/25/50/100 salas com clientes Socket.IO reais | `npm run test:bomb:load` | manual, ambiente isolado |
| Dependências de severidade alta ou crítica | npm audit | CI |
| Mutação em limites da grade e resultado | Stryker | `npm run test:bomb:mutation`, fluxo manual |
| Verificação estática limitada ao código novo | ESLint | `npm run lint:bomb`, CI |
| Tipos estritos do núcleo JavaScript | TypeScript `checkJs` | `npm run typecheck:bomb`, CI |
| SAST | CodeQL | configurado na CI; execução ainda não verificada |
| Sessão contínua curta | clientes Socket.IO | amostra local de 120 segundos executada |
| Rede com perda/jitter real, mutation testing, WebKit/Firefox/Safari, aparelhos físicos, revisão humana | ferramenta/hardware apropriado | pendente |

O teste E2E baixa ou usa binário do MongoDB de teste; instale o Chromium com `npx playwright install chromium`. `BOMB_BROWSER_CHANNEL=chrome` escolhe Chrome instalado. `BOMB_ARTIFACT_DIR` define a pasta das capturas temporárias. Os testes não usam o banco de produção.

O workflow `Bomb Arena extended checks` é manual para evitar consumo inesperado de recursos; executa carga e teste de mutação em infraestrutura isolada. O teste prolongado de uma hora foi dispensado pelo usuário e não foi executado.
