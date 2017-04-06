document.addEventListener("deviceready", function() {
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    library.forEach(function(libraryItem) {
      var id = libraryItem.id.split(";")[0];
      images += "<div class='imgHolder'><img class='img' height='100' width='100' src='"+libraryItem.thumbnailURL+"' data-id='"+id+"' style='margin: 5px'/></div>";
      cordova.plugins.photoLibrary.getPhoto(libraryItem, function(fullPhotoBlob) {
        arr = [];
        arr.push(id, fullPhotoBlob);
        /*
        var fd = new FormData();
        var xhr = new XMLHttpRequest();
        fd.append("bookuser",2);
        fd.append("image",fullPhotoBlob, "image"+new Date().getTime()+".jpg");
        xhr.open("POST", "http://iothook.com:8000/api/v1/books/");
        xhr.send(fd);
        */
        console.log(arr);
      })
    })
    $("#images").html(images);
  })
})
$("#images").on("click", ".imgHolder", function() {
  $(this).toggleClass("checked");
  var imgSRC = $(this).find('img').data('blob');
  $("#submit").css("display","block");
})
