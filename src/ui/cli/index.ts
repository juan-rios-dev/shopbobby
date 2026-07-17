import prompts from 'prompts';
import { Client } from '../../models/client.model';
import { Product } from '../../models/product.model';
import { Sale } from '../../models/sale.model';
import { ServicePort } from '../../interfaces/service.interface';

export class ConsoleView {

    constructor(
        private clientUse: ServicePort<Client>,
        private productUse: ServicePort<Product>,
        private saleUse: ServicePort<Sale>,
    ) { }

    async cli(): Promise<void> {
        let salir = false;

        while (!salir) {
            console.log(" -- -- - - - - - -- --");
            console.log("- Tienda de Bobby -");
            console.log(" -- -- - - - - - -- --");
            console.log("1. Registrar Cliente");
            console.log("2. Registrar Producto");
            console.log("3. Registrar Venta");
            console.log("0. Salir");
            console.log("");

            const { option } = await prompts({
                type: "text",
                name: "option",
                message: "Selecciona una opción",
            });

            salir = await this.processOption(option);
        }
    }

    async processOption(option: string): Promise<boolean> {
        switch (option) {
            case "1":
                await this.crearCliente();
                return false;
            case "2":
                await this.crearProducto();
                return false;
            case "3":
                await this.crearVenta();
                return false;
            case "0":
                console.log("Saliendo...");
                return true;
            default:
                console.log("Opción inválida");
                return false;
        }
    }

    async crearCliente(): Promise<void> {
        const respuestas = await prompts([
            { type: "number", name: "id", message: "Ingresa ID del cliente" },
            { type: "text", name: "name", message: "Ingresa NOMBRE del cliente" },
            { type: "text", name: "email", message: "Ingresa EMAIL del cliente" },
            { type: "text", name: "phone", message: "Ingresa TELÉFONO del cliente" },
            { type: "text", name: "address", message: "Ingresa DIRECCIÓN del cliente" },
        ]);

        const client: Client = {
            id: respuestas.id,
            name: respuestas.name,
            email: respuestas.email,
            phone: respuestas.phone,
            address: respuestas.address,
        };
        try {
            this.clientUse.create(client);
            console.log("Cliente creado con éxito");
            console.table(this.clientUse.read());
        } catch (error) {
            if (error instanceof Error){
                console.log(error.message)
            }
        }
    }

    async crearProducto(): Promise<void> {
        const respuestas = await prompts([
            { type: "number", name: "id", message: "Ingresa ID del producto" },
            { type: "text", name: "name", message: "Ingresa NOMBRE del producto" },
            { type: "number", name: "price", message: "Ingresa PRECIO del producto" },
            { type: "text", name: "description", message: "Ingresa DESCRIPCIÓN del producto" },
            { type: "number", name: "stock", message: "Ingresa CANTIDAD del producto" },
        ]);

        const product: Product = {
            id: respuestas.id,
            name: respuestas.name,
            price: respuestas.price,
            description: respuestas.description,
            stock: respuestas.stock,
        };

        this.productUse.create(product);
        console.log("Producto creado con éxito");
        console.table(this.productUse.read());
    }

    async crearVenta(): Promise<void> {
        const respuestas = await prompts([
            { type: "number", name: "id", message: "Ingresa ID de la venta" },
            { type: "number", name: "client_id", message: "Ingresa ID del cliente" },
            { type: "number", name: "product_id", message: "Ingresa ID del producto" },
            { type: "number", name: "quantity", message: "Ingresa CANTIDAD del producto" },
        ]);

        const sale: Sale = {
            id: respuestas.id,
            client_id: respuestas.client_id,
            date: new Date().toISOString(),
            items: [
                {
                    id: 0,
                    sale_id: respuestas.id,
                    product_id: respuestas.product_id,
                    quantity: respuestas.quantity,
                    price: 0,
                },
            ],
        };

        const response = this.saleUse.create(sale);
        console.log(response);
        console.table(this.saleUse.read());
    }
}
