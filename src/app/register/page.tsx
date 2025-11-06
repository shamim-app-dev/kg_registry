"use client";

import { useState } from "react";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import Step3 from "@/components/register/Step3";
import Step4 from "@/components/register/Step4";
import NavBar from "@/components/NavBar";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [kindergartenId, setKindergartenId] = useState<number | null>(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            updateFormData={updateFormData}
            nextStep={nextStep}
            setKindergartenId={setKindergartenId}
            formData={formData}
          />
        );
      case 2:
        return (
          <Step2
            kindergartenId={kindergartenId!}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3
            kindergartenId={kindergartenId!}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4
            kindergartenId={kindergartenId!}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>Registration submitted successfully.</p>
            <p>Kindergarten ID: {kindergartenId}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto p-8">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* We can add a progress bar here later */}
            {renderStep()}
          </div>
        </div>
        {/* Additional content can go here */}
      </main>
    </div>

    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //   <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
    //     {/* We can add a progress bar here later */}
    //     {renderStep()}
    //   </div>
    // </div>
  );
}
