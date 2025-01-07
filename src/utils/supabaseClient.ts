import { config } from "dotenv";
config();

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
console.log("SUPABASE_KEY", SUPABASE_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);