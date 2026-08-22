import { Component } from "@/domain/interfaces/component.interface";

export function SideBarComponent(): Component {
    function init() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll<HTMLAnchorElement>(
            '#sidebarMenu a[data-link]'
        );

        links.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;

            link.classList.toggle("active", linkPath === currentPath);
        });
    }

    const html = `
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" data-link href="/">
                            <i class="bi bi-house-door"></i>
                            Inicio
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-link href="/clients">
                            <i class="bi bi-people"></i>
                            Clientes
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-link href="/products">
                            <i class="bi bi-boxes"></i>
                            Productos
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-link href="/sales">
                            <i class="bi bi-receipt"></i>
                            Ventas
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `;

    return {
        html,
        init
    };
}
