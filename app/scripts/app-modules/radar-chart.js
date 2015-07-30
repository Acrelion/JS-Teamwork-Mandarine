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
			labels: getChartDataLabels(),

			// each dataset in datasets holds a lable - the movie title,
			// color information (6 fields) and data array - the values
			// for all the propertyNames used in the chart 
			datasets: []
		};
	}

	function getChartDataLabels() {
		var labels = database.getPropertyNames().filter(function(name) {
				if (IGNORED_PROPERTY_NAMES.some(function(ignored) {
					return ignored === name;
				})) {
					return false;
				} else {
					return true;
				}	
			});

		return labels;
	}
// *******************************************************************************

// ************************** Setting Up Chart ***********************************
	ctx = document.getElementById('canvas-for-charts').getContext('2d');

	function addMovieDataToChartData(movieInstance, inSequence) {
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

		// if inSequence = true dataset data will be added by a sequential function later
		if (!inSequence) {
			// Adds values to chartDataset.data acording to chart.labels and the properties
			// with that name in the movieInstance 
			chartData.labels.forEach(function(label) {
				chartDataset.data.push(movieInstance[label]);
			});
		} else {
			chartDataset.data[0] = movieInstance[chartData.labels[0]];
		}

		chartData.datasets.push(chartDataset);
	}

	function addMovieDataSequentialy(movieInstance, chart) {
		var labels = chartData.labels,
			i = 1,
			len = labels.length,
			firstDatasetData;

		addNextData();

		function addNextData() {
			if (i == len) {
				return;
			}

			firstDatasetData = [];
			firstDatasetData.push(movieInstance[labels[i]]);
			console.log(firstDatasetData);

			chart.addData(firstDatasetData);

			setTimeout(function() {
				i += 1;
				addNextData();
			}, 250);
		}			
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
			chartOptions.animationEasing = animations[numberOrRnd];
		}
	}
// *******************************************************************************	

// ************************** Chart Public Functions *****************************
	function draw() {
		var isSequential = false;
		if (chart) {
			chart.destroy();
		}

		chartDataReset();
		setChartAnimation('random');

		if (firstMovie !== null) {
			addMovieDataToChartData(firstMovie);
		} else {
			// Sequential Animation (Intended only for the very first draw())
			isSequential = true;
			firstMovie = database.getMovie(1);
			addMovieDataToChartData(firstMovie, true);
			setChartAnimation(7);	
		}

		if (!isSequential && secondMovie !== null) {
			addMovieDataToChartData(secondMovie);
		}

		chart = new Chart(ctx).Radar(chartData, chartOptions);
		radarChartLegend.show();

		if (isSequential) {
			// Sequential Animation
			addMovieDataSequentialy(firstMovie, chart);
		}
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