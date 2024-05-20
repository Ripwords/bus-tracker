import { z } from "zod"

const CATEGORIES = [
  "rapid-bus-penang",
  "rapid-bus-kl",
  "rapid-bus-kuantan",
  "rapid-bus-mrtfeeder",
  "rapid-rail-kl",
] as const

export const staticInfoSchema = z.object({
  category: z.enum(CATEGORIES),
})
