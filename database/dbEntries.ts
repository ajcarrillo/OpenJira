import { Entry, IEntry } from "../models"
import { isValidObjectId } from "mongoose"
import { db } from "./"

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null

  db.connectToDatabase()
  const entry = await Entry.findById(id).lean()
  db.disconnect()
  return JSON.parse(JSON.stringify({ ...entry, id }))
}
