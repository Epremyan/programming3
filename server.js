var Grass = require("./modules/grass.js");
var Xotaker = require("./modules/xotaker.js");
var Gishatich = require("./modules/gishatich.js");
var Object1 = require("./modules/object1.js");
var Object2 = require("./modules/object2.js");

grassArr = [];
xotakerArr = [];
gishatichArr = [];
object1Arr = [];
object2Arr = [];
matrix = [];

var n = 20;
weath = "winter";

function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))

    }
}




function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y)
                xotakerArr.push(xt)
            }
            else if (matrix[y][x] == 3) {
                var gsh = new Gishatich(x, y)
                gishatichArr.push(gsh)
            }
            else if (matrix[y][x] == 4) {
                var ob = new Object1(x, y)
                object1Arr.push(ob)
            }
            else if (matrix[y][x] == 5) {
                var ob2 = new Object2(x, y)
                object2Arr.push(ob2)
            }
        }
    }
    // io.sockets.emit('send matrix', matrix)
}
createObject()

var express = require('express');
// const { setInterval } = require("timers");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mult()
        }
    }
    for (var i in xotakerArr) {
        xotakerArr[i].eat()
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat()
    }
    for (var i in object1Arr) {
        object1Arr[i].eat()
    }
    for (var i in object2Arr) {
        object2Arr[i].eat()
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: xotakerArr.length,
        gishatichCounter: gishatichArr.length,
        object1Counter: object1Arr.length,
        object2Counter: object2Arr.length,
    }
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    xotakerArr = [];
    gishatichArr = [];
    object1Arr = [];
    object2Arr = [];

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addXotaker() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            xotakerArr.push(new Xotaker(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGishatich() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            gishatichArr.push(new Gishatich(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addObject1() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            object1Arr.push(new Object1(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addObject2() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            object2Arr.push(new Object2(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 3000);


io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add xotaker", addXotaker);
    socket.on("add gishatich", addGishatich);
    socket.on("add object1", addObject1);
    socket.on("add object2", addObject2);
});
