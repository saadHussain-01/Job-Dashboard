import React from "react";
import Header from "@/app/components/header";
import Banner from "@/app/components/banner";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import Job from "@/app/components/job";
import CreateJobForm from "./_components/create-form";

export default async function Jobs({ params }) {
  const supabase = createClient();

  const jobId = params.id; // Get job ID from params

  if (jobId === "new") {
    return <CreateJobForm />;
  }

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch job data based on the job ID
  const { data, error } = await supabase
    .from("jobs")
    .select("* ,job_questions( * )")
    .eq("user_id", user.id)
    .eq("id", jobId) // Add filtering by job ID
    .single(); // Use single() to get a single job object

  if (error) {
    return <div>Error loading job: {error.message}</div>;
  }

  console.log(data);

  return <CreateJobForm initialData={data} />;
}
