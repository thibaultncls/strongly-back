import dotenv from "dotenv";

dotenv.config();

export const config = {
  supabaseKey: process.env.SUPABASE_KEY || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  port: process.env.PORT || 3000,
};
