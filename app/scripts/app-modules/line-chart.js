var lineChart = (function(){
	var context,
		chart,
		data = {},
        animations = [],
		options = {};
	
	context = document.getElementById('canvas-for-charts').getContext('2d');
		
	data = {
   
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    
    datasets: [
        {
            label: "Hulk",
            fillColor: "rgba(50,110,50,0.3)",
            strokeColor: "rgba(0,110,100,1)",
            pointColor: "rgba(0,110,50,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [77, 13, 25, 66, 79, 90, 40]
        },
        {
            label: "Avengers",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(99,185,216,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [32, 50, 20, 26, 29, 27, 20]
        }
    ]
};

    animations = ['easeInOutQuart', 'linear', 'easeOutBounce', 'easeInBack', 'easeInOutQuad',
		'easeOutQuart', 'easeOutQuad', 'easeInOutBounce', 'easeOutSine', 'easeInOutCubic',
		'easeInExpo', 'easeInOutBack', 'easeInCirc', 'easeInOutElastic', 'easeOutBack',
		'easeInQuad', 'easeInOutExpo', 'easeInQuart', 'easeOutQuint', 'easeInOutCirc',
		'easeInSine', 'easeOutExpo', 'easeOutCirc', 'easeOutCubic', 'easeInQuint',
		'easeInElastic', 'easeInOutSine', 'easeInOutQuint', 'easeInBounce',
		'easeOutElastic', 'easeInCubic'
	];

	options = {
		//Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(255,255,255,0.15)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 3,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: false,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.5,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 6,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 2,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 4,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		
	};

	function createChart() {
		chart = new Chart(context).Line(data, options);
	}
	lineChart = {
		draw: function() {
			if(chart){
			chart.destroy();
			}
		createChart();
		},
		
		remove: function() {
			chart.destroy();
		}
	};
	
	return  lineChart;
}());