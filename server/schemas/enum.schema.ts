import { z } from "zod"

export const CATEGORIES = z.enum([
  "rapid-bus-penang",
  "rapid-bus-kl",
  "rapid-bus-kuantan",
  "rapid-bus-mrtfeeder",
  "rapid-rail-kl",
])

export const staticInfoCategory = z.enum([
  "agency",
  "calendar",
  "frequencies",
  "routes",
  "shapes",
  "stop_times",
  "stops",
  "trips",
])
