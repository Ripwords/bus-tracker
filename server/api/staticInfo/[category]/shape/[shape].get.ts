import { model } from "mongoose"
import { dataSchema } from "@@/server/schemas/prasarana.schema"
import { shapeSchema } from "@@/server/schemas/route.schema"

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
    data: data.map((item) => item.row),
  }
})
