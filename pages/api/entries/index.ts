import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry, IEntry } from "../../../models"

type Data = { message: string } | IEntry[] | IEntry

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res)
    case "POST":
      return createEntry(req, res)
    default:
      res.status(405).json({ message: "Method not allowed" })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  db.connectToDatabase()
  const entries = await Entry.find()
  db.disconnect()

  res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body
  const entry = new Entry({
    description,
    createdAt: new Date(),
  })

  try {
    await db.connectToDatabase()
    await entry.save()
    await db.disconnect()

    return res.status(201).json(entry)
  } catch (e) {
    await db.disconnect()
    console.log(e)

    return res.status(500).json({ message: "Something went wrong, check logs" })
  }
}
