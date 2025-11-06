import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../schema";
import * as dotenv from "dotenv";
import { sql } from "drizzle-orm";
import * as bcrypt from "bcrypt";

dotenv.config({
  path: ".env.local",
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client, { schema });

async function main() {
  await client.connect();

  console.log("Seeding database...");

  // Truncate tables
  await db.execute(
    sql`TRUNCATE TABLE ${schema.countries}, ${schema.cities}, ${schema.admins} RESTART IDENTITY CASCADE;`
  );

  // Seed countries
  const country1 = await db
    .insert(schema.countries)
    .values({ name: "USA" })
    .returning();
  const country2 = await db
    .insert(schema.countries)
    .values({ name: "Canada" })
    .returning();

  // Seed cities
  await db.insert(schema.cities).values([
    { name: "New York", countryId: country1[0].id },
    { name: "Toronto", countryId: country2[0].id },
  ]);

  // Seed admin user
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  await db.insert(schema.admins).values({
    email: "admin@example.com",
    password: hashedPassword,
  });

  console.log("Database seeded successfully!");

  await client.end();
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
