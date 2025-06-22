import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FloatingChatWidget from "./components/AI/FloatingChat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
      <FloatingChatWidget />
  </React.StrictMode>
);
