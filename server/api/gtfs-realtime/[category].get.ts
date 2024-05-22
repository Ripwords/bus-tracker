import GtfsRTBindings from "gtfs-realtime-bindings"
import { z } from "zod"
import { CATEGORIES } from "~/server/schemas/enums/enums"

const routeSchema = z.object({
  category: z.enum(CATEGORIES),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
  const URL =
    "https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=" +
    params.category

  const protobuf = await $fetch<Blob>(URL, {
    method: "GET",
  })

  const buffer = await protobuf.arrayBuffer()
  const feed = GtfsRTBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer)
  )

  return {
    feed,
  }
})
