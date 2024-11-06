import React from "react";
import Header from "@/app/components/header";
import Banner from "@/app/components/banner";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Addjobs from "./_components/addjobs";
import Link from "next/link";
import Editdeletebutton from "./_components/editdeletebutton";
import { createClient } from "@/utils/supabase/server";

export default async function Jobs() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("jobs")
    .select()
    .eq("user_id", user.id);

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex">
          <h3 className="text-2xl font-bold mt-8 ml-5 mr-auto">Jobs Opening</h3>
          <Addjobs />
        </div>

        {/* Table to display job data */}
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700 text-lg font-bold">
                Title
              </TableHead>
              <TableHead className="text-blue-700 text-lg font-bold">
                Description
              </TableHead>
              <TableHead className="text-blue-700 text-lg font-bold">
                Job Type
              </TableHead>
              <TableHead className="text-blue-700 text-lg font-bold">
                Salary
              </TableHead>
              <TableHead className="text-blue-700 text-lg font-bold">
                Location
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="w-52">{job.title}</TableCell>
                <TableCell className="w-[800px]">{job.description}</TableCell>
                <TableCell className="w-36">{job.job_type}</TableCell>
                <TableCell className="w-36">{job.salary}</TableCell>
                <TableCell className="w-36">{job.location}</TableCell>
                <TableCell>
                  <Editdeletebutton job={job}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
