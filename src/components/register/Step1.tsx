"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const step1Schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  countryId: z.coerce.number().int().positive("Country is required"),
  cityId: z.coerce.number().int().positive("City is required"),
});

export type Step1Data = z.infer<typeof step1Schema>;

interface Country {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  countryId: number;
}

interface Step1Props {
  updateFormData: (data: Partial<Step1Data>) => void;
  nextStep: () => void;
  setKindergartenId: (id: number) => void;
  formData: Partial<Step1Data>;
}

export default function Step1({
  updateFormData,
  nextStep,
  setKindergartenId,
  formData,
}: Step1Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema) as Resolver<Step1Data, any>,
  });

  useEffect(() => {
    if (formData.name) setValue("name", formData.name);
    if (formData.countryId) setValue("countryId", formData.countryId);
    if (formData.cityId) setValue("cityId", formData.cityId);
  }, [formData, setValue]);

  const selectedCountryId = watch("countryId");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/locations/countries");
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountryId > 0) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`/api/locations/cities/${selectedCountryId}`);
          if (response.ok) {
            const data = await response.json();
            setCities(data);
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
    setValue("cityId", 0); // Reset cityId to a number
  }, [selectedCountryId, setValue]);

  const onSubmit = async (data: Step1Data) => {
    try {
      const response = await fetch("/api/register/step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, cityId: data.cityId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit Step 1");
      }

      const result = await response.json();
      setKindergartenId(result.kindergartenId);
      updateFormData(data);
      nextStep();
    } catch (error) {
      console.error("Step 1 submission error:", error);
      // TODO: Show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <h2 className="text-2xl font-bold mb-6">Step 1: Basic Information</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Kindergarten Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="countryId" className="block text-gray-700 font-bold mb-2">
          Country
        </label>
        <select
          id="countryId"
          {...register("countryId")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.countryId && (
          <p className="text-red-500 text-xs italic">{errors.countryId.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="cityId" className="block text-gray-700 font-bold mb-2">
          City
        </label>
        <select
          id="cityId"
          {...register("cityId")}
          disabled={!selectedCountryId || cities.length === 0}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-200"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.cityId && (
          <p className="text-red-500 text-xs italic">{errors.cityId.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
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
