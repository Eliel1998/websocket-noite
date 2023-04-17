const express = require("express")
const app = express()

app.use(express.static("public"))

const http = require("http").createServer(app)
const serverSocket = require("socket.io")(http)

const PORT = 8000
http.listen(PORT, () => console.log("Servidor iniciado na porta: " + PORT))

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

serverSocket.on("connect", (socket) => {
  console.log("Conectado ao servidor cliente " + socket.id) 
    socket.on("message", (texto) => {
        console.log("Mensagem recebida: " + texto)
        serverSocket.emit("message", texto)
    })

  socket.on("login", login => {socket.broadcast.emit("login", login)})
  
  socket.on("status", texto => {socket.broadcast.emit("status", socket.login + " " + texto)})
})
