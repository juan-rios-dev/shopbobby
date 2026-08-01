import { Bootstrap } from "./config/bootstrap";
import { ConsoleView } from "./presentation/cli";

const { clientUse, productUse, saleUse } = Bootstrap();

/* Point Entry */
const app = new ConsoleView(clientUse, productUse, saleUse);
app.cli();
