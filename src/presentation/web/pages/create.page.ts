import { Client } from "@/domain/entities/client.entity"
import { Product } from "@/domain/entities/product.entity"
import { Sale } from "@/domain/entities/sale.entity"
import { Component } from "@/domain/interfaces/component.interface"
import { Service } from "@/domain/interfaces/service.interface"

export function CreateSalePage(clientUse: Service<Client>, productUse: Service<Product>, saleUse: Service<Sale>): Component {
    function init() {

    }

    const html = `
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Registrar venta</h2>

            <a href="/sales" data-link class="btn btn-secondary">
                <i class="bi bi-arrow-left"></i>
                Volver
            </a>
        </div>

        <div class="card">
            <div class="card-body">

                <!-- Cliente -->
                <div class="row mb-4">
                    <div class="col-md-6">

                        <label
                            for="sale-client"
                            class="form-label"
                        >
                            Cliente
                        </label>

                        <select
                            id="sale-client"
                            class="form-select"
                        >
                            <option value="">
                                Seleccionar cliente...
                            </option>
                            ${clientUse.read().map(client => `
                                <option value="${client.id}">
                                    ${client.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </div>

                <!-- Agregar producto -->
                <div class="row align-items-end g-3 mb-4">

                    <div class="col-md-8">

                        <label
                            for="sale-product"
                            class="form-label"
                        >
                            Producto
                        </label>

                        <select
                            id="sale-product"
                            class="form-select"
                        >
                            <option value="">
                                Seleccionar producto...
                            </option>
                            ${productUse.read().map(product => `
                                <option value="${product.id}">
                                    ${product.name}
                                </option>
                            `)}
                        </select>

                    </div>

                    <div class="col-md-4">

                        <button
                            type="button"
                            id="btn-add-product"
                            class="btn btn-primary w-100"
                        >
                            <i class="bi bi-plus-lg"></i>
                            Agregar producto
                        </button>

                    </div>

                </div>

                <!-- Items -->
                <div class="table-responsive">

                    <table class="table table-striped align-middle">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody id="sale-items">

                        </tbody>

                    </table>

                </div>

                <!-- Total -->
                <div class="d-flex justify-content-end mt-4">

                    <div class="text-end">

                        <div class="text-muted">
                            Total
                        </div>

                        <div
                            id="sale-total"
                            class="fs-3 fw-bold"
                        >
                            $0.00
                        </div>

                    </div>

                </div>

                <hr>

                <!-- Acciones -->
                <div class="d-flex justify-content-end gap-2">

                    <a
                        href="/sales"
                        data-link
                        class="btn btn-secondary"
                    >
                        Cancelar
                    </a>

                    <button
                        type="button"
                        id="btn-save-sale"
                        class="btn btn-success"
                    >
                        <i class="bi bi-check-lg"></i>
                        Guardar venta
                    </button>

                </div>

            </div>
        </div>
    `

    return {
        html,
        init
    }
}
