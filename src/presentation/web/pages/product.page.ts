import { Product } from "@/domain/entities/product.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { Modal } from 'bootstrap';

export function ProductPage(productUse: Service<Product>): { html: string, init?: () => void } {
    function renderTable() {
        return productUse.read().map((product, index) => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>
                    <button type="button" class="btn-delete btn btn-sm btn-danger" data-id="${product.id}" ><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>
        `).join('');
    };

    function clearForm() {
        (document.getElementById("id") as HTMLInputElement).value = "";
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("price") as HTMLInputElement).value = "";
        (document.getElementById("description") as HTMLInputElement).value = "";
        (document.getElementById("stock") as HTMLInputElement).value = "";
    }

    function init() {
        const saveProduct = document.getElementById("saveProduct");
        const modalElement = document.getElementById("staticBackdrop");
        const tbody = document.querySelector("tbody");

        tbody?.addEventListener("click", (event) => {
            const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(".btn-delete");

            const id = Number(btn?.dataset.id)
            productUse.delete(id);

            tbody.innerHTML = renderTable();
        })

        saveProduct?.addEventListener("click", () => {
            const id = parseInt((document.getElementById("id") as HTMLInputElement).value);
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
            const description = (document.getElementById("description") as HTMLInputElement).value;
            const stock = parseInt((document.getElementById("stock") as HTMLInputElement).value);

            const client: Product = { id, name, price, description, stock };
            productUse.create(client);
            clearForm();

            if (tbody) {
                tbody.innerHTML = renderTable();
            }

            if (modalElement) {
                const modalInstance = Modal.getOrCreateInstance(modalElement);
                modalInstance.hide();
            }
        })
    }

    const html = `
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Listado de productos</h2>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                + Agregar Producto
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderTable()}
                </tbody>
            </table>
        </div>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Nuevo Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">ID</span>
                        <input type="number" class="form-control" id="id" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                        <input type="text" class="form-control" id="name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Precio</span>
                        <input type="number" class="form-control" id="price" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Descripción</span>
                        <input type="text" class="form-control" id="description" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                        <input type="number" class="form-control" id="stock" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="saveProduct">Guardar</button>
                </div>
            </div>
        </div>
        </div>
    `;

    return { html, init }
}
