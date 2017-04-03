document.addEventListener("deviceready", function() {
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    var library = res.library;
    var images = '';
    console.log(library.length);
    library.forEach(function(libraryItem) {
      images += "<div class='imgHolder'><img class='img' src='"+libraryItem.thumbnailURL+"' data-id='"+libraryItem.id+"' style='margin: 5px' /></div>";
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
$(".imgHolder").on("click", function() {
  $(this).addClass("checked");
  localStorage.setItem($(this).find('img').data('id'),$(this).find('img').attr('src'));
})
