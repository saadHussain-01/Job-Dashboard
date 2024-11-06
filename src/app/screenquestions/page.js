"use client";

import React, { useState } from "react";
import { screeningOptions } from "@/constants/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createScreening from "@/actions/screening_question";

export default function ScreeningForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createScreening(formData);
    console.log(result);
    alert("form submit successfully")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        {screeningOptions?.map((option) => (
          <div key={option.questionId} className="mb-4">
            <Label className="block text-lg font-semibold mb-2">
              {option.question}
            </Label>
            <Input
              type="text"
              name={`question_${option.questionId}`} // This matches the column names in the DB
              required={option.required}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
