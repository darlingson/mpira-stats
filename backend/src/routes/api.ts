import { Router } from 'express';

export const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
  res.send("What's up doc ?!");
});