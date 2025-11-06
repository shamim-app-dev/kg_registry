# Product Requirements Document: Kindergarten Registry Application

## 1. Introduction

This document outlines the requirements for the Kindergarten Registry Application, a web-based platform designed to streamline the registration, booking, and management of kindergartens. The application will cater to three main user roles: Parents, Kindergartens (Admins), and Super Admins.

## 2. Goals

*   Provide a user-friendly interface for parents to browse and book kindergartens.
*   Enable kindergartens to manage their registrations, facilities, pricing, and booking requests.
*   Offer an administrative dashboard for super admins to oversee all kindergarten registrations and system activities.
*   Ensure data integrity and security for all user information and transactions.
*   Utilize a modern and scalable technology stack for efficient development and future expansion.

## 3. User Roles and Features

### 3.1. Super Admin

*   **Admin Dashboard:** View all kindergarten registrations with status tabs (Pending, Approved, Rejected, All).
*   **Registration Management:** Approve or reject kindergarten registrations with optional notes.
*   **Application Details:** View complete application details for each kindergarten.
*   **User Management (Implicit):** Manage admin and parent accounts (future scope).

### 3.2. Kindergarten Admin

*   **4-Step Registration Form:**
    *   **Step 1: Location & Basic Information:** Kindergarten name, contact, city, country.
    *   **Step 2: Facility Details:** Age groups supported, capacity, operating hours.
    *   **Step 3: Credentials & Certifications:** Licenses, accreditations.
    *   **Step 4: Pricing & Services:** Define pricing for different duration types (hourly, half-day, full-day, monthly).
*   **Full Form Validation:** Client-side and server-side validation for all form fields.
*   **Kindergarten Dashboard:** View all booking requests with status filtering (Pending, Accepted, Declined).
*   **Booking Management:** Accept or decline booking requests with optional messages.
*   **Booking Details:** Track comprehensive booking details (parent info, child info, dates, pricing).

### 3.3. Parent

*   **Browse Kindergartens:** View a list of approved kindergartens.
*   **Kindergarten Details:** View detailed information about each kindergarten, including facilities, operating hours, credentials, and pricing.
*   **Pricing View:** View pricing for different duration types (hourly, half-day, full-day, monthly).
*   **Booking Request:** Submit booking requests with child and parent information.
*   **Instant Confirmation:** Receive immediate confirmation upon successful booking request submission.
*   **Booking History:** View their own booking requests and their statuses (future scope).

## 4. Technical Architecture

### 4.1. Frontend

*   **Framework:** Next.js (React)
*   **Styling:** (To be determined, e.g., Tailwind CSS, Styled Components, or a UI library like Material UI/Chakra UI)
*   **Routing:** Next.js built-in routing.
*   **Form Handling:** React Hook Form with Zod for validation.

### 4.2. Backend

*   **Database:** PostgreSQL (Neon for serverless deployment)
*   **ORM:** Drizzle ORM
*   **API:** Next.js API Routes (or a separate Node.js/Express backend if complexity dictates)
*   **Authentication:** NextAuth.js (or similar for robust authentication)

### 4.3. Database Schema (High-Level)

(Refer to `schema.ts` and `er_diagram.md` for detailed schema)

*   `countries`: Stores country information.
*   `cities`: Stores city information, linked to countries.
*   `kindergartens`: Stores kindergarten registration details, linked to cities.
*   `admins`: Stores super admin and kindergarten admin user accounts.
*   `parents`: Stores parent user accounts, linked to cities.
*   `children`: Stores child information, linked to parents.
*   `bookings`: Stores booking requests, linked to kindergartens, children, and parents.
*   `pricing`: Stores pricing details for kindergartens and duration types.

## 5. Navigation System

*   **Routing:** All pages will be connected with proper routing using Next.js.
*   **Ease of Navigation:** Easy navigation between key sections: Browse Kindergartens, Register Kindergarten, My Bookings (for parents), and Admin Dashboard.

## 6. Future Enhancements (Out of Scope for Initial Release)

*   Payment Gateway Integration.
*   Real-time notifications.
*   Advanced search and filtering for kindergartens.
*   Review and rating system for kindergartens.
*   Calendar integration for booking availability.
*   User profile management for parents and admins.

## 7. Deployment

*   **Frontend:** Vercel (for Next.js)
*   **Database:** Neon (for PostgreSQL)

## 8. Acceptance Criteria

*   All features outlined in Section 3 must be implemented and fully functional.
*   The application must be responsive and accessible across various devices.
*   All forms must have robust validation.
*   The application must be secure against common web vulnerabilities.
*   Performance should be optimized for fast loading times and smooth user experience.
