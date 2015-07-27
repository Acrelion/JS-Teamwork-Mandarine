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

	databaseManager.loadDefaults();

	// Chart.defaults.global.animationEasing = 'easeInOutBounce';

	divWrapper = document.getElementById('wrapper');

	tvDoughnutChart = doughnutChart;

	//tvLineChart = loadSecondApp; // To be edited

	//tvBarChart = loadThirdApp; // To be edited

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
}());

