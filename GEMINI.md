# GEMINI.md

## Project Overview

This is a Next.js project for a kindergarten registration and booking platform. It uses a PostgreSQL database with Drizzle ORM for database access. The frontend is built with React and styled with Tailwind CSS. The API routes are built with Next.js API routes and use Zod for validation.

## Building and Running

To build and run this project, you need to have Node.js and pnpm installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following environment variable:
    ```
    DATABASE_URL="your_postgresql_connection_string"
    ```

3.  **Run database migrations:**
    ```bash
    pnpm drizzle-kit generate
    pnpm drizzle-kit migrate
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

5.  **Run tests:**
    The project has a test script in `tests/test_step1_api.sh`. To run it:
    ```bash
    bash tests/test_step1_api.sh
    ```

## Development Conventions

*   **Database:** The project uses Drizzle ORM for database access. The schema is defined in `src/schema.ts`. Migrations are managed with `drizzle-kit`.
*   **API:** API routes are located in `src/app/api`. Zod is used for request validation.
*   **Styling:** Tailwind CSS is used for styling.
*   **Linting:** ESLint is used for linting. Run `pnpm lint` to check for linting errors.
