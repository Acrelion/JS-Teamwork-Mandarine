var main = (function() {

	var radarChart,
		canvasChart = document.getElementById('canvas-chart');

	canvasChart.setAttribute('width', 600);
	canvasChart.setAttribute('height', 400);

	function loadFirstApp() {
		var inner = '<div id="inner-content">' + 'Pie Chart' + '</div>';
		document.getElementById('content').innerHTML = inner;
	}

	function loadSecondApp() {
		var inner2 = '<div id="inner2-content">' + 'Line Chart' + '</div>';
		document.getElementById('content').innerHTML = inner2;
	}

	function loadThirdApp() {
		var inner3 = '<div id="inner3-content">' + 'Bar Chart' + '</div>';
		document.getElementById('content').innerHTML = inner3;
	}

	return {
		loadFirstApp: loadFirstApp,
		loadSecondApp: loadSecondApp,
		loadThirdApp: loadThirdApp
	};

})();