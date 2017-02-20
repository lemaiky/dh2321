var blue_to_brown = d3.scale.linear()
  .domain([-2, 0, 2])
  .range(["white", "green", "yellow", "brown", "white"])
  .interpolate(d3.interpolateLab);

var colorgen = new Array();
colorgen['1995-1999'] = "#72b0d0";
colorgen['2000-2004'] = "#f89292";
colorgen['2005-2009'] = "#b2df8a";
colorgen['2010-2014'] = "#e4aae7";

function updateTrailOne() {
  var inputs = document.getElementsByName("wavesTrailOne");
  fullDatasOne = new Array();
  fullCountriesOne = new Array();
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == "checkbox" && inputs[i].checked) {
      updateDatasToDisplayOne(inputs[i].id);
    }
  }
  updateWavesOne();
}

function updateTrailTwo(source) {
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

function searchGridOne() {
  var searchValue = document.getElementById('fieldSearchGridOne').value;
  var inputs = document.getElementsByName("wavesTrailOne");
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
  if(fullDatasOne && checked)
    updateGridOneOnSearch(searchValue);
}

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
