"use client";

import { useState, useEffect } from "react";
import { kindergartens } from "@/schema"; // Assuming schema types can be imported
import { signOut } from "next-auth/react";

type Kindergarten = typeof kindergartens.$inferSelect;

export default function AdminDashboard() {
  const [kindergartens, setKindergartens] = useState<Kindergarten[]>([]);
  const [filter, setFilter] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKindergartens = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/kindergartens?status=${filter}`);
        if (!response.ok) {
          throw new Error("Failed to fetch kindergartens");
        }
        const data = await response.json();
        setKindergartens(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchKindergartens();
  }, [filter]);

  const handleStatusChange = async (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const response = await fetch(`/api/admin/kindergartens/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Refetch the list to show the updated status
      const updatedKindergartens = kindergartens.filter((k) => k.id !== id);
      setKindergartens(updatedKindergartens);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Registrations</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">City ID</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kindergartens.map((k) => (
              <tr key={k.id}>
                <td className="py-2 px-4 border-b">{k.name}</td>
                <td className="py-2 px-4 border-b">{k.cityId}</td>
                <td className="py-2 px-4 border-b">{k.status}</td>
                <td className="py-2 px-4 border-b">
                  {k.status === "Pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(k.id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(k.id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
