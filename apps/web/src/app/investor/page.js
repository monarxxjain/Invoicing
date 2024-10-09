import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function getData() {
  const res = await fetch("https://invoicing-web.vercel.app/investor", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("Data ", data);
  const myCookie = data.myCookie;
  console.log("Cookie ", myCookie);
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
