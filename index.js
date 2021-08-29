const historyChatController = require('./src/controllers/historyChatController');
const usersChatController = require('./src/controllers/usersChatController')
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var usuarios = []
var mensagens = []
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.get("/chat/lastmessages",(req,res)=>{
    historyChatController.getHistory(req,res)
})

 io.on('connection',(socket)=>{
    socket.on("novo usuario",async (user)=>{
        const check = await usersChatController.newUser(user.usuario)
        if(check == undefined){
            socket.broadcast.emit("conectado",user)
            socket.emit("novo usuario",{sucesso:true})
        }else{
            console.log("ja existe")
            socket.emit("novo usuario",{sucesso:false})
        }
       
    })
    socket.on("chat message",(obj)=>{
        io.emit("chat message",obj)
        historyChatController.history(obj.nome,obj.message)
    })
})
 


http.listen(3000, () => {

  console.log('listening on *:3000');

});