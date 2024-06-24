<script lang="ts" setup>
import type GtfsRTBindings from "gtfs-realtime-bindings"
import type { LatLngExpression } from "leaflet"

const sidebar = ref(false)
const selectedService = ref<Services>("rapid-bus-kl")
const search = ref("")

const { data: busData, status: busStatus } = await useFetch<{
  feed: GtfsRTBindings.transit_realtime.FeedMessage
}>("/api/gtfs-realtime/rapid-bus-kl", {
  lazy: true,
})

const { data: routeShape, status: routeStatus } = await useFetch(
  "/api/staticInfo/rapid-bus-kl/shape/U222002",
  {
    method: "GET",
    lazy: true,
  }
)
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

    <LazyBusMap
      v-if="!(busStatus === 'pending')"
      :bus-locations="busData?.feed.entity?.map((bus) =>({
          id: bus.id,
          name: bus.vehicle?.trip?.routeId ?? 'Unknown',
          coord: [
            bus.vehicle?.position?.latitude, 
            bus.vehicle?.position?.longitude
          ] as LatLngExpression
      }))"
    />
    <LazyBusRouteMap
      v-if="routeStatus !== 'pending'"
      :path="routeShape!.shape"
    />
  </div>
</template>
