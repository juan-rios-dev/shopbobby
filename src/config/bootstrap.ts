import { ClientValidator } from "@/application/validators/client.validator";
import { ClientService } from "@/application/services/client.service";
import { ProductService } from "@/application/services/product.service";
import { SaleService } from "@/application/services/sale.service";
import { ProductValidator } from "@/application/validators/product.validator";
import { SaleValidator } from "@/application/validators/sale.validator";
import { Client } from "@/domain/entities/client.entity";
import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { MemoryStore } from "@/infrastructure/repositories/memory.repository";
import { QUERY } from "@/domain/interfaces/query.interface";
import { Validator } from "@/domain/interfaces/validator.interface";
import { CRUD } from "@/domain/interfaces/crud.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { GeneratorId } from "@/domain/interfaces/generator-id.interface";
import { CryptoGenerator } from "@/infrastructure/generators/crypto.generator";
import { ICalculator } from "@/domain/interfaces/calculator.interface";
import { CalculatorTotal } from "@/application/implementations/calculator.implement";

export function Bootstrap() {
    const persistenceClient: QUERY<Client> = new MemoryStore<Client>();
    const persistenceProduct: QUERY<Product> = new MemoryStore<Product>();
    const persistenceSale: CRUD<Sale> = new MemoryStore<Sale>();

    const clientValidator: Validator<Client> = new ClientValidator();
    const productValidator: Validator<Product> = new ProductValidator();
    const saleValidator: Validator<Sale> = new SaleValidator(persistenceClient, persistenceProduct);

    const generate: GeneratorId = new CryptoGenerator();
    const calculatorTotal: ICalculator<Sale> = new CalculatorTotal();

    const clientUse: Service<Client> = new ClientService(persistenceClient, clientValidator);
    const productUse: Service<Product> = new ProductService(persistenceProduct, productValidator);
    const saleUse: Service<Sale> = new SaleService(persistenceSale, persistenceProduct, saleValidator, generate, calculatorTotal);

    return { clientUse, productUse, saleUse }
}
