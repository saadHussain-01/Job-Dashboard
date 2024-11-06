"use server";

import { createClient } from "@/utils/supabase/server";

export default async function applyjob(formData) {
  console.log("Form Data:", formData);

  const supabase = createClient();
  const { name, phoneNo, email, resumeUrl } = formData;

  const { error } = await supabase.from("application").insert({
    name,
    email,
    resume_link: resumeUrl,
    phone_no: phoneNo,
  });

  if (error) {
    console.error("Error inserting data:", error.message);
  } else {
    console.log("Data inserted successfully");
  }
}
