import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';
import axios from "axios";
import { BACKEND_URL } from "@/content/values";


export default  function Home() {
  // const cookieStore = cookies()
  // const token = cookieStore.get('access_token')
  // const role = cookieStore.get('ROLE')
  // const decodedToken = jwt.decode(token?.value);
  // if(!decodedToken?.wolleteAddr){
  //   redirect("/")
  // }

  
  return (
    <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
      <WelcomeUser />
      <DealsContainer role={role.value} />
    </div>
  );
}
  