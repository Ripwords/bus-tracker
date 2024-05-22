import { z } from "zod"
import { CATEGORIES } from "~/server/schemas/enums/enums"
import { model } from "mongoose"
import { dataSchema } from "~/server/schemas/prasarana.schema"

const routeSchema = z.object({
  category: z.enum(CATEGORIES),
  route: z.string(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const dataModel = model(`${params.category}_shapes`, dataSchema)
  const data = await dataModel
    .find({
      row: {
        $regex: new RegExp(params.route, "i"),
      },
    })
    .exec()

  return {
    data: data.map((item) => item.row),
  }
})
