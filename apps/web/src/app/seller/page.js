import WelcomeUser from "@/components/atoms/WelcomeUser";
import SellerHomeAnalytics from "@/components/molecules/seller/SellerHomeAnalytics";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';

export default function Home() {

  // const cookieStore = cookies()
  // const token = cookieStore.get('access_token')
  // const decodedToken = jwt.decode(token?.value);
  // const sellerId = cookieStore.get('SELLER_ID')
  // if(!decodedToken){
  //   redirect("/")
  // }


    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8 flex flex-col gap-6">
        <WelcomeUser />
        <SellerHomeAnalytics />
      </div>
    );
  }
  