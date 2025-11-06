"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import { kindergartens } from "@/schema";

type Kindergarten = typeof kindergartens.$inferSelect;

export default function KindergartenDetailPage() {
  const params = useParams();
  const kindergartenId = params.id as string;
  const [kindergarten, setKindergarten] = useState<Kindergarten | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (kindergartenId) {
      const fetchKindergartenDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/kindergartens/${kindergartenId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch kindergarten details");
          }
          const data = await response.json();
          setKindergarten(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchKindergartenDetails();
    }
  }, [kindergartenId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto p-8 text-center">
          Loading kindergarten details...
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto p-8 text-center text-red-500">
          Error: {error}
        </main>
      </div>
    );
  }

  if (!kindergarten) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto p-8 text-center text-gray-600">
          Kindergarten not found.
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">{kindergarten.name}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-2">
            <strong>City ID:</strong> {kindergarten.cityId}
          </p>
          <p className="mb-2">
            <strong>Age Groups:</strong> {JSON.stringify(kindergarten.ageGroups)}
          </p>
          <p className="mb-2">
            <strong>Capacity:</strong> {kindergarten.capacity}
          </p>
          <p className="mb-2">
            <strong>Operating Hours:</strong> {JSON.stringify(kindergarten.operatingHours)}
          </p>
          <p className="mb-2">
            <strong>Credentials:</strong> {kindergarten.credentials}
          </p>
          <p className="mb-2">
            <strong>Certifications:</strong> {kindergarten.certifications}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {kindergarten.status}
          </p>
          {kindergarten.adminNotes && (
            <p className="mb-2">
              <strong>Admin Notes:</strong> {kindergarten.adminNotes}
            </p>
          )}
          <p className="mb-2">
            <strong>Created At:</strong> {new Date(kindergarten.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Updated At:</strong> {new Date(kindergarten.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </main>
    </div>
  );
}
