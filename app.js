/**
 * Created by Alex on 14.8.2015.
 */

$(document).ready(function () {
    var $list = $('.list-group-item').mouseover(function (e) {
        e.preventDefault();
        $list.removeClass('active');

        $(this).addClass('active');

    }).mouseout(function (e) {
        $(this).removeClass('active');
    });

    var $nav = $('.nav-pills').children().click(function (e) {
        e.preventDefault();
        $nav.removeClass('active');

        $(this).addClass('active');

    });

    var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"];
});