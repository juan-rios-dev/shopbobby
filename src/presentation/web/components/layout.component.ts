import { Component } from "@/domain/interfaces/component.interface";
import { SideBarComponent } from "./sidebar.component";
import { TopBarComponent } from "./topbar.component";

export function LayoutComponent(content: Component) {
    const topbar = TopBarComponent()
    const sidebar = SideBarComponent()
    return {
        html: `
            <div>
                <header>${topbar}</header>
                <div class="container-fluid">
                    <div class="row">
                        ${sidebar.html}
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            ${content.html}
                        </main>
                    </div>
                </div>
            </div>
        `,
        init: () => {
            sidebar.init?.()
            content.init?.()
        }
    };
}
