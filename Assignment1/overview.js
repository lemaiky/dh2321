/************************************************************
 *
 * GLOBAL VARIABLES
 *
 ************************************************************/
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    widthOv = 900 - margin.left - margin.right,
    heightOv = 500 - margin.top - margin.bottom,
    numBars = 9;

var bubbleObj, datas, alias, interests, bubbleCount;
var colors = d3.scaleOrdinal(d3.schemeCategory20b);
var selectedFilter = 'IVIS';
var keys = ["IVIS", "Stats", "Math", "Art", "Comp", "Prog", "Graph", "HCI", "UX"];

/************************************************************
 * Container style
 ************************************************************/
var svgVis = d3.select('#overviewGraph').append("svg")
    .attr("width", widthOv+"px")
    .attr("height", heightOv+"px")
  .append("g")
    .attr("transform", "translate(" + margin.right + "," + margin.top + ")");

/************************************************************
 *
 * MAIN GRAPH 
 *
 ************************************************************/
d3.csv("./Assignment1/Datas.csv", function(error, data) {

  //Overview graph axis
  var x = d3.scaleOrdinal()
      .range([0, widthOv/1.5], .1, 1);

  var y = d3.scaleLinear()
      .domain([0, 10])
      .range([heightOv/1.5, 0]);

  var xAxis = d3.axisBottom()
      .scale(x);
  var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10);

  svgVis.append('g').classed('axis--x axis', true);
  svgVis.append('g').classed('axis--y axis', true);

  // Set x and y axis
  svgVis.select('.axis--x')
    .attr('transform', "translate(0," + heightOv/1.5 + ")") // Always position at 0 on the y-axis
    .call(xAxis);

  svgVis.select('.axis--y')
    .call(yAxis);

  // Set horizontal lines for each tick
  for(var j = 0; j < 10; j++) {
    var lines = svgVis.select(".axis--x").append("line")
      .attr("x1", 0) 
      .attr("x2", widthOv/1.5)
      .style("stroke", "black")
      .style("stroke-width","0.5px")
      .style("stroke-dasharray", ("1,1"))
      .attr("transform", function(d, i) { return "translate(0," + -(heightOv/1.5)/10 * (j+1) + ")"; });
  }

  // initialize arrays
  datas = new Array(data.length);
  alias = new Array(data.length);
  interests = new Array(data.length);
  
  // save all datas from csv file in global variables
  for(var i = 0; i < data.length; i++) {
    datas[data[i].Alias] = new Array(10);

    alias[i] = data[i].Alias;

    datas[data[i].Alias]['IVIS'] = data[i].IVIS;
    datas[data[i].Alias]['Stats'] = data[i].Stats;
    datas[data[i].Alias]['Math'] = data[i].Math;
    datas[data[i].Alias]['Art'] = data[i].Art;
    datas[data[i].Alias]['Comp'] = data[i].Comp;
    datas[data[i].Alias]['Prog'] = data[i].Prog;
    datas[data[i].Alias]['Graph'] = data[i].Graphics;
    datas[data[i].Alias]['HCI'] = data[i].HCI;
    datas[data[i].Alias]['UX'] = data[i].UX;

    interests[data[i].Alias] = data[i].Interests;
  }

  // initialize alias bubbles
  clearBubbleCount();
  bubbleObj = svgVis.selectAll(".topBubble")
    .data(alias)
    .enter().append("g")
    .attr("id", function(d) {return "topBubbleAndText_" + d});

    bubbleObj.append("circle")
      .attr("class", "topBubble")
      .attr("id", function(d) {return "topBubble" + d;})
      .attr("r", 7)
      .attr("cx", function(d) {return bubbleWidth(d);})
      .attr("cy", function(d) {return bubbleHeight(d);})
      .style("fill", function(d,i) {return colors(i);})
      .on("mouseover", function(d) {
        displayLabel(d, true);
        displayInterests(d, true);
      })
      .on("mouseleave", function(d) {
        displayLabel(d, false);
        displayInterests(d, false);
      })
      .on("click", function(d, i) {
        return displaySkillsGraph(d, colors(i));
      });

    // initialize alias bubble text
    clearBubbleCount();
    bubbleObj.append("text")
      .attr("class", "topBubbleText")
      .attr("id", function(d,i) {return "topBubbleText" + alias[i];})
      .attr("x", function(d, i) {return bubbleWidth(d);})
      .attr("y", function(d) {return bubbleHeight(d) - 15;})
      .style("fill", function(d,i) {return colors(i);})
      .attr("font-size", 12)
      .attr("font-family", 'Quicksand')
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("alignment-baseline", "middle");
});

// returns the height to which the bubble must be displayed
function bubbleHeight(d){
  var val = datas[d][selectedFilter];
  return (heightOv/1.5)/10 * (10-val);
}

