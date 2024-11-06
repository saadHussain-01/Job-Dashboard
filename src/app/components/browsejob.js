import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function BrowseJob() {
  const supabase = createClient();
  const { data, error } = await supabase.from("jobs").select().limit(6);

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }


  return (
    <div className="bg-blue-100 mt-8">
        <h2 className="text-center font-bold text-3xl pt-7 capitalize text-blue-700">browse job</h2>
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((job, index) => (
          <div
            key={index}
            className="border p-4 shadow-md rounded-md bg-white w-[400px] flex flex-col justify-between h-full"
          >
            <div>
              <p className="text-sm font-bold text-black capitalize pb-2">{job.time}</p>
              <h2 className="text-xl font-bold text-blue-700 pb-2">{job.title}</h2>
              <p className="text-gray-600 text-md text pb-2">{job.description}</p>
            </div>
            <p className="font-bold text-blue-700">${job.salary}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
