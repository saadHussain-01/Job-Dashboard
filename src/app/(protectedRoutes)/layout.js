import React, { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Banner from "../components/banner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logout } from "./dashboard/_components/logout";

export default async function ProtectedLayout({ children }) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="bg-blue-700 h-16 flex flex-row">
        <Link href="/">
          <h2 className="text-white pl-28 py-4 text-lg font-bold">
            React Logo
          </h2>
        </Link>

        <div className="mr-16 ml-auto">
          <Logout />
        </div>
      </div>
      <hr className="text-white" />

      <Banner />
      {children}
    </main>
  );
}
