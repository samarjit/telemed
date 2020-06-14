/* eslint-env browser */

navigator.serviceWorker.register('./sw.js')
.then(function (swReg) {
  console.log('Service Worker is registered', swReg);

  const swRegistration = swReg;
  window.registration = swReg;
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      const isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.', JSON.stringify(subscription));
        
      } else {
        console.log('User is NOT subscribed.');
      } 
    });

})
.catch(function (error) {
  console.error('Service Worker Error', error);
});
