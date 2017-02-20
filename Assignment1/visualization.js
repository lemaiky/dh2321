/************************************************************
 *
 * GLOBAL VARIABLES
 *
 ************************************************************/

var width = 400,
    height = 350,
    barHeight = 125,
    numBars = 9;
var keys = ["IVIS", "Stats", "Math", "Art", "Comp", "Prog", "Graph", "HCI", "UX"];

/************************************************************
 * Container style
 ************************************************************/
var svg = d3.select('#mainContent').append("svg")
    .attr("id", "skills_svg")
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

/************************************************************
 *
 * PERSONAL SKILLS GRAPH 
 *
 ************************************************************/
d3.csv("Datas.csv", function(error, data) {
  
  // personal skills graph axis and circles
  var barScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, barHeight]);

  var x = d3.scaleLinear()
      .domain([0, 10])
      .range([0, -barHeight]);

  var xAxis = d3.axisLeft(x)
      .ticks(10);
      
  var circles = svg.selectAll("circle")
          .data(x.ticks(10))
        .enter().append("circle")
          .attr("r", function(d) {return barScale(d);})
          .style("fill", "none")
          .style("stroke", "black")
          .style("stroke-dasharray", "1,1")
          .style("stroke-width",".5px");

  var lines = svg.selectAll("line")
      .data(keys)
    .enter().append("line")
      .attr("y2", -barHeight - 20)
      .style("stroke", "black")
      .style("stroke-width",".5px")
      .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

  // personal skills labels
  var labelRadius = barHeight * 1.15;

  var labels = svg.append("g")
      .classed("labels", true);

  labels.append("def")
        .append("path")
        .attr("id", "label-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

  labels.selectAll("text")
        .data(keys)
      .enter().append("text")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .style("fill", function(d, i) {return "#3e3e3e";})
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function(d, i) {return i * 100 / numBars + '%';})
        .text(function(d) {return d.toUpperCase(); });

  for (var i = 0; i < datas.length; i++) {
    var radialLineGenerator = d3.radialLine();
    var points = [
      [(9 * 2 * Math.PI) / numBars, datas[alias[i]]['IVIS']*barHeight/10],
      [(1 * 2 * Math.PI) / numBars, datas[alias[i]]['Stats']*barHeight/10],
      [(2 * 2 * Math.PI) / numBars, datas[alias[i]]['Math']*barHeight/10],
      [(3 * 2 * Math.PI) / numBars, datas[alias[i]]['Art']*barHeight/10],
      [(4 * 2 * Math.PI) / numBars, datas[alias[i]]['Comp']*barHeight/10],
      [(5 * 2 * Math.PI) / numBars, datas[alias[i]]['Prog']*barHeight/10],
      [(6 * 2 * Math.PI) / numBars, datas[alias[i]]['Graph']*barHeight/10],
      [(7 * 2 * Math.PI) / numBars, datas[alias[i]]['HCI']*barHeight/10],
      [(8 * 2 * Math.PI) / numBars, datas[alias[i]]['UX']*barHeight/10],
      [(9 * 2 * Math.PI) / numBars, datas[alias[i]]['IVIS']*barHeight/10]];

    var radialLine = radialLineGenerator(points);
    svg.select('g')
          .append('path')
          .attr("id", "skills_"+alias[i])
          .style("stroke", colors(i))
          .style("stroke-width","1.5px")
          .style("opacity", 0)
          .attr('d', radialLine);
  }
});


/************************************************************
 *
 * ALIAS TABLE
 *
 ************************************************************/
var table = document.getElementById("aliasTable");
var datas;

d3.csv("Datas.csv", function(error, data) {

  var nbRows = data.length;
  var nbCols = 10;

  var firstRow = table.insertRow(0);
  firstRow.className = "firstRow";
  var cell = firstRow.insertCell(0);
  cell.className = "firstCell";
  cell.innerHTML = "<b>" + "Alias" + "<b>";
  
  for (var i = 0; i < nbRows; i++) {

    var row = table.insertRow(i + 1);
    var cell0 = row.insertCell(0);
    cell0.innerHTML = data[i].Alias;

    cell0.onclick = function() {
      var color = getOverviewGraphColor(this.textContent);
      displaySkillsGraph(this.textContent, color);
  	}
    cell0.onmouseover = function() {
      displayInterests(this.textContent, true);
      displayLabel(this.textContent, true);
    }
    cell0.onmouseleave = function() {
      displayInterests(this.textContent, false);
      displayLabel(this.textContent, false);
    }
  }
});

// displays(not) the personal skills graph with selected alias
function displaySkillsGraph(d, color){
  for(var i = 0; i < datas.length; i++) {
    var cell = table.rows[i+1].cells[0];
    //if selected
    if(cell.textContent == d) {
      if(cell.style.backgroundColor == hex2rgb(color) || cell.style.backgroundColor == color
        || cell.style.color == hex2rgb("#eeeeee") || cell.style.color == "#eeeeee") {
        cell.style.backgroundColor = "#ffffff";
        cell.onmouseleave = function() {
          displayLabel(this.textContent, false);
        }
        d3.select('#skills_' + d)
          .style("opacity", 0);
        d3.select("#topBubbleText" + d)
          .style("opacity", 0);
        d3.select("#topBubble" + d)
          .on("mouseleave", function(d) {
            displayLabel(d, false);
          });
      // if not selected yet
      } else {
        cell.style.backgroundColor = color;
        cell.onmouseleave = function() {
          displayLabel(this.textContent, true);
        }
        d3.select("#skills_" + d)
          .style("opacity", 1);
        d3.select("#topBubbleText" + d)
          .style("opacity", 1);
        d3.select("#topBubble" + d)
          .on("mouseleave", function(d) {
            displayLabel(d, true);
          });
      }
    }
  }
}

// returns color of the linked bubble
function getOverviewGraphColor(alias) {
  var bubble = bubbleObj.select("#topBubble" + alias);
  return bubble.style("fill");
}

// returns rgb from hex color
function hex2rgb(hex) {
  var h=hex.replace('#', '');
  try {
    h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));
    for(var i=0; i<h.length; i++)
    h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
  } catch(error) {
    return;
  }

  return 'rgb(' + h.join(', ') + ')';
}