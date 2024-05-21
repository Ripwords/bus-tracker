import JSZip from "jszip"
import {
  staticInfoSchema,
  staticInfoCategory,
} from "~/server/schemas/staticInfo"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, staticInfoSchema.parse)
  const storage = useStorage(params.category + "_" + staticInfoCategory[0])
  const agencyHeaders = await storage.getItem("headers")
  const parsedAgencyHeaders:
    | {
        headers: string
        created: string
      }
    | undefined =
    agencyHeaders !== null
      ? JSON.parse(JSON.stringify(agencyHeaders))
      : undefined

  if (parsedAgencyHeaders) {
    const created = new Date(parsedAgencyHeaders.created)
    const now = new Date()
    const diff = Math.abs(now.getTime() - created.getTime())
    const diffHours = Math.ceil(diff / (1000 * 60 * 60))
    if (diffHours < 168) {
      // Do not fetch if the data is less than 7 days old
      console.log("Data is less than 7 days old")
      return
    }
    console.log("Data is more than 7 days old")
  }
  const URL =
    "https://api.data.gov.my/gtfs-static/prasarana?category=" + params.category

  const zippedData = await $fetch<Blob>(URL, {
    method: "GET",
  })
  const zippedBuffer = await zippedData.arrayBuffer()

  const zip = new JSZip()
  const unzippedFile = await zip.loadAsync(new Uint8Array(zippedBuffer))

  unzippedFile.forEach(async (_, file) => {
    const data = await file.async("string")
    const category = file.name.split(".")[0]
    const storage = useStorage(params.category + "_" + category)
    await storage.setItem("headers", {
      headers: data.split("\n")[0],
      created: new Date().toISOString(),
    })
    data
      .split("\n")
      .slice(1)
      .forEach(async (row, index) => {
        await storage.setItem(index.toString(), row)
      })
  })
})
