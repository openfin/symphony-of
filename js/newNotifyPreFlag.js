/*
* Class representing a Symphony notification
*/



class Notify {

    constructor(title,options){
        
        let msg = options || {};
        console.log('Notification Options:', options);        
        msg.title =  title;
        let timeout = 5000;
        let clickHandle = () => {
            // KEEPING  THE BELOW JUST IN CASE - IF SYM CLICK API WORKS DELETE THIS
            // let targetWin = window.popouts[msg.data.streamId];
            // let ofTargetWin = fin.desktop.Window.wrap(targetWin.uuid, targetWin.name);
            // if(targetWin && !targetWin.hide) {
            //     window.winFocus(ofTargetWin)
            // } else {
            //     fin.desktop.InterApplicationBus.publish("note-clicked", msg.data.streamId);
            // }
        }
        let onClick = clickHandle;
        if (msg.sticky) {
            timeout = 60000*60*24; // 24 hours
            this.sticky = msg.sticky;
            // KEEPING  THE BELOW JUST IN CASE - IF SYM CLICK API WORKS DELETE THIS

            // onClick = () => { 
            //     clickHandle();
            //     this.notification.close();
            // }
        }
        
          
            
        // msg.monitorInfo = Notify.monitorInfo;
        // 
        // console.log("msg.monitorInfo", Notify.monitorInfo);
        
        // var notificationPosition = Notify.openWindows.length;
        // console.log("notificationPosition", notificationPosition);
        // if (conflict) {
        //   notificationPosition -= 1;
        // }
        // console.log("notificationPosition", notificationPosition);
        
        // msg.notificationPosition = notificationPosition;
        
        var randomString = Math.random().toString(36).slice(-8);
        
        var notification = new window.fin.desktop.Window({
          customData: msg,
          name: msg.tag + randomString,
          cornerRounding: {height: 2, width: 3},
          defaultWidth: 300,
          defaultHeight: 80,
          frame: false,
          resizeable: false,
          url: `${window.targetUrl}notification.html`,
          opacity: 0.92,
          alwaysOnTop: true
        }, function (success) {
            var conflict = false;
            console.log("windows", Notify.openWindows);
            
            var conflictIdx = -1;
            console.log("notificationWindows", Notify.openWindows)
            for (var i = 0; i < Notify.openWindows.length; i++) {
              var childWindow = Notify.openWindows[i];
              console.log('childWindow.name', childWindow.name)
              if (childWindow.name.includes(msg.tag)) {
                console.log("IN CHILDWINDOW.NAME")
                console.log(childWindow.name)
                console.log("INDEX", i);
                childWindow.close();
                conflict = true;
                conflictIdx = i;
              }
            }
            
            console.log("conflictIdx", conflictIdx);
            
            if (conflictIdx >= 0) {
              var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
              console.log("IN SHIFT")
              console.log("windowsToShift", windowsToShift)
              
              for (var i = 0; i < windowsToShift.length; i++) {
                windowsToShift[i].animate({
                  position: {
                    left: 0,
                    top: -90,
                    duration: 500,
                    relative: true
                  }
                });
              }
              
              Notify.openWindows.splice(conflictIdx, 1);
            }
            
            Notify.openWindows.push(notification);
            var notificationPosition = Notify.openWindows.length - 1;
            console.log("notificationPosition", notificationPosition);
            console.log("notificationPosition", notificationPosition);
            var left = Notify.monitorInfo.primaryMonitor.availableRect.right;
            var newLeft = left - 300;
            notification.moveTo(newLeft, 90 * notificationPosition);
            notification.show();
            console.log(success, "SUCCESS");
        }, function (err) {
          console.log(err, "ERROR");
        });
        
        this.notification = notification;
        this._data = msg.data || null;
    }

    static get permission(){
        return "granted";
    }

    get data(){
        return this._data;
    }

