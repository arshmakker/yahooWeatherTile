
/**
 * renders the required html once the response from yahoo has been parsed
 * @param  {Object} oCurrentCity City Name
 * @param  {Object} oRegion      Region Code
 * @param  {Object} oWeatherInfo weather for today and also the forcast
 * @param  {String} domImage     img tag from yahoo for today's pic
 */
function renderHTML(oCurrentCity,oRegion, oWeatherInfo, domImage){
  var domTileContainer = document.querySelector('.arsh-container');
  //removing the existing contents of the container
  domTileContainer.innerHTML = ""
  var domTile = document.createElement('div');
  domTile.setAttribute('class','arsh-weather-tile');


  var domTitle = document.createElement('div');
  domTitle.setAttribute('class','arsh-weather-title');
  domTitle.appendChild(document.createTextNode(oCurrentCity+', '+oRegion));

  var domToday = document.createElement('div');
  domToday.setAttribute('class','arsh-weather-today');
  
  var domTodayTemp = document.createElement('span');
  domTodayTemp.setAttribute('class','arsh-today-temp');

  var domImgDiv = document.createElement('div');
  domImgDiv.setAttribute('class','arsh-today-img');
  domImgDiv.innerHTML = domImage;

  var domImgText = document.createElement('span');
  domImgText.setAttribute('class','arsh-today-text');
  domImgText.appendChild(document.createTextNode(oWeatherInfo.condition.text));

  domImgDiv.appendChild(domImgText);

  domTodayTemp.appendChild(document.createTextNode(oWeatherInfo.condition.temp+String.fromCharCode(176)));

  domToday.appendChild(domTodayTemp);
  domToday.appendChild(domImgDiv);

  domTile.appendChild(domTitle);
  domTile.appendChild(domToday);

  domTileContainer.appendChild(domTile);

  _insertForCastDom(oWeatherInfo.forecast);

}

/**
 * creates and then inserts the dom elements for the week's forcast
 * @param  {Array} aForecast the forecast from yahoo's response
 */
function _insertForCastDom(aForecast){
  if (aForecast.length < 1 && aForecast.constructor !== Array){
    return;
  }
  var domForcast, domDay,domDayName, domHighLowT, domLowT;
  var degSymbol = String.fromCharCode(176);
  var domTile = document.querySelector('.arsh-weather-tile');

  domForcast = document.createElement('ul');
  domForcast.setAttribute('class','arsh-weather-forecast');

  for (var i = 1 ; i<= 6; i++){
    domDay = document.createElement('li');
    domDay.setAttribute('class','arsh-weather-day');

    domDayName = document.createElement('div');
    domDayName.setAttribute ('class','arsh-weather-day-name');
    domDayName.appendChild(document.createTextNode(aForecast[i].day));

    domHighLowT = document.createElement('div');
    domHighLowT.setAttribute ('class','arsh-weather-day-highlow');
    domHighLowT.appendChild(document.createTextNode(aForecast[i].high+degSymbol+'/'+aForecast[i].low+degSymbol));

    domDay.appendChild(domDayName);
    domDayName.appendChild(domHighLowT);

    domForcast.appendChild(domDay);
  }
  domTile.appendChild(domForcast);
}