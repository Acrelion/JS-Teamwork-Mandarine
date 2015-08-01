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
          	tvFloatingBarChart,
		previousChart,
		movieFormIsVisible = false,
		appTitle = 'Statistics App',
		teamName = 'Team "Mandarine"',
		$toggleMovieFormVisibilityBtn = $('#toggle-movie-form'),
		$navigation = $('#chart-buttons'),
		$canvas = $('#canvas-for-charts'),
		$svgContainer = $('#svg-holder'),
		$areaContainer = $('#area-holder');

// *******************************************************************************		

// *************************** Main Magic ****************************************
	$canvas.attr('width', 1024);
	$canvas.attr('height', 600);

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
	tvFloatingBarChart = floatingBarChart;

	teamLogo.animateText(appTitle, 175, -20, 40);
	teamLogo.animateText(teamName, 155, -20, 80);
// *******************************************************************************

// *************************** Event Listener/s **********************************
	$navigation.on('click', 'li', function (event) {
		var clickedId = event.target.id;

		removePreviousChart(previousChart);
		$svgContainer.hide();
		$canvas.show();

		switch (clickedId) {
			case 'doughnut-chart-button':
				tvDoughnutChart.draw();
				previousChart = tvDoughnutChart;
				break;
			case 'line-chart-button':
				tvLineChart.draw();
				previousChart = tvLineChart;
				break;
			case 'bar-chart-button':
				tvBarChart.drawBarChart();
				//previousChart = tvBarChart;
				break;
			case 'radar-chart-button':
				tvRadarChart.draw();
				previousChart = tvRadarChart;
				break;
			case 'bubble-chart-button':
				$canvas.hide();
				tvBubbleChart.draw();
				previousChart = tvBubbleChart;
				break;
			case 'polar-chart-button':
				tvPolarChart.draw();
				previousChart = tvPolarChart;
				break;
			case 'area-chart-button':
				$canvas.hide();
				$areaContainer.show();
				tvAreaChart.draw();
				previousChart = tvAreaChart;
				break;
			case 'pyramid-chart-button':
				$canvas.hide();
				tvPyramidChart.draw();
				previousChart = tvPyramidChart;
				break;
			case 'pie-chart-button':
				$canvas.hide();
				$svgContainer.show();
				tvPieChart.draw();
				previousChart = tvPieChart;
				break;
			case 'floating-bar-chart-button':
				tvFloatingBarChart.drawFloatingBarChart();
				break;		
			default:
				break;
		}
	});
	
	$toggleMovieFormVisibilityBtn.click(function() {
		if (movieFormIsVisible) {
			$('#movie-form').css({ 
			    top: '-1000px', left: '34px'
			});

			setTimeout(function(){
				$toggleMovieFormVisibilityBtn.text('Add Movie');
			},250);
			
			movieFormIsVisible = false;
		} else {
			$('#movie-form').css({ 
			    top: '305px', left: '34px'
			});

			setTimeout(function(){
				$toggleMovieFormVisibilityBtn.text('Hide Form');
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
// ******************************************************************************
}());
