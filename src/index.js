import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ChatWidget from "../src/chatWidget/ChatWidget";

window.ChatWidget = {
  init: () => {
    // Create a new div for mounting the widget
    const chatDiv = document.createElement("div");
    chatDiv.id = "chat-widget-container";
    document.body.appendChild(chatDiv);

    // Render ChatWidget inside the new div
    const root = ReactDOM.createRoot(chatDiv);
    root.render(<ChatWidget />);
  },
};
