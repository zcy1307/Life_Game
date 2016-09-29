var main = function() {
    var numOfLivingCells = 500;
    var size = 40;
    map = new Map('map', size, numOfLivingCells);
    map.init();
    setInterval(function() {
        map.draw(1000);
        map.Refresh();
    }, 150);
}
