"use server";

import { createClient } from "@/utils/supabase/server";

export default async function addQuestion({ jobId, question }) {
  const supabase = createClient();

  const { error } = await supabase.from("job_questions").insert({
    job_id: jobId,
    question,
  });

  if (error) {
    console.error("Error adding question:", error.message);
  } else {
    console.log("Question added successfully");
  }
}
