import Express from 'express';
import { router } from './Router';
import { sys } from 'typescript';
import 'dotenv/config';
import { initializeDb } from './libs/db';

const app = Express();
const app_port = process.env.APP_PORT;

app.use(Express.json());
initializeDb();
app.use(router);
app.listen(app_port, (err) => {
    if (err) sys.exit(1);
    console.log(`server started. port: ${app_port}`);
});
