var doughnutChart = (function() {
	var ctx,
		doughnutData = [],
		options = {}, 
		chart,
		doughnutChart;

	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	doughnutData = [{
			value: 16.22,
			color: "#6A7FDB",
			highlight: "#6A95D7",
			label: "Action"
		}, {
			value: 31.08,
			color: "#91972A",
			highlight: "#B6C454",
			label: "Adventure"
		}, {
			value: 5.405,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Animation"
		}, {
			value: 4.054,
			color: "#985286",
			highlight: "#986987",
			label: "Comedy"
		}, {
			value: 1.351,
			color: "#4D5360",
			highlight: "#616774",
			label: "Crime"
		},
		{
			value: 6.757,
			color: "#949FB1",
			highlight: "#A8B3C5",
			label: "Drama"
		},
		{
			value: 9.459,
			color: "#E04569",
			highlight: "#E05979",
			label: "Family"
		},
		{
			value: 21.62,
			color: "#660000",
			highlight: "#7E0000",
			label: "Fantasy"
		},
		{
			value: 1.351,
			color: "#6C5952",
			highlight: "#8A7A74",
			label: "History"
		},
		{
			value: 2.703,
			color: "#EAEFB1",
			highlight: "#E9F7CA",
			label: "SciFi"
		}

	];

	options = {
		// segmentStrokeColor : "#999",
		segmentShowStroke : false,
		percentageInnerCutout : 30
	}

	function createChart() {
		chart = new Chart(ctx).Doughnut(doughnutData,
			options);
	}

	doughnutChart = {
		draw: function() {
			if (!chart) {
				// ctx.clearRect(0, 0, 1024, 600);
				createChart();
			} else {
				chart.clear();
				chart.render();
			}
		},

		remove: function() {
			chart.destroy();
		}
	};

	return doughnutChart;
}());