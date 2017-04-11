var sent = [];
var id;
document.addEventListener("deviceready", function() {
  ActivityIndicator.show("Lütfen bekleyin, kütüphane yükleniyor");
  $("#submit").css("display","none");
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    ActivityIndicator.hide();
    var library = res.library;
    var images = '';
    library.forEach(function(libraryItem) {
      var id = libraryItem.id.split(";")[0];
      images += "<div class='imgHolder'><img class='img' height='100' width='100' src='"+libraryItem.thumbnailURL+"' data-id='"+id+"' style='margin: 5px'/></div>";
    })
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
    var fd = new FormData();
    fd.append("bookuser",2);
    fd.append("image",blob,"image"+Math.random().toString().split(".")[1]+".jpg")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://iothook.com:8000/api/v1/books/");
    xhr.send(fd);
  })
})
