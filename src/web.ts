import 'bootstrap/dist/css/bootstrap.min.css';
import { WebView } from './ui/web';
const root = document.getElementById("root");

const app = new WebView();

if(root) {
    root.innerHTML = app.render();
}
