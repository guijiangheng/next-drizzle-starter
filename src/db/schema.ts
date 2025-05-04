import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const statusEnum = pgEnum("status", [
  "backlog",
  "todo",
  "in-progress",
  "done",
]);

export const issues = pgTable("issues", {
  id,
  title: text().notNull(),
  description: text(),
  status: statusEnum().notNull(),
  labels: text().array(),
  estimatedHours: integer(),
  ...timestamps,
});
