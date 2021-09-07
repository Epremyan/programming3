function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function mx(m, n) {
    var matrix = [];
    for (var i = 0; i < m; i++) {
        matrix.push([]);
        for (var k = 0; k < n; k++) {
            matrix[i][k] = getRandomInt(0, 6);
        }
    }

    return matrix;
}





var side = 25;
var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var object1Arr = [];
var object2Arr = [];
var matrix = mx(30, 30);

function setup() {
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

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}




function draw() {

    
    for (var y = 0; y < matrix.length; y++) {
        
        for (var x = 0; x < matrix[y].length; x++) {
           
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side)

            /*fill("blue")
                text(x + " " + y, x * side + side / 2, y * side + side / 2)
            */
        }
    }

    for (var i in grassArr) {
        grassArr[i].mult()
    }


    for (var i in xotakerArr) {
        xotakerArr[i].eat()
        xotakerArr[i].move()
        xotakerArr[i].mult()
        xotakerArr[i].die()
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat()
        gishatichArr[i].move()
        gishatichArr[i].mult()
        gishatichArr[i].die()
    }
    for (var i in object1Arr) {
        object1Arr[i].eat()
        object1Arr[i].move()
        object1Arr[i].mult()
        object1Arr[i].die()
    }


    for (var i in object2Arr) {
        object2Arr[i].eat()
        object2Arr[i].move()
        object2Arr[i].mult()
        object2Arr[i].die()
    }

}

