"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";

export default function Addjobs() {
  const router = useRouter();
  const addJobs = () => {
    router.push("/jobs/new");
  };
  return (
    <div>
      <Button
        type="button"
        className="bg-blue-700 text-white h-8 mt-8 mr-16"
        onClick={addJobs}
      >
        + Add Job
      </Button>
    </div>
  );
}
