import App from "./components/app/app";
import { AppState } from "./components/model/appState";
import "./style.scss";

const appState = new AppState();

const app: App = new App(appState);
app.start();

window.onbeforeunload = () => {
  appState.save();
};
