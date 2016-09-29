function Map(canvasId, size, numOfLivingCells) {
    this.size = size;
    this.canvas = document.getElementById(canvasId);
    this.numOfLivingCells = numOfLivingCells;
    this.cellsArray = new Array();


    this.init = function() {
        //初始化地图，每格一个死细胞
        for (var i = 0; i < this.size; i++) {
            this.cellsArray[i] = new Array();
            for (var j = 0; j < this.size; j++)
                this.cellsArray[i][j] = new Cell(i, j, 0, 0);
        }
        //随机生成指定个数活细胞的坐标
        var i = this.numOfLivingCells;
        while (i > 0) {
            var x = Math.round(Math.random() * (this.size - 1));
            var y = Math.round(Math.random() * (this.size - 1));
            if (!this.cellsArray[x][y].nextStatus) {
                this.cellsArray[x][y].nextStatus = 1;
                i--;
            }
        }
    }

    this.Refresh = function() {
        this.draw(1000);
        for (var i = 0; i < this.size; i++)
            for (var j = 0; j < this.size; j++) {
                var cell = this.cellsArray[i][j];
                cell.status = cell.nextStatus;
            }

        for (var i = 0; i < this.size; i++)
            for (var j = 0; j < this.size; j++) {
                var cell = this.cellsArray[i][j];
                var livingCellsAround = LivingCellsAround(cell, this);
                if (livingCellsAround == 3)
                    cell.nextStatus = 1;
                else if (livingCellsAround != 2)
                    cell.nextStatus = 0;
            }
    }

    this.draw = function(bgLength) {
        var canvas = this.canvas;
        var context = canvas.getContext("2d");
        context.fillStyle = "#eeeeee";
        var len = bgLength / this.size;

        for (var i = 0; i < this.size; i++)
            for (var j = 0; j < this.size; j++) {
                x = i * len + 1;
                y = j * len + 1;
                if (!this.cellsArray[i][j].nextStatus)
                //死细胞
                    context.fillRect(x, y, len - 2, len - 2);
                else {
                    //活细胞
                    context.fillStyle = '#777888';
                    context.fillRect(x, y, len - 2, len - 2);
                    context.fillStyle = "#eeeeee";
                }
            }
    }
}


function Cell(x, y, status, nextStatus) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.nextStatus = nextStatus;
}

//返回某细胞周围有多少活细胞
function LivingCellsAround(cell, map) {
    var cellsAround = CellsAround(cell, map);
    var livingCellsAround = 0;

    for (var i = 0; i < cellsAround.length; i++)
        if (cellsAround[i].status)
            livingCellsAround++;

    return livingCellsAround;
}
//返回某细胞周围8个细胞组成的数组
function CellsAround(cell, map) {
    var x = cell.x;
    var y = cell.y;
    var x1, x2, y1, y2;
    var cellsAround = new Array();

    if (x == 0)
        x1 = map.size - 1;
    else x1 = x - 1;
    if (x == map.size - 1)
        x2 = 0;
    else x2 = x + 1;
    if (y == 0)
        y1 = map.size - 1;
    else y1 = y - 1;
    if (y == map.size - 1)
        y2 = 0;
    else y2 = y + 1;

    cellsAround.push(map.cellsArray[x1][y1]);
    cellsAround.push(map.cellsArray[x][y1]);
    cellsAround.push(map.cellsArray[x2][y1]);
    cellsAround.push(map.cellsArray[x1][y]);
    cellsAround.push(map.cellsArray[x2][y]);
    cellsAround.push(map.cellsArray[x1][y2]);
    cellsAround.push(map.cellsArray[x][y2]);
    cellsAround.push(map.cellsArray[x2][y2]);

    return cellsAround;
}
