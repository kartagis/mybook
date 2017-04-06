/*
document.addEventListener("deviceready", function() {
  var fd=new FormData();
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    console.log(library.length);
    library.forEach(function(libraryItem) {
      window.plugins.Base64.encodeFile(libraryItem, function(base64) {
        console.log(base64);
        //images += "<div class='imgHolder'><img class='img' src='"+libraryItem.thumbnailURL+"' data-src='"+libraryItem.id+"' style='margin: 5px' /></div>";
        //$("#images").html(images);
      }, function(err) {
        console.log('failed');
      }, {
        thumbnailHeight:100,
        thumbnailWidth:100,
        quality:1,
        includeAlbumData:false,
      }
    });
  })
})
*/
document.addEventListener("deviceready", function() {
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    library.forEach(function(libraryItem) {
      var canvas = $("<canvas id='canvas'>");
      var ctx = $("#canvas")[0].getContext('2d');
      var img = new Image();
      img.src = URL.createObjectURL(libraryItem.thumbnailURL);
      img.onload = function() {
        ctx.drawImage(img, 20, 20);
      }
      //images += "<div class='imgHolder'><canvas id='canvas' height='100' width='100'></canvas><img src='"+libraryItem.thumbnailURL+"' data-src='"+libraryItem.id+"' style='margin: 5px'/></div>";
    })
  })
  //$("#images").html(images);
})
$("#images").on("click", ".imgHolder", function() {
  $(this).toggleClass("checked");
  var imgSRC = $(this).find('img').data('src').split(";");
  localStorage.setItem(imgSRC[0],imgSRC[1]);
  $("#submit").css("display","block");
})
$("body").on("click", "#submit", function() {
  var xhr=new XMLHttpRequest(),
  fd=new FormData();
  for (x in localStorage) {
    window.plugins.Base64.encodeFile(localStorage[x], function(base64) {
      console.log(base64);
      /*
      $.post(
      'http://iothook.com:8000/api/v1/books/',
      {"bookuser": 2,"image": localStorage.getItem("19800")},
      function() {console.log('success');}
    );
    */
    /*
    fd.append("bookuser", 2);
    fd.append("image", base64.split(";")[1]);
    xhr.open("POST", "http://iothook.com:8000/api/v1/books/", true);
    xhr.send(fd);
    */
  })
}
})
