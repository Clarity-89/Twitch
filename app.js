/**
 * Created by Alex on 14.8.2015.
 */

$(document).ready(function () {
    var active;
    var $nav = $('.nav-pills').children().click(function (e) {

        e.preventDefault();
        $nav.removeClass('active');

        $(this).addClass('active');
        active = $('.nav').find('.active').text();
        showData();

    });


    // List of users that stream coding
    var users = ["FreeCodeCamp", "GeoffStorbeck", "terakilobyte", "habathcx", "RobotCaleb", "medrybw", "thomasballinger", "noobs2ninjas", "beohoff"];
    var api = 'https://api.twitch.tv/kraken/';

    // Array to store submitted ajax requests
    var requests = [];

    //Array to store the users' info
    var usersList = [];

    function getData() {

        users.forEach(function (el) {
            var user = {};
            // Collects users' urls and online state
            var url = api + 'streams/' + el + '?callback=?';
            requests.push($.getJSON(url).done(function (data) {
                user.link = 'http://www.twitch.tv/' + el;
                user.online = data.stream !== null ? 'ok' : 'remove';
                user.streaming = data.stream !== null ? data.stream.channel.status : null;
            }));
            //Collect users' display names and logos
            var url2 = api + 'users/' + el + '?callback=?';
            requests.push($.getJSON(url2).done(function (data) {
                //console.log(data);
                user.name = data.display_name;
                user.avatar = data.logo || 'http://www.cheapimpact.org/wp-content/uploads/2015/03/no-avatar-ff.png';

            }));
            //Push each user to the user's list
            usersList.push(user);
        });
    }

    getData();
    function showData() {
        $.when.apply(null, requests).done(function () {
            //console.log(channels);
            createTemplate('#users', usersList, '.template');
            $(".loading").fadeOut("slow");
        });
    }

    showData();

    // Creating handlebars.js template
    function createTemplate(input, data, output) {
        var content;
        if (active == 'Online') {
            content = data.filter(function (el) {
                return el.online == 'ok';
            })
        } else if (active == 'Offline') {
            content = data.filter(function (el) {
                return el.online == 'remove';
            })
        } else {
            content = data;
        }

        var source = $(input).html();
        var template = Handlebars.compile(source);
        var context = template({
            channels: content
        });
        $(output).html(context);
    }
});
