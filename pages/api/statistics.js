import { getSession } from 'next-auth/client'
import { connectToDatabase } from "./helpers/db";

function getMatchParam (year) {
  if (year === 0) {
    return {};
  } else {
    return { 'year': year };
  }
}

function getSortParam (sortByScore, sortByListenings) {
  if (sortByScore !== 0) {
    return { avgScore : sortByScore, numOfListenings : -1 };
  } else
  if (sortByListenings !== 0) {
    return { numOfListenings : sortByListenings, avgScore : -1};
  } else 
  {
    return {numOfListenings : 1};
  }
}

async function handler(req, res) {
  const session = await getSession({ req });
  
  if (session) {
  
    const matchParam = getMatchParam(parseInt(req.query.year)  || 0);
    const sortParam = getSortParam(parseInt(req.query.sortByScore)  || 0, parseInt(req.query.sortByListenings)  || 0 );

    try {
      const { db } = await connectToDatabase();
      const albums = await db
        .collection("albums")
        .aggregate([
          { $match: matchParam },
          {
            $lookup: {
              from: "listenings",
              localField: "_id",
              foreignField: "album",
              as: "listeningsDetails",
            },
          },
          {
            $project: {
              _id: 0,
              artist: "$artist",
              title: "$title",
              year: "$year",            
              numOfListenings: { $size: "$listeningsDetails" },
              avgScore: { $avg: "$listeningsDetails.score" },
            },          
          },
          { $sort : sortParam }
        ])
        .toArray();
      res.status(200).json({ albums });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else res.status(401).send('Not allowed');
}

export default handler;
