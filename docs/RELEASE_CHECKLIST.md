# Checklist de release

- [ ] Executar `npm ci`, `npm run lint:bomb`, `npm run test:bomb`, `npm run build`, `npm run test:bomb:e2e` e `npm audit`.
- [ ] Rodar regressão de chat, quiz e estilingue.
- [ ] Testar Firefox, WebKit, Safari e aparelhos Android/iOS reais.
- [ ] Executar testes de rede e segurança em staging isolado.
- [ ] Medir carga de acordo com os limites reais do plano do Render.
- [ ] Planejar reinícios, rollback e distribuição entre instâncias; partidas em memória são perdidas no reinício.
- [ ] Confirmar domínio e variável CLIENT_ORIGIN, HTTPS/WSS, observabilidade e plano de recuperação.

Não existe aqui um ambiente de staging, rollout gradual, flag de funcionalidade ou monitoramento externo configurado. O modo deve ser tratado como experimental até validações e revisão acima.
