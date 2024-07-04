import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { blog } from "./blog";

export const user = pgTable("users", {
  id: uuid("user_id").primaryKey().defaultRandom(),
  username: text("user_name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelation = relations(user, ({ many }) => ({
  user: many(blog),
}));
