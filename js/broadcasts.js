$(function () {

    $.ajax("http://192.168.0.3:8080/SpringMongoWSExample/spring/service/try/getMessages")
        .done(function (data) {
            //console.log(data);
            $.each(data.messages, function (indx, thisPost) {
                var msgBlock = "<blockquote>" +
                    "<p>" + thisPost.message + "</p>" +
                    "<small>" + thisPost.sender + "</small>" +
                    "</blockquote>" +
                    "<div style=\"border-bottom: 1px solid #282828; margin-bottom: 5px;\"></div>";

                $("#broadcasts").prepend(msgBlock);
            });
        })

    var ws = new WebSocket("ws://192.168.0.3:8080/SpringMongoWSExample/broadcast");

    ws.onmessage = function (message) {
        console.log(message);
        var post = JSON.parse(message.data);
        var msgBlock = "<blockquote>" +
            "<p>" + post.message + "</p>" +
            "<small>" + post.sender + "</small>" +
            "</blockquote>" +
            "<div style=\"border-bottom: 1px solid #282828; margin-bottom: 5px;\"></div>";

        $("#broadcasts").prepend(msgBlock);
    };

});