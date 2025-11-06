import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to the Kindergarten Registry
        </h1>
        <p className="text-lg text-center text-gray-600">
          Your one-stop platform for finding and registering for kindergartens.
        </p>
        {/* Additional content can go here */}
      </main>
    </div>
  );
}
