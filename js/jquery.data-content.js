$(document).ready(function(){

    loadViewData();

    /****************************************************
        CONTENT LOGOUT
    ****************************************************/
        $('.js-logout').on('click',function(){
            $('#view_content').html("");
            $('#app_login').val("");
            $('#app_password').val("");
            $('#main_title').append("<div id='in_main_title' class='sign-in-title'><h2>Sign in</h2></div>");
            $('#login_bloc').show(500);
        });
    /****************************************************
        END -- CONTENT LOGOUT
    ****************************************************/


    /****************************************************
        CONTENT LOAD VIEW
    ****************************************************/
        $('.bt-nav-item').on('click', function(){

            $('.bt-nav-item').parent().removeClass('active');

            $(this).parent().addClass('active');

            var idItem = $(this).attr('id');

            if( idItem == "modify_login" ){

                $.post('load/load_modify_login.html',function(data){ $('#content_load_view').html(data); });

                setTimeout(function(){
                    $('#modify_login_form').submit( function(e){

                        e.preventDefault();

                        var modifyLogin = $('#inp_modify_login').val(),
                            modifyPassword = $('#inp_modify_password').val(),
                            confirmPassword = $('#inp_confirm_password').val();

                        if( modifyPassword != confirmPassword ){
                            $('#modify_login_return_ajax').append('<div class="modify-login-return-ajax">Les mots de passe sont différents..</div>');
                            setTimeout(function(){ $('.modify-login-return-ajax').remove(); },2000);
                        }
                        else{
                            if( modifyLogin != "" && modifyLogin != "undefined" && modifyLogin != null && modifyPassword != "" && modifyPassword != "undefined" && modifyPassword != null ){

                                var modifyuserid = {
                                    "login": modifyLogin,
                                    "password": modifyPassword
                                };

                                saveSettings(JSON.stringify(modifyuserid, null,2), function () { console.log('Settings saved'); });

                                $('#modify_login_return_ajax').append('<div class="modify-login-return-ajax">success Login updated</div>');
                                $('#modify_login_form').hide();
                                setTimeout(function(){ $('.modify-login-return-ajax').remove(); },2000);

                                setTimeout(function(){ window.location.reload(); }, 2500);

                            }
                            else {
                                if( modifyLogin == "" || modifyLogin == "undefined" ){
                                    $('#inp_modify_login').attr('placeholder','login required');
                                    setTimeout(function(){ $('#inp_modify_login').attr('placeholder','login'); },2000);
                                }
                                if( modifyPassword == "" || modifyPassword == "undefined" ){
                                    $('#inp_modify_password').attr('placeholder','password required');
                                    setTimeout(function(){ $('#inp_modify_password').attr('placeholder','password'); },2000);
                                }
                            }
                        }
                    });
                },500);

                function saveSettings (settings, callback) {

                    var file = 'app_parameters.json';
                    var filePath = path.join('data-json/', file);

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
            else if(idItem == "add_data"){

                $.post('load/load_add_data.html',function(data){ $('#content_load_view').html(data); });

                setTimeout(function(){

                    $('#add_data_form').submit( function(e){

                        e.preventDefault();

                        var addDataTitle        = $('#add_data_title').val(), addDataTitle = addDataTitle.toLowerCase(),
                            addDataLogin        = $('#add_data_login').val(),
                            addDatapassword     = $('#add_data_password').val(),
                            addDataEmail        = $('#add_data_email').val(),
                            addDataUrl          = $('#add_data_url').val(),
                            addDataText         = $('#add_data_text').val(), addDataText = addDataText.toLowerCase();

                        var dateadd = $().getDate("y-m-d H:M:S");

                        if( addDataTitle != "" && addDataTitle != "undefined" && addDataTitle != null ){

                            $.ajax({
                                url:'data-json/app_data.json',
                                type:'GET',
                                error: function(){ addDataInnewFile(); },
                                success: function(){ addData(); }
                            });

                            var addDataInnewFile =function(){
                                var addNewData =
                                    {
                                        data:[{
                                            title: addDataTitle,
                                            login: addDataLogin,
                                            email: addDataEmail,
                                            password: addDatapassword,
                                            url: addDataUrl,
                                            text: addDataText,
                                            dateadd:dateadd
                                        }]
                                    };

                                saveDatas(JSON.stringify(addNewData, null,2), function () {
                                    $('#add_data_title').val(''),
                                    $('#add_data_text').val('');
                                });
                            }

                            var addData = function(){
                                $.getJSON( "data-json/app_data.json",function(getdata){
                                    console.log(getdata.data)

                                    getdata.data.push(
                                        {
                                            title: addDataTitle,
                                            login: addDataLogin,
                                            email: addDataEmail,
                                            password: addDatapassword,
                                            url: addDataUrl,
                                            text: addDataText,
                                            dateadd:dateadd
                                        }
                                    );

                                    saveDatas(JSON.stringify(getdata), function () {
                                        $('#add_data_title').val(''),
                                        $('#add_data_text').val('');
                                    });
                                });
                            }
                        }
                        else {
                            if( addDataTitle == "" || addDataTitle == "undefined" ){
                                $('#add_data_title').attr('placeholder','title required');
                                setTimeout(function(){ $('#add_data_title').attr('placeholder','title'); },2000);
                            }
                        }
                    });
                },500);
            }
            else if(idItem == "export_data"){
                $.post('load/load_export_data.html',function(data){ $('#content_load_view').html(data); });
            }
            else if(idItem == "search_data"){

                $.post('load/load_search_data.html',function(data){
                    $('#content_load_view').html(data);

                    setTimeout(function(){

                        $('form#search_data_form').submit(function(e){
                            e.preventDefault();
                            $('#view_data_json').html("");
                            var searchQ = $('input#search_data').val();

                            if(searchQ != "" && searchQ != "undefined" && searchQ != null){

                                $.getJSON( "data-json/app_data.json", function( datajson ){

                                    var results = [];
                                    for (var i=0 ; i < datajson.data.length ; i++)
                                    {
                                        if (datajson.data[i].title == searchQ || datajson.data[i].login == searchQ || datajson.data[i].password == searchQ || datajson.data[i].email == searchQ || datajson.data[i].url == searchQ || datajson.data[i].text == searchQ || datajson.data[i].dateadd == searchQ) {
                                            results.push(datajson.data[i]);
                                        }
                                    }

                                    $.each( results, function( key, val ) {
                                        var jsonsearch =
                                            "<div class='view-data-json'>"+
                                                "<div class='view-data-json-title'>" +val.title + "</div>"+
                                                //"<div class='view-data-json-text'>" +val.login + "</div>"+
                                                //"<div class='view-data-json-text'>" +val.email + "</div>"+
                                                //"<div class='view-data-json-text'>" +val.password + "</div>"+
                                                //"<div class='view-data-json-text'>" +val.url + "</div>"+
                                                "<div class='view-data-json-text'>" +val.text + "</div>"+
                                                "<div class='view-data-json-date'>" +val.dateadd + "</div>"+
                                            "</div>";
                                        $('#view_data_json').append(jsonsearch);
                                    });

                                    $('.js-trash-item').on('click',function(){
                                        var idBloc0 = $(this).attr('id'), idBloc1 = idBloc0.split('-'), idBloc = idBloc1[1];
                                        if($('#confirmdelete-'+idBloc).is(':visible')){
                                            $('#confirmdelete-'+idBloc).hide(500);
                                        }
                                        else{
                                           $('#confirmdelete-'+idBloc).show(500);
                                        }
                                    });

                                    $('.js-trash-item-cancel').on('click',function(){
                                        var idBloc0 = $(this).parent().attr('id'), idBloc1 = idBloc0.split('-'), idBloc = idBloc1[1];
                                        $('#confirmdelete-'+idBloc).hide(500);
                                    });

                                    $('.js-trash-item-confirm').on('click',function(){
                                        var idItem0 = $(this).parent().attr('id'), idItem1 = idItem0.split('-'), idItem = idItem1[1];
                                        datajson.data.splice(idItem,1);
                                        setTimeout(function(){
                                            saveDatas(JSON.stringify(datajson), function () {
                                                console.log('data saved');
                                            });
                                            loadViewData();
                                        },500);
                                    });

                                });
                            }
                            else{
                                if(searchQ == "" || searchQ == "undefined" || searchQ == null){
                                    $('input#search_data').attr('placeholder','Search required');
                                    setTimeout(function(){ $('input#search_data').attr('placeholder','search'); },2000)
                                }

                            }

                        });
                    },500);
                });
            }
            else if(idItem == "view_data"){
                loadViewData();
            }

            else if(idItem == "add_html"){

                $.post('load/load_add_html.html',function(data){
                    $('#content_load_view').html(data);

                    setTimeout(function(){
                        $('form#add_html_form').submit(function(e){

                            e.preventDefault();

                            var html_title  = $('#add_html_title').val(), html_text = $('textarea#add_html_text').val();
                            var src         = $('#add_html_file').val();

                            var dateadd     = $().getDate("y-m-d H:M:S");
                            var ref_upload  = $().getDate("ymdHMS");

                            if( src != "" && src != "undefined" && src != null ){

                                var filename    = src.substring(src.lastIndexOf('/')+1);
                                var fileext     = src.substring(src.lastIndexOf('.')+1);
                                var file        = ref_upload+'.'+fileext;

                                var fsextra     = require('fs-extra');
                                fsextra.copy(src, 'upload/'+file, function (err) {
                                    if (err){ console.log(err) }
                                    else{ console.log('Copy complete.'); }
                                });
                            }
                            else{ var file = ""; }

                            if(html_title != '' && html_title != 'undefined' && html_title != null){

                                $.ajax({
                                    url:'data-json/app_data.json',
                                    type:'GET',
                                    error: function(){ addDataInnewFile(); },
                                    success: function(){ addData(); }
                                });

                                var addDataInnewFile =function(){
                                    var addNewData =
                                        {
                                            data:[{
                                                title: html_title,
                                                text: html_text,
                                                file: file,
                                                dateadd:dateadd
                                            }]
                                        };

                                    saveDatas(JSON.stringify(addNewData, null,2), function () {
                                        $('#add_html_title').val(''),
                                        $('#add_html_text').val('');
                                    });
                                }

                                var addData = function(){
                                    $.getJSON( "data-json/app_data.json",function(getdata){

                                        getdata.data.push(
                                            {
                                                title: html_title,
                                                text: html_text,
                                                file: file,
                                                dateadd:dateadd
                                            }
                                        );

                                        saveDatas(JSON.stringify(getdata), function () {

                                            $.post('load/load_add_html.html',function(data){
                                                $('#content_load_view').html(data);
                                            });
                                        });
                                    });
                                }

                            }
                            else {
                                if( html_title == "" || html_title == "undefined" ){
                                    $('#add_html_title').attr('placeholder','title required');
                                    setTimeout(function(){ $('#add_html_title').attr('placeholder','title'); },2000);
                                }
                            }

                        });
                    },500)


                });
            }
        });
    /****************************************************
        END -- CONTENT LOAD VIEW
    ****************************************************/


    /****************************************************
        LOAD VIEW DATA FUNCTION
    ****************************************************/
        function loadViewData(){
            $.post('load/load_view_data.html',function(data){
                $('#content_load_view').html(data);

                setTimeout(function(){
                    $.getJSON( "data-json/app_data.json", function( datajson ){
                        $.each( datajson.data, function( key, val ) {

                            var jsondata =
                            "<div class='panel-data'>"+

                                "<div class='panel panel-default'>"+
                                    "<div class='view-data-json-delete'>"+
                                        "<i id='itemdelete-"+key+"' class='fa fa-trash js-trash-item' aria-hidden='true'></i>"+
                                    "</div>"+

                                    "<div id='confirmdelete-"+key+"' class='view-data-json-confirm'>"+
                                    "<div class='in-view-data-json-confirm'>"+
                                        "Delete ? <button class='btn btn-danger js-trash-item-confirm'>YES</button> <button class='btn btn-default js-trash-item-cancel'>NO</button>"+
                                    "</div>"+
                                    "</div>"+

                                    "<div class='panel-body-edit panel-body-edit-"+key+"'>"+
                                        "<div class='panel-text-edit'>"+
                                            "<form id='form_edit_item_"+key+"' method='POST'>"+
                                                "<input type='hidden' id='exist_json_item_file_"+key+"' value='"+val.file+"'>"+
                                                "<div class='form-group'>"+
                                                    "<input class='form-control' id='edit_json_item_file_"+key+"' type='file'>"+
                                                "</div>"+
                                                "<div class='form-group'>"+
                                                    "<input class='form-control' id='edit_json_item_title_"+key+"' type='text' value='" +val.title + "'>"+
                                                "</div>"+
                                                "<div><textarea id='edit_json_item_text_"+key+"' name='edit_json_item_"+key+"'>" +val.text + "</textarea></div>"+
                                                "<div><button type='submit' class='btn btn-default'>UPDATE</button></div>"+
                                            "</form>"+
                                        "</div>"+
                                    "</div>"+

                                    "<div class='panel-body panel-body-"+key+"'>"+
                                        "<div class='panel-img panel-img-"+key+"'></div>"+
                                        "<div class='panel-text'>"+
                                            "<div><h3>" +val.title + "</h3></div>"+
                                            "<div>" +val.text + "</div>"+
                                        "</div>"+
                                    "</div>"+

                                    "<div class='view-data-json-edit'>"+
                                        "<i id='itemedit-"+key+"' class='fa fa-pencil js-edit-item' aria-hidden='true'></i>"+
                                    "</div>"+

                                    "<div class='panel-footer'>"+
                                        "<div class='panel-footer-date'> updated " +val.dateadd + "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";

                            $('#view_data_json').append(jsondata);

                            setTimeout(function(){
                                if( val.file != "" && val.file != "undefined" && val.file != null ){
                                    $('.panel-img-'+key).append("<img src='upload/"+val.file+"'>");
                                }
                                else{
                                   $('.panel-img-'+key).append("<img src='upload/default.jpg'>");
                                }
                            },500);

                            CKEDITOR.replace( 'edit_json_item_text_'+key );

                        });


                        /*****************************************************************
                            DELETE ITEM IN JSON FILE
                        *****************************************************************/
                            $('.js-trash-item').on('click',function(){
                                var idBloc0 = $(this).attr('id'), idBloc1 = idBloc0.split('-'), idBloc = idBloc1[1];
                                if($('#confirmdelete-'+idBloc).is(':visible')){
                                    $('#confirmdelete-'+idBloc).hide(500);
                                }
                                else{
                                   $('#confirmdelete-'+idBloc).show(500);
                                }
                            });

                            $('.js-trash-item-cancel').on('click',function(){
                                var idBloc0 = $(this).parent().attr('id'), idBloc1 = idBloc0.split('-'), idBloc = idBloc1[1];
                                $('#confirmdelete-'+idBloc).hide(500);
                            });

                            $('.js-trash-item-confirm').on('click',function(){
                                var idItem0 = $(this).parent().parent().attr('id'), idItem1 = idItem0.split('-'), idItem = idItem1[1];
                                datajson.data.splice(idItem,1);
                                setTimeout(function(){
                                    saveDatas(JSON.stringify(datajson), function () {
                                        console.log('Data saved');
                                    });
                                    loadViewData();
                                },500);
                            });
                        /*****************************************************************
                            END -- DELETE ITEM IN JSON FILE
                        *****************************************************************/

                        /******************************************************************
                            EDIT ITEM JSON FILE
                        ******************************************************************/
                            $('.js-edit-item').on('click', function(e){
                                e.preventDefault();
                                var idBloc0 = $(this).attr('id'), idBloc1 = idBloc0.split('-'), idBloc = idBloc1[1];
                                if($('.panel-body-edit-'+idBloc).is(':visible')){
                                    $('.panel-body-edit-'+idBloc).hide();
                                    $('.panel-body-'+idBloc).show(500);
                                }
                                else{
                                    $('.panel-body-'+idBloc).hide();
                                    $('.panel-body-edit-'+idBloc).show(300);

                                    $('form#form_edit_item_'+idBloc).on('submit', function(e){
                                        e.preventDefault();

                                        var dateadd     = $().getDate("y-m-d H:M:S");
                                        var ref_upload  = $().getDate("ymdHMS");
                                        var edit_file   = $('input#edit_json_item_file_'+idBloc).val();
                                        var outputfile  = '';

                                        if(edit_file != "" && edit_file != "undefined" && edit_file != null){

                                            edit_file       = $('input#edit_json_item_file_'+idBloc).val();
                                            var filename    = edit_file.substring(edit_file.lastIndexOf('/')+1);
                                            var fileext     = edit_file.substring(edit_file.lastIndexOf('.')+1);
                                            var file        = ref_upload+'.'+fileext;

                                            var fsextra     = require('fs-extra');
                                            fsextra.copy(edit_file, 'upload/'+file, function (err) {
                                                if (err){ console.log(err) }
                                                else{ console.log('Copy complete.'); }
                                            });
                                            outputfile = file;
                                        }
                                        else{
                                            edit_file = $('input#exist_json_item_file_'+idBloc).val();
                                            outputfile = edit_file;
                                        }

                                        var edit_title = $('input#edit_json_item_title_'+idBloc).val();
                                        var edit_text = $('textarea#edit_json_item_text_'+idBloc).val();

                                        $.getJSON( "data-json/app_data.json", function( datajson ){

                                            $.each( datajson.data, function( key, val ) {
                                                if(key == idBloc){
                                                    val.file    = outputfile;
                                                    val.title   = edit_title;
                                                    val.text    = edit_text;
                                                    val.dateadd = dateadd;
                                                }

                                                setTimeout(function(){
                                                    saveDatas(JSON.stringify(datajson), function () {
                                                        console.log('Data saved');
                                                    });
                                                },500);

                                            });

                                            setTimeout(function(){
                                                loadViewData();
                                            },1000);

                                        });
                                    });
                                }
                                console.log(datajson.data);
                            })

                        /******************************************************************
                            END -- EDIT ITEM JSON FILE
                        ******************************************************************/

                    });
                },500);
            });
        }
    /****************************************************
        END -- LOAD VIEW DATA FUNCTION
    ****************************************************/


    /****************************************************
        DATE FUNCTION
    ****************************************************/
        (function( $ ){
           $.fn.getDate = function(format) {

            var gDate       = new Date();
            var mDate       = {
                'S': gDate.getSeconds(),
                'M': gDate.getMinutes(),
                'H': gDate.getHours(),
                'd': gDate.getDate(),
                'm': gDate.getMonth() + 1,
                'y': gDate.getFullYear(),
            }

            return format.replace(/([SMHdmy])/g, function(key){return (mDate[key] < 10 ? '0' : '') + mDate[key];});

            return getDate(str);
           };
        })( jQuery );
    /****************************************************
        END -- DATE FUNCTION
    ****************************************************/


    /****************************************************
        SAVE DATA
    ****************************************************/
        function saveDatas (settings, callback) {

            var datafile = 'app_data.json';
            var datafilePath = path.join('data-json/', datafile);

            fs.writeFile(datafilePath, settings, function (err) {
                if (err) {
                    console.info("There was an error attempting to save your data.");
                    console.warn(err.message);
                    return;
                } else if (callback) {
                    callback();
                }
            });
        }
    /****************************************************
        END -- SAVE DATA
    ****************************************************/
/*
    $(document).mouseleave(function(){
        window.location.reload();
    });
*/


/**************************************************
    TIMER FOR RETURN TO LOGIN
**************************************************/
    var t = 0, time;

    var startTimer = function(){
        time = setInterval(function(){
            t ++;
            console.log(t);
            if( t == 10 ){
                tray.remove();
                tray = null;
                window.location.reload();
            }
        },1000);
    }
    startTimer();

    document.onmousemove = function(){
        clearInterval(time);
    };

    setInterval(function(){
        t = 0;
        startTimer();
    }, 15000);
/**************************************************
    END -- TIMER FOR RETURN TO LOGIN
**************************************************/













});
