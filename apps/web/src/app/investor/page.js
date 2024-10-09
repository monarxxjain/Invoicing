import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function getData(context) {
  const requestHeaders = headers();
  const cookieHeader = requestHeaders.get("cookie"); // Get raw cookie header string
  console.log("CookieHeader ", cookieHeader);
  const myCookie = cookieHeader
    ?.split("; ")
    .find((row) => row.startsWith("myCookieName="))
    ?.split("=")[1];
  console.log("My Cookie ", myCookie);
}

export default function Home() {
  getData();
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const role = cookieStore.get("ROLE");
  const decodedToken = jwt.decode(token?.value);
  console.log(token, role, decodedToken);
  // if(!decodedToken?.wolleteAddr){
  //   redirect("/");
  // }

  return (
    <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
      <WelcomeUser />
      <DealsContainer role={"INVESTOR"} />
    </div>
  );
}
