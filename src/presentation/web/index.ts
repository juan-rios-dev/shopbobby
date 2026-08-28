import { Client } from "@/domain/entities/client.entity";
import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { ClientHandler } from "./handlers/client.handler";
import { LoginHandler } from "./handlers/login.handler";
import { AuthGuard } from "./guard/auth.guard";
import "@/presentation/web/index.css"
import { ProductHandler } from "./handlers/product.handler";
import { SaleHandler } from "./handlers/sale.handler";

export class WebController {
    private clientHandler!: ClientHandler
    private productHandler!: ProductHandler
    private saleHandler!: SaleHandler
    private auth = new AuthGuard();

    constructor(
        private clientService: Service<Client>,
        private productService: Service<Product>,
        private saleService: Service<Sale>,
    ) {
        this.boot();
    }

    private boot(): void {
        if (this.auth.isAuthenticated()) {
            this.showApp();
        } else {
            this.showLogin();
        }
    }

    private init(): void {
        this.clientHandler = new ClientHandler(this.clientService);
        this.productHandler = new ProductHandler(this.productService);
        this.saleHandler = new SaleHandler(this.clientService, this.productService, this.saleService);

        this.renderProfile();
        this.setupNavigation();
        this.clientHandler.setup();
        this.clientHandler.render();
        this.productHandler.setup();
        this.productHandler.render();
        this.saleHandler.setup();
        this.saleHandler.render();
    }

    private showLogin() {
        const loginScreen = document.getElementById("login-screen");
        const appScreen = document.getElementById("app-screen");

        loginScreen!.hidden = false;
        appScreen!.hidden = true;

        new LoginHandler(this.auth, () => {
            this.showApp();
        }).setup();
    }

    private showApp() {
        const loginScreen = document.getElementById("login-screen");
        const appScreen = document.getElementById("app-screen");

        loginScreen!.hidden = true;
        appScreen!.hidden = false;

        this.init()
    }

    private renderProfile(): void {
        const user_info = document.getElementById("user_info");
        const user = this.auth.getCurrentUser();

        user_info!.innerHTML = `
            <div class="user-profile-header">
                <img src="${user.avatar}" alt="${user.username}" class="user-avatar" />
                <div class="user-details">
                    <p class="user-name">${user.username}</p>
                    <small class="user-email">${user.email}</small>
                </div>
                <button type="button" id="logout" class="btn-logout" aria-label="Cerrar sesión">
                    <i class="bi bi-box-arrow-right"></i>
                </button>
            </div>
        `;

        const logout = document.getElementById("logout");
        logout?.addEventListener("click", () => {
            this.auth.logout();
            location.reload();
        });
    }

    private setupNavigation(): void {
        document
            .querySelectorAll<HTMLButtonElement>(".nav-item")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    document
                        .querySelectorAll<HTMLElement>(".section")
                        .forEach((s) => {
                            s.hidden = !s.id.endsWith(btn.dataset.section!);
                        });
                    document
                        .querySelectorAll(".nav-item")
                        .forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                });
            });
    }
}
