"use client"
import Admin from "@/components/molecules/login-signup/Admin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();
  const [existingEmail, setExistingEmail] = useState(
    typeof window !== "undefined" ? localStorage.getItem("EMAIL") : null
  );

  useEffect(() => {
    const token = sessionStorage.getItem("TOKEN");
    const decodedToken = jwt.decode(token);

    if (decodedToken?.role === "ADMIN") {
      router.push("/admin/sellers");
    } 
  }, []);
    return (
      <div>
        <Admin email={existingEmail} />
      </div>
    );
}
