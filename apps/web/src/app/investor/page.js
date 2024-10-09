import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const getCookie = (name) => {
  const cookieArr = document.cookie.split(";"); // Split cookies into an array
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    // Check if this cookie contains the name
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null; // Return null if cookie doesn't exist
};

export default function Home() {
  const cookieStore = cookies();
  const token = getCookie("access_token");
  const role = getCookie("ROLE");
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
