import GtfsRTBindings from "gtfs-realtime-bindings"
import { staticInfoSchema } from "~/server/schemas/staticInfo"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, staticInfoSchema.parse)
  const URL =
    "https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=" + params.category

  const protobuf = await $fetch<Blob>(URL, {
    method: "GET",
  })

  const buffer = await protobuf.arrayBuffer()
  const feed = GtfsRTBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer))


  return {
    feed,
  }
})
