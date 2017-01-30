/************************************************************
 *
 * PERSONAL SKILLS GRAPH 
 *
 ************************************************************/

var width = 400,
    height = 350,
    barHeight = 125,
    numBars = 9;

var svg = d3.select('#mainContent').append("svg")
    .attr("id", "skills_svg")
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

var keys = ["IVIS", "Stats", "Math", "Art", "Comp", "Prog", "Graph", "HCI", "UX"];

d3.csv("/Assignment1/Datas.csv", function(error, data) {
  
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

  // Labels
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
});


/************************************************************
 *
 * ALIAS TABLE
 *
 ************************************************************/

var table = document.getElementById("aliasTable");
var datas;

d3.csv("/Assignment1/Datas.csv", function(error, data) {

  var nbRows = data.length;
  var nbCols = 10;

  var firstRow = table.insertRow(0);
  firstRow.className = "firstRow";
  var cell = firstRow.insertCell(0);
  cell.className = "firstCell";
  cell.innerHTML = "<b>" + keys[0] + "<b>";
  
  for (var i = 0; i < nbRows; i++) {

    var row = table.insertRow(i + 1);
    var cell0 = row.insertCell(0);
    cell0.innerHTML = data[i].Alias;

    cell0.onclick = function() {
      var color = getOverviewGraphColor(this.textContent);
      displaySkillsGraph(this.textContent, color);
  	}
  }
});

function displaySkillsGraph(d, color){
  var radialLineGenerator = d3.radialLine();
  var points = [
    [(9 * 2 * Math.PI) / numBars, datas[d]['IVIS']*barHeight/10],
    [(1 * 2 * Math.PI) / numBars, datas[d]['Stats']*barHeight/10],
    [(2 * 2 * Math.PI) / numBars, datas[d]['Math']*barHeight/10],
    [(3 * 2 * Math.PI) / numBars, datas[d]['Art']*barHeight/10],
    [(4 * 2 * Math.PI) / numBars, datas[d]['Comp']*barHeight/10],
    [(5 * 2 * Math.PI) / numBars, datas[d]['Prog']*barHeight/10],
    [(6 * 2 * Math.PI) / numBars, datas[d]['Graph']*barHeight/10],
    [(7 * 2 * Math.PI) / numBars, datas[d]['HCI']*barHeight/10],
    [(8 * 2 * Math.PI) / numBars, datas[d]['UX']*barHeight/10],
    [(9 * 2 * Math.PI) / numBars, datas[d]['IVIS']*barHeight/10]];

  var radialLine = radialLineGenerator(points);
  
  for(var i = 0; i < datas.length; i++) {
    var cell = table.rows[i].cells[0];
    if(cell.textContent == d) {
      if(cell.style.backgroundColor == hex2rgb(color) || cell.style.backgroundColor == color) {
        d3.select('#skills_' + d).remove();
        cell.style.backgroundColor = "#ffffff";
        d3.select("#topBubbleText" + d)
          .style("opacity", 0);
        d3.select("#topBubble" + d)
          .on("mouseleave", function(d) {
            displayLabel(d, false);
          });
      } else {
        cell.style.backgroundColor = color;
        svg.select('g')
          .append('path')
          .attr("id", "skills_"+d)
          .style("stroke", color)
          .style("stroke-width","1.5px")
          .attr('d', radialLine);
        d3.select("#topBubbleText" + d)
          .text(function(d){return d;})
          .style("opacity", 1);
        d3.select("#topBubble" + d)
          .on("mouseleave", function(d) {
            displayLabel(d, true);
          });
      }
    }
  }
}

function getOverviewGraphColor(alias) {
  var bubble = bubbleObj.select("#topBubble" + alias);
  return bubble.style("fill");
}

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