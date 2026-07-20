import 'bootstrap/dist/css/bootstrap.min.css';
import { WebView } from './presentation/web';
const root = document.getElementById("root");

const app = new WebView();

if(root) {
    root.innerHTML = app.render();
}
