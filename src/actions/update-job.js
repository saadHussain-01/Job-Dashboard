"use server";

import { createClient } from "@/utils/supabase/server";

export default async function updatejob(formData) {
  console.log("Form Data:", formData);
  const supabase = createClient();
  const {
    id,
    jobType,
    title,
    salary,
    location,
    description,
    jobDescription,
    phoneNo,
    email,
    companyName,
    questions
  } = formData;

  const { data: jobData, error } = await supabase
    .from("jobs")
    .upsert({
      id,
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
    .select();

  if (error) {
    console.error("Error updating data:", error.message);
    return { success: false };
  } else {
    console.log("Data updated successfully", jobData);
  }

  const jobId = jobData[0].id;
  const { error: questionError } = await supabase
    .from("job_questions")
    .delete()
    .eq("job_id", jobId);

  if (questionError) {
    console.log("error deleting error", error.message);
    return { success: false };
  } else {
    console.log("Data deleted successfully");
  }

  if (jobData && jobData.length > 0 && questions && questions.length > 0) {
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
      return { success: false };
    } else {
      console.log("Questions added successfully");
    }
  }
}
