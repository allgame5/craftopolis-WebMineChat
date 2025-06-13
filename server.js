import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Rcon from 'modern-rcon';

const app = express();
const srv = http.createServer(app);
const io = new Server(srv);
app.use(express.static('public'));

const rcon = new Rcon(
  process.env.RCON_HOST,
  Number(process.env.RCON_PORT),
  process.env.RCON_PASSWORD
);

await rcon.connect();

io.on('connection', socket => {
  socket.on('chatOut', async ({ user, msg }) => {
    const cmd = user
      ? `tell ${user} [WEB] ${msg}`
      : `say [WEB] ${msg}`;
    await rcon.send(cmd);
  });
});

srv.listen(3000, () => console.log('Running on http://localhost:3000'));
