var databaseManager = (function (database) {

	var databaseManager,
		defaultMovieTitles,
		defaultMovieProperties,
		buttonSubmitMovie = document.getElementById('submit-movie-form');

	// ****** Default Titles *********************
	defaultMovieTitles = [
		'Rambo',
		'Titanic',
		'American Pie',
		'Shrek',
		'Video Game High School'
	];
	// *******************************************

	// ****** Default Properties (For titles) ****
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
	// *******************************************

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

	loadDefaults();

	function addMovie(params) {
		movieDatabase.addNew(params.title, params.data);
	}

	buttonSubmitMovie.addEventListener('click', function () {
		var title = document.getElementById('movie-title').value;
		var rating = parseInt(document.getElementById('movie-rating').value);
		rating = rating || 0;
		var genre = document.getElementById('movie-genre').value;
		var ticketPrice = parseInt(document.getElementById('movie-ticket-price').value);
		ticketPrice = ticketPrice || 0;
		var duration = parseInt(document.getElementById('movie-duration').value);
		duration = duration || 0;
		var action = parseInt(document.getElementById('movie-action-factor').value);
		action = action || 0;
		var comedy = parseInt(document.getElementById('movie-comedy-factor').value);
		comedy = comedy || 0;
		var drama = parseInt(document.getElementById('movie-drama-factor').value);
		drama = drama || 0;
		addMovie({
			title: title,
			data: {
				'Rating': rating,
				'Genre': genre,
				'Ticket Price': ticketPrice,
				'Duration': duration,
				'Action Factor': action,
				'Comedy Factor': comedy,
				'Drama Factor': drama
			}
		})
	})

	databaseManager = {
		loadDefaults: loadDefaults
	};

	return databaseManager;

})(movieDatabase); 