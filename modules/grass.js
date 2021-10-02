var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Grass extends LiveForm{
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    mult() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        this.multiply+= 3
        if (empty && this.multiply > 8) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
        }
    }
}