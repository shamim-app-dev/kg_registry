"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { kindergartens } from "@/schema";

type Kindergarten = typeof kindergartens.$inferSelect;

export default function BrowseKindergartensPage() {
  const [approvedKindergartens, setApprovedKindergartens] = useState<Kindergarten[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedKindergartens = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/kindergartens");
        if (!response.ok) {
          throw new Error("Failed to fetch approved kindergartens");
        }
        const data = await response.json();
        setApprovedKindergartens(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedKindergartens();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Browse Approved Kindergartens
        </h1>

        {loading && <p className="text-center">Loading kindergartens...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && approvedKindergartens.length === 0 && (
          <p className="text-center text-gray-600">No approved kindergartens found.</p>
        )}

        {!loading && !error && approvedKindergartens.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedKindergartens.map((kindergarten) => (
              <div
                key={kindergarten.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {kindergarten.name}
                </h2>
                <p className="text-gray-600 mb-4">City ID: {kindergarten.cityId}</p>
                <Link
                  href={`/browse/${kindergarten.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
