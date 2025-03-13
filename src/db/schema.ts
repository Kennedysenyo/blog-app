import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs" , {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});