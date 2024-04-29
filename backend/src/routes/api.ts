import { Router } from 'express';
import game_result_summaries from "../../../game_result_summaries.json";
export const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
  res.json(game_result_summaries);
});