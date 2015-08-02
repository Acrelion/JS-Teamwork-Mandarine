var areaChart = (function() {
	var chart,
		areaHolder,
		options;

	areaHolder = document.getElementById("area-holder");

	options = {
		title:{
        text: "Cinema movies rating for last three years"        
      },
		theme: "theme2",
		backgroundColor: "rgba(0, 0, 0, 0)",
      axisX: {
        valueFormatString: "YYYY",
        interval : 1,
        intervalType: "year"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      toolTip: {
        shared: true
      },
      data: [

      {        
		type: "stackedArea",  
        showInLegend: true, 
        name: "SciFi",
        dataPoints: [      
        {x: new Date(2013,0,0), y: 7.5},
        {x: new Date(2014,0,0), y: 9.0},
        {x: new Date(2015,0,0), y: 8.7}      
        ]
      },
        {        
		type: "stackedArea",  
        showInLegend: true, 
        name: "Action",
        dataPoints: [      
          {x: new Date(2013,0,0), y: 7.0},
        {x: new Date(2014,0,0), y: 9.5},
        {x: new Date(2015,0,0), y: 9.0}      
        ]
      },
        {        
		type: "stackedArea",  
        showInLegend: true, 
        name: "Horror",
        dataPoints: [      
        {x: new Date(2013,0,0), y: 6.7},
          {x: new Date(2014,0,0), y: 7.4},
          {x: new Date(2015,0,0), y: 5.5}      
        ]
      },
        {        
        type: "stackedArea",  
        showInLegend: true, 
        name: "Thriller",
        dataPoints: [      
        {x: new Date(2013,0,0), y: 6.9},
        {x: new Date(2014,0,0), y: 7.2},
        {x: new Date(2015,0,0), y: 8.0}      
        ]
      },
         
        {        
        type: "stackedArea",  
        showInLegend: true, 
        name: "Drama",
        dataPoints: [      
        {x: new Date(2013,0,0), y: 7.1},
        {x: new Date(2014,0,0), y: 6.6},
        {x: new Date(2015,0,0), y: 6.0}      
        ]
      }
    ]
	};

	function createChart() {
		chart = new CanvasJS.Chart(areaHolder, options);
		chart.render(); 
	}

	areaChart = {
			draw: function() {
				if (chart) {
					areaHolder.innerHTML = '';
				}

				createChart();
			},

			remove: function() {
				areaHolder.innerHTML = "";
			}
		};

	return areaChart;
}());