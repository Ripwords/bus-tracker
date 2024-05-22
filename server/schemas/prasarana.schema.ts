import { ObjectId } from "mongodb"
import { staticInfoCategory } from "./enums/enums"
import { Schema } from "mongoose"

interface ICategory {
  name: (typeof staticInfoCategory)[number]
  data: {
    _id: ObjectId
    index: number
    row: string
  }[]
}

export const dataSchema = new Schema<ICategory["data"][0]>({
  row: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const lastUpdateSchema = new Schema(
  {
    lastUpdate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
