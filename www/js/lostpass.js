$("#lostpassbtn").on("click", function(){
  if (!$("#lostpass").val()) {
    navigator.notification.alert("Lütfen kullanıcı adınızı girin.", function(){return;},"Face in Cast","Tamam");
  } else {
    $.ajax({
      url: "http://www.rejicast.com/services/user/request_new_password.json",
      type: "post",
      dataType: "json",
      data: {
        name: encodeURIComponent($("#lostpass").val())
      },
      statusCode: {
        406: function() {
          navigator.notification.alert("Kullanıcı adı bulunamadı.", function(){$("#lostpass").focus();}, "Hata", "Tamam");
        }
      },
      success: function() {
        navigator.notification.alert("Şifre sıfırlama talimatları kayıtlı e-posta adresinize gönderildi, lütfen kontrol ediniz.", function(){return;}, "Bilgi", "Tamam");
        window.location.href = "index.html";
      },
    })
  }
});
