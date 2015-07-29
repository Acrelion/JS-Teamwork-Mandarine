var radarChart = (function(database) {
// ************************** Declaration Block **********************************
	// Chart must ignore properties whoose value isn't numeric
	var IGNORED_PROPERTY_NAMES = ['Genre'],
		ctx,
		chart,
		animations,
		radarChart,
		colors = {},
		chartData = {},
		chartOptions = {},
		movieTitles = [],
		movieProperties = [],
		moviePropertyNames = [],
		firstMovie = null,
		secondMovie = null;

	
// *******************************************************************************

// ************************** Initial Colors *************************************
	colors = {
		mainColor: {
			r: 30,
			g: 40,
			b: 60,
			a: 0.3
		},

		linesColor: 'rgba(255, 255, 255, 0.4)',

		pointColor: '#333'
	};
// *******************************************************************************

// ************************** Initial Chart Data Structure ***********************
	function chartDataReset() {
		chartData = {
			// the names of all the properties used in the chart
			// e.g. rating, price, popularity etc...
			labels: getChartDataLables(),

			// each dataset in datasets holds a lable - the movie title,
			// color information (6 fields) and data array - the values
			// for all the propertyNames used in the chart 
			datasets: []
		};
	}

	function getChartDataLables() {
		var lables = database.getPropertyNames().filter(function(name) {
				if (IGNORED_PROPERTY_NAMES.some(function(ignored) {
					return ignored === name;
				})) {
					return false;
				} else {
					return true;
				}	
			});

		return lables;
	}
// *******************************************************************************

// ************************** Setting Up Chart ***********************************
	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	function addMovieDataToChartData(movieInstance) {
		var chartDataset = {
			label: movieInstance.title,
	            fillColor: null,
	            strokeColor: null,
	            pointColor: null,
	            pointStrokeColor: null,
	            pointHighlightFill: null,
	            pointHighlightStroke: null,
	            data: []
		};

		// Methods to generate colors for each chartDataset color fields
		setDatasetColors(chartDataset, colors);

		// Changes the the color so next dtaset will use different colors
		changeColor(colors.mainColor);

		// Adds values to chartDataset.data acording to chart.lables and the properties
		// with that name in the movieInstance 

		chartData.labels.forEach(function(label) {
			chartDataset.data.push(movieInstance[label]);
		});

		chartData.datasets.push(chartDataset);
	}

	function sequentialAddingOfData() {
		// To be eddited
	}

	function setMovie(movie, number) {
		if (number === 1) {
			firstMovie = movie;
		} else if (number === 2) {
			secondMovie = movie;
		} else {
			throw new Error("setMovie received invalid movie number");
		}
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

	function setDatasetColors(dataset, colors) {
		var rgba,
			mainColor = colors.mainColor,
			pointColor = colors.pointColor,
			opacity = mainColor.a;

		rgba = getRgbaString(mainColor);

		dataset.fillColor = rgba;

		mainColor.a = 1;
		rgba = getRgbaString(mainColor);

		dataset.strokeColor = rgba;
		dataset.pointColor = rgba;
		dataset.pointStrokeColor = pointColor;
		dataset.pointHighlightFill = pointColor;
		dataset.pointHighlightStroke = rgba;

		chartOptions.pointLabelFontColor = rgba;

		mainColor.a = opacity;
	}

	function changeColor(colorObj) {
		var factor = 75,
			step = ((Math.random() * factor) | 0) + factor,
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
	animations = [
		'easeInOutQuart', 
		'easeOutBounce',
		'easeInOutBounce',
		'easeInOutBack', 
		'easeOutBack',
		'easeInElastic',
		'easeInBounce',
		'easeOutElastic'
	];

	chartOptions = {
		animationSteps: 60,

		animationEasing: animations[7],

		// String - Colour of the scale line
		scaleLineColor: colors.linesColor,

		// Number - Pixel width of the scale line
		scaleLineWidth: 3,

		//Boolean - Whether to show lines for each scale point
		scaleShowLine : true,

		//Boolean - Whether we show the angle lines out of the radar
		angleShowLineOut : true,

		//Boolean - Whether to show labels on the scale
		scaleShowLabels : false,

		// Boolean - Whether the scale should begin at zero
		scaleBeginAtZero : true,

		//String - Colour of the angle line
		angleLineColor : colors.linesColor,

		//Number - Pixel width of the angle line
		angleLineWidth : 3,

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
		pointDotRadius : 5,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 3,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};

	function setChartAnimation(numberOrRnd) {
		if (numberOrRnd === 'random') {
			chartOptions.animationEasing = animations[(Math.random() * animations.length) | 0];
		} else if (animations.length > numberOrRnd && numberOrRnd >= 0) {
			chartOptions.animationEasing = numberOrRnd;
		}
	}
// *******************************************************************************	

// ************************** Chart Public Functions *****************************
	function draw() {
		if (chart) {
			chart.destroy();
		}

		chartDataReset();

		if (firstMovie !== null) {
			addMovieDataToChartData(firstMovie);
		} else {
			firstMovie = database.getMovie(1);
			addMovieDataToChartData(firstMovie);
		}

		if (secondMovie !== null) {
			addMovieDataToChartData(secondMovie);
		} else {
			secondMovie = database.getMovie(2);
			addMovieDataToChartData(secondMovie);
		}

		setChartAnimation('random');
		chart = new Chart(ctx).Radar(chartData, chartOptions);
	}

	function remove() {
		chart.destroy();
	}

	function setFirstMovie(movie) {
		setMovie(movie, 1);
	}

	function setSecondMovie(movie) {
		setMovie(movie, 2);
	}

	function generateLegend() {
		return chart.generateLegend();
	}
// *******************************************************************************

// ************************** Module Interface ***********************************
	radarChart = {
		draw: draw,

		remove: remove,

		setFirstMovie: setFirstMovie,

		setSecondMovie: setSecondMovie,

		generateLegend: generateLegend
	};
// *******************************************************************************	
	return radarChart;

})(movieDatabase);