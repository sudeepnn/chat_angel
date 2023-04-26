// import {io} from 'socket.io-client'
const message=document.getElementById("message")
const messageinput=document.getElementById("messageinput")
const sendbtn=document.getElementById("sendbtn")
const username=document.getElementById("name")

const roominput=document.getElementById("roominput")
const form=document.getElementById("form")

const socket=io('http://localhost:3000')

const{name,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(name,room)

joinmessage("You Joined")

socket.emit('join-room',{name,room})
// socket.on("connect",()=>{
//     displaymessage(`you have connected to ${socket.id}`)
// })

socket.on('user-connected',user=>{
    joinmessage(`${user} Joined`)

})

socket.on('recieve-message',data=>{
    incomingdis(`${data.name} : ${data.message}`)
})

form.addEventListener("submit",e=>{
    e.preventDefault()
    const message=messageinput.value
    if(message==="")return
    displaymessage("You : "+message)
    socket.emit('send-message',{name,room,message})
    messageinput.value=""
})

// joinbtn.addEventListener("click",()=>{
//     const room=roominput.value
//     const username=username.value
//     socket.emit('new-user',username)
//     socket.emit("join-room",room)
// })
function joinmessage(message){
    const div=document.createElement("div")
    // div.className="chat"
    div.classList.add("join");
    div.textContent=message
    document.getElementById("message").append(div)
}

function displaymessage(message){
    const div=document.createElement("div")
    // div.className="chat"
    div.classList.add("chat");
    div.classList.add("outgoing");
    div.textContent=message
    document.getElementById("message").append(div)
}
function incomingdis(message){
    const div=document.createElement("div")
    // div.className="chat"
    div.classList.add("chat");
    div.classList.add("incoming");
    div.textContent=message
    document.getElementById("message").append(div)
}
