// src/components/FCMSetup.jsx
import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../../firebase/index.ts";
import { firebaseTokenPublicKey } from "../../constants/index.js";

const FCMSetup = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: firebaseTokenPublicKey as string,
          });
          console.log("FCM Token:", token);

          // Save token to backend
          await fetch("http://localhost:5000/api/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
        } else {
          console.log("Permission not granted");
        }
      } catch (err) {
        console.error("FCM Error:", err);
      }
    };

    requestPermission();

    // Listen for foreground messages
    onMessage(messaging, (payload: any) => {
      console.log("Message received in foreground:", payload);
      alert(payload.notification.title + ": " + payload.notification.body);
    });
  }, []);

  return null;
};

export default FCMSetup;
