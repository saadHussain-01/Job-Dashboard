"use server";

import { createClient } from "@/utils/supabase/server";

export default async function createScreening(formData) {
  const supabase = createClient();

  // Prepare the data for insertion
  const screeningData = {
    question_1: formData.question_1 || null,
    question_2: formData.question_2 || null,
    question_3: formData.question_3 || null,
    question_4: formData.question_4 || null,
    question_5: formData.question_5 || null,
    question_6: formData.question_6 || null,
    question_7: formData.question_7 || null,
    question_8: formData.question_8 || null,
    question_9: formData.question_9 || null,
  };

  const { error } = await supabase
    .from("screening_questions") 
    .insert(screeningData);

  if (error) {
    console.error("Error inserting data:", error.message);
    return { success: false, error: error.message };
  } else {
    console.log("Data inserted successfully");
    return { success: true };
  }
}
