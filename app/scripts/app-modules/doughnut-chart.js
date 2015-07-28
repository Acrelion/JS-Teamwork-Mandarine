var doughnutChart = (function() {
	var ctx,
		doughnutData = [],
		options = {},
		chart,
		doughnutChart,
		moviesCollection = [],
		property,
		mode;


	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	//==================GET DATA========================

	function getData() {
		property = 'Genre';
		moviesCollection = movieDatabase.getGivenPropertyValues(property);

		mode = getMode(moviesCollection);

		// console.log(mode); //for debugging

		function getMode(arr) {
			var modeMap = {},
				i,
				len = arr.length,
				val;

			for (i = 0; i < len; i += 1) {
				var val = arr[i];

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

	// console.log(moviesCollection); //for debugging
	// console.log(doughnutData); //for debugging


	//=====================OPTIONS=====================

	options = {
			// segmentStrokeColor : "#999",
			segmentShowStroke: false,
			percentageInnerCutout: 30
		}
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
			// console.log(doughnutData); //for debugging
			// console.log(moviesCollection); //for debugging
		},

		remove: function() {
			chart.destroy();
		}
	};

	return doughnutChart;

}());