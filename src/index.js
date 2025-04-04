import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "../src/chatWidget/ChatWidget";

window.ChatWidget = {
  init: () => {
    if (document.getElementById("chat-widget-container")) return; // Prevent multiple instances

    // Create a new div to mount the widget
    const chatDiv = document.createElement("div");
    chatDiv.id = "chat-widget-container";
    document.body.appendChild(chatDiv);

    // Mount ChatWidget
    const root = ReactDOM.createRoot(chatDiv);
    root.render(
      <React.StrictMode>
        <ChatWidget />
      </React.StrictMode>
    );
  },
};

// Automatically initialize if the script is loaded in the browser
if (document.readyState === "complete") {
  window.ChatWidget.init();
} else {
  window.addEventListener("load", window.ChatWidget.init);
}
