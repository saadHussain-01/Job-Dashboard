import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BrowseAllJobs() {
  const supabase = createClient();
  const { data, error } = await supabase.from("jobs").select();

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-center font-bold text-3xl pt-7 capitalize text-blue-700">
        browse job
      </h2>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {data.map((job, index) => (
            <div key={index} className="bg-blue-100 rounded-lg mx-6 my-3">
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-black capitalize pb-2">
                  {job.job_type}
                </p>
                <h2 className="text-xl font-bold text-blue-700 pb-2">
                  <Link href={`/browsejobs/${job.id}`}>{job.title}</Link>
                </h2>
                <div className="flex flex-row">
                  <p className="text-gray-600 text-md text pb-2">
                    {job.description}
                  </p>
                  <Button
                    type="button"
                    className="bg-blue-700 text-white h-8 ml-auto "
                  >
                    Apply
                  </Button>
                </div>
                <p className="font-bold text-blue-700">${job.salary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
