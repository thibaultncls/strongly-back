import dotenv from "dotenv";

dotenv.config();

export const config = {
  supabaseKey: process.env.SUPABASE_KEY || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  port: process.env.PORT || 3000,
  revenueCat: {
    apiUrl: process.env.REVENUECAT_API_URL as string,
    secretKey: process.env.REVENUECAT_SECRET_KEY as string,
  },
};
