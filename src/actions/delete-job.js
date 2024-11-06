"use server";

import { createClient } from "@/utils/supabase/server";

export default async function deleteJob(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .select();
    
  if (error) {
    console.error("Error deleting data:", error.message);
  } else {
    console.log("Data deleted successfully", data);
  }
}
