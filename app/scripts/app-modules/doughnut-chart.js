var doughnutChart = (function() {
	var ctx,
		doughnutData = [],
		options = {},
		chart,
		doughnutChart,
		moviesCollection = [],
		property,
		mode,
		chartIsDrawn = false,
		colors = [{
			color: '#429510',
			highlight: '#5db925'
		}, {
			color: '#d7316c',
			highlight: '#ef548b'
		}, {
			color: '#f3d42b',
			highlight: '#fde562'
		}, {
			color: '#0860c2',
			highlight: '#318aed'
		}, {
			color: '#614b48',
			highlight: '#8c6560'
		}, {
			color: '#9b46d1',
			highlight: '#ba59f7'
		}],
		genreColorCount = 0;

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
				color: colors[genreColorCount].color,
				highlight: colors[genreColorCount].highlight,
				label: property + ' ' + prop
			});
			genreColorCount += 1;
		}

		return doughnutData;
	}

	//==========================================

	//====================GET RANDOM COLOR======================

	// function getRandomColor() {
	// 	var letters = '0123456789ABCDEF'.split('');
	// 	var color = '#';
	// 	for (var i = 0; i < 6; i++) {
	// 		color += letters[Math.floor(Math.random() * 16)];
	// 	}
	// 	return color;
	// }

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
		genreColorCount = 0;
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