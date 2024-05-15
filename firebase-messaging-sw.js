importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')


const firebaseConfig = {
  apiKey: "AIzaSyDL3mXVkWVNHNb5BvG94M1E18_NiOgn4qQ",
  authDomain: "notifications-3e3bd.firebaseapp.com",
  projectId: "notifications-3e3bd",
  storageBucket: "notifications-3e3bd.appspot.com",
  messagingSenderId: "205309097881",
  appId: "1:205309097881:web:b314395b0beaaa740a0508",
  measurementId: "G-7E5QXN171E"
};
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()


messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            image: payload.data.image
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})
