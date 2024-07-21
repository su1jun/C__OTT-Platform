import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from '@/components/Navbar';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props : {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-4xl text-green-500">Netflix Clone</h1>
        <p className="text-white">Logged in as : {user?.email}</p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}></button>
      </div>
    </>
  )
}