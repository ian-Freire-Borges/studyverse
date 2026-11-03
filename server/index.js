import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Defina MONGODB_URI em server/.env');
await mongoose.connect(uri);
const Room = mongoose.model('Room', new mongoose.Schema({ name: {type:String, required:true, maxlength:60}, topic: {type:String, maxlength:120, default:''} }, {timestamps:true}));
const Message = mongoose.model('Message', new mongoose.Schema({ room: {type:mongoose.Schema.Types.ObjectId, ref:'Room', required:true, index:true}, author: {type:String, required:true, maxlength:32}, text: {type:String, required:true, maxlength:1000} }, {timestamps:true}));
const app = express();
const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim());
app.use(cors({origin:origins}));
app.use(express.json({limit:'8kb'}));
const server = createServer(app);
const io = new Server(server, {cors:{origin:origins}});
const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0,max) : '';
app.get('/api/health', (_req,res) => res.json({ok:true}));
app.get('/api/rooms', async (_req,res) => { try { res.json(await Room.find().sort({createdAt:-1}).limit(100).lean()); } catch { res.status(500).json({error:'Não foi possível carregar as salas.'}); } });
app.post('/api/rooms', async (req,res) => { try { const name=clean(req.body.name,60), topic=clean(req.body.topic,120); if (!name) return res.status(400).json({error:'Informe o nome da sala.'}); const room=await Room.create({name,topic}); io.emit('room:created',room); res.status(201).json(room); } catch { res.status(500).json({error:'Não foi possível criar a sala.'}); } });
app.get('/api/rooms/:id/messages', async (req,res) => { try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({error:'Sala inválida.'}); const messages=await Message.find({room:req.params.id}).sort({createdAt:-1}).limit(100).lean(); res.json(messages.reverse()); } catch { res.status(500).json({error:'Não foi possível carregar as mensagens.'}); } });
io.on('connection', socket => {
 socket.on('room:join', async (id, ack=()=>{}) => { try { if (!mongoose.isValidObjectId(id) || !await Room.exists({_id:id})) return ack({error:'Sala não encontrada.'}); if (socket.data.room) socket.leave(socket.data.room); socket.join(id); socket.data.room=id; ack({ok:true}); } catch { ack({error:'Não foi possível entrar na sala.'}); } });
 socket.on('message:send', async (payload, ack=()=>{}) => { try { const author=clean(payload?.author,32), text=clean(payload?.text,1000), room=socket.data.room; if (!room || !author || !text) return ack({error:'Informe seu nome e uma mensagem.'}); const message=await Message.create({room,author,text}); io.to(room).emit('message:new',message); ack({ok:true}); } catch { ack({error:'Não foi possível enviar a mensagem.'}); } });
});
server.listen(Number(process.env.PORT)||3001,'0.0.0.0',()=>console.log('Studyverse API pronta'));
