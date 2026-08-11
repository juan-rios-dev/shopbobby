export class Router {
    private routes: { path: string, component: {html: string, init?: () => void} }[] = [];
    private currentPath: string = "/";

    constructor() {}

    register(path: string, component: {html: string, init?: () => void}): void {
        this.routes.push({ path, component });
    }

    navigator(path: string): {html: string, init?: () => void} {
        const route = this.routes.find(response => response.path === path)
        this.currentPath = path
        return route ? route.component : { html: this.notFound() };
    }

    private notFound(): string {
        return '<div class="alert alert-danger">Página no encontrada</div>';
    }
}
