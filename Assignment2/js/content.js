var colorgen = new Array();
colorgen['1995-1999'] = "#72b0d0";
colorgen['2000-2004'] = "#f89292";
colorgen['2005-2009'] = "#b2df8a";
colorgen['2010-2014'] = "#e4aae7";

var colorgenSort = new Array();
colorgenSort['1995-1999'] = "#84c9ec";
colorgenSort['2000-2004'] = "#ffb2b2";
colorgenSort['2005-2009'] = "#cafd9d";
colorgenSort['2010-2014'] = "#fbafff";

function shadeColor1(color, percent) {  // deprecated. See below.
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// function updateTrailOne() {
//   var inputs = document.getElementsByName("wavesTrailOne");
//   fullDatasOne = new Array();
//   for(var i = 0; i < inputs.length; i++) {
//     if(inputs[i].type == "checkbox" && inputs[i].checked) {
//       updateDatasToDisplayOne(inputs[i].id);
//     }
//   }
//   updateWavesOne();
// }

function updateTrailTwo() {
  var inputs = document.getElementsByName("wavesTrailTwo");
  fullDatasTwo = new Array();
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == "checkbox" && inputs[i].checked) {
      updateDatasToDisplayTwo(inputs[i].id);
    }
  }
  updateWavesTwo();
}

function sortGridOne() {
  var val = document.getElementById("sortGridOne").value;
  var sortId, order;
  switch(val) {
    case "countryAZ":
      sortId = "Country";
      order = 1;
      break;
    case "countryZA":
      sortId = "Country";
      order = -1;
      break;
    case "wave09":
      sortId = "Wave";
      order = 1;
      break;
    case "wave90":
      sortId = "Wave";
      order = -1;
      break;
  }
  updateGridOne(sortId, order);
}

function sortGridTwo() {
  var val = document.getElementById("sortGridTwo").value;
  var sortId, order;
  switch(val) {
    case "countryAZ":
      sortId = "Country";
      order = 1;
      break;
    case "countryZA":
      sortId = "Country";
      order = -1;
      break;
    case "wave09":
      sortId = "Wave";
      order = 1;
      break;
    case "wave90":
      sortId = "Wave";
      order = -1;
      break;
  }
  updateGridTwo(sortId, order);
}

// function searchGridOne() {
//   var searchValue = document.getElementById('fieldSearchGridOne').value;
//   var inputs = document.getElementsByName("wavesTrailOne");
//   var checked = false;
//   for(var i = 0; i < inputs.length; i++) {
//     if(inputs[i].type == "checkbox" && inputs[i].checked) {
//       checked = true;
//       break;
//     }
//   };
//   if(!checked) {
//     alert('Select a wave to do a search.');
//   }
//   if(fullDatasOne && checked)
//     updateGridOneOnSearch(searchValue);
// }

function searchGridTwo() {
  var searchValue = document.getElementById('fieldSearchGridTwo').value;
  var inputs = document.getElementsByName("wavesTrailTwo");
  var checked = false;
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == "checkbox" && inputs[i].checked) {
      checked = true;
      break;
    }
  };
  if(!checked) {
    alert('Select a wave to do a search.');
  }
  if(fullDatasTwo)
    updateGridTwoOnSearch(searchValue);
}

function seeAverageTwo(event) {
  if(event.type == "mouseover") {
    updateAverageWavesTwo();
  } else if(event.type == "mouseout") {
    updateTrailTwo();
  }
}