    close(cb) {
        // This gets called immediately on a new notification...so commented out for now.  
        // this.notification.close();
        
        // var shiftNotification = this.notification;
        // 
        // fin.desktop.Application.getCurrent().getChildWindows(function(windows) {
        //   console.log("WINDOWSSS", windows)
        //   var notificationWindows = [];
        //   for (var i = 0; i < windows.length; i++) {
        //     var childWindow = windows[i];
        // 
        //     if (childWindow.name.includes("==")) {
        //       notificationWindows.push(childWindow);
        //     }
        //   }
        // 
        //   var conflictIdx = -1;
        //   for (var i = 0; i < notificationWindows.length; i++) {
        //     var childWindow = notificationWindows[i];
        //     console.log('childWindow.nameeee', shiftNotification.name)
        //     if (childWindow.name === obj.name) {
        //       console.log("IN CHILDWINDOW.NAMEEEE")
        //       console.log(childWindow.name)
        //       console.log("INDEXXXXX", i);
        //       conflictIdx = i;
        //     }
        //   }
        // 
        //   if (conflictIdx >= 0) {
        //     var windowsToShift = notificationWindows.slice(conflictIdx + 1);
        //     console.log("IN SHIFTTTT");
        //     console.log("windowsToShifttttt", windowsToShift);
        // 
        //     for (var i = 0; i < windowsToShift.length; i++) {
        //       windowsToShift[i].animate({
        //         position: {
        //           left: 0,
        //           top: -90,
        //           duration: 500,
        //           relative: true
        //         }
        //       });
        //     }
        //   }
        // 
        //   shiftNotification.close();
        // });
        
        console.log("windows", Notify.openWindows);
        
        var conflictIdx = -1;
        console.log("notificationWindows", Notify.openWindows)
        for (var i = 0; i < Notify.openWindows.length; i++) {
          var childWindow = Notify.openWindows[i];
          console.log('childWindow.name', childWindow.name)
          if (childWindow.name === this.notification.name) {
            console.log("IN CHILDWINDOW.NAME")
            console.log(childWindow.name)
            console.log("INDEX", i);
            childWindow.close();
            conflictIdx = i;
          }
        }
        
        console.log("conflictIdx", conflictIdx);
        
        if (conflictIdx >= 0) {
          var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
          console.log("IN SHIFT")
          console.log("windowsToShift", windowsToShift)
          
          for (var i = 0; i < windowsToShift.length; i++) {
            windowsToShift[i].animate({
              position: {
                left: 0,
                top: -90,
                duration: 500,
                relative: true
              }
            });
          }
          
          Notify.openWindows.splice(conflictIdx, 1);
        }
    }

    addEventListener(event, cb) {
      if (event === 'click') {
        this.notification.addEventListener('focused', () => {
          cb({target:{callbackJSON:this._data}});
          this.close();
        });
      }
      
      
      
        // if(event === 'click' && this.notification) {
        //     this.notification.onClick = () => {
        //         if (this.sticky) {
        //             this.notification.close();                    
        //         }
        //         cb({target:{callbackJSON:this._data}}); 
        //     }
        // }
        // }
        // if(event === 'click') {
        //     this.notification.noteWin.onClick = cb.bind(this,this._data);
        // } else if(event === 'close') {
        //     this.notification.noteWin.onClose = cb
        // } else if(event === 'error') {
        //     this.notification.noteWin.onError = cb
        // }
    }

    removeEventListener(event, cb){
      if (event === 'click') {
        this.notification.removeEventListener('focused', () => {
          cb({target:{callbackJSON:this._data}});
          this.close();
        });
      }
        // if(event === 'click') {
        //     // this.notification.noteWin.onClick = () => {};
        // } else if(event === 'close') {
        //     // this.notification.noteWin.onClose = () => {};
        // } else if(event === 'error') {
        //     // this.notification.noteWin.onError = () => {};
        // }
    }

    removeAllEvents(){
        // while(this.eventListeners.length) {
        //     removeEventListener(this.eventListeners.pop());
        // }
    }

    destroy(){
        // How is this different from close?
    }
}

Notify.openWindows = [];
Notify.monitorInfo = false;
if (Notify.monitorInfo === false) {
  fin.desktop.System.getMonitorInfo(function (monitorInfo) {
    Notify.monitorInfo = monitorInfo;
  });
}
