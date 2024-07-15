import Signup from '@/components/molecules/login-signup/Signup';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';

export default function Home() {

    const cookieStore = cookies()

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
      <Signup />
    </div>
  );
}
