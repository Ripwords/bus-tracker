import { z } from "zod"

export const ServicesEnum = z.enum([
  "rapid-bus-penang",
  "rapid-bus-kl",
  "rapid-bus-mrtfeeder",
  "rapid-bus-kuantan",
])

export type Services = z.infer<typeof ServicesEnum>
