import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '@/libs/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) { // check to exist email
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({ // grab email addr
    where: {
      email: session.user.email,
    }
  });
  
  if (!currentUser) { // check to delete user
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;
