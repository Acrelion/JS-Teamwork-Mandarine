var radarChart = (function(database) {
// ************************** Declaration Block **********************************
	var ctx,
		chart,
		animations,
		radarChart,
		colors = {},
		data = {},
		options = {},
		movieTitles = [],
		movieProperties = [],
		moviePropertyNames = [];
// *******************************************************************************

// ************************** Initial Colors *************************************
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

	function addDatasetsToData() {
		var currentDataset,
			chartData,
			i,
			len,
			prop;

		refreshDataFromDatabase(database);	

		chartData = {
			// the names of all the properties used in the chart
			// e.g. rating, price, popularity etc...
			labels: moviePropertyNames,

			// each dataset in datasets holds a lable - the movie title,
			// color information (6 fields) and data array - the values
			// for all the propertyNames used in the chart 
			datasets: []
		};

		for (i = 0, len = movieTitles.length; i < len; i += 1) {
			currentDataset = {};

			currentDataset.label = movieTitles[i];

			// Methods to generate colors for each dataset
			setChartColors(currentDataset, colors);
			changeColor(colors.mainColor);

			// the values for the current chart dataset go here
			currentDataset.data = [];

			// gets the values for the current dataset data from the collection
			for(prop in movieProperties[i]) {
				if (isNaN(movieProperties[i][prop])) {
					continue;
				} else {
					currentDataset.data.push(movieProperties[i][prop]);
				}
			}

			chartData.datasets.push(currentDataset);
		}

		return chartData;
	}

	function refreshDataFromDatabase(database) {

		movieTitles = database.getTitles();
		movieProperties = database.getProperties();
		moviePropertyNames = database.getPropertyNames();
	}
// *******************************************************************************			

// ************************** Color Methods **************************************
	function getRgbaString(colorObj) {
		var rgba,
			regExTag = /#(\w)/g,
			pattern = 'rgba(#r,#g,#b,#a)';

		rgba = pattern.replace(regExTag, function(whole, match) {
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
// *******************************************************************************	

// ************************** Chart Options **************************************
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

		animationEasing: animations[29],

		//Boolean - Whether to show lines for each scale point
		scaleShowLine : true,

		//Boolean - Whether we show the angle lines out of the radar
		angleShowLineOut : true,

		//Boolean - Whether to show labels on the scale
		scaleShowLabels : false,

		// Boolean - Whether the scale should begin at zero
		scaleBeginAtZero : true,

		//String - Colour of the angle line
		angleLineColor : "rgba(0,0,0,.1)",

		//Number - Pixel width of the angle line
		angleLineWidth : 1,

		//String - Point label font declaration
		pointLabelFontFamily : "'Arial'",

		//String - Point label font weight
		pointLabelFontStyle : "bold",

		//Number - Point label font size in pixels
		pointLabelFontSize : 20,

		//String - Point label font colour
		pointLabelFontColor : "#3C5780",

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 3,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 1,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
// *******************************************************************************	

// ************************** Module Interface ***********************************
	radarChart = {
		draw: function() {
			if (chart) {
				chart.destroy();
			}	

			data = addDatasetsToData();
			chart = new Chart(ctx).Radar(data, options);
		},

		remove: function() {
			chart.destroy();
		}
	};
// *******************************************************************************	
	return radarChart;

})(movieDatabase);