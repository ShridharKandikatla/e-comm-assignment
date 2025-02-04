// components/GoogleSignIn.js
import React, { useEffect } from "react";

export const GoogleSignIn = ({ onLogin }) => {
  const buttonRef = React.useRef(null);

  useEffect(() => {
    // Load the Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google API once the script is loaded
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: onLogin,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
        });
      }
    };

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [onLogin]);

  return <div ref={buttonRef} />;
};
