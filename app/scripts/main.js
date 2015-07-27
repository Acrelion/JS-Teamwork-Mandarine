(function main() {
	// ************************** Declaration Block **********************************
	var tvDoughnutChart,
		tvLineChart,
		tvBarChart,
		tvRadarChart,
		tvBubbleChart,
		tvPieChart,
		// divWrapper,
		navigation,
		previousChart,
		showButton = document.getElementById('show-movie-form'),
		hideButton = document.getElementById('hide-movie-form'),
		canvas = document.getElementById('canvas-for-charts'),
		svgContainer = document.getElementById('svg-holder');

	// *******************************************************************************		

	// *************************** Main Magic ****************************************
	canvas.setAttribute('width', 1024);
	canvas.setAttribute('height', 600);

	// Chart.defaults.global.animationEasing = 'easeInOutBounce';

	navigation = document.getElementById('navi');

	tvDoughnutChart = doughnutChart;

	//tvLineChart = loadSecondApp; // To be edited

	tvBarChart = barChart; // To be edited

	tvBubbleChart = bubbleChart;

	tvRadarChart = radarChart;
	tvPieChart = pieChart;

	function removePreviousChart(chart) {
		if (!chart) {
			return;
		}

		chart.remove();
	}

	function displayNone(obj) {
		// return obj.style.display = "none";
		obj.style.display = "none";
	}

	function displayBlock(obj) {
		// return obj.style.display = "block";
		obj.style.display = "block";
	}

	// *******************************************************************************

	// *************************** Event Listener/s **********************************
	navigation.addEventListener('click', function(evt) {
		console.log(evt); // For debugging
		var clickedId = evt.target.id;

		removePreviousChart(previousChart);

		switch (clickedId) {
			case 'doughnut-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvDoughnutChart.draw();
				previousChart = tvDoughnutChart;
				break;
			case 'line-chart-button':
				tvLineChart();
				break;
			case 'bar-chart-button':
				tvBarChart.drawBarChart();
				break;
			case 'radar-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvRadarChart.draw();
				previousChart = tvRadarChart;
				break;
			case 'bubble-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvBubbleChart.draw();
				previousChart = tvBubbleChart;
				break;
			case 'pie-chart-button':
				displayNone(canvas);
				displayBlock(svgContainer);
				tvPieChart.draw();
				previousChart = tvPieChart;
				break;
			default:
				break;
		}

	});

	showButton.addEventListener('click', function() {
		$('#movie-form').show();
	});
	hideButton.addEventListener('click', function() {
		$('#movie-form').hide();
	});
	// ******************************************************************************
}());