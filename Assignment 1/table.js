// Create the table
var table = document.getElementById("aliasTable");
var datas;

d3.csv("Datas.csv", function(error, data) {

  var nbRows = data.length;
  var nbCols = 10;

  var keys = ["Alias", "IVIS", "Stats", "Math", "Art", "Comp", "Prog", "Graphics", "HCI", "UX"];

  var firstRow = table.insertRow(0);
  firstRow.className = "firstRow";
  var cell = firstRow.insertCell(0);
  cell.className = "firstCell";
  cell.innerHTML = "<b>" + keys[0] + "<b>";

  datas = new Array(nbRows);
  
  for (var i = 0; i < nbRows; i++) {
    datas[data[i].Alias] = new Array(nbCols);
    
    datas[data[i].Alias]['IVIS'] = data[i].IVIS;
    datas[data[i].Alias]['Stats'] = data[i].Stats;
    datas[data[i].Alias]['Math'] = data[i].Math;
    datas[data[i].Alias]['Art'] = data[i].Art;
    datas[data[i].Alias]['Comp'] = data[i].Comp;
    datas[data[i].Alias]['Prog'] = data[i].Prog;
    datas[data[i].Alias]['Graphics'] = data[i].Graphics;
    datas[data[i].Alias]['HCI'] = data[i].HCI;
    datas[data[i].Alias]['UX'] = data[i].UX;

    var row = table.insertRow(i + 1);
    var cell0 = row.insertCell(0);
    cell0.innerHTML = data[i].Alias;

    cell0.onclick = function() {
      updateSkillsGraph(datas[this.textContent]['IVIS'], datas[this.textContent]['Stats'], datas[this.textContent]['Math'],
        datas[this.textContent]['Art'], datas[this.textContent]['Comp'], datas[this.textContent]['Prog'],
        datas[this.textContent]['Graphics'], datas[this.textContent]['HCI'], datas[this.textContent]['UX']);
      /*var radialLineGenerator = d3.radialLine();
    var points = [
      [(1 * 2 * Math.PI) / numBars, datas[this.textContent]['IVIS']*barHeight/10],
        [(2 * 2 * Math.PI) / numBars, datas[this.textContent]['Stats']*barHeight/10],
        [(3 * 2 * Math.PI) / numBars, datas[this.textContent]['Math']*barHeight/10],
        [(4 * 2 * Math.PI) / numBars, datas[this.textContent]['Art']*barHeight/10],
        [(5 * 2 * Math.PI) / numBars, datas[this.textContent]['Comp']*barHeight/10],
        [(6 * 2 * Math.PI) / numBars, datas[this.textContent]['Prog']*barHeight/10],
        [(7 * 2 * Math.PI) / numBars, datas[this.textContent]['Graphics']*barHeight/10],
        [(8 * 2 * Math.PI) / numBars, datas[this.textContent]['HCI']*barHeight/10],
        [(9 * 2 * Math.PI) / numBars, datas[this.textContent]['UX']*barHeight/10],
        [(1 * 2 * Math.PI) / numBars, datas[this.textContent]['IVIS']*barHeight/10]];

    var radialLine = radialLineGenerator(points);
    var color = randomColor();

    if(this.style.backgroundColor == "" || this.style.backgroundColor == "rgb(255, 255, 255)") {
      d3.select('g')
      .append('path')
      .attr("id", "skills_"+this.textContent)
      .style("fill", "none")
      .style("stroke", color)
      .style("stroke-width","1.5px")
      .attr('d', radialLine);
      this.style.backgroundColor = color;
    } else {
      d3.select('#skills_' + this.textContent).remove();
      this.style.backgroundColor = "#FFF";
    }
  }*/
    }
  }
});

var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();
  var hslToRgb = function (h, s, l){
      var r, g, b;
      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }
      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();