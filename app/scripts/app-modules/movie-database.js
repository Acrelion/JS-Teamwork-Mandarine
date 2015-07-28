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
		movies = ['reserved'],
		titles = ['reserved'],
		properties = ['reserved'];
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
					validator.validateIfExistsInCollection(val, VALID_GENRES, 'Genre');

					this._genre = val;
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
		validator.validateString(title, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Title');
		if (titles.some(function(movieTitle) {
			return movieTitle.toLowerCase() === title.toLowerCase();
		})) {
			throw new Error('The database already contains a movie by that name');
		}

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

	function getPropertyNames() {
		var propertyNamesCopy = PROPERTY_NAMES.slice();

		return propertyNamesCopy;		
	}

	function getMovie(idOrTitle) {
		if (isNaN(idOrTitle)) {
			return getMovieByTitle(idOrTitle);
		} else {
			return getMovieById(idOrTitle);
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
		validator.validateString(title, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Movie Title');

		indexOfMovie = titles.indexOf(title);

		if (indexOfMovie !== -1) {
			return movies[indexOfMovie];
		} else {
			return null;
		}
	}

	function getMoviesByGenre(genre) {
		var moviesFromThisGenre = [];

		validator.validateString(genre, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Genre');
		validator.validateIfExistsInCollection(genre, VALID_GENRES, 'Genre');

		moviesFromThisGenre = movies.slice(1).filter(function(movie) {
			if (genre.toLowerCase() === movie.Genre.toLowerCase()) {
				return true;
			} else {
				return false;
			}
		});
		
		return moviesFromThisGenre;
	}

	function getAllMovies() {
		var moviesCopy = movies.slice(1);
		return moviesCopy;
	}

	function getGivenPropertyValues(movieProperty) {
		var propertyValues = [];

		validator.validateString(movieProperty, STRING_MIN_LENGTH, STRING_MAX_LENGTH, STRING_ILLEGAL_CHARS, 'Movie Property');
		validator.validateIfExistsInCollection(movieProperty, PROPERTY_NAMES, 'Movie Property');

		movieProperty = capitalizeFirstLetters(movieProperty);

		movies.slice(1).forEach(function(movie) {
			propertyValues.push(movie[movieProperty]);
		});

		return propertyValues;
	}

	function capitalizeFirstLetters(str) {
		var capitalizedWord = '',
			splitedBySpace = str.split(' ');

		splitedBySpace.forEach(function(word) {
			capitalizedWord += word[0].toUpperCase() + word.slice(1).toLowerCase() + ' ';
		});

		capitalizedWord = capitalizedWord.trim();

		return capitalizedWord;
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
		getMoviesByGenre: getMoviesByGenre,
		getAllMovies: getAllMovies,
		getGivenPropertyValues: getGivenPropertyValues
	};
	// ==================================== Summary ========================================
	// Usage:
	// database.addNew(title, propertiesObject) - creates a new Movie with the given
	// title and properties and then adds(pushes) it to the database (titles [], movies [],
	// properties []). 
	// This movie receives an id of the current movies.length so it can easily be traced
	// it's id is it's index in the collections (titles, movies, properties)
	// Throws if the titles already exist in the database or invalid values received

	// database.remove(movieId) - removes the movie with the given id from all collections 
	// in the database
	// Throws if the received id is 0, negative or outside the bounds of the array

	// database.getTitles() - returns an array - a copy of the titles collection without 
	// the reserverd zero index

	// database.getProperties() - deprecated. Returns a copy of the properties collection
	// The properties collecton is an array of objects with movie properties used 
	// in earlier versions of the app, it functionality is replaced with more convinient 
	// methods

	// database.getPropertyNames() - returns a copy of the constant PROPERTY_NAMES 

	// database.getMovie(idOrTitle) - returns a Movie instance from the database by 
	// given valid id or title 
	// Throws if the received input arguments are not valid id or title

	// database.getMoviesByGenre(genre) - returns a collection of all Movie instances
	// of the given genre
	// Throws if it receives an invalid string or unknown genre

	// database.getAllMovies() -  returns an array - a copy of all movies without 
	// the reserverd zero index

	// database.getGivenPropertyValues(movieProperty) - takes a string - one of the movie
	// properties (see the constant PROPERTY_NAMES for reference). Return an array 
	// with values for this property from all the movies in the database in sync with 
	// the titles collection
	// Example:
	// var ratings = database.getGivenPropertyValues('Rating') returns an array of all the movies
	// ratings. Also ratings[i] is the rating of title[i] or movies[i] (they are in sync)
	// Throws if it receives an invalid string or an unknown property
	// =====================================================================================

// *******************************************************************************	

	return database;
})(); 