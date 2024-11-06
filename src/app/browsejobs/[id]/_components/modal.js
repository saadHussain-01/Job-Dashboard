"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import ResumeUpload from "./resumeUpload"; // Assuming this component handles resume upload
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import applyjob from "@/actions/apply-job";
import emailjs from "emailjs-com";
import { useRouter } from "next/navigation";
;

export default function Modal({ jobId, job, handleCloseModal }) {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter()

  const formSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    phoneNo: z.string().nonempty({ message: "Phone no is required" }),
    email: z.string().nonempty({ message: "Email is required" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
    mode: "onBlur",
  });


  const handleApplyJob = async (values) => {
    setSuccess("");
    setError("");

    // Prepare email template parameters
    const templateParams = {
      from_name: values.email, // Use the email from the form
      to_name: values.name,
      message,
    };

    // Send email
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID ?? ""
      );

      if (response.status === 200) {
        setSuccess("Your email has been sent successfully");
      } else {
        throw new Error(response.text);
      }
    } catch (error) {
      setError("An error occurred while sending the email.");
      console.error("Email sending error:", error);
      return; // Exit early if email fails
    }

    // Prepare form data
    const formData = { ...values, resume }; // Include the resume if needed

    // Submit job application
    try {
      await applyjob(formData);
      alert("Applied successfully!");
    } catch (err) {
      console.error("Application error:", err);
      alert("An error occurred while applying for the job.");
    }
    router.push("/screenquestions")
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-md">
        <h2 className="text-center text-black font-bold text-xl mb-6">
          Applying for Job
        </h2>
        <Form
          {...form}
          className="w-full max-w-md bg-white p-5 rounded-lg shadow-md"
        >
          <form onSubmit={form.handleSubmit(handleApplyJob)}>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5 w-[500px]">
                  <div className="flex flex-row">
                    <FormLabel className="mt-4 w-40">
                      <span className="text-red-500 text-sm/[20px] px-1">
                        *
                      </span>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="focus:border-blue-500 border-gray-300"
                      />
                    </FormControl>
                  </div>
                  <div className="mb-0">
                    <FormMessage className="text-red-500 ml-[120px] -mt-5" />
                  </div>
                </FormItem>
              )}
            />

            {/* PhoneNo Field */}
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5 w-[500px]">
                  <div className="flex flex-row">
                    <FormLabel className="mt-4 w-40">
                      <span className="text-red-500 text-sm/[20px] px-1">
                        *
                      </span>
                      Phone No
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="focus:border-blue-500 border-gray-300"
                      />
                    </FormControl>
                  </div>
                  <div className="mb-0">
                    <FormMessage className="text-red-500 ml-[120px] -mt-5" />
                  </div>
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5 w-[500px]">
                  <div className="flex flex-row">
                    <FormLabel className="mt-4 w-40">
                      <span className="text-red-500 text-sm/[20px] px-1">
                        *
                      </span>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="focus:border-blue-500 border-gray-300"
                      />
                    </FormControl>
                  </div>
                  <div className="mb-0">
                    <FormMessage className="text-red-500 ml-[120px] -mt-5" />
                  </div>
                </FormItem>
              )}
            />

            {/* Resume Upload Component */}
            <ResumeUpload resume={resume} setResume={setResume} />

            {/* Action Buttons */}
            <div className="flex items-center justify-center mt-10">
              <Button
                type="button"
                className="bg-blue-700 text-white w-40 mx-3"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-blue-700 text-white w-40 mx-3"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
