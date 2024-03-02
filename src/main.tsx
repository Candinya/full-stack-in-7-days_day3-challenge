import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.tsx";
import { Provider } from "react-redux";
import { store } from "@/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
);
