(function main() {
// ************************** Declaration Block **********************************
	var 	tvPieChart,
		tvLineChart,
		tvBarChart,
		tvRadarChart,
		divWrapper,
		canvas = document.getElementById('canvas-for-charts');
// *******************************************************************************		

// *************************** Main Magic ****************************************
	canvas.setAttribute('width', 1024);
	canvas.setAttribute('height', 600);

	divWrapper = document.getElementById('wrapper');

	tvPieChart = loadFirstApp; // To be editted

	tvLineChart = loadSecondApp; // To be editted

	tvBarChart = loadThirdApp; // To be editted

	tvRadarChart = radarChart;
// *******************************************************************************

// *************************** Event Listener/s **********************************
	divWrapper.addEventListener('click', function(evt) {
		console.log(evt); // For debugging
		var clickedId = evt.path[1].id;

		switch(clickedId) {
			case 'pie-chart-li': tvPieChart();
				break;
			case 'line-chart-li': tvLineChart();
				break;
			case 'bar-chart-li': tvBarChart();
				break;		
			case 'radar-chart-li': tvRadarChart.create();
				break;
			default: 
				break;	
		}
		
	});
// ******************************************************************************
	
	// To be editted (move to separate module)
	function loadFirstApp() {
		var inner = '<div id="inner-content">' + 'Pie Chart' + '</div>';
		document.getElementById('content').innerHTML = inner;
	}

	// To be editted (move to separate module)
	function loadSecondApp() {
		var inner2 = '<div id="inner2-content">' + 'Line Chart' + '</div>';
		document.getElementById('content').innerHTML = inner2;
	}

	// To be editted (move to separate module)
	function loadThirdApp() {
		var inner3 = '<div id="inner3-content">' + 'Bar Chart' + '</div>';
		document.getElementById('content').innerHTML = inner3;
	}
}());

