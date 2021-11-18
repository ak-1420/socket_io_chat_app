const express = require('express')

const app = express()

const cors = require('cors')

const http = require('http')

const {Server} = require('socket.io')

const port = process.env.PORT || 3001

app.use(cors())

const server =  http.createServer(app);

const io = new Server(server , {
    cors:{
       origin: 'https://instant-chatter.netlify.app/' ,
       methods:['GET' , 'POST']
    }
})

io.on('connection',(socket) => {

 console.log(`user connected: ${socket.id}`)

 socket.on('join_room' ,(data) => {
     socket.join(data)
     console.log(`user with id: ${socket.id} joined the room: ${data}`)
 })


 socket.on('send_message' , (data) => {
   socket.to(data.room).emit('receive_message' , data)
 })

 socket.on('disconnect' ,() => {
     console.log('user disconnected:' , socket.id)
 })

})

app.get('/' ,(req , res) => {
    res.send('<h1>One to One Chat Server</h1>')
})


server.listen(port, () => {
    console.log(`server running on port ${port}`)
})