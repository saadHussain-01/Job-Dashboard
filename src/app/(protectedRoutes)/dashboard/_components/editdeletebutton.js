"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import deleteJob from "@/actions/delete-job";
export default function Editdeletebutton({ job }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this job?");
    if (confirmed) {
      try {
        await deleteJob(job.id);
        console.log("Job deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <Button
        type="button"
        className="bg-blue-700 text-white h-8"
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Button
        type="button"
        className="bg-blue-700 text-white h-8"
        onClick={() => router.push(`/jobs/${job.id}`)}
      >
        Edit
      </Button>
    </div>
  );
}
