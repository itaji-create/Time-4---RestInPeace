import express, { Request, Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from '../database/data-source';
import routes from './routes';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use(routes);
app.use(cors);

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

export default app;
