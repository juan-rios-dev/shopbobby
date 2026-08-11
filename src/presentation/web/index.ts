import { LayoutComponent } from "./components/layout.component";
import { ClientPage } from "./pages/client.page";
import { HomePage } from "./pages/home.page";
import { Router } from "./router";
import "@/presentation/web/styles.css"
import { Client } from "@/domain/entities/client.entity";
import { Service } from "@/domain/interfaces/service.interface";

export class WebView {

    constructor(
        private router: Router,
        private clientUse: Service<Client>
    ) {
        this.registerRouter()
    }

    private registerRouter() {
        this.router.register("/", LayoutComponent(HomePage()));
        this.router.register("/clients", LayoutComponent(ClientPage(this.clientUse)));
    }

    render(): string {
        const currentPath = window.location.pathname;
        const route = this.router.navigator(currentPath);
        
        if (route.init) {
            setTimeout(() => route.init?.(), 0);
        }

        return route.html;
    }
}
