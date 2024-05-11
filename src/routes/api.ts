import { Request, Response, Router } from 'express';
import game_result_summaries from "../../game_result_summaries.json";
export const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
  res.json(game_result_summaries);
});

//return all games from a specific date
apiRoutes.get("/results/date/", (req: Request, res: Response) => {
  const date = req.query.date as string | undefined;
  const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }
  if (!dateFormatPattern.test(date)){
    return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
  }

  const results = game_result_summaries.filter((game) => {
    return game.startTime.includes(date);
  });

  res.json(results);
});