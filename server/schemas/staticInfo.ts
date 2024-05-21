import { z } from "zod"

export const CATEGORIES = [
  "rapid-bus-penang",
  "rapid-bus-kl",
  "rapid-bus-kuantan",
  "rapid-bus-mrtfeeder",
  "rapid-rail-kl",
] as const

export const staticInfoCategory = [
  "agency",
  "calendar",
  "frequencies",
  "routes",
  "shapes",
  "stop_times",
  "stops",
  "trips",
] as const

export const staticInfoSchema = z.object({
  category: z.enum(CATEGORIES),
})
