"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Job() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleAddJobClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/jobs/new");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-full flex flex-row justify-center gap-5 items-center mt-10">
      <div className="w-[35%] bg-slate-200 pl-4 rounded-sm pb-3">
        <h3 className="font-bold text-lg pt-3">For Developer</h3>
        <p className="text-sm mt-1">
          Browse our react job and start your career today
        </p>
        <Button type="button" className="mt-3 h-8" onClick={()=>router.push("/browsejobs")}>
          Browse jobs
        </Button>
      </div>

      <div className="w-[35%] bg-blue-200 pl-4 rounded-sm pb-3">
        <h3 className="font-bold text-lg pt-3">For Employers</h3>
        <p className="text-sm mt-1">
          List your job to find the best developer for the role
        </p>
        <Button type="button" className="mt-3 h-8" onClick={handleAddJobClick}>
          Add job
        </Button>
      </div>
    </div>
  );
}
