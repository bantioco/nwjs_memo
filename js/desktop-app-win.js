var win     = nw.Window.get();

document.getElementById("win_minimize").onclick = function(e){
    e.preventDefault();
    win.minimize();
}
/*
document.getElementById("win_maximize").onclick = function(){

    win.on('maximize', function() {
        document.getElementById("win_maximize").style.display = "none";
        document.getElementById("win_unmaximize").style.display = "block";
    });
    win.maximize();
}

document.getElementById("win_unmaximize").onclick = function(){

    win.on('restore', function() {
        document.getElementById("win_unmaximize").style.display = "none";
        document.getElementById("win_maximize").style.display = "block";
    });
    win.restore();
}
*/
document.getElementById("win_close").onclick = function(e){
    e.preventDefault();
    win.close();
}

var d = new Date();
console.log(d)
document.getElementById("footer_date").innerHTML = d.toDateString();


