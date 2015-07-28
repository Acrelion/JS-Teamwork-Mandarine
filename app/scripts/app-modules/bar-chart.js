var barChart = (function () {
	var data = [{
		title: 'Jurassic World',
		boxOffice: 624
	},
		{
			title: 'Inside Out',
			boxOffice: 320
		},
		{
			title: 'Mr. Holmes',
			boxOffice: 6
		},
		{
			title: 'Pixels',
			boxOffice: 24
		},
		{
			title: 'Minions',
			boxOffice: 262
		},
		{
			title: 'Paper Towns',
			boxOffice: 12
		},
		{
			title: 'Ant-Man',
			boxOffice: 106
		},
		{
			title: 'Southpaw',
			boxOffice: 16
		},
		{
			title: 'Trainwreck',
			boxOffice: 61
		},
		{
			title: 'Terminator Genisys',
			boxOffice: 85
		},
	];

	function drawBarChart() {
		var canvas = document.getElementById('canvas-for-charts'),
			ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var y = 140;
		var chartTtile = 'Top 10 box office gross (millions)';
		var movies = data.map(function (item) {
			var obj = {};
			obj[item.boxOffice] = item.title;
			return obj;
		});

		drawBorders(ctx, movies.length, chartTtile);
		drowChart(ctx, 200, y, movies);
		ctx.fillStyle = getRandomColor();
	}

	function drawBorders(ctx, count, title) {
		var startX = 199;
		var startY = 100;
		var step = 45;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX, startY + (count * step));
		ctx.lineTo(700, startY + (count * step));
		ctx.stroke();
		ctx.fillStyle = '#000000';
		ctx.fontSize = 16 + 'px ' + 'Arial';
		ctx.fillText(title, 250, startY);
	}

	function anim(ctx, x, y, maxValue, height, title) {
		var max = maxValue;
		var step = 1;
		var width = 0;

		function drawBar() {
			width += step;
			ctx.beginPath();
			ctx.fillRect(x, y, width, height);
			if (width < max) {
				requestAnimationFrame(drawBar);
			}
			else {
				ctx.fillStyle = '#000000';
				ctx.font = 12 + 'px ' + 'Arial';
				ctx.fillText(maxValue, x - 30, y);
				ctx.fillText(title, x, y);
				ctx.strokeText(title, x, y);
				ctx.fillStyle = getRandomColor();
			}
		}

		drawBar();
	}

	function drowChart(ctx, x, y, values) {
		var count = values.length;
		var movies = values.map(function(item){
			var obj = {};
			obj.id = parseInt(Object.keys(item)[0]);
			obj.title = item[obj.id];
			return obj;
		}).sort(function(a ,b){ return a.id - b.id});
		
		var newY = y;
		var maxValue =  movies[count - 1].id;
		while (count > 0) {
			maxValue = movies[count - 1].id;
			anim(ctx, x, newY, maxValue, 20, movies[count - 1].title);
			count--;
			newY += 40;
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
		drawBarChart: drawBarChart
	}
} ())