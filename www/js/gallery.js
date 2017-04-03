document.addEventListener("deviceready", function() {
  $("#btn").css("display","none");
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    console.log(library.length);
    library.forEach(function(libraryItem) {
      images += "<div class='imgHolder'><img class='img' src='"+libraryItem.thumbnailURL+"' data-src='"+libraryItem.id+"' style='margin: 5px' /></div>";
    })
    $("#images").html(images);
  }, function(err) {
    console.log('failed');
  }, {
    thumbnailHeight:100,
    thumbnailWidth:100,
    quality:1,
    includeAlbumData:false,
  })
});
$("#images").on("click", ".imgHolder", function() {
  $(this).addClass("checked");
  var imgSRC = $(this).find('img').data('src').split(";");
  localStorage.setItem(imgSRC[0],imgSRC[1]);
  $("#btn").css("display","block");
})