// returns the width to which the bubble must be displayed
function bubbleWidth(d) {
  var val = datas[d][selectedFilter];
  bubbleCount[selectedFilter][val] += 1;
  return 8*(3*(bubbleCount[selectedFilter][val])-1) + 10;
}

// clear bubbleCount array
function clearBubbleCount(){
  bubbleCount = new Array(10);
  for(var k = 0; k < keys.length; k++) {
    bubbleCount[keys[k]] = new Array(11);
    for(var j = 0; j < 11; j++) {
      bubbleCount[keys[k]][j] = 0;
    }
  }
}

// displays(not) alias bubble text
function displayLabel(d, display) {
  if(display) {
    bubbleObj.select("#topBubbleText" + d)
      .text(function(d){return d;})
      .style("opacity", 1);
    d3.select('#skills_' + d)
      .style("opacity", 1);
  } else {
    bubbleObj.select("#topBubbleText" + d)
      .style("opacity", 0);
    d3.select('#skills_' + d)
      .style("opacity", 0);
  } 
}

// displays(not) interests
function displayInterests(d, display) {
  var interestsCont = document.getElementById("interestsText");
  if(display) {
    interestsText.innerHTML = interests[d];
  } else {
    interestsText.innerHTML = "";
  }
}

// updates main graph by sorting bubbles
function updateGraph(event){
  selectedFilter = event.id;
  clearBubbleCount();

  for(var i = 0; i < datas.length; i++) {
    bubbleObj.select("#topBubble" + alias[i])
      .attr("cx", function(d) {return bubbleWidth(d);})
      .attr("cy", function(d) {return bubbleHeight(d);});
  }

  clearBubbleCount();
  for(var i = 0; i < datas.length; i++) {
    bubbleObj.select("#topBubbleText" + alias[i])
      .attr("x", function(d) {return bubbleWidth(d);})
      .attr("y", function(d) {return bubbleHeight(d) - 15;});
  }
}

// filters graph to filter out not wanted values
function filterGraph() {
  clearFilter(this);

  var filters = document.getElementsByName("filter");

  for(var i = 0; i < filters.length; i++) {
    if(filters[i].type == "text") {
      var threshold = filters[i].value;
      for(var j = 0; j < datas.length; j++) {
        var val = datas[alias[j]][filters[i].id];
        var cell = table.rows[j+1].cells[0];
        if(parseInt(val) < parseInt(threshold) 
          && (cell.style.backgroundColor == hex2rgb("#ffffff") || cell.style.backgroundColor == "#ffffff" || cell.style.backgroundColor == "")) {
          displayLabel(alias[j], false);
          d3.select("#topBubble" + alias[j])
            .style("opacity", 0)
            .on("mouseenter", function(d) {
              displayLabel(d, false);
              displayInterests(d, false);
            })
            .on("mouseleave", function(d) {
              displayLabel(d, false);
            });
          cell.style.backgroundColor = "#ffffff";
          cell.style.color = "#eeeeee";
          cell.onmouseenter = function() {
            displayLabel(this.textContent, false);
          };
          cell.onmouseleave = function() {
            displayLabel(this.textContent, false);
          };
        }
      }
    }
  }
}

// clear filter fields
function clearFilter(event) {
  if(event.id == "clear") {
    var filters = document.getElementsByName("filter");
    for(var i = 0; i < filters.length; i++) {
      filters[i].value = "";
    }
  }
  for(var i = 0; i < datas.length; i++) {
    var cell = table.rows[i+1].cells[0];
    try{
      d3.select("#topBubble" + alias[i])
        .style("opacity", 1)
        .on("mouseenter", function(d) {
          displayLabel(d, true);
          displayInterests(d, true);
        });
      cell.onmouseenter = function() {
        displayLabel(this.textContent, true);
      }
      cell.style.color = "#000000";
    } catch(error) {
      continue;
    }
  }
}

// clear all selections and filters
function clearSort(event) {
  for(var i = 0; i < datas.length; i++) {
    var cell = table.rows[i+1].cells[0];
    try{
      cell.style.backgroundColor = "#ffffff";
      cell.onmouseleave = function() {
        displayInterests(this.textContent, false);
        displayLabel(this.textContent, false);
      }
      d3.select('#skills_' + alias[i])
        .style("opacity", 0);
      d3.select("#topBubbleText" + alias[i])
        .style("opacity", 0);
      d3.select("#topBubble" + alias[i])
        .style("opacity", 1)
        .on("mouseleave", function(d, j) {
          displayInterests(d, false);
          displayLabel(d, j, false);
        });
    } catch(error) {
      continue;
    }
  }
  clearFilter(event);
}