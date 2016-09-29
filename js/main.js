var main = function() {
    var numOfLivingCells = 500;
    var size = 40;
    map = new Map('map', size, numOfLivingCells);
    map.init();
    setInterval(function() {
        map.Refresh();
    }, 150);
}
