define([], function () {

    var drawer = (function () {
		
		function drawPieChart(layer, pieChart) {
			// Draw chart in layer
			layer.add(pieChart);
		}

		return {
			drawPieChart: drawPieChart
		}
	} ());
	return drawer;
});