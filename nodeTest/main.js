var express = require('express');
var app1 = express();
var app2 = express();
var server1 = require('http').Server(app1);
var server2 = require('http').Server(app2);
var io1 = require('socket.io')(server1);
var io2 = require('socket.io')(server2);

var serverPort = 3001;
var webSocketPort = 3002;

var flag = false;

server1.listen(serverPort, function() {
  console.log("Node server is listening on port %d", serverPort);
});
server2.listen(webSocketPort, function() {
  console.log("Node server is listening on port %d", webSocketPort);
});

app1.get('/', function(req, res){
  res.sendFile(__dirname + '/button.html');
  console.log(3001)
})

app2.get('/', function(req, res){
  res.sendFile(__dirname + '/WebAudio.html');
  console.log(3002)
})

io1.on('connection', (socket) => {
    console.log('Hello! I am ' + serverPort);  // 顯示 Hello!

    socket.on("press", () => {
        io2.emit("play");
        console.log('go to play');
    });

    // 當發生離線事件
    socket.on('disconnect', () => {
        console.log('Bye~' + serverPort);  // 顯示 bye~
    });
});

io2.on('connection', (socket) => {
    console.log('Hello! I am ' + webSocketPort);  // 顯示 Hello!

    // 當發生離線事件
    socket.on('disconnect', () => {
        console.log('Bye~' + webSocketPort);  // 顯示 bye~
    });
});
