var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Object1 extends LiveForm {
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
        return super.chooseCell(character)

    }

    mult() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var ob = new Object1(newX, newY)
            object1Arr.push(ob)
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
        if (this.energy < 10) {
            this.die()
        }
    }

    eat() {
        let emptyCells = this.chooseCell(3);
        let food = random(emptyCells);
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 4
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
            for (var i in object1Arr) {
                if (object1Arr[i].x == this.x && object1Arr[i].y == this.y) {
                    object1Arr.splice(i, 1)
                }
            }
        }
    }
}
