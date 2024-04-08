import Admin from "@/components/molecules/login-signup/Admin";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies()
  const email = cookieStore.get('EMAIL')
  const token = cookieStore.get('access_token')
  const decodedToken = jwt.decode(token?.value);

  if(decodedToken?.role=="ADMIN") {
    redirect("/admin/dashboard")
  }
    return (
      <div>
        <Admin email={email?.value} />
      </div>
    );
}
