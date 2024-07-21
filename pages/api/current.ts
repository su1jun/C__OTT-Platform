import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') { // only get
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res); // extract user

    return res.status(200).json(currentUser); // return user info
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
