import { LayoutComponent } from "./components/layout.component";
import { ClientPage } from "./pages/client.page";
import { HomePage } from "./pages/home.page";
import { Router } from "./router";
import "@/presentation/web/styles.css"
import { Client } from "@/domain/entities/client.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { ProductPage } from "./pages/product.page";
import { Product } from "@/domain/entities/product.entity";
import { SalePage } from "./pages/sale.page";
import { Sale } from "@/domain/entities/sale.entity";
import { CreateSalePage } from "./pages/create.page";

export class WebView {

    constructor(
        private router: Router,
        private clientUse: Service<Client>,
        private productUse: Service<Product>,
        private saleUse: Service<Sale>
    ) {
        this.registerRouter()
    }

    private registerRouter() {
        this.router.register("/", () => LayoutComponent(HomePage()));
        this.router.register("/clients", () => LayoutComponent(ClientPage(this.clientUse)));
        this.router.register("/products", () => LayoutComponent(ProductPage(this.productUse)));
        this.router.register("/sales", () => LayoutComponent(SalePage(this.saleUse)));
        this.router.register("/create/sale", () => LayoutComponent(CreateSalePage(this.clientUse, this.productUse, this.saleUse)));
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
