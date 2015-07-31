var doughnutChart = (function() {
	var ctx,
		doughnutData = [],
		options = {},
		chart,
		doughnutChart,
		moviesCollection = [],
		property,
		mode,
		chartIsDrawn = false;

	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	//==================GET DATA========================

	function getData() {
		property = 'Genre';
		moviesCollection = movieDatabase.getGivenPropertyValues(property);

		mode = getMode(moviesCollection);

		function getMode(arr) {
			var modeMap = {},
				i,
				len = arr.length,
				val;

			for (i = 0; i < len; i += 1) {
				val = arr[i];

				if (modeMap[val] == null) {
					modeMap[val] = 1;
				} else {
					modeMap[val] += 1;
				}
			}
			return modeMap;
		}

		for (var prop in mode) {
			doughnutData.push({
				value: mode[prop],
				color: getRandomColor(),
				highlight: getRandomColor(),
				label: property + ' ' + prop
			});
		}

		return doughnutData;
	}

	//==========================================

	//====================GET RANDOM COLOR======================

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	//==========================================

	//=====================OPTIONS=====================

	options = {
			segmentStrokeColor: "#FFF",
			// segmentShowStroke: false,
			percentageInnerCutout: 30
		};
	//==========================================

	//=============CREATE CHART=============================

	function createChart() {
		getData();
		chart = new Chart(ctx).Doughnut(doughnutData,
			options);
	}

	//==========================================

	doughnutChart = {
		draw: function() {
			if (chart) {
				chart.destroy();
				doughnutData = [];
			}

			createChart();
			chartIsDrawn = true;
		},

		remove: function() {
			chart.destroy();
			chartIsDrawn = false;
		},

		isDrawn: function() {
			return chartIsDrawn;
		}
	};

	return doughnutChart;

}());