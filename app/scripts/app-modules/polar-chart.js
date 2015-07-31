var polarChart = (function () {

    var ctx,
        data,
        chart,
        chartIsDrawn = false;

    ctx = document.getElementById('canvas-for-charts').getContext('2d');

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    var      dataBase = [],
             statisticProperty = "Comedy Factor",
             movieTitles = movieDatabase.getTitles(),
             values = movieDatabase.getGivenPropertyValues(statisticProperty);
    
    for (var i = 0; i < values.length; i++) {
       
        data = 
        {
            value: values[i],
            color: getRandomColor(),
            highlight: getRandomColor(),
            label: movieTitles[i]
        };
        dataBase.push(data);
        console.log(dataBase);
    }

    function createChart() {
        chart = new Chart(ctx).PolarArea(dataBase);
    }
    polarChart = {
        draw: function () {
            if (chart) {
                chart.destroy();
            }
            createChart();
            chartIsDrawn = true;
        },
        remove: function () {
            chart.destroy();
            chartIsDrawn = false;
        },

        isDrawn: function() {
            return chartIsDrawn;
        }
    };
    return polarChart;
}());
