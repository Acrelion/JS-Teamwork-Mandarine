(function main() {
// ************************** Declaration Block **********************************
	var tvDoughnutChart,
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

	// Chart.defaults.global.animationEasing = 'easeInOutBounce';

	divWrapper = document.getElementById('wrapper');

	tvDoughnutChart = doughnutChart;

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
			case 'doughnut-chart-button': tvDoughnutChart.draw();
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

