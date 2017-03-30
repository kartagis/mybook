document.addEventListener("deviceready", function() {
  if (window.location.pathname.indexOf("index.html") != -1) {
    checkStatus();
    checkNotifications();
    checkNetworkConnection();
  }
  initPush();
});
/*
document.addEventListener("offline",function() {

}
*/
function getId() {
  window.plugins.OneSignal.getIds(function(ids) {
    console.log("UserID:"+ids.userId);
    console.log("PushToken:"+ids.pushToken);
  });
}
function whoami() {
  $.ajax({
    url:'http://www.rejicast.com/services/user/token.json',
    type:'post',
    dataType:'json',
    success:function(token){
      $.ajax({
        url:'http://www.rejicast.com/services/system/connect.json',
        type:'post',
        dataType:'json',
        beforeSend:function(r){
          r.setRequestHeader("X-CSRF-Token",token.token);
        },
        success:function(data){
          console.log(JSON.stringify(data));
        }
      });
    }
  });
}
function checkNetworkConnection() {
  if (navigator.connection.type == 'none') {
    navigator.notification.alert('İnternet bağlantınızı kontrol edin',function(){return;},'Face in Cast','Tamam');
  }
}
// notification functions - start
function pushPluginLoaded() {
  if (!window.plugins || !window.plugins.OneSignal);
  return false;
  return true;
}
function initPush() {
  // Enable to debug issues.
  //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  /*
  if (!pushPluginLoaded()) {
    return console.log('push plugin not loaded.');
  }
  */
  var notificationOpenedCallback = function(jsonData) {
    navigator.notification.alert(jsonData.message, function() {return;}, "Yeni bildirim", "Tamam");
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
  };
  window.plugins.OneSignal
  .startInit("ea091ff0-4b98-4146-afaa-26543c415b67","1091017445772")
  .handleNotificationOpened(notificationOpenedCallback)
  .endInit();
}
function setPushNotificationUserID(id) {
  if (!pushPluginLoaded())
  return;
  window.plugins.OneSignal.sendTag('userID', '' + id);
}
function unsetPushNotificationUserID() {
  if (!pushPluginLoaded())
  return;
  window.plugins.OneSignal.deleteTag('userID');
}
// notification functions - end

$("#navHolder #homeBtn").on("click", function() {
  window.location.href = "index.html";
});
$("#navHolder #notificationBtn").on("click", function() {
  window.location.href = "notifications.html";
});
function checkStatus() {
  whoami();
  var uid = localStorage.uid;
  var name = localStorage.name;
  var num = localStorage.num;
  if (uid > 0) {
    //setPushNotificationUserID(uid);
    $("#loginHolder").text(name);
    $("#notification").text(num);
    if (localStorage.getItem("oyuncu")) {
      $("a[href='apply.html']").css("display", "none");
      $("a[href='edit.html']").css("display", "block");
      $("a[href='filtres.html']").css("display", "none");
    }
    if ((localStorage.editor) || (localStorage.yonetici) || (localStorage.yetkilimisafir)) {
      $("a[href='apply.html']").css("display", "none");
      $("a[href='edit.html']").css("display", "none");
      $("a[href='filtres.html']").css("display", "block");
    }
    if (localStorage.yetkilimisafir) {
      $("a[href='apply.html']").css("display", "none");
      $("a[href='edit.html']").css("display", "block");
      $("a[href='filtres.html']").css("display", "block");
    }
    $("#logoutBtn").css("display", "block");
  } else if (uid === 0 || !uid) {
    $("a[href='apply.html']").css("display", "block");
    $("a[href='filtres.html']").css("display", "none");
    $("a[href='edit.html']").css("display", "none");
    $("a[href='login.html']").css("display", "block");
    $("#logoutBtn").css("display", "none");
  }
}
function logout() {
  navigator.notification.confirm("Çıkış yapmak istiyor musunuz?", function(buttonIndex) {
    if (buttonIndex === 1) {
      // unset userID
      unsetPushNotificationUserID();
      ActivityIndicator.show("Çıkış yapılıyor, lütfen bekleyin");
      $.ajax({
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
          $.ajax({
            url: 'http://www.rejicast.com/services/user/logout.json',
            type: 'post',
            dataType: 'json',
            beforeSend: function(r) {
              r.setRequestHeader("X-CSRF-Token", token.token);
            },
            success: function() {
              ActivityIndicator.hide();
              $("#loginBtn").css("display","block");
              $("#logoutBtn").css("display","none");
              $("a[href='apply.html']").css("display", "block");
              $("a[href='applications.html']").css("display","none");
              $("a[href='filtres.html']").css("display","none");
              $("a[href='edit.html']").css("display","none");
              $("#loginHolder").text("");
              $("#notification").text("");
              $("#notification").css("display","none");
              localStorage.clear();
            }
          });
        }
      });
    }
  }, 'Onay', ['Evet', 'Hayır']);
}
function checkNotifications() {
  $.ajax({
    url: 'http://www.rejicast.com/services/user/token.json',
    type: 'post',
    dataType: 'json',
    success: function(token) {
      $.ajax({
        url: 'http://www.rejicast.com/services/system/connect.json',
        type: 'post',
        dataType: 'json',
        beforeSend: function(r) {
          r.setRequestHeader("X-CSRF-Token", token.token);
        },
        success: function(connect) {
          $.ajax({
            url: 'http://www.rejicast.com/duyurular.json',
            type: 'get',
            dataType: 'json',
            success: function (data) {
              var num = data.nodes.reduce(function(currNum, node) {
                if (node.node.field_kime.indexOf(connect.user.uid) !== -1) {
                  currNum++;
                }
                return currNum;
              }, 0);
              localStorage.setItem("num", num);
              if (connect.user.uid > 0) {
                $("#notification").text(num);
                if (num === 0) {
                  $("#notification").css("display","none");
                } else {
                  $("#notification").css("display","block");
                }
              }
            }
          });
        }
      });
    }
  });
}
