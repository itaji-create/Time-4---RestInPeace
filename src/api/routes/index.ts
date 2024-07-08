import { Router } from 'express';
import sessionRoutes from './sessionRoutes'
//import movieRouter from './movieRoutes';

const routes = Router();

//routes.use('/api/v1/', movieRouter);
routes.use('/api/v1/', sessionRoutes)

export default routes;
