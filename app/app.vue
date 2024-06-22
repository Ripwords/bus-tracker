<script lang="ts" setup>
import type GtfsRTBindings from "gtfs-realtime-bindings"

const sidebar = ref(false)
const search = ref("")

const { data } = await useFetch<{
  feed: GtfsRTBindings.transit_realtime.FeedMessage
}>("/api/gtfs-realtime/rapid-bus-kl")

const { data: routeShape, status: routeStatus } = await useFetch(
  "/api/staticInfo/rapid-bus-kl/shape/U222002",
  {
    method: "GET",
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
                  data?.feed.entity?.map(
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

    <!-- <LazyBusMap
      v-if="!(status === 'pending')"
      :bus-locations="data?.feed.entity?.map((bus) =>( {
          id: bus.id,
          name: bus.vehicle?.trip?.routeId ?? 'Unknown',
          coord: [
            bus.vehicle?.position?.latitude, 
            bus.vehicle?.position?.longitude
          ] as LatLngExpression
      }))"
    /> -->
    <BusRouteMap
      v-if="routeStatus !== 'pending'"
      :path="routeShape!.shape"
    />
  </div>
</template>
