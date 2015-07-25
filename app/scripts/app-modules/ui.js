define([], function () {

    var ui = (function () {

		function getPieChartForm() {
			var div = document.createElement('div');
			div.style.display = 'inline-block';
			var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.id = 'pie-chart-key';
			var number = document.createElement('input');
			number.setAttribute('type', 'number');
			number.id = 'pie-chart-value';
			var btn = document.createElement('button');
			btn.innerHTML = 'click';
			div.appendChild(input);
			div.appendChild(number);
			div.appendChild(btn);
			return div;
		}
		return {
			getPieChartForm: getPieChartForm
		}
	} ());
	return ui;
});