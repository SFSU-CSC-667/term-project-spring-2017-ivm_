var player = require('model/player.js');


function editButton() {

    var first = $("#firstNameField").text().split(": ");
    var last = $("#lastNameField").text().split(": ");
    var password = $("#passwordField").text().split(": ");
    var email = $("#emailField").text().split(": ");

    $("#firstNameField").replaceWith("<div class='input-group input-group-lg'>" +
                        "<span class=\"input-group-addon\" id=\"new_name sizing-addon1\">First Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'firstName' required='true'" +
                        "value=" + "\"" + first[1] +"\"" +
                        " aria-describedby=\"sizing-addon1\"></div><br>");
    $("#lastNameField").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_lname sizing-addon1\">Last Name</span>" +
                        "<input type=\"text\" class=\"form-control\" name = 'lastName' required='true'" +
                        "value=" + "\"" + last[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");
    $("#passwordField").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"new_pw sizing-addon1\">Password</span>" +
                        "<input type=\"password\" class=\"form-control\" name = 'password' required='true'" +
                        "value=" + "\"" + password[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");
    $("#emailField").replaceWith("<div class=\"input-group input-group-lg\">" +
                        "<span class=\"input-group-addon\" id=\"name_email sizing-addon1\">Email</span>" +
                        "<input type=\"email\" class=\"form-control\" name='email' required='true'" +
                        "value=" + "\"" + email[1] +"\"" +
                        "aria-describedby=\"sizing-addon1\"></div><br>");

    $("#editProfile").hide();
    $("#saveProfile").show();
}
