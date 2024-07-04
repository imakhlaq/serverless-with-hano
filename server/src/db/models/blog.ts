import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const blog = pgTable("blogs", {
  id: uuid("blog_id").primaryKey().defaultRandom(),
  tittle: text("tittle").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  user_id: uuid("author_id").references(() => user.id, {
    onDelete: "no action",
  }),
});

export const blogRelation = relations(blog, ({ one }) => ({
  user: one(user, {
    fields: [blog.user_id],
    references: [user.id],
  }),
}));
