var arr = {};
var fd = new FormData();
document.addEventListener("deviceready", function() {
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    library.forEach(function(libraryItem) {
      var id = libraryItem.id.split(";")[0];
      images += "<div class='imgHolder'><img class='img' height='100' width='100' src='"+libraryItem.thumbnailURL+"' data-id='"+id+"' style='margin: 5px'/></div>";
      cordova.plugins.photoLibrary.getPhoto(libraryItem, function(fullPhotoBlob) {
        id = libraryItem.id.split(";")[0];
        arr[id] = fullPhotoBlob;
        console.log(arr);
      })
    })
    $("#images").html(images);
  })
})
$("#images").on("click", ".imgHolder", function(arr) {
  $(this).toggleClass("checked");
  var id = $(this).find('img').data('id');
  var blob = arr[id];
  fd.append("bookuser",2);
  fd.append("image",arr["'+id'+"],"image"+new Date().getTime()+".jpg");
  $("#submit").css("display","block");
})
$("#submit").on("click", function(fd) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://iothook.com:8000/api/v1/books/");
  xhr.send(fd);
  console.log(arr);
})
