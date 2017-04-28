var player = require('model/player.js');


function editButton() {

    var first = $("#a").text().split(": ");
    var last = $("#b").text().split(": ");
    var password = $("#c").text().split(": ");
    var email = $("#d").text().split(": ");

    $("#a").replaceWith("<div class='input-group input-group-lg'>" +
                        "<span class=\"input-group-addon\" id=\"new_name sizing-addon1\">First Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'firstName' required='true'" +
                        "value=" + "\"" + first[1] +"\"" +
                        " aria-describedby=\"sizing-addon1\"></div><br>");
    $("#b").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_lname sizing-addon1\">Last Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'lastName' required='true'" +
                        "value=" + "\"" + last[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");
    $("#c").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_pw sizing-addon1\">Password</span>" +
                        "<input type=\"password\" class=\"form-control\" name = 'password' required='true'" +
                        "value=" + "\"" + password[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");
    $("#d").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"name_email sizing-addon1\">Email</span>" +
                        "<input type=\"email\" class=\"form-control\" name='email' required='true'" +
                        "value=" + "\"" + email[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");

    document.getElementById("button").style = "display: none";
    document.getElementById("button2").style = "display: initial";
}
