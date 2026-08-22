import { Component } from "@/domain/interfaces/component.interface";

export class Router {
    private routes: { path: string, component: () => Component }[] = [];
    private currentPath: string = "/";

    constructor() {}

    register(path: string, component: () => Component): void {
        this.routes.push({ path, component });
    }

    navigator(path: string): Component {
        const route = this.routes.find(response => response.path === path)
        this.currentPath = path
        return route ? route.component() : { html: this.notFound() };
    }

    private notFound(): string {
        return '<div class="alert alert-danger">Página no encontrada</div>';
    }
}
