(function main() {
	// ************************** Declaration Block **********************************
	var tvDoughnutChart,
		tvLineChart,
		tvBarChart,
		tvRadarChart,
		tvBubbleChart,
		tvPieChart,
		tvPolarChart,
		// divWrapper,
		navigation,
		previousChart,
		appTitle = 'Statistics App',
		teamName = 'Team "Mandarine"',
		paper = Raphael(400, 40, 700, 100),
		showButton = document.getElementById('show-movie-form'),
		hideButton = document.getElementById('hide-movie-form'),
		canvas = document.getElementById('canvas-for-charts'),
		svgContainer = document.getElementById('svg-holder');
	    bubbleContainer = document.getElementById('bubble-holder');

	// *******************************************************************************		

	// *************************** Main Magic ****************************************
	canvas.setAttribute('width', 1024);
	canvas.setAttribute('height', 600);

	// Chart.defaults.global.animationEasing = 'easeInOutBounce';

	navigation = document.getElementById('navi');

	tvDoughnutChart = doughnutChart;
	tvPolarChart = polarChart;
	tvBarChart = barChart; // To be edited

	tvBubbleChart = bubbleChart;
	tvLineChart = lineChart;
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
	navigation.addEventListener('click', function (evt) {
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
				displayBlock(bubbleContainer);
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
			default:
				break;
		}

	});

	function animateText(text, x, stY, endY) {
		var index = 0;
		var start = x;
		var startY = stY;
		setInterval(function () {
			if (!text[index]) {
				return;
			}
			var letter = paper.text(start, startY, text[index]);
			letter.attr({ "font-size": 34, "font-family": "Arial, Helvetica, sans-serif", "fill": "#4CFF00", "stroke-width": "1", stroke: "#3D5C9D", "font-weight": "bold" });
			letter.animate({ x: start, y: endY }, 1000);
			start += 25;
			index++;
		}, 700);
	}

	animateText(appTitle, 190, -20, 40);
	animateText(teamName, 170, -20, 80);
	
	showButton.addEventListener('click', function () {
		$('#movie-form').show();
	});
	hideButton.addEventListener('click', function () {
		$('#movie-form').hide();
	});
	// ******************************************************************************
} ());
