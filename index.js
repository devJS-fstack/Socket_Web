const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 3000;
const router = require('./src/routes/chat.routes')
const SocketServices = require('./src/services/chat.service')
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

global.__basedir = __dirname
// ==> Way 2
global._io = io

//  ==> Way 1
// app.use((req, res, next) => {
//   res.io = io;
//   next();
// })

app.use(router);

global._io.use((socket, next) => {
  const { token } = socket.handshake.headers;
  if (token && token === 'bear:::123') return next()
  return next(new Error('User is not log in'))
})
global._io.on('connection', SocketServices.connection)

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
