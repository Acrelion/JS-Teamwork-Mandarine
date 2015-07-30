(function main() {
// ************************** Declaration Block **********************************
	var tvDoughnutChart,
		tvLineChart,
		tvBarChart,
		tvRadarChart,
		tvRadarChartLegend,
		tvBubbleChart,
		tvPieChart,
		tvPolarChart,
		tvAreaChart,
          	tvPyramidChart,
		previousChart,
		movieFormIsVisible = false,
		appTitle = 'Statistics App',
		teamName = 'Team "Mandarine"',
		toggleMovieFormVisibility = document.getElementById('toggle-movie-form'),
		navigation = document.getElementById('chart-buttons'),
		canvas = document.getElementById('canvas-for-charts'),
		svgContainer = document.getElementById('svg-holder'),
		bubbleContainer = document.getElementById('bubble-holder'),
		areaContainer = document.getElementById('area-holder'),
		pyramidContainer = document.getElementById('pyramid-holder');

// *******************************************************************************		

// *************************** Main Magic ****************************************
	canvas.setAttribute('width', 1024);
	canvas.setAttribute('height', 600);

	tvDoughnutChart = doughnutChart;
	tvPolarChart = polarChart;
	tvBarChart = barChart;
	tvAreaChart = areaChart;
	tvBubbleChart = bubbleChart;
	tvLineChart = lineChart;
	tvRadarChart = radarChart;
	tvRadarChartLegend = radarChartLegend;
	tvPieChart = pieChart;
	tvPyramidChart = pyramidChart;

	teamLogo.animateText(appTitle, 175, -20, 40);
	teamLogo.animateText(teamName, 155, -20, 80);
// *******************************************************************************

// *************************** Event Listener/s **********************************
	$(navigation).click(function (event) {
		var clickedId = event.target.id;

		// only if clicked on a chart button
		if (clickedId !== 'chart-buttons') {
			removePreviousChart(previousChart);
		}
		

		switch (clickedId) {
			case 'doughnut-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvDoughnutChart.draw();
				previousChart = tvDoughnutChart;
				break;
			case 'line-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvLineChart.draw();
				previousChart = tvLineChart;
				break;
			case 'bar-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvBarChart.drawBarChart();
				//previousChart = tvBarChart;
				break;
			case 'radar-chart-button':
				displayNone(svgContainer);
				displayBlock(canvas);
				tvRadarChart.draw();
				previousChart = tvRadarChart;
				break;
			case 'bubble-chart-button':
				displayNone(canvas);
				tvBubbleChart.draw();
				previousChart = tvBubbleChart;
				break;
			case 'pie-chart-button':
				displayNone(canvas);
				displayBlock(svgContainer);
				tvPieChart.draw();
				previousChart = tvPieChart;
				break;
			case 'polar-chart-button':
				displayNone(svgContainer);
		        displayBlock(canvas);
		        tvPolarChart.draw();
		        previousChart = tvPolarChart;
		        break;
	        case 'area-chart-button':
	        	displayNone(canvas);
	        	displayBlock(areaContainer);
	        	tvAreaChart.draw();
	        	previousChart = tvAreaChart;
	        	break;
		    case 'pyramid-chart-button':
		        displayNone(canvas);
		        tvPyramidChart.draw();
		        previousChart = tvPyramidChart;
		        break;
		    default:
		        break;
		}

	});
	
	$(toggleMovieFormVisibility).click(function() {
		if (movieFormIsVisible) {
			$('#movie-form').css({ 
			    top: '-1000px', left: '34px'
			});

			setTimeout(function(){
				toggleMovieFormVisibility.innerText = 'Add Movie';
			},250);
			
			movieFormIsVisible = false;
		} else {
			$('#movie-form').css({ 
			    top: '305px', left: '34px'
			});

			setTimeout(function(){
				toggleMovieFormVisibility.innerText = 'Hide Form';
			},500);	

			movieFormIsVisible = true;
		}
	});
// ******************************************************************************

// *************************** Helper Functions *********************************
	function removePreviousChart(chart) {
		if (!chart) {
			return;
		}

		if (chart === tvRadarChart && tvRadarChartLegend.isVisible) {
			tvRadarChartLegend.hide();
		}

		chart.remove();
	}

	function displayNone(obj) {
		obj.style.display = "none";
	}

	function displayBlock(obj) {
		obj.style.display = "block";
	}
// ******************************************************************************
}());
