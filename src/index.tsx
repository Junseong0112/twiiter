import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { FirebaseApi, FirebaseContext } from "./Firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={new FirebaseApi()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>
);
