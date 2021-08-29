const historyChatController = require('./src/controllers/historyChatController');

const app = require('express')();

const http = require('http').createServer(app);
const history = require("./src/controllers/historyChatController")
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
    socket.on("novo usuario",(user)=>{
        !usuarios.includes(user.usuario) && usuarios.push(user.usuario)
        console.log("usuarios ativos:",usuarios)
        socket.broadcast.emit("conectado",user)
    })
    socket.on("chat message",(obj)=>{
        mensagens.push({nome:obj.nome,mensagem:obj.message})
        io.emit("chat message",obj)
        history.history(obj.nome,obj.message)
    })


})
 


http.listen(3000, () => {

  console.log('listening on *:3000');

});