"use client";
import Login from "@/components/molecules/login-signup/Login";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();
  const [existingRole, setExistingRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("ROLE") : null
  );
  const [existingEmail, setExistingEmail] = useState(
    typeof window !== "undefined" ? localStorage.getItem("EMAIL") : null
  );

  useEffect(() => {
    const token = sessionStorage.getItem("TOKEN");
    const decodedToken = jwt.decode(token);

    if (decodedToken?.role === "INVESTOR") {
      router.push("/investor");
    } else if (decodedToken?.role === "SELLER") {
      router.push("/seller");
    }
  }, []);

  return (
    <div>
      <Login existingRole={existingRole} existingEmail={existingEmail} />
    </div>
  );
}
