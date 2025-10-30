import type { Database } from "@shared/types/supabase.types.js";
import { createClient } from "@supabase/supabase-js";
import { config } from "./config.js";

export const supabase = createClient<Database>(config.supabaseUrl, config.supabaseKey, {
  auth: {
    autoRefreshToken: false,
  },
});
