import App from './components/app/app';
import { AppModel } from './components/model/appModel';
import './style.scss';

const appState = new AppModel()

const app: App = new App();
app.start();

window.onbeforeunload = ()=>{
  appState.save();
}