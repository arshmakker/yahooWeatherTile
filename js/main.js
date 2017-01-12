"use strict";

document.body.onload = function() {
// _alignTileVerticallyCenter();
_getCurrentLocation();
};


function _createWeatherQuery(position){
  var queryUrl="https://query.yahooapis.com/v1/public/yql?q=";
  var sYQL="select * from weather.forecast where woeid in " +
  "(SELECT woeid FROM geo.places WHERE text='("+
  position.coords.latitude+","+position.coords.longitude+")')&format=json";
  return queryUrl+sYQL;

}
/**
 * gets the current location of the device
 * and calls teh callback function for success and error messages
 */
 function _getCurrentLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(_processPosition, _errorPosition);
  }
}

/**
 * creates the YQL for yahoo api using the position and then calls the yahoo api
 * via AJAX
 * @param  {object} position contains navigator.position
 */
 function _processPosition(position){
  var sUrl = _createWeatherQuery(position);
  loadAjax(sUrl, _processWeatherInfo, _errorInRetrieval, true);
}

/**
 * handles the error raised if the position is not found;
 * @param  {object} error Error details
 */
 function _errorPosition(error){
  alert('Error in retrieving the position: '+ error.message);
}

/**
 * Recives the response from the yahoo weather api 
 * translates it for our app and renders it on the html
 * @param  {object} response Response from the yahoo api
 */
 function _processWeatherInfo(response){
  if (!response){
    alert('No weather info returned from Yahoo!');
    return;
  }
  var oResponse = JSON.parse(response);
  
  if (!oResponse.query.results){
    alert('Too many call to yahoo apis, please refresh after a minute');
    return;
  }
  try{
    var oWeatherInfo = oResponse.query.results.channel.item;
    var oCurrentCity = oResponse.query.results.channel.location.city;
    var oRegion = oResponse.query.results.channel.location.region;
    var domImage = _extractWeatherImage(oResponse.query.results.channel.item.description);
    renderHTML(oCurrentCity,oRegion, oWeatherInfo, domImage);
  }
  catch(e){
    alert('There was an error from the response from Yahoo! weather '+ e.message);
    throw e;
  }
}

/**
 * extracts the image url for today's weather condition from
 * cdata of the response from yahoo
 * @param  {string} cData response from yahoo
 * @return {string}       img tag in string format
 */
 function _extractWeatherImage(cData){
  var imgUrl = cData.match(/<img.*\"\/>/g);;
  return imgUrl[0];
}

/**
 * Handles the error from yahoo response
 * @param  {Object} error details of the error from yahoo
 */
function _errorInRetrieval(error){
 alert('Error in retrieving the weather info: '+ error.message);
}
 /**
 * Aligning the Tile vertically Center
 */
 function _alignTileVerticallyCenter(){
  var tileContainer = document.querySelector('.cvent-container');
  var weatherTile = document.querySelector('.cvent-weather-tile');
  // Since the css does allow to center the tile with unknown width
  // but not with uknown height, hence vertical alignment is done via 
  // JS
  weatherTile.style.top = tileContainer.clientHeight +'px';
}


