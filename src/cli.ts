import { CRUD } from "./interfaces/crud.interface";
import { QUERY } from "./interfaces/query.interface";
import { ServicePort } from "./interfaces/service.interface";
import { Validator } from "./interfaces/validator.interface";
import { Client } from "./models/client.model";
import { Product } from "./models/product.model";
import { Sale } from "./models/sale.model";
import { ClientService } from "./services/client.service";
import { ProductService } from "./services/product.service";
import { SaleService } from "./services/sale.service";
import { JsonFileStore } from "./stores/json.store";
import { MemoryStore } from "./stores/memory.store";
import { ConsoleView } from "./ui/cli";
import { ClientValidator } from "./validators/client.validator";

/* D-I */
const persistenceClient: QUERY<Client> = new MemoryStore<Client>();
const persistenceProduct: QUERY<Product> = new MemoryStore<Product>();
const persistenceSale: CRUD<Sale> = new MemoryStore<Sale>();

const clientValidator: Validator<Client> = new ClientValidator();

const clientUse: ServicePort<Client> = new ClientService(persistenceClient, clientValidator);
const productUse: ServicePort<Product> = new ProductService(persistenceProduct);
const saleUse: ServicePort<Sale> = new SaleService(persistenceClient, persistenceProduct, persistenceSale);


/* Point Entry */
const app = new ConsoleView(clientUse, productUse, saleUse);
app.cli();
