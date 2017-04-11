init = {};
id = null;
document.addEventListener("deviceready", function() {
  $("#submit").css("display","none");
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    ActivityIndicator.show("Lütfen bekleyin, kütüphane yükleniyor");
    var library = res.library;
    library.forEach(function(libraryItem) {
      cordova.plugins.photoLibrary.getThumbnail(libraryItem, function(thumbnailBlob) {
        id = libraryItem.id.split(";")[0];
        init[id] = thumbnailBlob;
      })
      console.log(init);
    })
    ActivityIndicator.hide();
  })
})
/*
var db = null;
document.addEventListener("deviceready", function() {
  db = window.sqlitePlugin.openDatabase({name: "mybook.db", location: "default"});
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS images(image)');
  });
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    ActivityIndicator.show("Lütfen bekleyin, kütüphane, yükleniyor");
    var library = res.library;
    library.forEach(function(libraryItem) {
      cordova.plugins.photoLibrary.getPhoto(libraryItem, function(fullPhotoBlob) {
        db.transaction(function(tx) {
          tx.executeSql('INSERT INTO images VALUES (?)', fullPhotoBlob);
        }, function(err) {
          console.error(err);
        });
      })
    })
    ActivityIndicator.hide();
  })
});
var db = new PouchDB('mybook');
document.addEventListener("deviceready", function() {
  cordova.plugins.photoLibrary.getLibrary(function(res) {
    library = res.library;
    library.forEach(function(libraryItem) {
      cordova.plugins.photoLibrary.getThumbnail(libraryItem, function(thumbnailBlob) {
        db.post({
          _attachments: {
            "+libraryItem.fileName+": {
              content_type:'image/jpeg',
              data:thumbnailBlob,
            }
          }
        })
      })
    })
  })
})
*/
