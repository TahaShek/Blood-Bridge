// src/components/FCMSetup.jsx
"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../../firebase/index.ts";
import { baseURL, firebaseTokenPublicKey } from "../../constants/index.js";
import { fcmToken } from "@/services/authApi.ts";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const FCMSetup = () => {
  const { toast } = useToast();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: firebaseTokenPublicKey as string,
          });
          console.log("FCM Token:", token);
          await fcmToken(JSON.stringify({ token }));
        }
      } catch (err) {
        console.error("FCM Error:", err);
      }
    };

    requestPermission();

    onMessage(messaging, (payload: any) => {
      console.log("Message received in foreground:", payload);

      toast({
        title: payload.notification.title,
        description: payload.notification.body,
        action: (
          <>
            <ToastAction
              altText="Accept"
              onClick={() => {
                console.log("Notification accepted");
                // Add your accept logic here
              }}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Accept
            </ToastAction>
            <ToastAction
              altText="Reject"
              onClick={() => {
                console.log("Notification rejected");
                // Add your reject logic here
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </ToastAction>
          </>
        ),
      });
    });
  }, [toast]);

  return null;
};

export default FCMSetup;
