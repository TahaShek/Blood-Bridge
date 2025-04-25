// src/components/FCMSetup.jsx
"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../../firebase/index.ts";
import { firebaseTokenPublicKey } from "../../constants/index.js";
import { fcmToken } from "@/services/authApi.ts";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import useAuth from "@/hooks/useAuth.ts";
import { acceptBloodRequest } from "@/services/bloodRequestApi.ts";

const FCMSetup = () => {
  const { toast } = useToast();
  const auth = useAuth();
  console.log(auth.user?._id);

  const handleAcceptRequest = async () => {
    console.log(auth.user?._id);
    if (!auth.user?._id) {
      toast({
        title: "Error",
        description: "You must be logged in to accept requests",
        variant: "destructive",
      });
      return;
    }

    try {
      await acceptBloodRequest(auth.user._id);
      toast({
        title: "Request Accepted",
        description: "You've successfully volunteered as a donor",
      });
    } catch (error:any) {
      toast({
        title: "Error",
        description: error.message || "Failed to accept request",
        variant: "default",
      });
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: firebaseTokenPublicKey as string,
          });
          await fcmToken(JSON.stringify({ token }));
        }
      } catch (err) {
        console.error("FCM Error:", err);
      }
    };

    requestPermission();

    onMessage(messaging, (payload: any) => {
      console.log(payload);
      toast({
        title: payload.notification.title,
        description: payload.notification.body,
        action: (
          <>
            <ToastAction
              altText="Accept"
              onClick={handleAcceptRequest}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Accept
            </ToastAction>
            <ToastAction
              altText="Reject"
              onClick={() => console.log("Request rejected")}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </ToastAction>
          </>
        ),
      });
    });
  }, [toast, auth, handleAcceptRequest]);

  return null;
};

export default FCMSetup;
