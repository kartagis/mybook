var init = {};
var sent = [];
var id;
var fd = new FormData();
document.addEventListener("deviceready", function() {
  $("#submit").css("display","none");
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    ActivityIndicator.show("Lütfen bekleyin, kütüphane yükleniyor");
    var library = res.library;
    var images = '';
    library.forEach(function(libraryItem) {
      var id = libraryItem.id.split(";")[0];
      images += "<div class='imgHolder'><img class='img' height='100' width='100' src='"+libraryItem.thumbnailURL+"' data-id='"+id+"' style='margin: 5px'/></div>";
      cordova.plugins.photoLibrary.getPhoto(libraryItem, function(fullPhotoBlob) {
        id = libraryItem.id.split(";")[0];
        init[id] = fullPhotoBlob;
      })
    })
    ActivityIndicator.hide();
    $("#images").html(images);
  })
})
$("#images").on("click", ".imgHolder", function() {
  $(this).toggleClass("checked");
  id = $(this).find('img').data('id');
  sent.push(init[id]);
  $("#submit").css("display","block");
})
$("#submit").on("click", function() {
  sent.forEach(function(blob) {
    console.log(blob);
    var fd = new FormData();
    var xhr = new XMLHttpRequest();
    fd.append("bookuser",2);
    fd.append("image",blob,"image"+Math.random().toString().split(".")[1]+".jpg");
    xhr.open("POST", "http://iothook.com:8000/api/v1/books/");
    xhr.send(fd);
  })
})
