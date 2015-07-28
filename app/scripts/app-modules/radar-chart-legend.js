var radarChartLegend = (function(chart) {
	var chartLegend,
		inputButton,
		inputFieldFirstMovie,
		inputFieldSecondMovie,
		divLegendContainer,
		divGeneratedLegend,
		divContent = document.getElementById('content'),
		_legendIsVisible = false;

		// style.css should apply styles
		divLegendContainer = document.createElement('div');
		divLegendContainer.setAttribute('id', 'radar-chart-legend-container');

		inputFieldFirstMovie = setupInputField(inputFieldFirstMovie);
		divLegendContainer.appendChild(inputFieldFirstMovie);

		inputFieldSecondMovie = setupInputField(inputFieldSecondMovie);
		divLegendContainer.appendChild(inputFieldSecondMovie);

		inputButton = document.createElement('button');
		inputButton.innerText = 'OK';
		divLegendContainer.appendChild(inputButton);

		divGeneratedLegend = document.createElement('div');
		divGeneratedLegend.setAttribute('id', 'radar-chart-legend');
		divLegendContainer.appendChild(divGeneratedLegend);

	function updateLegendContent(){
		divGeneratedLegend.innerHTML = chart.generateLegend();
	}

	function setupInputField(input) {
		input = document.createElement('input');
		input.type = 'text';
		input.className = 'radar-chart-text-inputs';
		input.setAttribute('placeholder', 'Enter a movie name');

		return input;
	}

	function showLegend() {
		updateLegendContent();
		divContent.appendChild(divLegendContainer);
		_legendIsVisible = true;
	}

	function hideLegend() {
		divContent.removeChild(divLegendContainer);
		_legendIsVisible = false;
	}

	chartLegend = {
		updateContent: updateLegendContent,

		show: showLegend,

		hide: hideLegend
	};

	Object.defineProperty(chartLegend, 'isVisible', {
		get: function() {
			return _legendIsVisible;
		}
	});

	return chartLegend;

})(radarChart); 