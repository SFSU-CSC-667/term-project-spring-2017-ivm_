var player = require('model/player.js');


function editButton() {
    $("#a").replaceWith("<div class='input-group input-group-lg'>" +
                        "<span class=\"input-group-addon\" id=\"new_name sizing-addon1\">First Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'firstName' placeholder=" +
                        "\" First Name \"" +
                        "aria-describedby=\"sizing-addon1\"></div>");
    $("#b").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_name sizing-addon1\">Last Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'lastName' placeholder=" +
                        "\" Last Name \"" +
                        "aria-describedby=\"sizing-addon1\"></div>");
    $("#c").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_name sizing-addon1\">Password</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'password' placeholder=" +
                        "\" Password \"" +
                        "aria-describedby=\"sizing-addon1\"></div>");
    $("#d").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"name_email sizing-addon1\">Email</span>" +
                        "<input type=\"text\" class=\"form-control\" name='email' placeholder=" +
                        "\" Email Address \"" +
                        "aria-describedby=\"sizing-addon1\"></div>");

    document.getElementById("button").style = "display: none";
    document.getElementById("button2").style = "display: initial";
}
