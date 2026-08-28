import { Client } from "@/domain/entities/client.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2'

export class ClientHandler {
    constructor(
        private clientService: Service<Client>
    ) { }

    setup(): void {
        const btn_add = document.getElementById("btn-add-client");
        const modalElement = document.getElementById("staticClient");

        btn_add!.addEventListener("click", () => {
            let id_client = document.getElementById("id_client") as HTMLInputElement;
            let name_client = document.getElementById("name_client") as HTMLInputElement;
            let email_client = document.getElementById("email_client") as HTMLInputElement;
            let phone_client = document.getElementById("phone_client") as HTMLInputElement;
            let address_client = document.getElementById("address_client") as HTMLInputElement;

            try {
                this.clientService.create({
                    id: parseInt(id_client.value),
                    name: name_client.value,
                    email: email_client.value,
                    phone: phone_client.value,
                    address: address_client.value
                })

                if (modalElement) {
                    const modalInstance = Modal.getOrCreateInstance(modalElement);
                    modalInstance.hide();
                }

                id_client.value = "",
                    name_client.value = "",
                    email_client.value = "",
                    phone_client.value = "",
                    address_client.value = ""

                this.render()
            } catch (error) {
                alert(error)
            }
        })
    }

    render(): void {
        const tbody = document.getElementById("clients-tbody");
        const clients = this.clientService.read();

        if (clients.length === 0) {
            tbody!.innerHTML = `<tr class="empty-row"><td colspan="6">No hay registros.</td></tr>`;
            return;
        }

        tbody!.innerHTML = clients.map(client => `
            <tr>
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>${client.address}</td>
                <td><button type="button" class="btn btn-sm btn-danger" data-action="delete-client" data-id="${client.id}" ><i class="bi bi-trash-fill"></i></button></td>
            </tr>

        `).join("");

        tbody!.querySelectorAll<HTMLButtonElement>("[data-action='delete-client']").forEach(btn => {
            btn.addEventListener("click", () => {
                Swal.fire({
                    title: "¿Estas seguro de eliminar?",
                    text: "No podrás revertirlo!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Cliente eliminado correctamente",
                            icon: "success"
                        });
                        this.clientService.delete(parseInt(btn.dataset.id!))
                        this.render()
                    }
                });
            });
        });
    }
}
