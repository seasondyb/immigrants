
(function() {
	var map = null;
	var init = function() {
		map = L.map('mapcanvas').setView([34.5608081,-75.8267278], 4);
		L.tileLayer("https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png", {
    		
    		id: 'examples.map-20v6611k'
		}).addTo(map);

	getData();

	};

	var getData = function() {
		$.getJSON('data/immigrants.geo.json', renderMap);
	};

	var renderMap = function(data) {
		L.geoJson(data, {style: getStyle, onEachFeature: handleInteractions}).addTo(map);	
	};

	var handleInteractions = function(feature, layer) {
    layer.on({
    	click:handClick
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        // click: zoomToFeature
    });
}

var handClick = function(e){
	var currentstate = e.target.feature.properties.name;
	// console.log(e.target.feature.properties.name)
	$('.current-state').text(currentstate)
	renderBarGraph(currentstate)
}

var renderBarGraph = function(currentstate) {
	nv.addGraph(function() {
     var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      ;

    d3.select('#bar-chart svg')
      .datum(getDataFromCurrentState(currentstate))
      .call(chart);

    nv.utils.windowResize(chart.update);

  return chart;
});
}

var getDataFromCurrentState = function(state){
	$.getJSON('data/split.json', function(data){
		console.log(data);
	})
}


	var getStyle =	function(feature) {
    return {
        fillColor: getColor(feature.properties.total),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}



	var getColor = function(value) {
		return d3.scale.linear()
		  .domain([0, 5000000])
		  .range(['#fde0dd','#c51b8a'])(value);
	}

	init();

})();