import { config } from 'dotenv';
import express, { Application } from 'express';
import { connectionDB } from './infra/database';
import { errorMiddleware } from './middlewares/error.middleware';
import { EventRoutes } from './routes/event.routes';

export class App {
    public app: Application;
    private eventRoutes = new EventRoutes();
    
    constructor() {
        this.app = express();
        this.moddlewareInitialize();
        this.initRouter();
        this.interceptors();
        config();
        connectionDB();
    }

    moddlewareInitialize() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    interceptors() {
        this.app.use(errorMiddleware);
    }

    initRouter() {
        this.app.use('/events', this.eventRoutes.router);
    }

    listen() {
        const port = process.env.PORT || 3041;
        this.app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`)
        });
    }
}