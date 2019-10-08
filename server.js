const server = require('net').createServer()
let counter = 0
let sockets = {}

function timestamp(){
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes()}`
}

server.on('connection', socket => {
    socket.id = counter++
    console.log('Client connected')
    socket.write('Please type your name: ')



    socket.on('data', data => {
        if (!sockets[socket.id]){
            socket.name = data.toString().trim()
            socket.write(`Welcome ${socket.name}!\n`)
            socket[socket.id] = socket
            return
        }
        Object.entries(sockets).forEach(([key, client_soc]) => {
            if(socket.id = key) return
            client_soc.write(`${socket.name} ${timestamp()}: `);
            client_soc.write(data)
        })
    })

    socket.on('end', ()=>{
        delete sockets[socket.id]
        console.log(`Client disconnected`)
    })
})

server.listen(8000, ()=> console.log('Listening'))