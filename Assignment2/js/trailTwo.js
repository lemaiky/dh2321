var filteredDatasTwo = new Array();
var gridTwo = d3.divgrid();
var fullDatasTwo;
var parcoordsTwo;

var dimensionsTwo = {
  "Happiness": {type:"number"},
  "Life satisfaction": {type:"number"},
  "Meaning of life": {type:"number"},
  "Friends importance": {type:"number"},
  "Family importance": {type:"number"},
  "Emph. on family": {type:"number"},
  "Proud parents": {type:"number"},
  "Nb of children": {type:"number"},
  "% Housewife": {type:"number"},
  "Housewife as fulfilling as work": {type:"number"},
  "Work importance": {type:"number"},
  "Financial satisfaction": {type:"number"},
  "Income/person": {type:"number"},
  "% Poverty": {type:"number"},
  "Life expectancy": {type:"number"},
  "Wave": {
    type: "string",
    orient: "right"
  }
};

/********************************************************
* WAVE ONE: 1995-1999
*********************************************************/
d3.csv('datas/trailtwo_values_95-99.csv', function(data) {
	filteredDatasTwo["waveOne"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
      filteredDatasTwo["waveOne"].push(country);
    }
	});
});

/********************************************************
* WAVE TWO: 2000-2004
*********************************************************/
d3.csv('datas/trailtwo_values_00-04.csv', function(data) {
	filteredDatasTwo["waveTwo"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			filteredDatasTwo["waveTwo"].push(country);
    }
	});
});

/********************************************************
* WAVE THREE: 2005-2009
*********************************************************/
d3.csv('datas/trailtwo_values_05-09.csv', function(data) {
	filteredDatasTwo["waveThree"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			filteredDatasTwo["waveThree"].push(country);
    }
	});
});

/********************************************************
* WAVE FOUR: 2010-2014
*********************************************************/
d3.csv('datas/trailtwo_values_10-14.csv', function(data) {
	filteredDatasTwo["waveFour"] = new Array();
	data.forEach(function(country) {
		if(country.Happiness != "") {
			filteredDatasTwo["waveFour"].push(country);
    }
	});
});

/********************************************************
* SCALING FILE
*********************************************************/
d3.csv('datas/scaleFile.csv', function(data) {
  parcoordsTwo = d3.parcoords()("#trailTwo")
    .data(data)
    .dimensions(dimensionsTwo)
    .alpha(0.8)
    .margin({ top: 24, left: 10, bottom: 12, right: 10 })
    .composite("darken")
    .mode("queue")
    .render()
    .reorderable()
    .brushMode("1D-axes-multi")
    .alphaOnBrushed(0.1);

  parcoordsTwo.svg.selectAll("text")
    .style("font", "10px sans-serif");

  parcoordsTwo.data([]).render();
})

function renderGridTwo() {
  d3.select("#gridTwo")
    .datum(fullDatasTwo)
    .call(gridTwo)
    .selectAll(".row")
    .on({
      "mouseover": function(d) {
        var highlights = new Array();
        fullDatasTwo.forEach(function(country) {
          if(country["Country"] == d["Country"])
            highlights.push(country);
        });
        parcoordsTwo.highlight(highlights);
      },
      "mouseout": parcoordsTwo.unhighlight
    });

  parcoordsTwo.on("brush", function(d) {
    d3.select("#gridTwo")
      .datum(d)
      .call(gridTwo)
      .selectAll(".row")
      .on({
        "mouseover": function(d) {
          var highlights = new Array();
          fullDatasTwo.forEach(function(country) {
            if(country["Country"] == d["Country"])
              highlights.push(country);
          });
          parcoordsTwo.highlight(highlights);
        },
        "mouseout": parcoordsTwo.unhighlight
      });
  });
}

function updateGridTwo(sortId, order) {
  fullDatasTwo.sort(function(a, b){
    var x = a[sortId].toLowerCase();
    var y = b[sortId].toLowerCase();
    if (x < y) {return order * (-1);}
    if (x > y) {return order * (1);}
    return 0;
  });

  renderGridTwo();
}

function updateGridTwoOnSearch(searchValue) {
  var searchResults = new Array();

  if(searchValue == "") {
    searchResults = fullDatasTwo;
  } else {
    fullDatasTwo.forEach(function(country) {
      if(country["Country"].toLowerCase() == searchValue.toLowerCase())
        searchResults.push(country);
    });
  }

  d3.select("#gridTwo")
    .datum(searchResults)
    .call(gridTwo)
    .selectAll(".row")
    .on({
      "mouseover": function(d) {
        var highlights = new Array();
        fullDatasTwo.forEach(function(country) {
          if(country["Country"] == d["Country"])
            highlights.push(country);
        });
        parcoordsTwo.highlight(highlights);
      },
      "mouseout": parcoordsTwo.unhighlight
    });
}

function updateDatasToDisplayTwo(waveId) {
  filteredDatasTwo[waveId].forEach(function(country) {
    fullDatasTwo.push(country);
  });
}

function updateWavesTwo() {
  parcoordsTwo.brushReset();

  parcoordsTwo
    .data(fullDatasTwo)
    .color(function(d) { return colorgen[d['Wave']]; })
    .render();

  sortGridTwo();
}
