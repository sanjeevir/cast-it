$(function () {
    $("#login").on("click", function () {
        window.location.href = "this.html?" + $("#user").val();
    });
});