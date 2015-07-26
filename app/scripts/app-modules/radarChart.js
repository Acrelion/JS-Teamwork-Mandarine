var radarChart = (function () {
	var radarChart, ctx;

	ctx = document.getElementById('canvas-chart').getContext('2d');
	radarChart = new Chart(ctx).Radar(data, options);

	return radarChart;
})(); 