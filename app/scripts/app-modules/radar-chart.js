var radarChart = (function(database) {
// ************************** Declaration Block **********************************	
	var ctx,
		chart,
		animations,
		radarChart,
		colors = {},
		mainTitles = [],
		properties = [],
		propertyNames = [],
		data = {},
		options = {};
// *******************************************************************************	

// ************************** COLORS *********************************************
	colors = {
		mainColor: {
			r: 30,
			g: 40,
			b: 60,
			a: 0.3
		},

		commonColor: '#333'
	};
// *******************************************************************************

// ************************** Setting Up Chart ***********************************
	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	mainTitles = database.getTitles();
	properties = database.getProperties();
	propertyNames = 
		Object.keys(properties[0])
			.filter(function(property) {
				if (isNaN(properties[0][property])) {
					return false;
				}

				return true;
			});		

	function addDatasetsToData () {
		var current,
			data,
			i,
			len,
			prop,
			regExTag,
			pattern;

		regExTag = /#(\w)/g;

		pattern = 'rgba(#r,#g,#b,#a)';

		data = {
			labels: propertyNames,
			datasets: []
		};

		for (i = 0, len = mainTitles.length; i < len; i += 1) {
			current = {};

			current.label = mainTitles[i];

			setChartColors(current, colors);
			changeColor(colors.mainColor);

			current.data = [];

			for(prop in properties[i]) {
				if (isNaN(properties[i][prop])) {
					continue;
				} else {
					current.data.push(properties[i][prop]);
				}
			}

			data.datasets[i] = current;
		}

		return data;

		function getRgbaString(colorObj) {
			var rgba = pattern.replace(regExTag, function(whole, match) {
				if (isNaN(colorObj[match])) {
					throw new Error('Received invalid color value NaN');
				}
				return colorObj[match];
			});

			return rgba;
		}

		function setChartColors(element, colors) {
			var rgba,
				mainColor = colors.mainColor,
				commonColor = colors.commonColor,
				opacity = mainColor.a;

			rgba = getRgbaString(mainColor);

			element.fillColor = rgba;

			mainColor.a = 1;
			rgba = getRgbaString(mainColor);

			element.strokeColor = rgba;
			element.pointColor = rgba;
			element.pointStrokeColor = commonColor;
			element.pointHighlightFill = commonColor;
			element.pointHighlightStroke = rgba;

			mainColor.a = opacity;
		}

		function changeColor(colorObj) {
			var step = 30,
				factor = 50,
				prop;

			for (prop in colorObj) {
				if (prop === 'a') {
					continue;
				} else if (colorObj[prop] + step > 255) {
					colorObj[prop] = (colorObj[prop] - 255) + step;
				} else {
					colorObj[prop] += step;
				}

				if (step < 100) {
					step += (Math.random() * factor) | 0;
				} else {
					step -= (Math.random() * factor) | 0;
				}
			}
		}
	}

	// data = addDatasetsToData();

// *******************************************************************************

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
				data = addDatasetsToData();
				chart = new Chart(ctx).Radar(data, options);
			} else {
				chart.destroy();
				data = addDatasetsToData();
				chart = new Chart(ctx).Radar(data, options);
			}
		},

		remove: function() {
			chart.destroy();
		}
	};

	return radarChart;

})(movieDatabase);