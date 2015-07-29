var pyramidChart = (function() {
    
 var ctx,
        data,
        chart;
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

   // ctx = document.getElementById('canvas-for-charts').getContext('2d');

    data = {
        selector: "#pyramid-holder",
        "chart": {
            "manageresize": "1",
            "origw": "500",
            "origh": "350",
            "bgcolor": "FFFFFF",
            "showborder": "0",
            "showvalues": "0",
            "showlabels": "0",
            "issliced": "1",
            "chartleftmargin": "10",
            "chartrightmargin": "190",
            "showtooltip": "1",
            "annrenderdelay": "1.5"
        },
        "data": [
            {
                "value": "10",
                "label": "",
                "color": "AFD8F8",
                "tooltext": "Stocks(speculative){BR}Options(uncovered){BR}Margin Accounts{BR}Limited Partnerships"
            },
            {
                "value": "16",
                "label": "",
                "color": "8BBA00",
                "tooltext": "Corporate Bond Mutual Fund{BR}Stock Market Funds{BR}Blue Cip Stocks{BR}Investment Grade Bonds"
            },
            {
                "value": "18",
                "label": "",
                "color": "A66EDD",
                "tooltext": "Money Market, Government and{BR}Municipal Bond Mutual Funds{BR}Government Securities{BR}Unit Investment Trusts"
            },
            {
                "value": "22",
                "label": "",
                "color": "F984A1",
                "tooltext": "Certificates of deposits{BR}(CDs) (FDIC insured){BR}Bank Money Market{BR}Money Market Mutual Funds"
            }
        ],
        "annotations": {
            "groups": [
                {
                    "showbelow": "1",
                    "constrainedscale": "0",
                    "items": [
                        {
                            "type": "rectangle",
                            "x": "$chartStartX+2",
                            "y": "$chartStartY+2",
                            "tox": "$chartEndX-2",
                            "toy": "$chartEndY-2",
                            "fillalpha": "0",
                            "radius": "15",
                            "showborder": "0",
                            "borderthickness": "2",
                            "color": "333333",
                            "borderalpha": "100"
                        }
                    ]
                },
                {
                    "showbelow": "0",
                    "x": "$canvasCenterX",
                    "constrainedscale": "0",
                    "items": [
                        {
                            "type": "circle",
                            "y": "50",
                            "radius": "5",
                            "borderthickness": "1",
                            "color": "333333"
                        },
                        {
                            "type": "line",
                            "y": "50",
                            "tox": "55",
                            "borderthickness": "1",
                            "color": "333333"
                        },
                        {
                            "type": "line",
                            "x": "55",
                            "y": "25",
                            "toy": "75",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "circle",
                            "y": "110",
                            "radius": "5",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "y": "110",
                            "tox": "85",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "x": "85",
                            "y": "85",
                            "toy": "135",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "circle",
                            "y": "180",
                            "radius": "5",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "y": "180",
                            "tox": "105",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "x": "105",
                            "y": "155",
                            "toy": "205",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "circle",
                            "y": "280",
                            "radius": "5",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "y": "280",
                            "tox": "155",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "line",
                            "x": "155",
                            "y": "255",
                            "toy": "305",
                            "color": "333333",
                            "borderthickness": "1"
                        },
                        {
                            "type": "text",
                            "x": "60",
                            "y": "50",
                            "bold": "1",
                            "ishtml": "1",
                            "label": "Stocks(speculative){BR}Options(uncovered){BR}Margin Accounts{BR}Limited Partnerships",
                            "align": "left",
                            "color": "333333"
                        },
                        {
                            "type": "text",
                            "x": "90",
                            "y": "110",
                            "bold": "1",
                            "label": "Corporate Bond Mutual Fund{BR}Stock Market Funds{BR}Blue Cip Stocks{BR}Investment Grade Bonds",
                            "align": "left",
                            "color": "333333"
                        },
                        {
                            "type": "text",
                            "x": "110",
                            "y": "180",
                            "bold": "1",
                            "label": "Money Market, Government and{BR}Municipal Bond Mutual Funds{BR}Government Securities{BR}Unit Investment Trusts",
                            "align": "left",
                            "color": "333333"
                        },
                        {
                            "type": "text",
                            "x": "160",
                            "y": "280",
                            "bold": "1",
                            "label": "Certificates of deposits{BR}(CDs) (FDIC insured){BR}Bank Money Market{BR}Money Market Mutual Funds",
                            "align": "left",
                            "color": "333333"
                        }
                    ]
                }
            ]
        },
        "styles": {
            "definition": [
                {
                    "name": "TTipFont",
                    "type": "font",
                    "ishtml": "1"
                }
            ],
            "application": [
                {
                    "toobject": "TOOLTIP",
                    "styles": "TTipFont"
                }
            ]
        }
    }

  function createChart() {
      chart = new PykCharts.oneD.pyramid(data);
    }
    pyramidChart = {
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
    return pyramidChart;

}());