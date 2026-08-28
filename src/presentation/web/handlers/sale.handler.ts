import { Client } from "@/domain/entities/client.entity";
import { Product } from "@/domain/entities/product.entity";
import { Sale, SaleItem } from "@/domain/entities/sale.entity";
import { Service } from "@/domain/interfaces/service.interface";

export class SaleHandler {
    private selectedProducts: Product[] = [];
    private items: SaleItem[] = [];

    constructor(
        private clientService: Service<Client>,
        private productService: Service<Product>,
        private saleService: Service<Sale>,
    ) { }

    setup(): void {
        const nav_sale = document.getElementById("nav-sales");
        const add_product = document.getElementById("add_product");
        const btn_save = document.getElementById("btn_save");

        nav_sale?.addEventListener("click", () => {
            this.render()
        })

        add_product?.addEventListener("click", () => {
            const selectProduct = document.getElementById("selectProduct") as HTMLSelectElement;
            const selectClient = document.getElementById("selectClient") as HTMLSelectElement;
            const productId = selectProduct.value;

            const client = this.clientService.read().find(client => client.id === parseInt(selectClient.value));

            const product = this.productService.read().find(product => product.id === parseInt(productId));

            if (product) {
                const existing = this.selectedProducts.find(item => item.id === product.id);

                if (existing) {
                    existing.stock++;
                } else {
                    this.selectedProducts.push({ ...product, stock: 1 });
                }
            }

            this.render()

            selectProduct.value = ""
            selectClient.value = client?.id.toString() || "";
            this.calculaTotal();
        })

        btn_save!.addEventListener("click", () => {
            const selectClient = document.getElementById("selectClient") as HTMLSelectElement;
            const clientId = selectClient.value;

            const client = this.clientService.read().find(client => client.id === parseInt(clientId));

            this.items = []

            this.selectedProducts.map(item => {
                this.items.push({
                    id: this.items.length,
                    sale_id: "",
                    product_id: item.id,
                    quantity: parseInt((document.getElementById("stock_" + item.id) as HTMLInputElement).value || "0")
                })
            })

            const sale: Sale = {
                id: "",
                client_id: client?.id || 0,
                date: new Date().toISOString(),
                items: this.items,
                total: 0
            }

            try {
                this.saleService.create(sale);
                this.selectedProducts = [];
                this.items = []
                this.render();
                this.calculaTotal();
            } catch (error) {
                alert(error)
            }
        });
    }

    render(): void {
        const selectClient = document.getElementById("selectClient") as HTMLSelectElement
        const selectProduct = document.getElementById("selectProduct") as HTMLSelectElement
        const tbody_products = document.getElementById("tablaProductos") as HTMLTableSectionElement;
        const tbody_sales = document.getElementById("sales-tbody") as HTMLTableSectionElement;

        selectClient.innerHTML = `<option value="" selected disabled>Seleccionar cliente</option>` +
            this.clientService.read().map(client => `<option value="${client.id}">${client.name}</option>`).join("");

        selectProduct.innerHTML = `<option value="" selected disabled>Seleccionar producto</option>` +
            this.productService.read().map(product => `<option value="${product.id}">${product.name}</option>`).join("");

        tbody_products!.innerHTML = this.selectedProducts.map(product => {
            const currentValue = (document.getElementById("stock_" + product.id) as HTMLInputElement)?.value || product.stock;
            return `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><input type="number" class="form-control form-control-sm" min="1" style="width: 80px;" value="${currentValue}" id="stock_${product.id}" /></td>
                <td><button type="button" class="btn btn-sm btn-danger" data-action="del-product" data-id="${product.id}" ><i class="bi bi-trash"></i></button></td>
            </tr>
        `}).join("");

        tbody_products!.querySelectorAll<HTMLButtonElement>("[data-action='del-product']").forEach(btn => {
            btn.addEventListener("click", () => {
                const ok = confirm("¿Estás seguro de quitar este producto?")

                if (ok) {
                    const product = this.selectedProducts.find(item => item.id === parseInt(btn.dataset.id!));
                    this.selectedProducts.splice(this.selectedProducts.indexOf(product!), 1);
                    this.render()
                    this.calculaTotal()
                }
            });
        });

        tbody_sales!.innerHTML = this.saleService.read().map(sale => `
            <tr>
                <td>${sale.id}</td>
                <td>${this.clientService.read().find(client => client.id === sale.client_id)?.name || ""}</td>
                <td>${sale.date}</td>
                <td>${sale.total}</td>
                <td><button type="button" class="btn btn-sm btn-danger" data-action="delete-sale" data-id="${sale.id}" ><i class="bi bi-trash"></i></button></td>
            </tr>

        `).join("");

        this.selectedProducts.map(product => {
            const stock = document.getElementById("stock_" + product.id) as HTMLInputElement;
            stock.addEventListener("change", () => {
                this.calculaTotal();
            })
        })

        tbody_sales!.querySelectorAll<HTMLButtonElement>("[data-action='delete-sale']").forEach(btn => {
            btn.addEventListener("click", () => {
                const ok = confirm("¿Estás seguro de eliminar esta venta?")

                if (ok) {
                    this.saleService.delete(btn.dataset.id!)
                    this.render()
                }
            });
        });
    }

    private calculaTotal() {
        const total_sale = document.getElementById("total_sale");

        let total = this.selectedProducts.reduce((acc, item) => {
            return acc + item.price * (document.getElementById("stock_" + item.id) as HTMLInputElement).valueAsNumber;
        }, 0)

        total_sale!.innerHTML = total.toString();
    }
}
