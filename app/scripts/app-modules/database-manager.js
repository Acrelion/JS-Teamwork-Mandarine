(function (database) {

	var databaseManager,
		moviesFromLocalStorage,
		defaultMovieTitles,
		defaultMovieProperties,
		errorMessageDiv,
		movieForm = document.getElementById('movie-form'),
		buttonSubmitMovie = document.getElementById('submit-movie-form'),
		buttonSaveToLocalStorage = document.getElementById('save-movie-form');
		inputs = {
			title: document.getElementById('movie-title'),
			rating: document.getElementById('movie-rating'),
			genre: document.getElementById('movie-genre'),
			ticketPrice: document.getElementById('movie-ticket-price'),
			duration: document.getElementById('movie-duration'),
			action: document.getElementById('movie-action-factor'),
			comedy:document.getElementById('movie-comedy-factor'),
			drama: document.getElementById('movie-drama-factor')
		};

// ************************** Default Titles *************************************
	defaultMovieTitles = [
		'Rambo',
		'Titanic',
		'American Pie',
		'Shrek',
		'Video Game High School'
	];
// *******************************************************************************

// ************************** Default Properties (For titles) ********************
	defaultMovieProperties = [
		{
			'Rating': 8,
			'Genre': 'Action',
			'Ticket Price': 5,
			'Duration': 8,
			'Action Factor': 9,
			'Comedy Factor': 5,
			'Drama Factor': 7
		},
		{
			'Rating': 9,
			'Genre': 'Drama',
			'Ticket Price': 7,
			'Duration': 9,
			'Action Factor': 5,
			'Comedy Factor': 4,
			'Drama Factor': 8
		},
		{
			'Rating': 9,
			'Genre': 'Comedy',
			'Ticket Price': 4,
			'Duration': 8.2,
			'Action Factor': 6,
			'Comedy Factor': 10,
			'Drama Factor': 2
		},
		{
			'Rating': 10,
			'Genre': 'Comedy',
			'Ticket Price': 5,
			'Duration': 7.2,
			'Action Factor': 7,
			'Comedy Factor': 9,
			'Drama Factor': 3
		},
		{
			'Rating': 8,
			'Genre': 'SciFi',
			'Ticket Price': 0.1,
			'Duration': 4.5,
			'Action Factor': 10,
			'Comedy Factor': 8,
			'Drama Factor': 8
		}
	];
// *******************************************************************************


// ************************** Setup Local Storage ********************************
	if (localStorage.getItem('moviesCollection')) {
		moviesFromLocalStorage = JSON.parse(localStorage.getItem('moviesCollection'));
		addMoviesFromLocalStorage(moviesFromLocalStorage);
	} else {
		loadDefaults();
		updateLocalStorage();
	}

	function updateLocalStorage() {
		localStorage.setItem('moviesCollection', JSON.stringify(database.getAllMovies()));
	}

	function addMoviesFromLocalStorage(movies) {
		movies.forEach(function(movie) {
			var title = movie.title,
				propertyNames = database.getPropertyNames();
				properties = {};

			propertyNames.forEach(function(property) {
				properties[property] = movie[property];
			});

			try {
				database.addNew(title, properties);
			} 
			catch (error) {
				console.log(error.message);
				if (error.message === 'The database already contains a movie by that name') {
					return;
				} else {
					throw error;
				}
			}	
		});
	}

	function loadDefaults() {
		var i,
			len;

		if (defaultMovieTitles.length !== defaultMovieProperties.length) {
			throw new Error('"defaultMovieTitles" and "defaultMovieProperties" must be of the same length');
		}

		for (i = 0, len = defaultMovieTitles.length; i < len; i += 1) {
			database.addNew(defaultMovieTitles[i], defaultMovieProperties[i]);
		}
	}
// *******************************************************************************	
	function addMovie() {
		try {	
			console.log(inputs);
		database.addNew( 
			inputs.title.value , {
			'Rating': inputs.rating.valueAsNumber,
			'Genre': inputs.genre.value,
			'Ticket Price': inputs.ticketPrice.valueAsNumber,
			'Duration': inputs.duration.valueAsNumber,
			'Action Factor': inputs.action.valueAsNumber,
			'Comedy Factor': inputs.comedy.valueAsNumber,
			'Drama Factor': inputs.drama.valueAsNumber
			});

		alert('submitted');

		} catch (error) {
			alert(error.message);
		}
	}

	function setInputNumberStepAtr(inputFields) {
		var step = 0.1,
			prop;
		for (prop in inputFields) {
			if (inputFields[prop].type === 'number') {
				inputFields[prop].setAttribute('step', step);
			}
		}	
	}

	setInputNumberStepAtr(inputs);

	movieForm.addEventListener('keydown', function(evt) {
		// Enter == 13
		if (evt.keyCode === 13) {
			addMovie();
		}
	});

	buttonSubmitMovie.addEventListener('click', addMovie);

	buttonSaveToLocalStorage.addEventListener('click', updateLocalStorage);

})(movieDatabase); 