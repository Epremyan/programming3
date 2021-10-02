var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Object2 extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 17;
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections()
        var found = []
        return super.chooseCell(character)
    }


    chooseCellForEat(ch1, ch2, ch3) {
        this.getNewDirections()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch1) {
                    found.push(this.directions[i])
                }
                else if (matrix[y][x] == ch2) {
                    found.push(this.directions[i])
                }
                else if (matrix[y][x] == ch3) {
                    found.push(this.directions[i])
                }


            }

        }
        return found;

    }



    mult() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var ob2 = new Object2(newX, newY)
            object2Arr.push(ob2)
        }
        this.multiply = 0;
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        this.energy -= 1;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
        if (this.energy < 7) {
            this.die()
        }
    }

    eat() {
        console.log("YES");
        let emptyCells = this.chooseCell(4, 3, 2);
        let food = random(emptyCells);
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0


            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                }
            }


            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)
                }
            }


            for (var i in object1Arr) {
                if (object1Arr[i].x == newX && object1Arr[i].y == newY) {
                    object1Arr.splice(i, 1)
                }
            }




            this.x = newX
            this.y = newY
            this.energy += 5
            if (this.energy > 30) {
                this.mult()
            }
        } else {
            this.move()
        }
    }


    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in object2Arr) {
                if (object2Arr[i].x == this.x && object2Arr[i].y == this.y) {
                    object2Arr.splice(i, 1)
                }
            }
        }
    }
}