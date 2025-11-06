"use client";

import { useForm, useFieldArray , type Resolver} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { durationType } from "@/schema";

const pricingItemSchema = z.object({
  durationType: z.enum(durationType.enumValues),
  price: z.coerce.number().int().positive(),
});

const step4Schema = z.object({
  pricing: z.array(pricingItemSchema).min(1, "At least one pricing option is required"),
});

type Step4Data = z.infer<typeof step4Schema>;

interface Step4Props {
  kindergartenId: number;
  updateFormData: (data: Partial<Step4Data>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step4({
  kindergartenId,
  updateFormData,
  nextStep,
  prevStep,
}: Step4Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema) as Resolver<Step4Data, any>,
    defaultValues: {
      pricing: [{ durationType: "full-day", price: 100 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pricing",
  });

  const onSubmit = async (data: Step4Data) => {
    try {
      const response = await fetch("/api/register/step4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kindergartenId, ...data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit Step 4");
      }

      updateFormData(data);
      nextStep();
    } catch (error) {
      console.error("Step 4 submission error:", error);
      // TODO: Show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <h2 className="text-2xl font-bold mb-6">Step 4: Pricing & Services</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor={`pricing.${index}.durationType`} className="block text-gray-700 font-bold mb-2">
              Duration
            </label>
            <select
              {...register(`pricing.${index}.durationType`)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              {durationType.enumValues.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor={`pricing.${index}.price`} className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              {...register(`pricing.${index}.price`)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-7"
          >
            Remove
          </button>
        </div>
      ))}
      {errors.pricing && (
        <p className="text-red-500 text-xs italic">{errors.pricing.message}</p>
      )}

      <button
        type="button"
        onClick={() => append({ durationType: "full-day", price: 0 })}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Add Pricing
      </button>

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
          {isSubmitting ? "Finish" : "Finish"}
        </button>
      </div>
    </form>
  );
}
