import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const registrationStatus = pgEnum("registration_status", [
  "Pending",
  "Approved",
  "Rejected",
]);
export const bookingStatus = pgEnum("booking_status", [
  "Pending",
  "Accepted",
  "Declined",
]);
export const durationType = pgEnum("duration_type", [
  "hourly",
  "half-day",
  "full-day",
  "monthly",
]);

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  countryId: integer("country_id")
    .references(() => countries.id)
    .notNull(),
});

export const kindergartens = pgTable("kindergartens", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  cityId: integer("city_id")
    .references(() => cities.id)
    .notNull(),
  ageGroups: jsonb("age_groups").notNull(),
  capacity: integer("capacity").notNull(),
  operatingHours: jsonb("operating_hours").notNull(),
  credentials: text("credentials").notNull(),
  certifications: text("certifications").notNull(),
  status: registrationStatus("status").default("Pending").notNull(),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const parents = pgTable("parents", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  phone: varchar("phone", { length: 20 }),
  cityId: integer("city_id")
    .references(() => cities.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  age: integer("age").notNull(),
  parentId: integer("parent_id")
    .references(() => parents.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  kindergartenId: integer("kindergarten_id")
    .references(() => kindergartens.id)
    .notNull(),
  childId: integer("child_id")
    .references(() => children.id)
    .notNull(),
  parentId: integer("parent_id")
    .references(() => parents.id)
    .notNull(),
  status: bookingStatus("status").default("Pending").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  durationType: durationType("duration_type").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pricing = pgTable("pricing", {
  id: serial("id").primaryKey(),
  kindergartenId: integer("kindergarten_id")
    .references(() => kindergartens.id)
    .notNull(),
  durationType: durationType("duration_type").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
