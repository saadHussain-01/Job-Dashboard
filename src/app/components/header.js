import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <div className="bg-blue-700 h-16 flex flex-row">
        <Link href="/">
          <h2 className="text-white pl-28 py-4 text-lg font-bold">
            React Logo
          </h2>
        </Link>

        <div className="ml-auto text-white mr-24 py-5">
          <Link href="" className="pr-12">
            Home
          </Link>
          <Link href="/browsejobs">
            Browse Jobs
          </Link>
        </div>

        <div className="mr-16 ml-auto">
          <Link href="/login">
            {" "}
            <Button type="button" className="h-8 m-4">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button type="button" className="h-8 ">
              Signup
            </Button>
          </Link>
        </div>
      </div>
      <hr className="text-white" />
    </div>
  );
}
