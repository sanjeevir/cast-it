$(function () {

    var ws = new WebSocket("ws://192.168.0.3:8080/SpringMongoWSExample/broadcast");

    ws.onerror = function () {
        $("#caster").attr("src", "images/pets-bird-icon-4.png");
        $("#post-this").attr("disabled", true);
        $("#post-it").attr("disabled", true);
    };

    ws.onmessage = function (message) {
        var post = JSON.parse(message.data);
        $("#casted").text(post.message);
    };

    $("#post-this").on("keyup", function (e) {
        if (e.keyCode == 13) {
            $("#post-it").click();
        }
    });

    $("#post-it").on("click", function () {

        var loopCnt = 2;
        _intervalId = setInterval(function () {
            $("#caster").attr("src", "images/pets-bird-icon-" + loopCnt + ".png");
            loopCnt++;
            if (loopCnt > 3) {
                loopCnt = 1;
            }
        }, 500);

        var post = {};
        post.message = $('#post-this').val();
        post.sender = location.search.substring(1) || "anonymous";
        ws.send(JSON.stringify(post));
        $("#post-this").val("");

        setTimeout(function () {
            $("#caster").attr("src", "images/pets-bird-icon-1.png");
            clearInterval(_intervalId);
        }, 2000);

    });

});