import JSZip from "jszip"
import type {
  dataSchemaType,
  lastUpdateSchemaType,
} from "@@/server/schemas/prasarana.schema"
import {
  dataSchema,
  lastUpdateSchema,
} from "@@/server/schemas/prasarana.schema"
import { model } from "mongoose"
import { categorySchema } from "@@/server/schemas/route.schema"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, categorySchema.parse)
  const lastUpdateModel = model<lastUpdateSchemaType>(
    `${params.category}_lastUpdate`,
    lastUpdateSchema
  )
  const lastFetch = await lastUpdateModel.findOne({})

  if (lastFetch) {
    const now = new Date()
    const diff = Math.abs(now.getTime() - lastFetch.lastUpdate.getTime())
    const diffHours = Math.ceil(diff / (1000 * 60 * 60))
    if (diffHours < 168) {
      // Do not fetch if the data is less than 7 days old
      // console.log("Data is less than 7 days old")
      return setResponseStatus(event, 204, "Data is less than 7 days old")
    }
    // console.log("Data is more than 7 days old")
    return setResponseStatus(event, 200, "Data upserted successfully")
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
    const fileData = await file.async("string")
    const category = file.name.split(".")[0]
    const dataModelObj = model<dataSchemaType>(
      `${params.category}_${category}`,
      dataSchema
    )
    const headerItem = new dataModelObj<dataSchemaType>({
      row: fileData.split("\n")[0],
      index: 0,
    })
    const fileItems = fileData
      .split("\n")
      .slice(1)
      .filter((row) => row !== "")
      .map((row, index) => {
        return new dataModelObj<dataSchemaType>({
          row,
          index: index + 1,
        })
      })
    try {
      console.log("Updating data")
      await dataModelObj.bulkWrite([
        ...fileItems.concat(headerItem).map((item) => {
          return {
            updateOne: {
              filter: { index: item.index },
              update: {
                $set: {
                  row: item.row,
                },
              },
              upsert: true,
            },
          }
        }),
      ])
    } catch (e) {
      console.log(e)
      console.log("+++++++++++++++++++++++++++++++++++++++++ss")
    }
  })
  await lastUpdateModel.updateOne(
    {},
    { lastUpdate: new Date() },
    {
      upsert: true,
    }
  )
})
