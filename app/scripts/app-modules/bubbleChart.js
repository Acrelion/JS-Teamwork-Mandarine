/*
 Module for creating a bubble type chart via SVG.
 The module creates a div dinamicly.
 */

var bubbleChart = (function(database) {

		var chart,
			container,
			children,
			bubbleHolder,
			options,
			titles,
			chartData,
			ratings,
			genres,
			durations, 
			ticketPrices, 
			actionFactors,
			comedyFactors,
			dramaFactors,
			j;
	
			

// *******************************************************************************	
// Properties
		
		chartData = [
				{
					type:              "bubble",
					legendText:        "Size of Bubble Represents Action Factor",
					showInLegend:      true,
					legendMarkerType:  "circle",
					legendMarkerColor: "grey",
					toolTipContent:    "<span style='\"'color:{color};'\"'><strong>{name}</strong></span>" +
									   "<br/> <strong>Rating</strong> {y}" +
									   "<br/> <strong>Action Factor</strong> {z}" +
									   "<br/> <strong>Comedy Factor</strong> {comedyFactor}" +
									   "<br/> <strong>Drama Factor</strong> {dramaFactor}" +
									   "<br/> <strong>Genre</strong> {genre}" +								   
									   "<br/> <strong>Ticket Price</strong> {ticketPrice}" +								   
									   "<br/> <strong>Duration</strong> {duration}",
									   			
					dataPoints: createData()
				}
		];
						
		
		
		options = {
			zoomEnabled:      true,
			animationEnabled: true,
			backgroundColor: null,
			title:            
			{
				text: "Movies by Rating" // TODO: Connect with the db
			},
			axisX:  {
				title:   "Number of movies",
				gridColor: "gray",
				interval : 1
			},
			axisY: {
				title: "Rating",
				gridColor: "gray"
			},

			legend: {
				verticalAlign:   "bottom",
				horizontalAlign: "left"

			},
			data:   chartData
		};
					
// *******************************************************************************
// hidden functions

		//*Creates the div and hides everything else in the parent div*/
		function createHolder() {
			// create the bubble-holder div
			bubbleHolder = document.createElement("div");
			bubbleHolder.setAttribute("id", "bubble-holder");
			bubbleHolder.style.display = "block";
			bubbleHolder.style.width = "1024px";
			bubbleHolder.style.height = "600px";
				
			// get the parent element, a.k.a. <div id="content">...
			container = document.getElementById("content");
			
			// get all the elements in the parent and hide them;
			children = container.children;
			for (var i = 0; i < children.length; i += 1) {
				children[i].style.display = "none";
			}
			
			// hook it to <div id="content">
			container.appendChild(bubbleHolder);
		}
		
		
		//**Creates sets of data via connecting to the database. */
		function createData() {
			var dataObjects,
			    deltaObject;
				
						
			// Get data from the database about all the movies
			titles = database.getTitles();
			
			console.log(titles);
			
			ratings = database.getGivenPropertyValues('Rating');
			genres =  database.getGivenPropertyValues('Genre');
			durations = database.getGivenPropertyValues('Duration');
			ticketPrices = database.getGivenPropertyValues('Ticket Price');
			actionFactors = database.getGivenPropertyValues('Action Factor');
			comedyFactors = database.getGivenPropertyValues('Comedy Factor');
			dramaFactors = database.getGivenPropertyValues('Drama Factor');
			
			
			dataObjects = [];
			
			for(j = 0; j < titles.length; j += 1) {
				deltaObject = {
					x: j + 1,
					y: ratings[j],
					z: actionFactors[j],
					name: titles[j],
					genre: genres[j],
					ticketPrice: ticketPrices[j],
					duration: durations[j],
					comedyFactor: comedyFactors[j],
					dramaFactor: dramaFactors[j]
					
				};
				
				dataObjects.push(deltaObject);
			}
			
			return dataObjects;
		}
				
// *******************************************************************************	
// create the chart

        //*Creates the div that contains the chart  and then the chart itself.*/
		function createChart() {
			createHolder();
			chart = new CanvasJS.Chart("bubble-holder", options);
			chart.render();
		}

		bubbleChart = {
			draw: function() {
				if (chart) {
					bubbleHolder.remove();
					
				}
				
				createChart();
			},

			remove: function() {
				bubbleHolder.parentNode.removeChild(bubbleHolder);
			}
		};

		return bubbleChart;
}(movieDatabase));