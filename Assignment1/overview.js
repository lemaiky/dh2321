var margin = {top: 20, right: 20, bottom: 20, left: 20},
    widthOv = 900 - margin.left - margin.right,
    heightOv = 500 - margin.top - margin.bottom,
    numBars = 9;

var svgVis = d3.select('#overviewGraph').append("svg")
    .attr("width", widthOv+"px")
    .attr("height", heightOv+"px")
  .append("g")
    .attr("transform", "translate(" + margin.right + "," + margin.top + ")");

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

var bubbleObj, datas, alias;
var bubbleCount;
var colors = d3.scaleOrdinal(d3.schemeCategory20b);
var selectedFilter = 'IVIS';

d3.csv("./Assignment1/Datas.csv", function(error, data) {

  svgVis.append('g').classed('axis--x axis', true);
  svgVis.append('g').classed('axis--y axis', true);

  // Remove old axes and add the new ones onto the root svg
  svgVis.select('.axis--x')
    .attr('transform', "translate(0," + heightOv/1.5 + ")") // Always position at 0 on the y-axis
    .call(xAxis);

  svgVis.select('.axis--y')
    .call(yAxis);

  for(var j = 0; j < 10; j++) {
    var lines = svgVis.select(".axis--x").append("line")
      .attr("x1", 0) 
      .attr("x2", widthOv/1.5)
      .style("stroke", "black")
      .style("stroke-width","0.5px")
      .style("stroke-dasharray", ("1,1"))
      .attr("transform", function(d, i) { return "translate(0," + -(heightOv/1.5)/10 * (j+1) + ")"; });
  }

  datas = new Array(data.length);
  alias = new Array(data.length);
  
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
  }

  clearBubbleCount();
  
  bubbleObj = svgVis.selectAll(".topBubble")
    .data(alias)
    .enter().append("g")
    .attr("id", function(d,i) {return "topBubbleAndText_" + alias[i]});

    bubbleObj.append("circle")
      .attr("class", "topBubble")
      .attr("id", function(d,i) {return "topBubble" + alias[i];})
      .attr("r", 7)
      .attr("cx", function(d) {return bubbleWidth(d);})
      .attr("cy", function(d) {return bubbleHeight(d);})
      .style("fill", function(d,i) {return colors(i);})
      .on("mouseover", function(d) {
        displayLabel(d, true);
      })
      .on("mouseleave", function(d) {
        displayLabel(d, false);
      })
      .on("click", function(d, i) {
        return displaySkillsGraph(d, colors(i));
      });

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

function bubbleHeight(d){
  var val = datas[d][selectedFilter];
  return (heightOv/1.5)/10 * (10-val);
}

function bubbleWidth(d) {
  var val = datas[d][selectedFilter];
  bubbleCount[selectedFilter][val] += 1;

  return 8*(3*(bubbleCount[selectedFilter][val])-1) + 10;
}

function clearBubbleCount(){
  bubbleCount = new Array(10);
  for(var k = 0; k < keys.length; k++) {
    bubbleCount[keys[k]] = new Array(11);
    for(var j = 0; j < 11; j++) {
      bubbleCount[keys[k]][j] = 0;
    }
  }
}

function displayLabel(d, display) {
  if(display) {
    bubbleObj.select("#topBubbleText" + d)
      .text(function(d){return d;})
      .style("opacity", 1);
  } else {
    bubbleObj.select("#topBubbleText" + d)
      .style("opacity", 0);
  } 
}

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

function filterGraph() {
  clearFilter(this);

  var filters = document.getElementsByName("filter");

  for(var i = 0; i < filters.length; i++) {
    if(filters[i].type == "text") {
      var threshold = filters[i].value;
      for(var j = 0; j < datas.length; j++) {
        var val = datas[alias[j]][filters[i].id];
        if(parseInt(val) < parseInt(threshold)) {
          d3.select("#topBubbleText" + alias[j])
            .style("opacity", 0);
          d3.select("#topBubble" + alias[j])
            .style("opacity", 0)
            .on("mouseenter", function(d) {
              displayLabel(d, false);
            });
          d3.select('#skills_' + alias[j]).remove();
          table.rows[j+1].cells[0].style.backgroundColor = "#ffffff";
          table.rows[j+1].cells[0].style.color = "#eeeeee";
        }
      }
    }
  }
}

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
        });
      cell.style.color = "#000000";
    } catch(error) {
      continue;
    }
  }
}

function clearSort(event) {
  for(var i = 0; i < datas.length; i++) {
    var cell = table.rows[i+1].cells[0];
    try{
      d3.select('#skills_' + alias[i]).remove();
      cell.style.backgroundColor = "#ffffff";
      d3.select("#topBubbleText" + alias[i])
        .style("opacity", 0);
      d3.select("#topBubble" + alias[i])
        .style("opacity", 1)
        .on("mouseleave", function(d, j) {
          displayLabel(d, j, false);
        });
    } catch(error) {
      continue;
    }
  }
  clearFilter(event);
}