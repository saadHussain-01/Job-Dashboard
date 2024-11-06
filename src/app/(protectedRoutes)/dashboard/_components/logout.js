"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button type="button" className="h-8 m-4" onClick={handleLogout}>
      Logout
    </Button>
  );
}
