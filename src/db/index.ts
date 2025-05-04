import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/db/schema";
import { env } from "@/env/server";

export const db = drizzle({
  schema,
  casing: "snake_case",
  connection: {
    connectionString: env.DATABASE_URL,
  },
  logger: {
    logQuery(query, params) {
      console.log(query, params);
    },
  },
});
