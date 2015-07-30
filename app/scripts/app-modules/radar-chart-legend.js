var radarChartLegend = (function(chart, database) {
	var chartLegend,
		inputButton,
		inputFieldFirstMovie,
		inputFieldSecondMovie,
		divLegendContainer,
		divGeneratedLegend,
		divContent = document.getElementById('content'),
		_legendIsVisible = false,
		inputsAutocompleteOptions = {
			lookup: updateSuggestions(),
			minChars: 1,
			onSelect: passInputToChart
		};

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
		input.setAttribute('placeholder', 'Start typing a movie name');

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

	function updateSuggestions() {
		var sugestions = database.getTitles();
		return sugestions;
	}

	function passInputToChart() {
		try {

			if (inputFieldFirstMovie.value) {
				chart.setFirstMovie(database.getMovie(inputFieldFirstMovie.value));
			}

			if (inputFieldSecondMovie.value) {
				chart.setSecondMovie(database.getMovie(inputFieldSecondMovie.value));	
			}

			chart.draw();
		} catch (error) {
			console.log(error.message);
		}	
	}

	function updateAutocompleteSuggestions() {
			$(inputFieldFirstMovie).autocomplete('setOptions', {
				lookup: updateSuggestions()
			});

			$(inputFieldSecondMovie).autocomplete('setOptions', {
				lookup: updateSuggestions()
			});
	}

// *************************** Event Listener/s **********************************	
	$(inputFieldFirstMovie).autocomplete(inputsAutocompleteOptions);

	$(inputFieldSecondMovie).autocomplete(inputsAutocompleteOptions);
// *******************************************************************************	

// ************************** Module Interface ***********************************
	chartLegend = {
		updateContent: updateLegendContent,

		show: showLegend,

		hide: hideLegend,

		updateAutocompleteSuggestions: updateAutocompleteSuggestions
	};

	Object.defineProperty(chartLegend, 'isVisible', {
		get: function() {
			return _legendIsVisible;
		}
	});
// *******************************************************************************		

	return chartLegend;

})(radarChart, movieDatabase); 