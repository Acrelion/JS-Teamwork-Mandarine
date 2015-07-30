var pyramidChart = (function() {
    
    var pyramidHolder,
        chart,
        container,
        children;


 function createHolder() {

     pyramidHolder = document.createElement("div");
     pyramidHolder.setAttribute("id", "pyramid-holder");
     pyramidHolder.style.display = "block";
     pyramidHolder.style.width = "1024px";
     pyramidHolder.style.height = "600px";
     container = document.getElementById("content");

     children = container.children;
    for (var i = 0; i < children.length; i += 1) {
         children[i].style.display = "none";
     }

   // hook it to <div id="content">
    container.appendChild(pyramidHolder);
 }


 
    

    function createChart() {
        createHolder();
        
        $('#pyramid-holder').highcharts({
        chart: {
            type: 'pyramid',
            marginRight: 100,
            backgroundColor: "rgba(0, 0, 0, 0)"
        },
        title: {
            text: 'Movies pyramid',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Unique users',
            data: [
                ['Rambo',   8],
                ['Titanic',       9],
                ['American Pie', 6],
                ['Shrek',    10],
                ['Video Game High School',   7]
            ]
        }]
    });
    }
      
    pyramidChart = {
        draw: function () {
            if (chart) {
                pyramidHolder.innerHTML = '';
                pyramidHolder.remove();
            }

            createChart();
        },

        remove: function () {
            pyramidHolder.innerHTML = "";
            pyramidHolder.remove();
        }
    };
    return pyramidChart;

}());