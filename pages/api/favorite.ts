import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // update
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      // get movie id
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) { // exist movie?
        throw new Error('Invalid ID');
      }
      
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '', // safe falsy
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    // delete
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      // get movie id
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) { // exist movie?
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId); // remove element

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '', // safe falsy
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
