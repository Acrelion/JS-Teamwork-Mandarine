var movieDatabase = (function () {
	var database = {},
		movies = ['id0'],
		titles = ['id0'],
		properties = ['id0'];

	function Movie(title, propertiesObject) {
		this.title = title;
		this.properties = propertiesObject;
		// To be eddited 'properties' will be replaced with
		// Example:
		// this.genre = propertiesObject.genre
		// this.duration = propertiesObject.duration
	}

	Object.defineProperties(Movie, {
		title: {
		    get: function() {
		        return this._title;
		    },
		
		    set: function(val) {
		        validator.validateString(val, 2, 50, /[^\w\s]/, 'Movie Title');
		
		        this._title = val;
		
		        return this;
		    },
		
		    enumerable: true
		},
	});

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

	function getMovie(id) {
		validator.validatePositiveNumber(id, 'Movie ID');
		if (id < movies.length) {
			return movies[id];
		} else {
			throw new Error('Requested movie ID is outside the bounds of the collection');
		}
	}

	database = {
		addNew: addToDatabase,
		remove: removeFromDatabase,
		getTitles: getTitles,
		getProperties: getProperties,
		getMovie: getMovie
	};

	return database;
})(); 


// ************ For Testing Only *****************
// var sampleMoviePropertyes = {
// 	duration: 5,
// 	genre: 'action',
// 	rating: 8,
// 	ticketPrice: 5
// };

// movieDatabase.addNew('Rambo', sampleMoviePropertyes);

// console.log(movieDatabase.getTitles());
// console.log(movieDatabase.getProperties());
// // console.log(movieDatabase.getMovie(1)); // Comment the validation