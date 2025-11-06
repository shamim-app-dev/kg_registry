Authentication:
   * POST /api/auth/[...nextauth]/route.ts (NextAuth.js authentication handler)
   * GET /api/auth/[...nextauth]/route.ts (NextAuth.js authentication handler)

  Registration:
   * POST /api/register/step1/route.ts (Kindergarten registration - Step 1: Basic Information)
   * POST /api/register/step2/route.ts (Kindergarten registration - Step 2: Facility Details)
   * POST /api/register/step3/route.ts (Kindergarten registration - Step 3: Credentials &
     Certifications)
   * POST /api/register/step4/route.ts (Kindergarten registration - Step 4: Pricing & Services)

  Admin:
   * GET /api/admin/kindergartens/route.ts (Fetch all kindergarten registrations, with optional
      status filtering)
   * PATCH /api/admin/kindergartens/[id]/route.ts (Update a specific kindergarten's status and
     admin notes)

  Public Kindergarten Data:
   * GET /api/kindergartens/route.ts (Fetch all approved kindergartens)
   * GET /api/kindergartens/[id]/route.ts (Fetch details of a single kindergarten by ID)

  Location Data:
   * GET /api/locations/countries/route.ts (Fetch all countries)
   * GET /api/locations/cities/[countryId]/route.ts (Fetch cities by country ID)