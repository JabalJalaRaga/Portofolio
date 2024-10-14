import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  // Ganti ini dengan nama database langsung
  //  const db = client.db('nama_database');

  switch (req.method) {
    case "POST":
      try {
        const body = JSON.parse(req.body);
        // Directly destructure Nama and email from req.body
        // const { body.Nama, body.Email, Subject, Message } = req.body;
        if (typeof body !== "object") {
          throw new Error("invalid request");
        }

        if (body.Nama == "" || body.Nama == null) {
          throw new Error("Nama is required");
        }
        const Nama = body.Nama;
        const Email = body.Email;
        const Subject = body.Subject;
        const Message = body.Message;

         // Create an object with only the required fields
         const newMessage = { Nama, Email, Subject, Message };

        let myMessage = await db.collection("message").insertOne(newMessage);
        res.json({ data: myMessage });
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
      break;

    case "GET":
      const allPosts = await db.collection("message").find({}).toArray();
      res.json({ data: allPosts });
      break;
    default:
      res.status(404).json({ message: "page not found" });
      break;
  }
}
