var movieDatabase = (function () {
// ************************** Declaration and Constants **************************
	var STRING_MIN_LENGTH = 2,
		STRING_MAX_LENGTH = 50,
		STRING_ILLEGAL_CHARS = /[^\w\s]/,
		PROPERTY_MIN_VALUE = 0.1,
		PROPERTY_MAX_VALUE = 10,
		VALID_GENRES = [
			'Action',
			'Drama',
			'Comedy',
			'SciFi',
			'Horror',
			'Thriller'
		],
		PROPERTY_NAMES = [
			// Keep oreder, if adding properties add to the bottom
			'Rating',
			'Genre',
			'Duration',
			'Ticket Price',
			'Action Factor',
			'Comedy Factor',
			'Drama Factor'
		],
		database = {},
		movies = ['id0'],
		titles = ['id0'],
		properties = ['id0'];
// *******************************************************************************		

// ************************** Movie Constructor **********************************
	function Movie(title, propertiesObject) {

		Object.defineProperties(this, {
			title: {
				get: function() {
				  return this._title;
				},

				set: function(val) {
				  validator.validateString(val, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Movie Title');

				  this._title = val;

				  return this;
				},

				enumerable: true
			},

			Rating: {
				get: function() {
				  return this._rating;
				},
			
				set: function(val) {
				  validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Rating');

				  this._rating = val;

				  return this;
				},
			
				enumerable: true
			},

			Genre: {
				get: function() {
				  return this._genre;
				},
			
				set: function(val) {
					validator.validateString(val, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Genre');
					validator.validateIfValidGenre(val, VALID_GENRES, 'Genre');
				},

				enumerable: true
			},

			Duration: {
				get: function() {
					return this._duration;
				},

				set: function(val) {
					validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Duration');

					this._duration = val;

					return this;
				},

				enumerable: true
			},

			'Ticket Price': {
				get: function() {
					return this._ticket;
				},

				set: function(val) {
					validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Ticket Price');

					this._ticket = val;

					return this;
				},
			
				enumerable: true
			},

			'Action Factor': {
				get: function() {
					return this._action;
				},

				set: function(val) {
					validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Action Factor');

					this._action = val;

					return this;
				},

				enumerable: true
			},

			'Comedy Factor': {
				get: function() {
					return this._comedy;
				},

				set: function(val) {
					validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Comedy Factor');

					this._comedy = val;

					return this;
				},
			
				enumerable: true
			},

			'Drama Factor': {
				get: function() {
					return this._drama;
				},

				set: function(val) {
					validator.validateIfWithinPropertyRange(val, PROPERTY_MIN_VALUE, PROPERTY_MAX_VALUE, 'Drama Factor');

					this._drama = val;

					return this;
				},

				enumerable: true
			},
		});

		this.title = title;
		this.Rating = propertiesObject.Rating;
		this.Genre = propertiesObject.Genre;
		this.Duration = propertiesObject.Duration;
		this['Ticket Price'] = propertiesObject['Ticket Price'];
		this['Action Factor'] = propertiesObject['Action Factor'];
		this['Comedy Factor'] = propertiesObject['Comedy Factor'];
		this['Drama Factor'] = propertiesObject['Drama Factor'];

		// kept for backwards compability
		this.properties = propertiesObject;
	}
// *******************************************************************************	

// ************************** Methods ********************************************
	function addToDatabase(title, propertiesObject)	{
		var movie = new Movie(title, propertiesObject);

		movie.id = movies.length;
		movies.push(movie);
		titles.push(movie.title);
		properties.push(movie.properties);
	}

	function removeFromDatabase(movieId) {
		validator.validatePositiveNumber(movieId, 'Movie ID');
		if (movieId < movies.length) {
			movies.splice(movieId, 1);
			titles.splice(movieId, 1);
			properties.splice(movieId, 1);
		} else {
			throw new Error('Requested movie ID is outside the bounds of the collection');
		}
	
		return this;
	}

	function getTitles() {
		var titlesCopy = titles.slice(1);
		return titlesCopy;
	}

	function getProperties() {
		var propertiesCopy = properties.slice(1);
		return propertiesCopy;
	}

	// to be edited
	function getPropertyNames() {
		var propertyNamesCopy = PROPERTY_NAMES.slice();

		return propertyNamesCopy;		
	}

	function getMovie(idOrTitle) {
		if (isNaN(idOrTitle)) {
			getMovieByTitle(idOrTitle);
		} else {
			getMovieById(idOrTitle);
		}
	}

	function getMovieById(id) {
		validator.validatePositiveNumber(id, 'Movie ID');
		if (id < movies.length) {
			return movies[id];
		} else {
			throw new Error('Requested movie ID is outside the bounds of the collection');
		}
	}

	function getMovieByTitle(title) {
		var indexOfMovie;
		validator.validateString(val, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_ILLEGAL_CHARS, 'Movie Title');

		indexOfMovie = titles.indexOf(title);

		if (indexOfMovie !== -1) {
			return movies[indexOfMovie];
		} else {
			return null;
		}
	}

	function getMoviesByGenre(genre) {
		var moviesFromThisGenre;

		validator.validateString(genre, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Genre');
		validator.validateIfValidGenre(genre, VALID_GENRES, 'Genre');

		moviesFromThisGenre = movies.filter(function(movie) {
			if (genre.toLowerCase() === movie.toLowerCase()) {
				return true;
			} else {
				return false;
			}
		});
		
		return moviesFromThisGenre;
	}
// *******************************************************************************	

// ************************** Module Interface ***********************************
	database = {
		addNew: addToDatabase,
		remove: removeFromDatabase,
		getTitles: getTitles,
		getProperties: getProperties,
		getPropertyNames: getPropertyNames,
		getMovie: getMovie,
		getMoviesByGenre: getMoviesByGenre
	};
// *******************************************************************************	

	return database;
})(); 