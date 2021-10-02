
var socket = io();
function setup() {

    var side = 30;  
    var weath = 'summer'

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let xotakerCountElement = document.getElementById('xotakerCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let object1CountElement = document.getElementById('object1Count');
    let object2CountElement = document.getElementById('object2Count');
  


    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        xotakerCountElement.innerText = data.grassEaterCount;
        gishatichCountElement.innerText = data.gishatichCounter;
        object1CountElement.innerText = data.object1Counter;
        object2CountElement.innerText = data.object2Counter;


            createCanvas(matrix[0].length * side, matrix.length * side)
            background('#acacac');

        socket.on("weather", function (data) {
            weath = data;
        })


            for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    var obj = matrix[y][x];
                    if (obj == 1) {
                        if (weath == "summer") {
                            fill("green");
                            rect(x * side, y * side, side, side);
                        } else if (weath == "autumn") {
                            fill("#333300");
                            rect(x * side, y * side, side, side);
                        } else if (weath == "winter") {
                            fill("white");
                            rect(x * side, y * side, side, side);
                        } else if (weath == "spring") {
                            fill("#4dffa6");
                            rect(x * side, y * side, side, side);
                        }
                    }
                    else if (obj == 2) {
                            fill("yellow");
                    }
                    else if (obj == 3) {
                            fill("red");
                    }

                    else if (obj == 4) {
                            fill("black");
                          
                    }
                    else if (obj == 5) {
                            fill("blue");
                    }

                    else if (obj == 0) {
                        fill("#acacac");
                    }
                        rect(x * side, y * side, side, side);

                }
            }
        }

}





function kill() {
    socket.emit("kill");
}
function addGrass() {
    socket.emit("add grass");
}
function addXotaker() {
    socket.emit("add xotaker");
}
function addGishatich() {
    socket.emit("add gishatich");
}
function addObject1() {
    socket.emit("add object1");
}
function addObject2() {
    socket.emit("add object2");
}