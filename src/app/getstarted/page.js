
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GetStarted() {
  const router = useRouter();
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen flex-col ">
        <h2 className="text-xl/[55px] font-bold capitalize">
          welcome to staffing manager app , click on login or signup to view the
          app
        </h2>
        <div className="flex flex-row">
          <Button
            type="submit"
            onClick={() => router.push("/login")}
            className="m-5 text-blue-500 bg-white w-[200px]  rounded-lg border border-blue-500 hover:bg-white"
          >
            Get Started
          </Button>

          {/* <Button
            type="submit"
            onClick={() => router.push("/signup")}
            className="m-5 text-blue-500 bg-white w-[200px] rounded-lg border border-blue-500 hover:bg-white"
          >
            Signup
          </Button> */}
        </div>
      </div>
    </main>
  );
}
