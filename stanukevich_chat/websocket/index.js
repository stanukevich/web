var express = require('express')
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http,{cors: {origin: '*'}});

var {createMessage, getMessages} = require("./http//UserAPI")

io.on('connection', (socket) => {

    socket.on('reqToReceiveMessages', async () => {
        try{
            const messages = await getMessages()
            // console.log(messages.data)
            io.emit('resToReceiveMessages', messages.data) 
        }
        catch(e) {
            console.log(e)
        }
     });

    socket.on('reqToCreateNewMessage', async (data) => {
        try{
           await createMessage(data._message, data.userId)
            const messages = await getMessages()
            // console.log(messages.data)
            io.emit('resToReceiveMessages', messages.data) 
        }
        catch(e) {
            console.log(e)
        }
     });
})

const start = async () => {
    try {
        http.listen(9000, () => {console.log("WEBSOCKET SERVER STARTED ON PORT = 9000")})
    } catch (error) {
        console.log(error)
    }
}

start()