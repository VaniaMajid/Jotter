import ReactDOM from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "Redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#D392EE",
        colorText: "#333333",
        colorPrimaryBg: "#fdf8ff",
      },
    }}
    >
      <App />
    </ConfigProvider>
  </Provider>,

);
