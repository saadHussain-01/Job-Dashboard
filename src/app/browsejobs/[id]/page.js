import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import ResumeUpload from "./_components/resumeUpload";
import ApplyButton from "./_components/applyButton";

export default async function page({ params }) {
  const supabase = createClient();
  const jobId = params.id;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("jobs").select().eq("id", jobId);
  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }
  if (!data || data.length === 0) {
    return <div>No job found with ID {jobId}</div>;
  }
  const [job] = data;

  return (
    <div className="mt-16">
      <h2 className="m-10 font-bold capitalize text-blue-700">
        job title:
        <span className="text-black text-xl font-bold capitalize pl-3">
          {job.title || "-"}
        </span>
      </h2>

      <p className="ml-10 font-bold capitalize text-blue-700">description: </p>
      <textarea
        className="ml-10 w-[1450px] bg-transparent border-none outline-none font-normal text-black resize-none"
        value={job.description || "-"}
        readOnly
        rows={5}
      ></textarea>

      <p className="ml-10 font-bold capitalize text-blue-700">
        job-description:{" "}
      </p>
      <textarea
        className="ml-10 w-[1450px] bg-transparent border-none outline-none font-normal text-black resize-none"
        value={job.job_description || "-"}
        readOnly
        rows={5}
      ></textarea>

      <p className="m-10 font-bold capitalize text-blue-700">
        salary:{" "}
        <span className="text-black font-normal">{job.salary || "-"}</span>
      </p>
      <p className="m-10 font-bold capitalize text-blue-700">
        location:{" "}
        <span className="text-black font-normal">{job.location || "-"}</span>
      </p>
      <p className="m-10 font-bold capitalize text-blue-700">
        job-type:{" "}
        <span className="text-black font-normal">{job.job_type || "-"}</span>
      </p>
      <p className="m-10 font-bold capitalize text-blue-700">
        email:{" "}
        <span className="text-black font-normal">{job.email || "-"}</span>
      </p>
      <p className="m-10 font-bold capitalize text-blue-700">
        phone-no:{" "}
        <span className="text-black font-normal">{job.phone_no || "-"}</span>
      </p>
      <p className="m-10 font-bold capitalize text-blue-700">
        company-name:{" "}
        <span className="text-black font-normal">
          {job.company_name || "-"}
        </span>
      </p>

      <ApplyButton job={job}/>

    
    </div>
  );
}
