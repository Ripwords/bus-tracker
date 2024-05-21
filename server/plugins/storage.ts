import mongoDriver from "unstorage/drivers/mongodb"
import { staticInfoCategory, CATEGORIES } from "../schemas/staticInfo"

export default defineNitroPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const storage = useStorage()

  CATEGORIES.map((category) => {
    staticInfoCategory.map((staticCategory) => {
      const driver = mongoDriver({
        connectionString: runtimeConfig.mongoString,
        collectionName: category + "_" + staticCategory,
        databaseName: "prasarana",
      })
      return storage.mount(category + "_" + staticCategory, driver)
    })
  })
})
