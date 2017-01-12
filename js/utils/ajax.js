
/**
 * create and send the XMLHttpRequest object
 * @param  {string} sUrl - URL to load
 * @param  {function} fCallback - function to be used as callback
 * @param  {boolean}  async - should the request be run in sync mode or async  
 */
 function loadAjax (sURL, fCallback, async) {
  var oReq;
  // for IE9 we need to use XDomainRequest
  if (window.XDomainRequest)
  {
    oReq=new XDomainRequest();
    oReq.onload = function(){fCallback(oReq.responseText)};
  }
  else if (window.XMLHttpRequest){
    oReq=new XMLHttpRequest();

    oReq.onreadystatechange = _xhrStateChange.bind(oReq, fCallback);
    oReq.arguments =[];  
    oReq.onerror = _xhrError;
  }
  else{
    oReq=new ActiveXObject("Microsoft.XMLHTTP");}

    oReq.open("get", sURL, async);
    oReq.send(null);
  }

/**
 * Output the error in the console thrown by the ajax call 
 */
 function _xhrError () { 
  console.error(this.statusText); 
}

function _xhrStateChange(fCallback) {
  // this = the xhr object
  if (this.readyState == XMLHttpRequest.DONE ) {
   if (this.status == 200) {
     fCallback.call(this, this.response);
   }
   else if (this.status == 400) {
    alert('There was an error 400');
  }
  else {
   alert('something else other than 200 was returned');
 }
}
}