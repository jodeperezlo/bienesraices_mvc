import { Router } from 'express';

import config from '../../../config/config.js';

// Import Routes
import usersRoutes from './users.routes.js';

const routerAPI = (app) => {
  const router = Router();

  const api = config.APP_URL;

  app.use(api, router);

  // Routes
  router.use('/auth', usersRoutes);

  // Return Router
  return router;
};

export default routerAPI;
