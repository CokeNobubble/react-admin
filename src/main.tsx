import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";
import "./styles/variable.css";
import { HashRouter } from "react-router-dom";
// 引入redux
import { Provider } from "react-redux";
import store from "@/store";
// 引入uno.css
import "uno.css";

import AuthRoute from "@/components/auth/Permission";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <AuthRoute>
        <App />
      </AuthRoute>
    </HashRouter>
  </Provider>
);
