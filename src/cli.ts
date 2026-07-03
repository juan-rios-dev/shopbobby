import scanf from "scanf";
import { MemoryStore } from './stores/memory.store';
import { Client } from './models/client.model';
import { Product } from './models/product.model';
import { clientService } from './services/client.service';
import { Sale } from './models/sale.model';
import { productService } from './services/product.service';
import { SaleService } from './services/sale.service';

const memoryClient = new MemoryStore<Client>();
const memoryProduct = new MemoryStore<Product>();
const memorySale = new MemoryStore<Sale>();
const clientUse = new clientService(memoryClient);
const productUse = new productService(memoryProduct);
const saleUse = new SaleService(memoryClient, memoryProduct, memorySale);

(function menuApplication(): void {
    while (true) {
        console.log(" -- -- - - - - - -- --");
        console.log("- Tienda de Bobby -");
        console.log(" -- -- - - - - - -- --");
        console.log("1. Registrar Cliente");
        console.log("2. Registrar Producto");
        console.log("3. Registrar Venta");
        console.log("0. Salir");
        console.log("");

        const option = scanf("%s");

        processOption(option);
    }
})();

function processOption(option: string): void {
    switch (option) {
        case "1":
            crearCliente();
            break;
        case "2":
            crearProducto();
            break;
        case "3":
            crearVenta();
            break;
        case "0":
            console.log("Saliendo...");
            process.exit(0);
        default:
            console.log("Opción inválida");
    }
}

function crearCliente() {
    console.log("Ingresa ID del cliente");
    const id = scanf("%d");
    console.log("Ingresa NOMBRE del cliente");
    const name = scanf("%S");
    console.log("Ingresa EMAIL del cliente");
    const email = scanf("%S");
    console.log("Ingresa TELÉFONO del cliente");
    const phone = scanf("%S");
    console.log("Ingresa DIRECCIÓN del cliente");
    const address = scanf("%S");

    const client: Client = {
        id,
        name,
        email,
        phone,
        address,
    };

    clientUse.createClient(client);
}

function crearProducto() {
    console.log("Ingresa ID del producto");
    const id = scanf("%d");
    console.log("Ingresa NOMBRE del producto");
    const name = scanf("%S");
    console.log("Ingresa PRECIO del producto");
    const price = scanf("%d");
    console.log("Ingresa DESCRIPCIÓN del producto");
    const description = scanf("%S");
    console.log("Ingresa CANTIDAD del producto");
    const stock = scanf("%d");

    const product: Product = {
        id,
        name,
        price,
        description,
        stock,
    };

    productUse.createProduct(product);
}

function crearVenta() {
    console.log("Ingresa ID de la venta");
    const id = scanf("%d");
    console.log("Ingresa ID del cliente");
    const client_id = scanf("%d");
    console.log("Ingresa ID del producto");
    const product_id = scanf("%d");
    console.log("Ingresa CANTIDAD del producto");
    const quantity = scanf("%d");

    const sale: Sale = {
        id,
        client_id,
        date: new Date().toISOString(),
        items: [
            {
                id: 0,
                sale_id: id,
                product_id,
                quantity,
                price: 0,
            },
        ],
    };

    const response = saleUse.createSale(sale);

    if (response.status) {
        console.log(response.message);
    } else {
        console.log(response.message);
    }
}