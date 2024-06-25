<script lang="ts" setup>
import type GtfsRTBindings from "gtfs-realtime-bindings"

const sidebar = ref(false)
const selectedService = ref<Services>("rapid-bus-kl")
const search = ref("")

const { data: busData } = await useFetch<{
  feed: GtfsRTBindings.transit_realtime.FeedMessage
}>("/api/gtfs-realtime/rapid-bus-kl", {
  lazy: true,
})

const { data: routeShape, status: routeStatus } = await useFetch(
  `/api/staticInfo/${selectedService.value}/shape/P001001`,
  {
    method: "GET",
    lazy: true,
  }
)

const { data: routeShape2, status: routeStatus2 } = await useFetch(
  `/api/staticInfo/${selectedService.value}/shape/P001002`,
  {
    method: "GET",
    lazy: true,
  }
)

await useFetch(`/api/staticInfo/${selectedService.value}/route/222`, {
  method: "GET",
  lazy: true,
})
</script>

<template>
  <div>
    <Toolbar>
      <template #start>
        <Avatar
          size="large"
          shape="circle"
        >
          <Icon name="mdi:bus" />
        </Avatar>
      </template>
      <template #center>
        <h1 class="mr-2 bold">Bus Tracker</h1>
      </template>
      <template #end>
        <!-- Logged In -->
        <Drawer v-model:visible="sidebar">
          <template #container>
            <Toolbar>
              <template #center>
                <h1 class="mr-2 bold">Bus Tracker</h1>
              </template>
            </Toolbar>
            <div class="flex justify-center mt-3">
              <AutoComplete
                v-model="search"
                placeholder="Search bus"
                :suggestions="
                  busData?.feed.entity?.map(
                    (bus) => bus.vehicle?.trip?.routeId ?? 'Unknown'
                  )
                "
              />
            </div>
          </template>
        </Drawer>

        <Button @click="sidebar = !sidebar">
          <Icon name="ph:list-bold" />
        </Button>
      </template>
    </Toolbar>

    <LazyBusRouteMap
      v-if="routeStatus !== 'pending'"
      :path="routeShape!.shape"
    />

    <LazyBusRouteMap
      v-if="routeStatus2 !== 'pending'"
      :path="routeShape2!.shape"
    />
  </div>
</template>
