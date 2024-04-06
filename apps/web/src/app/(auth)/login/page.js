import Login from "@/components/molecules/login-signup/Login";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';

export default function Home() {
    const cookieStore = cookies()
    const existingRole = cookieStore.get('ROLE')
    const existingEmail = cookieStore.get('EMAIL')
    const existingSellerStatus = cookieStore.get('STATUS')

    const token = cookieStore.get('access_token')
    const decodedToken = jwt.decode(token?.value);


    if(decodedToken?.role == "INVESTOR" ){
      redirect("/investor")
    }
    else if(decodedToken?.role == "SELLER" ){
      redirect("/seller")
    }
    
    return (
      <div>
        <Login existingRole={existingRole} existingEmail={existingEmail} existingSellerStatus={existingSellerStatus} />
      </div>
    );
}