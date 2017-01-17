console.log(`This platform is ${process.platform}`);


 var tray = new nw.Tray({
      title: '',
      icon: 'icon/h15/icon-original.png',
      alticon: 'icon/h15/icon-original.png'
  });

/*
// Create an empty mb
var mb = new nw.Menu({type: 'menubar'});
    mb.createMacBuiltin("memo");

var smb = new nw.Menu();
    smb.append(new nw.MenuItem({
        label: 'User',
        click: function(){
            alert('user');
        }
    }));
    smb.append(new nw.MenuItem({
        label: 'Parameters',
        click: function(){
            alert('Parameters');
        }
    }));

mb.append(new nw.MenuItem({
  label: 'Menu',
  submenu: smb
}));

nw.Window.get().menu = mb;
*/
/**********************************************
    CONTEXT MENU
**********************************************/

    // Create an empty context contextmenu
    var contextmenu = new nw.Menu();

    // Add some items with label
    contextmenu.append(new nw.MenuItem({
      label: 'Refresh',
      click: function(){
        tray.remove();
        tray = null;
        window.location.reload();
      }
    }));

    contextmenu.append(new nw.MenuItem({ type: 'separator' }));

    contextmenu.append(new nw.MenuItem({
      label: 'About',
      click: function(){
          alert('Memo app v0.0.1');
      }
    }));

    // Hooks the "contextmenu" event
    document.body.addEventListener('contextmenu', function(ev) {
      ev.preventDefault();
      contextmenu.popup(ev.x, ev.y);
      return false;
    }, false);

/**********************************************
    END -- CONTEXT MENU
**********************************************/





