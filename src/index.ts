import auth from "@features/auth/interface/http/routes/auth.route.js";
import dashboard from "@features/dashboard/interface/http/routes/dashboard.route.js";
import sync from "@features/sync/interfaces/http/routes/sync.route.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

type Variables = {
  user: {
    id: string;
    email: string | null;
  };
};

const app = new Hono<{ Variables: Variables }>();

app.route("/auth", auth);
app.route("/dashboard", dashboard);
app.route("/sync", sync);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
