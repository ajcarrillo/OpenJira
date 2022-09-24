import mongoose from "mongoose"
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry, IEntry } from "../../../models"

type Data = { message: string } | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id as string

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" })
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res, id)
    case "GET":
      return getEntry(res, id)
    default:
      res.status(405).json({ message: "Method not allowed" })
  }

  res.status(200).json({ message: "John Doe" })
}

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  id: string
) => {
  try {
    await db.connectToDatabase()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
      await db.disconnect()
      return res.status(404).json({ message: "Entry not found" })
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    )

    await db.disconnect()

    return res.status(201).json(updatedEntry!)
  } catch (e) {
    await db.disconnect()
    console.log(e)

    return res.status(500).json({ message: "Something went wrong, check logs" })
  }
}

const getEntry = async (res: NextApiResponse<Data>, id: string) => {
  await db.connectToDatabase()

  const entry = await Entry.findById(id)

  if (!entry) {
    await db.disconnect()
    return res.status(404).json({ message: "Entry not found" })
  }

  await db.disconnect()

  return res.status(200).json(entry)
}
