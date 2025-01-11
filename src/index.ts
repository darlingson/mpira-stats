import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from 'hono/vercel'
import { supabase } from "./utils/supabaseClient.js";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { auth } from "./routes/auth.ts";
import {team_routes} from "./routes/teams.js";
import {player_routes} from "./routes/players.js";
import {goals} from "./routes/goal_events.js";
import {matches} from "./routes/matches.js";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
// app.use("/auth/*", jwt({ secret: jwtSecret }));

app.route("/auth", auth);
app.route("/teams",team_routes);
app.route("/players",player_routes);
app.route("goals",goals);
app.route('matches',matches);
app.get("/auth/page", (c) => {
  return c.text("You are authorized");
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
export const GET = handle(app)
export const POST = handle(app)