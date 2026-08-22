import { Client } from "@/domain/entities/client.entity";
import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { Component } from "@/domain/interfaces/component.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Modal } from 'bootstrap';

export function SalePage(saleUse: Service<Sale>): Component {
    function renderTable() {
        return saleUse.read().map((sale, index) => `
            <tr>
                <td>${sale.id}</td>
                <td>${sale.client_id}</td>
                <td>${sale.date}</td>
                <td>${sale.items}</td>
                <td>${sale.total}</td>
                <td>
                    <button type="button" class="btn-delete btn btn-sm btn-danger" data-id="${sale.id}" ><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>
        `).join('');
    };

    function init() {
        const tbody = document.querySelector("tbody");

        tbody?.addEventListener("click", (event) => {
            const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(".btn-delete");

            const id = Number(btn?.dataset.id)
            saleUse.delete(id);

            tbody.innerHTML = renderTable();
        })
    }

    const html = `
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Listado de ventas</h2>
            <a href="/create/sale" data-link class="btn btn-primary">
                + Agregar Venta
            </a>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Items</th>
                    <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderTable()}
                </tbody>
            </table>
        </div>
    `;

    return { html, init }
}
