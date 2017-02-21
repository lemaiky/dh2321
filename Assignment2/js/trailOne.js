//var filteredDatasOne = new Array();
var gridOne = d3.divgrid();
var fullDatasOne = new Array();
var fullCountriesOne;
var parcoordsOne;

var dimensionsOne = {
  "Happiness": {type:"number"},
  "Life satisfaction": {type:"number"},
  "Meaning of life": {type:"number"},
  "Friends importance": {type:"number"},
  "Family importance": {type:"number"},
  "Emph. on family": {type:"number"},
  "Proud parents": {type:"number"},
  "Nb of children": {type:"number"},
  "% Housewife": {type:"number"},
  "Wave": {
    type: "string",
    orient: "right"
  }
};

/********************************************************
* WAVE ONE: 1995-1999
*********************************************************/
d3.csv('datas/trailone_values_95-99.csv', function(data) {
	//filteredDatasOne["waveOne"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
      //filteredDatasOne["waveOne"].push(country);
      fullDatasOne.push(country);
    }
	});
});

/********************************************************
* WAVE TWO: 2000-2004
*********************************************************/
d3.csv('datas/trailone_values_00-04.csv', function(data) {
	//filteredDatasOne["waveTwo"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			//filteredDatasOne["waveTwo"].push(country);
      fullDatasOne.push(country);
    }
	});
});

/********************************************************
* WAVE THREE: 2005-2009
*********************************************************/
d3.csv('datas/trailone_values_05-09.csv', function(data) {
	//filteredDatasOne["waveThree"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			//filteredDatasOne["waveThree"].push(country);
      fullDatasOne.push(country);
    }
	});
});

/********************************************************
* WAVE FOUR: 2010-2014
*********************************************************/
d3.csv('datas/trailone_values_10-14.csv', function(data) {
	//filteredDatasOne["waveFour"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			//filteredDatasOne["waveFour"].push(country);
      fullDatasOne.push(country);
    }
	});
});

/********************************************************
* SCALING FILE
*********************************************************/
d3.csv('datas/scaleFile.csv', function(data) {
  parcoordsOne = d3.parcoords()("#trailOne")
    .data(data)
    .dimensions(dimensionsOne)
    .alpha(0.8)
    .margin({ top: 24, left: 10, bottom: 12, right: 10 })
    .composite("darken")
    .mode("queue")
    .render()
    .reorderable()
    .brushMode("1D-axes-multi")
    .alphaOnBrushed(0.1);

  parcoordsOne
    .data(fullDatasOne)
    .color(function(d) { return colorgen[d['Wave']]; })
    .render();

  sortGridOne();
})

function renderGridOne() {
  d3.select("#gridOne")
    .datum(fullDatasOne)
    .call(gridOne)
    .selectAll(".row")
    .on({
      "mouseover": function(d) {
        var highlights = new Array();
        fullDatasOne.forEach(function(country) {
          if(country["Country"] == d["Country"])
            highlights.push(country);
        });
        parcoordsOne.highlight(highlights);
      },
      "mouseout": parcoordsOne.unhighlight
    });

  parcoordsOne.on("brush", function(d) {
    d3.select("#gridOne")
      .datum(d)
      .call(gridOne)
      .selectAll(".row")
      .on({
        "mouseover": function(d) {
          var highlights = new Array();
          fullDatasOne.forEach(function(country) {
            if(country["Country"] == d["Country"])
              highlights.push(country);
          });
          parcoordsOne.highlight(highlights);
        },
        "mouseout": parcoordsOne.unhighlight
      });
  });
}

function updateGridOne(sortId, order) {
  fullDatasOne.sort(function(a, b){
    var x = a[sortId].toLowerCase();
    var y = b[sortId].toLowerCase();
    if (x < y) {return order * (-1);}
    if (x > y) {return order * (1);}
    return 0;
  });

  renderGridOne();
}
