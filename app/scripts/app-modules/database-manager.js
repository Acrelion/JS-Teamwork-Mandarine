var databaseManager = (function (database) {

	var databaseManager,
		defaultMovieTitles,
		defaultMoviePorperties;

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
	defaultMoviePorperties = [
		{
			'Rating': 8,
			'Ticket Price': 5,
			'Duration': 8,
			'Action Factor': 9,
			'Comedy Factor': 5,
			'Drama Factor': 7
		},
		{
			'Rating': 9,
			'Ticket Price': 7,
			'Duration': 9,
			'Action Factor': 5,
			'Comedy Factor': 4,
			'Drama Factor': 8
		},
		{
			'Rating': 9,
			'Ticket Price': 4,
			'Duration': 8.2,
			'Action Factor': 6,
			'Comedy Factor': 10,
			'Drama Factor': 2
		},
		{
			'Rating': 10,
			'Ticket Price': 5,
			'Duration': 7.2,
			'Action Factor': 7,
			'Comedy Factor': 9,
			'Drama Factor': 3
		},
		{
			'Rating': 8,
			'Ticket Price': 0,
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

		if (defaultMovieTitles.length !== defaultMoviePorperties.length) {
			throw new Error('"defaultMovieTitles" and "defaultMoviePorperties" must be of the same length');
		}

		for (i = 0, len = defaultMovieTitles.length; i < len; i += 1) {
			database.addNew(defaultMovieTitles[i], defaultMoviePorperties[i]);
		}
	}

	loadDefaults();

	databaseManager = {
		loadDefaults: loadDefaults
	};

	return databaseManager;

})(movieDatabase); 