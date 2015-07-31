var pyramidChart = (function () {

    var pyramidHolder,
        chart,
        container,
        children,
        chartIsDrawn = false,
        movieTitles = [],
        ticketPrice = [],
        data = [];


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

    //================GET DATA=============//
    function getData() {
        movieTitles = movieDatabase.getTitles();
        ticketPrice = movieDatabase.getGivenPropertyValues('Ticket Price');
        for (var i = 0; i < movieTitles.length; i += 1) {
            data.push([
                movieTitles[i],
                ticketPrice[i]
            ])
        }
        return data;
    }
    //====================================================

    function createChart() {
        createHolder();
        getData();

        $('#pyramid-holder').highcharts({
            chart: {
                type: 'pyramid',
                marginRight: 100,
                backgroundColor: "rgba(0, 0, 0, 0)"
            },
            title: {
                text: 'Movies Ticket price',
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
                enabled: true
            },
            series: [{
                name: 'Price',
                data: data
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
            chartIsDrawn = true;
            data = [];
        },

        remove: function () {
            pyramidHolder.innerHTML = "";
            pyramidHolder.remove();
            chartIsDrawn = false;
        },

        isDrawn: function () {
            return chartIsDrawn;
        }
    };
    return pyramidChart;

}());