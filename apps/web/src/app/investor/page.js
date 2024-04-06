import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';
import axios from "axios";
import { BACKEND_URL } from "@/content/values";

async function getAllDeals () {

  const res = await axios.post(`${BACKEND_URL}/deal/getDeals`,{},
    {withCredentials: true}  
  )

  console.log(res.data)
  return res.data
}

export default  function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  const decodedToken = jwt.decode(token?.value);
  if(!decodedToken?.metaMaskId){
    redirect("/")
  }
  
  // const deals = getAllDeals()

  return (
    <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
      <WelcomeUser />
      <DealsContainer />
    </div>
  );
}
  