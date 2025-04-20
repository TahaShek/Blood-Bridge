importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDhfx6-jBFh2ImOC2PM8hSdMFjv3zoU4BE",
  authDomain: "blood-bridge-17473.firebaseapp.com",
  projectId: "blood-bridge-17473",
  storageBucket: "blood-bridge-17473.firebasestorage.app",
  messagingSenderId: "741490935965",
  appId: "1:741490935965:web:5a74525ce68bfb6521ec74"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png", // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
