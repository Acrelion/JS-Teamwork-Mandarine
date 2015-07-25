(function () {
    'use strict';
    require(["app-modules/ui", "libs/kinetic", "app-modules/pie-chart", "app-modules/drawer"], function (ui, Kinetic, PieChart, drawer) {

        var appContainer = document.getElementById('app-container');
        var stage = new Kinetic.Stage({
            container: 'app-container',
            width: 450,
            height: 350
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({ x: 50, y: 50, width: 50, height: 50, stroke:5 });
        drawer.drawPieChart(layer, rect);
        var pieChartForm = ui.getPieChartForm();
        var form = document.createElement('div');
        form.style.position = 'absolute';
        form.style.top = '50px';
        form.style.left = '0px';
        form.style.border = '1px solid black';
        form.setAttribute('id', 'chart-form');
        form.appendChild(pieChartForm);
        appContainer.appendChild(form);
        //layer = new Kinetic.Layer();
        stage.add(layer);
    });
} ());