import React, { ReactNode } from "react";
import Banner from "../components/banner";
import Link from "next/link";

export default async function Layout({ children }) {
  return (
    <main>
      <div className="bg-blue-700 h-16 flex flex-row">
        <Link href="/">
          <h2 className="text-white pl-28 py-4 text-lg font-bold">
            React Logo
          </h2>
        </Link>

        <div className="ml-auto text-white mr-24 py-5">
          <Link href="/" className="pr-5">
            Home
          </Link>
          <Link href="/browsejobs" className="pr-5">
            Browse Jobs
          </Link>
        </div>
      </div>
      <hr className="text-white" />

      <Banner />
      {children}
    </main>
  );
}
