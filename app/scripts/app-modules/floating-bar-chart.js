var floatingBarChart = (function (database) {
	function getMovieDatabase() {
		var data = [],
		    currentMovie;
			
		titles = database.getTitles();
		genres =  database.getGivenPropertyValues('Genre');
		
		for(i = 0; i < titles.length; i++) {
			currentMovie = {
				name: titles[i],
				genre: genres[i],
			};
			data.push(currentMovie);
		}
		
		return data;
	}

	function drawFloatingBar(ctx, x, y, width, height, color)	{
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	function drawLine(ctx, startPosX, startPosY, endPosX, endPosY){
		ctx.beginPath();
		ctx.moveTo(startPosX, startPosY);
		ctx.lineTo(endPosX, endPosY);
		ctx.stroke();
	}

	function drawScale(ctx, canvasWidth, startPosX, startPosY, zeroPosX, zeroPosY, totalNumberOfMovies){
		var movieCountText,
			totalCheckpointLines = 5,
			checkpointLineStartPosX = startPosX - 10,
			checkpointLineEndPosX = canvasWidth - startPosX,
			textStartPosX = startPosX - 60,
			textStartPosY = startPosY + 10,
			movieCountStep = totalNumberOfMovies / totalCheckpointLines,
			stepUntilNextCheckPoint = (zeroPosY - startPosY) / totalCheckpointLines;

		// scale line
		drawLine(ctx, startPosX, startPosY, zeroPosX, zeroPosY);

		ctx.fillStyle = 'black';
		ctx.font = '24px Serif';
		// checkpoint lines
		ctx.lineWidth = 0.4;
		for (var i = 0; i <= totalCheckpointLines; i++) {
			drawLine(ctx, checkpointLineStartPosX, startPosY, checkpointLineEndPosX, startPosY);
			
			movieCountText = (totalNumberOfMovies - (i * movieCountStep)).toFixed(1);
			ctx.fillText(movieCountText, textStartPosX, textStartPosY);

			startPosY += stepUntilNextCheckPoint;
			textStartPosY += stepUntilNextCheckPoint;
		}

	}

	function drawFloatingBarChart(){
		var canvas = document.getElementById('canvas-for-charts');
		var context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);

		var scaleBorderPosX = 75,
			scaleBorderTopPosY = 50,
			scaleBorderBottomPosY = canvas.height - 50,
			movieCountForEachGenre,
			genreCount = 0,
			scaleLineTotalHeight,
			barBlockWidth,
			currentX,
			currentY,
			stepBetweenBlocks,
			textStartPosX,
			genreTextStartPosY;

		var data = getMovieDatabase();
		console.log(data)

		drawScale(context, canvas.width, scaleBorderPosX, scaleBorderTopPosY, 
				scaleBorderPosX, scaleBorderBottomPosY, data.length);

		movieCountForEachGenre = [];
		for (var movie = 0; movie < data.length; movie++) {
			var currentMovie = data[movie];
			if (!movieCountForEachGenre[currentMovie.genre]) {
				movieCountForEachGenre[currentMovie.genre] = 0;
				movieCountForEachGenre.length += 1;
			}
			
			movieCountForEachGenre[currentMovie.genre] += 1;
		}

		scaleLineTotalHeight = scaleBorderBottomPosY - scaleBorderTopPosY,
		barBlockWidth = 50,
		currentX = scaleBorderPosX + 40,
		currentY = scaleBorderTopPosY,
		stepBetweenBlocks = ((canvas.width - scaleBorderPosX) / movieCountForEachGenre.length) - 10;
		genreCount = 1;
		for (var genre in movieCountForEachGenre) {
			context.fillStyle = 'black';
			textStartPosX = currentX - 20,
			genreTextStartPosY = currentY - 10;
			context.fillText(genre + ': ' + movieCountForEachGenre[genre], textStartPosX, genreTextStartPosY);

			var numberOfMoviesOfCurrentGenre = movieCountForEachGenre[genre];
			var currentGenrePercent = numberOfMoviesOfCurrentGenre / data.length * 100;
			var barBlockHeight = currentGenrePercent * scaleLineTotalHeight / 100;
			var timeoutTimer = 500 * genreCount;
			var currentColor = getRandomColor();
			setTimeout(drawFloatingBar, timeoutTimer, context, currentX, currentY, barBlockWidth, barBlockHeight, currentColor);
			clearTimeout();

			genreCount += 1;
			currentX += stepBetweenBlocks;
			currentY += barBlockHeight;
		}
	}

	function getRandomValue(min, max) {
		if (!max) {
			max = min;
			min = 0;
		}
		return (Math.random() * (max - min) + min) | 0;
	}

	function getRandomColor() {
		var red = getRandomValue(255),
			green = getRandomValue(255),
			blue = getRandomValue(255);
		return "rgb(" + red + "," + green + "," + blue + ")";
	}

	return {
		drawFloatingBarChart: drawFloatingBarChart
	};
}(movieDatabase));

// floatingBarChart.drawFloatingBarChart();
// drawFloatingBarChart();