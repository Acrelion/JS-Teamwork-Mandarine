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
		animationSteps: 60,
		animationEasing: animations[29]
	};

	function createChart() {
		chart = new Chart(context).Line(data);
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