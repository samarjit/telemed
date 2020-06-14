import {createStore, dispatch} from 'redux';
// import EventEmitter from 'events';
 
// class MyEvents extends EventEmitter {};
let instanceCounter = 1;
let notificationsMuted = false;
let serviceWorkerNotify = false;
let swRegistration = null;

// navigator.serviceWorker.register('sw.js')
// .then(function (swReg) {
//   console.log('Service Worker is registered', swReg);
 
//   swRegistration = swReg;
//   window.registration = swReg;
//    swRegistration.pushManager.getSubscription()
//     .then(function (subscription) {
//       const isSubscribed = !(subscription === null);

//       if (isSubscribed) {
//         console.log('User IS subscribed.', JSON.stringify(subscription));
        
//       } else {
//         console.log('User is NOT subscribed.');
//       } 
//     });

// })
// .catch(function (error) {
//   console.error('Service Worker Error', error);
// });

const applicationServerPublicKey = 'BKg6NKx2kAuiC8vvR1_Lw1-1yltG3GnR9uNGWFM7znFqtJdxfEdva1vynYyyu97s5orzt8L278fcSISyJWdpmvc';

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function enablePushNotification() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  navigator.serviceWorker.register('../public/sw.js').then(function(swRegistration) {
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('User is subscribed.', JSON.stringify(subscription));
      fetch('v1/webpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(subscription)
      })
      .then(response => response.json())
      .then((data) => console.log('Response after registration to server', data));
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
    });
  });
}
 
function notifyReducer(state = [], action) {
  switch(action.type) {
    case 'ADD_NOTIFY': return [...state, action.payload];
    case 'HIDE_NOTIFY': {
      for (let notify of state) {
        if (notify.instanceId === action.payload) {
          notify.current = false;
        }
      }
      return state;
    } break;
    case 'REMOVE_NOTIFY': return state.filter(notify => notify.instanceId !== action.payload);
    default: return state;
  }
}

console.log('Creating notification reducer');
export const notifyStore = createStore(notifyReducer, []);

export function unsubscribeMe() {
  navigator.serviceWorker.register('../public/sw.js').then(function(reg) {
    reg.pushManager.getSubscription().then(function(subscription) {
      if (!subscription) {
        alert('There are no current subscriptions');
      }
      subscription.unsubscribe().then(function(successful) {
        alert('You have unsubscribed successfully result=' + successful);
      }).catch(function(e) {
        console.log('Your unsubscription failed');
      })
    })        
  });
}
export function checkSubscription() {
  fetch('v1/webpush', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(i => i.json())
  .then((data) => console.log('Response of current registrations in server', data));
}

export function addNotification(data) {
  instanceCounter += instanceCounter;
  data.instanceId = instanceCounter;
  data.current = true;
  notifyStore.dispatch({type: 'ADD_NOTIFY', payload: data});
  return instanceCounter;
}

export function hideNotification(data) {
  notifyStore.dispatch({type: 'HIDE_NOTIFY', payload: data});
}

export function removeNotification(data) {
  notifyStore.dispatch({type: 'REMOVE_NOTIFY', payload: data});
}

function showNotification(body, tag, title) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title ||  'Vibration Sample', {
          body: body,
          // icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag
        });
      });
    } else {
      notificationsMuted = true;
    }
  });
}

var options = { tag : 'user_alerts' };

// navigator.serviceWorker.ready.then(function(registration) {
//   registration.getNotifications(options).then(function(notifications) {
//      console.log('This is notification handler', notifications)
//   }) 
// });

notifyStore.subscribe(() => {
  if (notificationsMuted) {
    return;
  }
  const allNotifications = notifyStore.getState();
  for(let notify of allNotifications) {
    if (notify.current) {
      console.log('creating notification', notify.body)
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification, please look for notifications from menu');
        notificationsMuted = true;
      }

      else if (Notification.permission === "granted") {
      // Let's check whether notification permissions have already been granted
        // If it's okay let's create a notification
        // var notification = new Notification(notify.body, {tag: notify.instanceId});
        showNotification(notify.body, notify.instanceId);
        console.log('created notification');
      }
      else if (Notification.permission !== "denied") {
      // Otherwise, we need to ask the user for permission
      console.log('ask permission for notification');
        showNotification(notify.body, notify.instanceId)
      }

    }
  }
});
