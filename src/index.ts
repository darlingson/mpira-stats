import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { supabase } from "./utils/supabaseClient.js";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { auth } from "./routes/auth.ts";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
// app.use("/auth/*", jwt({ secret: jwtSecret }));

app.route("/auth", auth);
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
