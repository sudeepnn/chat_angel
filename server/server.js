const io=require('socket.io')(3000,{
    cors:{
        origin:"*",
    },
})
const user={}
io.on('connection',socket=>{
    console.log(socket.id)
    // socket.on('new-user',name=>{
    //     user[socket.id]=name
    //     socket.broadcast.emit('user-connected',name)
    //     console.log(user)
    // })
    socket.on("send-message",({name,room,message})=>{
        // if(room===''){
            // socket.broadcast.emit('recieve-message',{message:message,name:user[socket.id]})
        // }
        // else{
            socket.to(room).emit('recieve-message',{message:message,name:user[socket.id]})
        // }
       
    })
    socket.on("join-room",({name,room})=>{
        user[socket.id]=name
        user["room"]=room
        socket.to(room).emit('user-connected',name)
        console.log(user)

        socket.join(room)
        
    })
})
