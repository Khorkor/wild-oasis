"use client";

import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import SubmitButton from "@/app/_components/SubmitButton";
import { updateGuest } from "@/app/_lib/actions";
import { IGuest } from "@/app/_types";

interface UpdateProfileFormProps {
  guest: IGuest;
  children: React.ReactNode;
}

function UpdateProfileForm({ guest, children }: UpdateProfileFormProps) {
  const [nationalIDError, setNationalIDError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { pending } = useFormStatus();

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  const handleSubmit = async (formData: FormData) => {
    const nationalID = formData.get("nationalID") as string;

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
      setNationalIDError(
        "National ID must be 6-12 characters long and contain only letters and numbers.",
      );

      return;
    }

    setNationalIDError(null);

    try {
      await updateGuest(formData);

      setTimeout(() => {
        setSuccessMessage("Profile updated successfully ✅");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3500);
      }, 1000);
    } catch {
      setSuccessMessage(null);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.target as HTMLFormElement));
      }}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {nationality && (
            <Image
              src={countryFlag!}
              height={24}
              width={24}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          required
        />
        {nationalIDError && (
          <p className="text-sm text-red-500">{nationalIDError}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-6">
        {!pending && successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        <SubmitButton pendingLabel="Updating..." isSubmitting={pending}>
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
