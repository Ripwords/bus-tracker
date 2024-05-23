import { z } from "zod"
import { CATEGORIES } from "./enum.schema"

export const categorySchema = z.object({
  category: CATEGORIES,
})

export const routeSchema = categorySchema.extend({
  route: z.string(),
})

export const tripSchema = categorySchema.extend({
  trip: z.string(),
})

export const shapeSchema = categorySchema.extend({
  shape: z.string(),
})
