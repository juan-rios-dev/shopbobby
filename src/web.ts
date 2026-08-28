import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import { Bootstrap } from './config/bootstrap';
import { WebController } from './presentation/web';

const { clientUse, productUse, saleUse } = Bootstrap();

new WebController(clientUse, productUse, saleUse);
