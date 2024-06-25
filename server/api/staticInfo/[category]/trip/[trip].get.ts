import { model } from "mongoose"
import { tripSchema } from "~~/server/schemas/route.schema"
import { dataSchema } from "~~/server/schemas/prasarana.schema"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, tripSchema.parse)
  const dataModel = model(`${params.category}_trips`, dataSchema)
  const data = await dataModel
    .find({
      row: {
        $regex: new RegExp(`^(?:[^,]*,){2}${params.trip}(?:,|$)`),
      },
    })
    .exec()

  return {
    trip: data.map((item) => {
      const [
        route_id,
        service_id,
        trip_id,
        shape_id,
        trip_headsign,
        direction_id,
      ] = item.row.split(",")
      return {
        route_id: route_id!,
        service_id: service_id!,
        trip_id: trip_id!,
        shape_id: shape_id!,
        trip_headsign: trip_headsign!,
        direction_id: direction_id!,
      }
    }),
  }
})
