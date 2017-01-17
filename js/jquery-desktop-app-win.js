var fs      = require('fs');
var path    = require('path');
$(document).ready(function(){
    $.ajax({
        url:'data-json/app_parameters.json',
        type:'GET',
        error: function(){ formNewLogin(); },
        success: function(){ formLogin(); }
    });

    var formNewLogin = function(){

        $('#main_title').append("<div id='in_main_title' class='create-login-title'><h2>Create login/password</h2></div>");

        $('form#login_form').on('submit',function(e){

            e.preventDefault();

            var app_login = $('#app_login').val(),
                app_password = $('#app_password').val(),
                app_confirm_password = $('#app_confirm_password').val();

            if( app_password != app_confirm_password ){
                $('#login_return_ajax').append('<div class="login-return-ajax">Password différents..</div>');
                setTimeout(function(){ $('.login-return-ajax').remove(); },2000);
            }
            else{
                if( app_login != "" && app_login != "undefined" && app_password != "" && app_password != "undefined" ){

                    var userid = {
                        "login"     : app_login,
                        "password"  : app_password
                    };

                    saveSettings(JSON.stringify(userid, null,2), function () { console.log('Settings saved'); });

                    $('#login_return_ajax').append('<div class="login-return-ajax">Success Login added</div>');
                    $('#login_form').hide();
                    setTimeout(function(){ $('.login-return-ajax').remove(); },2000);

                    setTimeout(function(){ window.location.reload(); }, 2500);
                }
                else{
                    if( app_login == "" || app_login == "undefined" ){
                        $('#app_login').attr("placeholder","login required");
                        setTimeout(function(){ $('#app_login').attr("placeholder","login"); },2000);
                    }
                    if( app_password == "" || app_password == "undefined" ){
                        $('#app_password').attr("placeholder","password required");
                        setTimeout(function(){ $('#app_password').attr("placeholder","password"); },2000);
                    }
                }
            }
        });

        function saveSettings (settings, callback) {

            var file = 'app_parameters.json';
            var filePath = path.join('data-json/', file);

            console.log(filePath);

            fs.writeFile(filePath, settings, function (err) {
                if (err) {
                    console.info("There was an error attempting to save your data.");
                    console.warn(err.message);
                    return;
                } else if (callback) {
                    callback();
                }
            });
        }
    }

    var formLogin = function(){

        $('#main_title').append("<div id='in_main_title' class='sign-in-title'><h2>Sign in</h2></div>");
        $('#app_confirm_password').css({ 'display':'none' });

        $('form#login_form').on('submit',function(e){
            e.preventDefault();

            var app_login = $('#app_login').val();
            var app_password = $('#app_password').val();

            if( app_login != "" && app_login != "undefined" && app_password != "" && app_password != "undefined" ){

                $.getJSON( "data-json/app_parameters.json", function( data ){
                    var jsonPassword = [], jsonLogin = [];
                    $.each( data, function( key, val ) {
                        var jsonKey = key, jsonval = val;
                        if(jsonKey == "login"){ jsonLogin.push( jsonval ); }
                        if(jsonKey == "password"){ jsonPassword.push( jsonval ); }
                    });
                    jsonPassword    = jsonPassword[0];
                    jsonLogin       = jsonLogin[0];
                    if(app_login == jsonLogin && app_password == jsonPassword){
                        $('#login_bloc').hide();
                        $('#in_main_title').remove();
                        $.post('data-content.html', function(data){ $('#view_content').html(data); });
                    }
                    else{
                        $('#login_return_ajax').append('<div class="login-return-ajax">Invalid login..</div>');
                        setTimeout(function(){ $('.login-return-ajax').remove(); },2000);
                    }
                });

            }
            else{
                if( app_login == "" || app_login == "undefined" ){
                    $('#app_login').attr("placeholder","login required");
                    setTimeout(function(){ $('#app_login').attr("placeholder","login"); },2000);
                }
                if( app_password == "" || app_password == "undefined" ){
                    $('#app_password').attr("placeholder","password required");
                    setTimeout(function(){ $('#app_password').attr("placeholder","password"); },2000);
                }

            }
        });
    }
});
