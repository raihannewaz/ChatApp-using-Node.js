
var express = require("express")
var path = require('path')
var app = express();
var server = require('http').createServer(app);

var io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " Joined the conversation")
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " Left the conversation")
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message)
    });
})


var port = 1234;
server.listen(port);
console.log('Server is running on port: '+port);

