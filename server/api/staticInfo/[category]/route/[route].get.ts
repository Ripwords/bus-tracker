import { model } from "mongoose"
import { routeSchema } from "~~/server/schemas/route.schema"
import { dataSchema } from "~~/server/schemas/prasarana.schema"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const dataModel = model(`${params.category}_routes`, dataSchema)
  const data = (
    await dataModel
      .find({
        row: {
          $regex: new RegExp(`^(?:[^,]*,){2}${params.route}(?:,|$)`),
        },
      })
      .exec()
  )[0]

  const isWeekend =
    new Date().getDay() === 0 || new Date().getDay() === 6
      ? "weekend"
      : "weekday"
  const route_id = data.row.split(",")[0]
  console.log(route_id)
  const tripsModel = model(`${params.category}_trips`, dataSchema)
  console.log(isWeekend)
  const trips = await tripsModel
    .find({
      row: {
        $regex: new RegExp(
          `^(?:[^,]*,){0}${route_id},(?:[^,]*,){0}${isWeekend}(?:,|$)`
        ),
      },
    })
    .exec()

  console.log(data)
  console.log(trips)
})
