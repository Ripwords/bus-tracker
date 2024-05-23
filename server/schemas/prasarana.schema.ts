import { Schema } from "mongoose"

export type dataSchemaType = {
  row: string
  index: number
}
export const dataSchema = new Schema<dataSchemaType>({
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

export type lastUpdateSchemaType = {
  lastUpdate: Date
}
export const lastUpdateSchema = new Schema<lastUpdateSchemaType>(
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
