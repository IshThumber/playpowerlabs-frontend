import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { LINK, API_KEY } from "./Secretes.js";
// import.meta.env.MODE  

const supabase = createClient(
  LINK, API_KEY
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
