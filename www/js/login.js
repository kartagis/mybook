$('#login').on('click', function () {
    var name = $('#username').val();
    if (!name) {
        navigator.notification.alert("Lütfen kullanıcı adınızı girin.", function(){return;}, "Hata", "Tamam");
        return false;
    }
    var pass = $('#password').val();
    if (!pass) {
        navigator.notification.alert("Lütfen şifrenizi girin.", function(){return;}, "Hata", "Tamam");
        return false;
    }
    $.ajax({
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
            ActivityIndicator.show("Giriş yapılıyor");
            $.ajax({
                url: 'http://www.rejicast.com/services/user/login.json',
                type: 'post',
                dataType: 'json',
                data: 'username='+name.trim()+'&password='+pass,
                beforeSend: function(request) {
                    request.setRequestHeader("X-CSRF-Token", token.token);
                },
                statusCode: {
                    401: function() {
                        navigator.notification.alert("Kullanıcı adı ya da şifreniz yanlış", function(){ActivityIndicator.hide();$("#password").val("");$("#username").focus();}, "Hata", "Tamam");
                    }
                },
                success: function (data) {
                    ActivityIndicator.hide();
                    localStorage.setItem("uid", data.user.uid);
                    localStorage.setItem("name", data.user.name);
                    setPushNotificationUserID(localStorage.uid);
                    $.each(data.user.roles, function(k, v) {
                        if (k == 2) {
                            localStorage.setItem("oyuncu", 1);
                        }
                        if (k == 3) {
                            localStorage.setItem("yonetici", 1);
                        }
                        if (k == 4) {
                            localStorage.setItem("editor", 1);
                        }
                        if (k == 5) {
                            localStorage.setItem("yetkilimisafir", 1);
                        }
                    })
                    $("#loginBtn").hide();
                    $("#logoutBtn").show();
                    $("#loginHolder").text(data.user.name);
                    window.location.href = "index.html";
                },
                error: function(xhr, status, message) {
                    console.log(xhr);
                    console.log(status);
                    console.log(message);
                }
            });
            return false;
        },
    });
});
