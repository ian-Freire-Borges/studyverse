# Rede e protocolo

Socket.IO autenticado pelo JWT existente. A entrada ocorre após `room:join`, que valida o acesso à sala e a senha nas salas privadas. `bomb:join`, `bomb:start`, `bomb:input`, `bomb:rematch`, `bomb:lobby`, `bomb:leave` e `bomb:ping` operam na sala autorizada. `bomb:state` usa versão 1, estado completo e tick. Inputs aceitam somente `seq` e `action`; a sequência deve crescer e cada conexão tem teto de 20 eventos por segundo. O estado é transmitido normalmente a 10 Hz; não há compressão delta. O identificador de sessão do jogador é o ID autenticado, não o ID efêmero do socket.

Na desconexão de um jogador vivo, a partida pausa por até 15 segundos; ao reconectar, o servidor reenvia o estado e retoma. Passado o prazo, o jogador ausente é eliminado; se ninguém permanecer, a sessão é removida. Estados de resultado e revanche são decididos no servidor.

A prévia local de movimento é provisória, dura até 450 ms e é reconciliada ao receber a sequência autoritativa. Não há rollback, persistência de partida, roteamento entre instâncias ou recuperação automática de processo. WebSocket usa TCP: descarte de mensagens na aplicação não equivale à perda de pacotes IP. Para testes de rede reais, use um proxy de rede em ambiente isolado e anote RTT, jitter e perdas; não execute falhas no serviço de produção.
