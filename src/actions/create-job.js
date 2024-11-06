"use server";

import { createClient } from "@/utils/supabase/server";

export default async function createjob(formData) {
  console.log("Form Data:", formData);

  const supabase = createClient();
  const {
    jobType,
    title,
    salary,
    location,
    description,
    jobDescription,
    phoneNo,
    email,
    companyName,
    questions,
  } = formData;

  // Insert the job data into the jobs table
  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .insert({
      job_type: jobType,
      title,
      salary,
      location,
      description,
      job_description: jobDescription,
      email,
      company_name: companyName,
      phone_no: phoneNo,
    })
    .select("id");

  console.log("job", jobData);

  if (jobError) {
    console.error("Error inserting job data:", jobError.message);
    return;
  }

  console.log("Job inserted successfully", jobData);

  if (jobData && jobData.length > 0 && questions && questions.length > 0) {
    const jobId = jobData[0].id;

    const questionData = questions.map((q) => ({
      job_id: jobId,
      question: q,
    }));

    const { error: questionError } = await supabase
      .from("job_questions")
      .insert(questionData);

    console.log("ques", questionData);

    if (questionError) {
      console.error("Error adding questions:", questionError.message);
    } else {
      console.log("Questions added successfully");
    }
  }
}
