import { Service } from '@/domain/interfaces/service.interface';
import { Client } from '@/infrastructure/models/client.model';
import { Product } from '@/infrastructure/models/product.model';
import { Sale, SaleItem } from '@/infrastructure/models/sale.model';
import prompts from 'prompts';

export class ConsoleView {

    constructor(
        private clientUse: Service<Client>,
        private productUse: Service<Product>,
        private saleUse: Service<Sale>,
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
            if (error instanceof Error) {
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

        try {
            this.productUse.create(product);
            console.log("Producto creado con éxito");
            console.table(this.productUse.read());
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    async crearVenta(): Promise<void> {
        const client = await prompts([
            { type: "number", name: "id", message: "Ingresa ID del cliente" },
        ]);

        const uuid = Date.now();
        const items: SaleItem[] = [];
        let seguir = true;

        while (seguir) {
            const respuestas = await prompts([
                {
                    type: "number",
                    name: "product_id",
                    message: "Ingresa ID del producto"
                },
                {
                    type: "number",
                    name: "quantity",
                    message: "Ingresa CANTIDAD del producto"
                },
                {
                    type: "text",
                    name: "continuar",
                    message: "¿Agregar otro producto? (s/n)",
                    validate: (value) => /^[sn]$/i.test(value) || "Solo ingresa 's' o 'n'"
                }
            ])

            items.push({
                id: items.length,
                sale_id: uuid,
                product_id: respuestas.product_id,
                quantity: respuestas.quantity,
            })

            if (respuestas.continuar.toLowerCase() === "n") {
                seguir = false;
            }
        }

        const sale: Sale = {
            id: uuid,
            client_id: client.id,
            date: new Date().toISOString(),
            items: items,
        };

        try {
            this.saleUse.create(sale);
            console.log("Venta realizada con exito");
            console.table(this.saleUse.read());
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
}
