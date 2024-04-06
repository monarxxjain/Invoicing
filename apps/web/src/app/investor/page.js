import WelcomeUser from "@/components/atoms/WelcomeUser";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';

export default  function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  const decodedToken = jwt.decode(token?.value);
  console.log(decodedToken)
  if(!decodedToken?.metaMaskId){
    redirect("/")
  }
  else{

  }

  return (
    <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
      <WelcomeUser />
      <DealsContainer />
    </div>
  );
}
  