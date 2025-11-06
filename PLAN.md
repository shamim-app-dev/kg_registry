- [x] Step 1: Project Setup and Database Configuration
- [x] Step 2: Kindergarten Registration - Backend
- [x] Step 3: Kindergarten Registration - Frontend
- [ ] Step 4: Super Admin Dashboard & Registration Management
- [ ] Step 5: Parent - Browse and View Kindergartens
- [ ] Step 6: Parent Booking Flow
- [ ] Step 7: Kindergarten Dashboard & Booking Management
- [ ] Step 8: Final Touches and Deployment

# Development Plan: Kindergarten Registry Application

This document outlines the incremental steps to build the Kindergarten Registry Application from scratch, based on the PRD. Each step includes specific development tasks and a testing strategy to ensure quality before proceeding to the next.

### Step 1: Project Setup and Database Configuration

*   **Tasks:**
    1.  Initialize a new Next.js project using `create-next-app`.
    2.  Install necessary dependencies: `drizzle-orm`, `drizzle-kit`, `pg`, `dotenv`.
    3.  Set up the basic project structure: create `lib`, `components`, `app/api` directories.
    4.  Configure Drizzle ORM by creating `drizzle.config.ts`.
    5.  Set up environment variables (`.env`) for the database connection string.
    6.  Use `drizzle-kit` to generate the initial database migration based on `schema.ts`.
*   **Testing:**
    *   Run the Next.js development server to ensure the default application loads correctly.
    *   Run the Drizzle migration against a local or Neon PostgreSQL database to confirm the tables are created successfully.
    *   Create a simple test script or API endpoint to perform a basic query (e.g., `SELECT * FROM countries`) to verify the database connection.

### Step 2: Kindergarten Registration - Backend

*   **Tasks:**
    1.  Create API routes in Next.js for each of the four registration steps.
    2.  Implement server-side validation for the incoming data for each step using a library like `zod`.
    3.  Write the database logic using Drizzle ORM to insert the new kindergarten data into the `kindergartens` table and related tables (`pricing`, etc.).
*   **Testing:**
    *   Use a tool like Postman or write integration tests (e.g., with Jest or Vitest) to send valid and invalid data to each API endpoint.
    *   Verify that the endpoints return the correct success or error responses.
    *   Check the database to ensure data is inserted correctly for valid requests and not inserted for invalid ones.

### Step 3: Kindergarten Registration - Frontend

*   **Tasks:**
    1.  Create the UI components for the 4-step registration form using React.
    2.  Implement client-side state management for the multi-step form.
    3.  Use a form library like `react-hook-form` with the `zod` resolver for client-side validation.
    4.  Connect the frontend form to the backend API routes created in Step 2.
*   **Testing:**
    *   Write unit tests for individual form components.
    *   Write end-to-end (E2E) tests using a framework like Cypress or Playwright to simulate a user filling out and submitting the entire registration form.
    *   Manually test the form to ensure a smooth user experience and correct error handling.

### Step 4: Super Admin Dashboard & Registration Management

*   **Tasks:**
    1.  Implement authentication (e.g., using NextAuth.js) to protect admin routes.
    2.  Create API routes to fetch all kindergarten registrations with status filtering.
    3.  Create API routes to update a kindergarten's status (approve/reject) and add admin notes.
    4.  Build the frontend UI for the admin dashboard, including tabs for different statuses and a detailed view of each application.
    5.  Connect the frontend UI to the backend APIs.
*   **Testing:**
    *   Test API routes to ensure they are protected and only accessible by authenticated admins.
    *   Write E2E tests for the admin dashboard: logging in, viewing registrations, and approving/rejecting an application.
    *   Verify in the database that the status and notes are updated correctly.

### Step 5: Parent - Browse and View Kindergartens

*   **Tasks:**
    1.  Create a public API route to fetch all *approved* kindergartens.
    2.  Build a frontend page to display a list or grid of the fetched kindergartens.
    3.  Create a dynamic route and page to display the full details of a single kindergarten.
*   **Testing:**
    *   Test the API endpoint to ensure it only returns kindergartens with an 'Approved' status.
    *   Write E2E tests for browsing the list of kindergartens and navigating to a detail page.
    *   Ensure all data is displayed correctly on the detail page.

### Step 6: Parent Booking Flow

*   **Tasks:**
    1.  Create an API route for submitting a new booking request. Implement validation.
    2.  Build the booking request form UI on the kindergarten detail page.
    3.  Implement client-side validation and connect the form to the booking API.
    4.  Display an instant confirmation message to the user upon successful submission.
*   **Testing:**
    *   Test the booking API with valid and invalid data.
    *   Write E2E tests for the parent booking flow: selecting a kindergarten, filling out the booking form, and submitting it.
    *   Verify that a new booking record with 'Pending' status is created in the database.

### Step 7: Kindergarten Dashboard & Booking Management

*   **Tasks:**
    1.  Implement authentication for Kindergarten Admins.
    2.  Create API routes for a kindergarten admin to view their specific booking requests.
    3.  Create API routes to update a booking's status (accept/decline).
    4.  Build the frontend UI for the kindergarten dashboard to display and manage booking requests.
*   **Testing:**
    *   Test API routes to ensure a kindergarten admin can only see and manage their own bookings.
    *   Write E2E tests for the kindergarten admin flow: logging in, viewing booking requests, and accepting/declining a request.
    *   Verify the booking status is updated correctly in the database.

### Step 8: Final Touches and Deployment

*   **Tasks:**
    1.  Perform a full application review and refactor where necessary.
    2.  Implement consistent styling and ensure the application is responsive.
    3.  Set up production environment variables.
    4.  Deploy the Next.js application to Vercel.
    5.  Deploy the PostgreSQL database to Neon.
*   **Testing:**
    *   Run the full suite of E2E tests against the production environment.
    *   Perform manual smoke testing of all critical user flows.
