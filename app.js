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

    var users = ["FreeCodeCamp", "GeoffStorbeck", "terakilobyte", "habathcx", "RobotCaleb", "medrybw", "thomasballinger", "noobs2ninjas", "beohoff"];

    var urls = users.map(function (el) {
        return 'https://api.twitch.tv/kraken/streams/' + el + '?callback=?';
    });
    /* var m = [];
     var aj = urls.forEach(function (url) {
     $.getJSON(url).done(function (data) {
     //console.log(data);

     }).then(function (data) {
     m.push(data.stream);
     })
     });
     $.when(aj).then(function(d){
     console.log(m);
     })*/

    var requests = [];

    urls.forEach(function (el) {
        // Submit the ajax request
        requests.push($.getJSON(el, function (data) {
            console.log('req submitted');
        }))
    });
    // After all the data from the request is received, create a handlebars.js template
    $.when.apply(null, requests).then(function (data) {
        var source = $("#users").html();
        var template = Handlebars.compile(source);
        var channels = requests.map(function (el, i, arr) {
            return {name: users[i], link: 'http://www.twitch.tv/' + users[i], online: el.responseJSON.stream};
        });
        var context = template({
            channels: channels
        });
        $('.list-group').html(context);
        console.log(context);
    });

});
