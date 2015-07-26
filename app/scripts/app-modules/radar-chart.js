var radarChart = (function() {
	var ctx,
		chart,
		animations,
		radarChart = {},
		data = {},
		options = {};

	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	data = {
		labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running", "Hovering"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 90, 81, 56, 55, 40, 25]
		}, {
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 96, 27, 100, 5]
		}, {
			label: "Super Third Dataset",
			fillColor: "rgba(151,100,205,0.2)",
			strokeColor: "rgba(151,100,205,1)",
			pointColor: "rgba(151,100,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [8, 38, 90, 29, 6, 17, 30, 15]
		}]
	};

	// Added all animation easings to test and pick one for my chart
	animations = ['easeInOutQuart', 'linear', 'easeOutBounce', 'easeInBack', 'easeInOutQuad',
		'easeOutQuart', 'easeOutQuad', 'easeInOutBounce', 'easeOutSine', 'easeInOutCubic',
		'easeInExpo', 'easeInOutBack', 'easeInCirc', 'easeInOutElastic', 'easeOutBack',
		'easeInQuad', 'easeInOutExpo', 'easeInQuart', 'easeOutQuint', 'easeInOutCirc',
		'easeInSine', 'easeOutExpo', 'easeOutCirc', 'easeOutCubic', 'easeInQuint',
		'easeInElastic', 'easeInOutSine', 'easeInOutQuint', 'easeInBounce',
		'easeOutElastic', 'easeInCubic'
	];

	options = {
		animationSteps: 60,
		animationEasing: animations[29]
	};

	radarChart = {
		draw: function() {
			if (!chart) {
				chart = new Chart(ctx).Radar(data, options);
			} else {
				// console.log(chart);
				chart.destroy();
				chart = new Chart(ctx).Radar(data, options);
			}
		}
	};

	return radarChart;

})();