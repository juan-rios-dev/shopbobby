import { Client } from "@/domain/entities/client.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { Modal } from 'bootstrap';

export function ClientPage(clientUse: Service<Client>): { html: string, init?: () => void } {
    function renderTable() {
        return clientUse.read().map((client, index) => `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>${client.address}</td>
            </tr>
        `).join('');
    };

    function clearForm() {
        (document.getElementById("id") as HTMLInputElement).value = "";
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("phone") as HTMLInputElement).value = "";
        (document.getElementById("address") as HTMLInputElement).value = "";
    }

    function init() {
        const saveClient = document.getElementById("saveClient");
        const modalElement = document.getElementById("staticBackdrop");
        const tbody = document.querySelector("tbody");

        saveClient?.addEventListener("click", () => {
            const id = parseInt((document.getElementById("id") as HTMLInputElement).value);
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const phone = (document.getElementById("phone") as HTMLInputElement).value;
            const address = (document.getElementById("address") as HTMLInputElement).value;

            const client: Client = { id, name, email, phone, address };
            clientUse.create(client);
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
        <h2>Clients List</h2>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderTable()}
                </tbody>
            </table>
        </div>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Aggregate Client
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Form Client</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">ID</span>
                        <input type="number" class="form-control" id="id" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                        <input type="text" class="form-control" id="name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input type="text" class="form-control" id="email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Phone</span>
                        <input type="text" class="form-control" id="phone" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Address</span>
                        <input type="text" class="form-control" id="address" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveClient">Save</button>
                </div>
            </div>
        </div>
        </div>
    `;

    return { html, init }
}
