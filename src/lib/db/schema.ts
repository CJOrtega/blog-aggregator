import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull(),
    url: text("url").unique().notNull(),
    userId: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
    lastFetchedAt: timestamp("last_fetched_at")
});

export const feedFollows = pgTable("feed_follows", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    userId: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}),
    feedId: uuid("feed_id").references(() => feeds.id, {onDelete: 'cascade'})
}, (table) => [
    unique('feed_user_unique').on(table.feedId, table.userId)
]);

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    title: text("title").notNull(),
    url: text("url").unique().notNull(),
    description: text("description"),
    publishedAt: timestamp("published_at"),
    feedId: uuid("feed_id").notNull().references(() => feeds.id, {onDelete: 'cascade'})
});

export type NewPost = typeof posts.$inferInsert;