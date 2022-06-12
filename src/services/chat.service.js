class SocketServices {
    // connection service
    connection(socket) {
        socket.on('disconnect', () => {
            console.log('User is disconnecting ' + socket.id)
        })

        socket.on('chat message', msg => {
            console.log('msg is: ' + msg)
            _io.emit('chat message', msg);
        })
    }
}

module.exports = new SocketServices