"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const step3Schema = z.object({
  credentials: z.string().min(1, "Credentials are required"),
  certifications: z.string().min(1, "Certifications are required"),
});

type Step3Data = z.infer<typeof step3Schema>;

interface Step3Props {
  kindergartenId: number;
  updateFormData: (data: Partial<Step3Data>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3({
  kindergartenId,
  updateFormData,
  nextStep,
  prevStep,
}: Step3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
  });

  const onSubmit = async (data: Step3Data) => {
    try {
      const response = await fetch("/api/register/step3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kindergartenId, ...data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit Step 3");
      }

      updateFormData(data);
      nextStep();
    } catch (error) {
      console.error("Step 3 submission error:", error);
      // TODO: Show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <h2 className="text-2xl font-bold mb-6">Step 3: Credentials & Certifications</h2>

      <div className="mb-4">
        <label htmlFor="credentials" className="block text-gray-700 font-bold mb-2">
          Credentials
        </label>
        <textarea
          id="credentials"
          {...register("credentials")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
        {errors.credentials && (
          <p className="text-red-500 text-xs italic">{errors.credentials.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="certifications" className="block text-gray-700 font-bold mb-2">
          Certifications
        </label>
        <textarea
          id="certifications"
          {...register("certifications")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
        {errors.certifications && (
          <p className="text-red-500 text-xs italic">{errors.certifications.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}
