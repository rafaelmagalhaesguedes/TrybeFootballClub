import * as express from 'express';
import 'express-async-errors';
import MainRoutes from './routes';
import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;
  private mainRoutes: MainRoutes;

  constructor() {
    this.app = express();
    this.mainRoutes = new MainRoutes();

    this.config();
    this.routes();

    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(this.mainRoutes.router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
