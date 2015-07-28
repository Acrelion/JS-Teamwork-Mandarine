var barChart = (function () {
	var data = [{
		title: 'Jurassic World',
		boxOffice: 623
	},
		{
			title: 'Inside Out',
			boxOffice: 320
		},
		{
			title: 'Spy',
			boxOffice: 108
		},
		{
			title: 'Ted 2',
			boxOffice: 79
		},
		{
			title: 'Entourage',
			boxOffice: 32
		},
		{
			title: 'Insidious Chapter 3',
			boxOffice: 52
		},
		{
			title: 'Max (2015)',
			boxOffice: 39
		},
		{
			title: 'Dope',
			boxOffice: 16
		},
		{
			title: 'Me and Earl and the Dying Girl',
			boxOffice: 6
		}
	];

	function drawBarChart() {
		var canvas = document.getElementById('canvas-for-charts'),
			ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var y = 200;
		var values = [55, 111, 155, 222, 255, 510];


		var isVertical = false;
		drawBorders(ctx);
		drowChart(ctx, 200, y, values);
		ctx.fillStyle = getRandomColor();

	}
	
	function drawBorders(ctx) {
		ctx.beginPath();
		ctx.moveTo(199, 180);
		ctx.lineTo(199, 500);
		ctx.lineTo(700, 500);
		ctx.stroke();
	}

	function anim(ctx, x, y, maxValue, height, timeout) {
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
				ctx.fillStyle = getRandomColor();
			}
		}

		drawBar();
	}

	function drowChart(ctx, x, y, values) {
		var count = values.length;
		var maxValue = values[count - 1];
		while (count > 0) {
			maxValue = values[count - 1];
			anim(ctx, x, y, maxValue, 20, false);
			count--;
			y += 30;
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