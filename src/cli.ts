import { CRUD } from "@/domain/interfaces/crud.interface";
import { QUERY } from "@/domain/interfaces/query.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";
import { ConsoleView } from "@/presentation/cli";
import { ClientValidator } from "@/application/validators/client.validator";
import { ClientService } from "@/application/services/client.service";
import { ProductService } from "@/application/services/product.service";
import { SaleService } from "@/application/services/sale.service";
import { ProductValidator } from "@/application/validators/product.validator";
import { SaleValidator } from "@/application/validators/sale.validator";
import { Client } from "./domain/entities/client.model";
import { Product } from "./domain/entities/product.model";
import { Sale } from "./domain/entities/sale.model";
import { MemoryStore } from "./infrastructure/repositories/memory.repository";

/* D-I */
const persistenceClient: QUERY<Client> = new MemoryStore<Client>();
const persistenceProduct: QUERY<Product> = new MemoryStore<Product>();
const persistenceSale: CRUD<Sale> = new MemoryStore<Sale>();

const clientValidator: Validator<Client> = new ClientValidator();
const productValidator: Validator<Product> = new ProductValidator();
const saleValidator: Validator<Sale> = new SaleValidator(persistenceClient, persistenceProduct);

const clientUse: Service<Client> = new ClientService(persistenceClient, clientValidator);
const productUse: Service<Product> = new ProductService(persistenceProduct, productValidator);
const saleUse: Service<Sale> = new SaleService(persistenceSale, saleValidator);


/* Point Entry */
const app = new ConsoleView(clientUse, productUse, saleUse);
app.cli();
