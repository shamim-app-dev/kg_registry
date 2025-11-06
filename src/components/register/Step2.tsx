"use client";

import { useForm ,type Resolver} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const step2Schema = z.object({
  ageGroups: z.object({
    min: z.coerce.number().int().positive(),
    max: z.coerce.number().int().positive(),
  }),
  capacity: z.coerce.number().int().positive(),
  operatingHours: z.object({
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  }),
});

type Step2Data = z.infer<typeof step2Schema>;

interface Step2Props {
  kindergartenId: number;
  updateFormData: (data: Partial<Step2Data>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2({
  kindergartenId,
  updateFormData,
  nextStep,
  prevStep,
}: Step2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema) as Resolver<Step2Data, any>,
  });

  const onSubmit = async (data: Step2Data) => {
    try {
      const response = await fetch("/api/register/step2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kindergartenId, ...data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit Step 2");
      }

      updateFormData(data);
      nextStep();
    } catch (error) {
      console.error("Step 2 submission error:", error);
      // TODO: Show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <h2 className="text-2xl font-bold mb-6">Step 2: Facility Details</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="ageGroups.min" className="block text-gray-700 font-bold mb-2">
            Min Age
          </label>
          <input
            id="ageGroups.min"
            type="number"
            {...register("ageGroups.min")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.ageGroups?.min && (
            <p className="text-red-500 text-xs italic">{errors.ageGroups.min.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="ageGroups.max" className="block text-gray-700 font-bold mb-2">
            Max Age
          </label>
          <input
            id="ageGroups.max"
            type="number"
            {...register("ageGroups.max")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.ageGroups?.max && (
            <p className="text-red-500 text-xs italic">{errors.ageGroups.max.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">
          Capacity
        </label>
        <input
          id="capacity"
          type="number"
          {...register("capacity")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.capacity && (
          <p className="text-red-500 text-xs italic">{errors.capacity.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="operatingHours.start" className="block text-gray-700 font-bold mb-2">
            Opening Time
          </label>
          <input
            id="operatingHours.start"
            type="time"
            {...register("operatingHours.start")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.operatingHours?.start && (
            <p className="text-red-500 text-xs italic">{errors.operatingHours.start.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="operatingHours.end" className="block text-gray-700 font-bold mb-2">
            Closing Time
          </label>
          <input
            id="operatingHours.end"
            type="time"
            {...register("operatingHours.end")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.operatingHours?.end && (
            <p className="text-red-500 text-xs italic">{errors.operatingHours.end.message}</p>
          )}
        </div>
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
