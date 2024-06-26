import { routeSchema } from "@@/server/schemas/route.schema"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeSchema.parse)
})
