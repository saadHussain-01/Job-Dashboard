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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import createjob from "@/actions/create-job";
import updatejob from "@/actions/update-job";
import { useRouter } from "next/navigation";
import addQuestion from "@/actions/add-job-questions";

export default function CreateJobForm({ initialData }) {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [questions, setQuestions] = useState(
    initialData?.job_questions?.map((o) => o.question) || []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const formSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    salary: z.string().nonempty({ message: "Salary is required" }),
    jobType: z.string().nonempty({ message: "Job type is required" }),
    location: z.string().nonempty({ message: "Location is required" }),
    jobDescription: z
      .string()
      .nonempty({ message: "Job description is required" }),
    phoneNo: z.string().nonempty({ message: "Phone no is required" }),
    email: z.string().nonempty({ message: "Email is required" }),
    companyName: z.string().nonempty({ message: "Company name is required" }),
  });

  console.log(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData?.title || "",
          description: initialData?.description || "",
          salary: initialData?.salary || "",
          jobType: initialData?.job_type || "",
          location: initialData?.location || "",
          jobDescription: initialData?.job_description || "",
          email: initialData?.email || "",
          phoneNo: initialData?.phone_no || "",
          companyName: initialData?.company_name || "",
        }
      : {
          title: "",
          description: "",
          salary: "",
          jobType: "",
          location: "",
          jobDescription: "",
          email: "",
          phoneNo: "",
          companyName: "",
        },
    mode: "onBlur",
  });

  const handleCreateJob = async (values) => {
    try {
      let jobId;

      if (initialData) {
        // Update job with existing questions if in edit mode
        await updatejob({
          ...values,
          id: initialData.id,
          questions, // Ensure questions are passed correctly
        });
        jobId = initialData.id;
        console.log("Job updated successfully!");
      } else {
        // Create new job with questions
        const createdJob = await createjob({
          ...values,
          questions: questions, // Ensure questions are included when creating a new job
        });
        console.log("Job created successfully!");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleAddQuestion = async () => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-black">Create Jobs Form</h2>
        <p className="text-md text-blue-700 mt-2">
          Please fill out the following form to create a new job posting. Ensure
          all required fields are accurately completed before submitting.
        </p>
      </div>

      <Form
        {...form}
        className="w-full max-w-md bg-white p-5 rounded-lg shadow-md"
      >
        <form onSubmit={form.handleSubmit(handleCreateJob)}>
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-5 w-[500px]">
                <div className="flex flex-row">
                  <FormLabel className="mt-4 w-40">
                    <span className="text-red-500 text-sm/[20px] px-1">*</span>
                    Title
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

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Job Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Job Type */}
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Job Type
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="focus:border-blue-500 border-gray-300">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Location
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    className="focus:border-blue-500 border-gray-300"
                  >
                    <SelectTrigger className="focus:border-blue-500 border-gray-300">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search Location"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Salary */}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Salary
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Company name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Phone No
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-5 mb-4 w-[500px]">
                <FormLabel className="mt-4 w-32">
                  <span className="text-red-500 text-sm/[20px] px-1">*</span>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-blue-500 border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-6">
            <div className="mt-4">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Type your question here"
                  className="mb-2"
                />
              </FormControl>
              <Button
                onClick={handleAddQuestion}
                className="text-white bg-green-500 mt-2"
                type="button"
              >
                Add Question
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {questions.map((question, index) => (
              <>
                <p className="border-b py-1">{`Question ${index + 1}`}</p>
                <input
                  type="text"
                  name={`question_${index}`}
                  value={question}
                  onChange={(e) =>
                    setQuestions((prev) => {
                      return prev.map((val, ind) => {
                        if (ind === index) {
                          return e.target.value;
                        }
                        return val;
                      });
                    })
                  }
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                />
              </>
            ))}
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Button type="submit" className="text-white bg-blue-700 w-56 mt-8">
              {initialData ? "Edit Job" : "Create Job"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
