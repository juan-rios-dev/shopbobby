import { SideBarComponent } from "./sidebar.component";
import { TopBarComponent } from "./topbar.component";

export function LayoutComponent(content: { html: string, init?: () => void }) {
    const topbar = TopBarComponent()
    const sidebar = SideBarComponent()
    return {
        html: `
            <div>
                <header>${topbar}</header>
                <div class="container-fluid">
                    <div class="row">
                        ${sidebar}
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            ${content.html}
                        </main>
                    </div>
                </div>
            </div>
        `,
        init: content.init
    };
}
