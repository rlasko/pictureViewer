var api_key = '8665d22603b0a80df271bfeeddce0249';
var baseURL = ' https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' + api_key + '&format=json&nojsoncallback=1';
var isLoading = true;
document.addEventListener('DOMContentLoaded', function () {
  requestPhotos();
  // invalidateLoading();
}, false);

function invalidateLoading() {
  isLoading=false;
  document.getElementById("loadingIndicator").className="unloading"
}
//requests photos from api
function requestPhotos () {
  requestHTTP = new XMLHttpRequest();
    if (!requestHTTP) {
      console.error('Could not be requested');
    }
    requestHTTP.onreadystatechange = checkRequestStatus;
    requestHTTP.open('GET', baseURL, true);
    requestHTTP.send(null);
}

//handles errors and checks the request status
function checkRequestStatus () {
  if (requestHTTP.readyState === XMLHttpRequest.DONE) {
    if (requestHTTP.status === 200){
      res = JSON.parse(requestHTTP.responseText)
      invalidateLoading();
      parsePhotos(res.photos.photo);
    }else {
      console.error('Error: The response could not be completed');
    }
  }

function parsePhotos(photosArray) {
  var txtStr = ''

  //creates image URL from photosArray
  for (var i = 0; i < photosArray.length; i++) {
    var photo = photosArray[i];
    var imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" +
        photo.server + "/" + photo.id + "_" + photo.secret + "_";
    var imgUrlWSize = imgUrl + "s.jpg"
    var title =  photo.title.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    txtStr +=  '<a href="#" class="photo" >' + '<img alt="'+ title  +
    '"src="' + imgUrlWSize + '"/>' + '</a>';
  }
  document.getElementById('images').innerHTML= txtStr;
  var domPhotos = document.getElementsByClassName('photo')

  //waits for click on img and calls func that gets larger image
  for (var i = 0; i<domPhotos.length;i++) {
    (function(i){
    domPhotos[i].addEventListener('click', function () {
      return chooseImg(photosArray,i);
    }, false);
  }(i));
  }
}

//gets URL of larger img and calls func to display it
function chooseImg (photosArray,i) {
    var photo = photosArray[i];
    var imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" +
        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "c.jpg"
    return (openLightBox(imgUrl))
}

function openLightBox (imgUrl) {
  document.getElementById('photoLightbox').style.display='inline';
  document.getElementById('lightBoxContents').innerHTML = '<img src=' + imgUrl + '/>';
}
}
