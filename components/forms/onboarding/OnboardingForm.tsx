"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { UserTypeSelection } from "./UserTypeForm";
import CompanyForm from "./CompanyForm";

type UserSelectionType = "Candidate" | "Employer" | null;
export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "Candidate" ? (
          <p>Candidate form</p>
        ) : (
          <CompanyForm />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={logo} alt="Jobify Logo" width={50} height={50} />
        <h1 className="text-4xl font-bold">
          Jobify
          <span className="text-primary">Kenya</span>
        </h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
