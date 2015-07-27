var barChart = (function(){
	
	function drawBarChart() {
		var canvas = document.getElementById('canvas-for-charts'),
			ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillRect(50,50,200,100);
	}
	
	return {
		drawBarChart : drawBarChart
	}
}())