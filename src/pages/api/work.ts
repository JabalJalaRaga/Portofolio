import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req:NextApiRequest, 
    res:NextApiResponse
) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    switch (req.method) {
      case "POST":
        let myWork = await db.collection("work").insertOne(req.body);
        res.json({ data: myWork });
        break;
      case "GET":
        const allWork = await db.collection("work").find({}).toArray();
        res.json({ data: allWork });
        break;
    default:
            res.status(404).json({ message: 'pange not found' });
        break;
    }
  }