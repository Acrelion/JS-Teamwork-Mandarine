var pieChart = (function() {
    var r = Raphael('svg-holder'),
        chart,
        // canvas,
        svgContainer;


    // canvas = document.getElementById('canvas-for-charts');
    svgContainer = document.getElementById('svg-holder');


    function createChart() {
        //by creation orders values from max to min, %%.%% calculates each value as part from 100%
        //512, 300 -coordinates, radius=300
        //[] - values 
        chart = r.piechart(512, 300, 200, [9, 5, 6, 7, 10], {
            legend: ["%%.%% - Rambo", "%%.%% - Titanic", "%%.%% - American Pie", "%%.%% - Shrek", "%%.%% - Video Game High School"]

        });

        //title of chart
        r.text(320, 100, "Action factor").attr({
            font: "20px sans-serif"
        });

        //hover functions
        chart.hover(function() {
            this.sector.stop();
            this.sector.scale(1.1, 1.1, this.cx, this.cy);

            if (this.label) {
                this.label[0].stop();
                this.label[0].attr({
                    r: 7.5
                });
                this.label[1].attr({
                    "font-weight": 800
                });
            }
        }, function() {
            this.sector.animate({
                transform: 's1 1 ' + this.cx + ' ' + this.cy
            }, 500, "bounce");

            if (this.label) {
                this.label[0].animate({
                    r: 5
                }, 500, "bounce");
                this.label[1].attr({
                    "font-weight": 400
                });
            }
        });

    }


    pieChart = {
        draw: function() {
            if (chart) {
                chart.remove();
            }
            createChart();
        },

        remove: function() {
            chart.remove();

        }
    };

    return pieChart;

}());