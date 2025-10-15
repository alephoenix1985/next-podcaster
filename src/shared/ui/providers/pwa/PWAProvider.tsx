"use client";

import { useEffect } from "react";

/**
 * This provider is responsible for registering the service worker.
 * It runs only on the client side.
 */
export default function PWAProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope,
            );
          })
          .catch((err) => {
            console.log("Service Worker registration failed: ", err);
          });
      });
    }
  }, []);

  return null; // This component does not render anything.
}
