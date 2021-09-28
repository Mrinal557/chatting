//Node Server which will handle socket io connections
var express = require("express");
var app=express();

const PORT =process.env.PORT || 5500
const io = require('socket.io')(PORT, {
    cors: {
      origin: '*',
    }
  });

// app.use(cors(corsOptions));
// var server=app.listen(5500);

// var io=require('socket.io')(server);
// server.listen(5500);

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', (name) => {
    // console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on("send", message => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id]
    })
  });
 
  socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
})

})



// http.listen(5500,()=>{
//     console.log(`server is listening on 5500`);
// });
