import { model } from "mongoose"
import { dataSchema } from "@@/server/schemas/prasarana.schema"
import { shapeSchema } from "@@/server/schemas/route.schema"
import type { LatLngExpression } from "leaflet"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, shapeSchema.parse)
  const dataModel = model(`${params.category}_shapes`, dataSchema)
  const data = await dataModel
    .find({
      row: {
        $regex: new RegExp(params.shape, "i"),
      },
    })
    .exec()

  return {
    shape: data
      .map((item) => {
        const [_, lat, lng, index] = item.row.split(",")
        return {
          coord: [parseFloat(lat!), parseFloat(lng!)] as LatLngExpression,
          index: +index!,
        }
      })
      .sort((a, b) => a.index - b.index),
  }
})
