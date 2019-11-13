const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const app = express()
var processWindows = require("node-process-windows");
var ks = require('node-key-sender');

app.use('/', express.static(path.join(__dirname, 'public')))

server = http.createServer(app).listen(3000, function() {
    console.log('Example app listening on port 3000')
})

const io = socketio.listen(server)

io.on('connection', (socket) => {
    socket.on('callback', (data) => {
        texts = data.callback;
        console.log(texts);
        let sendList = texts.split(/,/);

        for (let i = 1; i < sendList.length; i++) {
          var spawn = require('child_process').spawn,
            ls = spawn('cmd.exe', ['/c', 'sendkeys.bat', sendList[0], sendList[i]]);

          ls.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
          });

          ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
          });

          ls.on('exit', function (code) {
            console.log('child process exited with code ' + code);
          });
        }
    })
})

