import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import { WebView } from './presentation/web';
import { Router } from './presentation/web/router';
import { Bootstrap } from './config/bootstrap';
const root = document.getElementById("root");

const { clientUse, productUse, saleUse } = Bootstrap();
const router = new Router();

const app = new WebView(router, clientUse, productUse, saleUse);

root!.innerHTML = app.render();

window.addEventListener("popstate", () => {
    root!.innerHTML = app.render();
})

window.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest("a")
    if (target && target.hasAttribute("data-link")) {
        event.preventDefault();
        const path = target.getAttribute('href')!;
        window.history.pushState({}, '', path);
        root!.innerHTML = app.render();
    }
})
