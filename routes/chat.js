const socketio = require('socket.io')
const io =  socketio.listen(server)

io.on('connection', (socket) => {
    socket.on('sendMessage', (msg) => {
        socket.brodcast.emit('sendToAll', msg)
    })
})