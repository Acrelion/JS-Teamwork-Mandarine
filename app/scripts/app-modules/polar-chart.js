var polarChart = (function () {

    var ctx,
        data,
        chart;

    ctx = document.getElementById('canvas-for-charts').getContext('2d');

    data = [
    {
        value: 1300,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Action"
    },
    {
        value: 1050,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Drama"
    },
    {
        value: 1100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Comedy"
    },
    {
        value: 1240,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "SciFi"
    },
    {
        value: 1120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Horror"
    },
    {
        value: 920,
        color: "#33FFCC",
        highlight: "#33FFCC",
        label: "Thriller"
    }

    ];

    function createChart() {
        chart = new Chart(ctx).PolarArea(data);
    }
    polarChart = {
        draw: function () {
            if (chart) {
                chart.destroy();
            }
            createChart();
        },
        remove: function () {
            chart.destroy();
        }
    };
    return polarChart;
}());
