(function main() {
// ************************** Declaration Block **********************************
	var tvPieChart,
		tvLineChart,
		tvBarChart,
		tvRadarChart,
		tvBubbleChart,
		divWrapper,
		canvas = document.getElementById('canvas-for-charts');
// *******************************************************************************		

// *************************** Main Magic ****************************************
	canvas.setAttribute('width', 1024);
	canvas.setAttribute('height', 600);

	divWrapper = document.getElementById('wrapper');

	tvPieChart = loadFirstApp; // To be edited

	tvLineChart = loadSecondApp; // To be edited

	tvBarChart = loadThirdApp; // To be edited

	tvBubbleChart = bubbleChart;

	tvRadarChart = radarChart;
// *******************************************************************************

// *************************** Event Listener/s **********************************
	divWrapper.addEventListener('click', function(evt) {
		console.log(evt); // For debugging
		var clickedId = evt.target.id;

		switch(clickedId) {
			case 'pie-chart-button': tvPieChart();
				break;
			case 'line-chart-button': tvLineChart();
				break;
			case 'bar-chart-button': tvBarChart();
				break;		
			case 'radar-chart-button': tvRadarChart.draw();
				break;
			case 'bubble-chart-button': tvBubbleChart.draw();
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

