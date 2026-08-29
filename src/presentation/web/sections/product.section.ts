import { Product } from "@/domain/entities/product.entity";
import { Service } from "@/domain/interfaces/service.interface";
import { Modal } from "bootstrap";

export class ProductSection {
    constructor(
        private productService: Service<Product>
    ) { }

    setup(): void {
        const btn_add = document.getElementById("btn-add-product");
        const modalElement = document.getElementById("staticProduct");

        btn_add!.addEventListener("click", () => {
            let id = document.getElementById("id_product") as HTMLInputElement;
            let name = document.getElementById("name_product") as HTMLInputElement;
            let price = document.getElementById("price_product") as HTMLInputElement;
            let description = document.getElementById("description_product") as HTMLInputElement;
            let stock = document.getElementById("stock_product") as HTMLInputElement;

            try {
                this.productService.create({
                    id: parseInt(id.value),
                    name: name.value,
                    price: parseInt(price.value),
                    description: description.value,
                    stock: parseInt(stock.value)
                })

                if (modalElement) {
                    const modalInstance = Modal.getOrCreateInstance(modalElement);
                    modalInstance.hide();
                }

                id.value = "",
                    name.value = "",
                    price.value = "",
                    description.value = "",
                    stock.value = ""

                this.render()
            } catch (error) {
                alert(error)
            }
        })
    }

    render(): void {
        const tbody = document.getElementById("products-tbody");
        const products = this.productService.read();

        if (products.length === 0) {
            tbody!.innerHTML = `<tr class="empty-row"><td colspan="6">No hay registros.</td></tr>`;
            return;
        }

        tbody!.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td><button type="button" data-action="delete-product" data-id="${product.id}" >Delete</button></td>
            </tr>

        `).join("");

        tbody!.querySelectorAll<HTMLButtonElement>("[data-action='delete-product']").forEach(btn => {
            btn.addEventListener("click", () => {
                const ok = confirm("¿Estás seguro de eliminar este producto?")

                if (ok) {
                    this.productService.delete(parseInt(btn.dataset.id!))
                    this.render()
                }
            });
        });
    }
}
