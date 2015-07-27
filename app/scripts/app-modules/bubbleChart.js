/**
 * Created on 26.7.2015.
 */


var bubbleChart = (function() {
	var ctx,
		svgContainer,
		chart,
		data = [],
		options = {};

	ctx = document.getElementById('canvas-for-charts').getContext('2d');
	svgContainer = document.getElementById('svg-holder');

	data = [{
		label: "Most popular movies",
		strokeColor: '#F16220',
		pointColor: '#F16220',
		pointStrokeColor: 'rgba(205, 205, 205, 0.6)',
		data: [{
			x: 1,
			y: 10,
			r: 7
		}, {
			x: 2,
			y: 12,
			r: 5
		}, {
			x: 3,
			y: 14,
			r: 10
		}, {
			x: 4,
			y: 18,
			r: 6
		}, {
			x: 5,
			y: 26,
			r: 9
		}, {
			x: 6,
			y: 42,
			r: 4
		}, {
			x: 7,
			y: 60,
			r: 8
		}]
	}];

	options = {
		bezierCurve: true,
		showTooltips: true,
		scaleShowHorizontalLines: true,
		scaleShowLabels: true,
		scaleBeginAtZero: true,
		datasetStroke: false
	};


	

	function createChart() {
		chart = new Chart(ctx).Scatter(data, options);
	}

	bubbleChart = {
		draw: function() {
			if (chart) {
				chart.destroy();
			}

			createChart();
		},

		remove: function() {
			chart.destroy();
		}
	};

	return bubbleChart;
}());