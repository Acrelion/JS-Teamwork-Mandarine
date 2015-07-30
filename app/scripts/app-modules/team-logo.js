var teamLogo = (function () {
	var teamLogo,
		paper = Raphael('app-title', 700, 100);

	function animateText(text, x, stY, endY) {
	    var index = 0;
	    var start = x;
	    var startY = stY;
	    setInterval(function () {
	        if (!text[index]) {
	            return;
	        }
	        var letter = paper.text(start, startY, text[index]);
	        letter.attr({
	            "font-size": 34,
	            "font-family": "Helvetica, Arial, sans-serif",
	            "fill": "#666",
	            "stroke-width": "1",
	            "stroke": "#666",
	            "font-weight": "bold"
	        });
	        letter.animate({
	            x: start,
	            y: endY
	        }, 200);
	        start += 25;
	        index++;
	    }, 300);
	}

	teamLogo = {
		animateText: animateText
	};

	return teamLogo;
})(); 