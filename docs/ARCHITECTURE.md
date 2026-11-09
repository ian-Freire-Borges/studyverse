# Arquitetura do Bomb Arena

Auditoria antes da implementação: este checkout não possuía Bomb Arena. O site usa React 18, Vite 6 e Bootstrap 5; a API usa Node.js, Express, Mongoose/MongoDB, autenticação JWT e Socket.IO. Salas públicas e privadas, senhas com bcrypt, chat, quiz e estilingue já existiam. Frontend é publicado na Vercel e backend no Render. Não havia baseline específico de Bomb Arena.

O novo modo usa `back/bomb/core.js` para a simulação determinística independente de navegador, com grade 13×11, seed, ticks de 50 ms, até quatro jogadores, três vidas, bombas, fogo, blocos, quatro tipos de item e resultado. `back/bomb/network.js` controla lobby e fase, valida intenções e retransmite snapshots. `front/src/BombArena.jsx` usa Phaser 3.90 por importação dinâmica para desenhar os sprites e interpolar movimentos, sem usar Matter.js neste modo. O estado do servidor é autoritativo; a previsão local é visual e é substituída pelo snapshot. Recursos e jogos existentes foram preservados.

Limitações: partidas ficam na memória de um processo. Reinício perde partidas. Múltiplas instâncias exigem roteamento de partidas e um armazenamento compartilhado adequado; o código atual não implementa isso. A arquitetura atual não é uma comprovação de prontidão para produção.
