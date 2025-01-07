import { Hono } from "hono";
import { supabase } from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const auth = new Hono();

auth.post("/signup", async (c) => {
  const body = await c.req.parseBody()
  const email = body['username'];
  const password = body['password'];

  if (!email || !password) {
    return c.text("Email and password are required", 400);
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  try {
    const {data, error} = await supabase
        .from("users")
        .insert([{email, password: hashedPassword}]);
    if (error) {
      console.error(error);
      return c.text(error.message, 500);
    }
  }catch(err) {
    console.error(err);
    return c.text("Something went wrong: "+ err, 500);
  }

  return c.text("User created successfully", 201);
});

auth.post("/login", async (c) => {
  // const { email, password } = await c.req.json();
  const body = await c.req.parseBody()
  const email = body['username'];
  const password = body['password'];
  if (!email || !password) {
    return c.text("Email and password are required", 400);
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, email, password")
    .eq("email", email)
    .single();

  if (error || !data) {
    return c.text("User not found", 404);
  }

  const isValid = await bcrypt.compare(password as string, data.password);
  if (!isValid) {
    return c.text("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { userId: data.id, email: data.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return c.json({ token });
});

auth.post("/logout", (c) => {
  return c.text("Logout successful");
});

export { auth };
