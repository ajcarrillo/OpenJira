import mongoose, { Model } from "mongoose"
import { Entry } from "../interfaces"

export interface IEntry extends Entry {}

const Schema = mongoose.Schema

const schema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado válido}",
    },
    default: "pending",
  },
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", schema)

export default EntryModel
