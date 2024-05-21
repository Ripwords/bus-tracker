<script lang="ts" setup>
import type { LatLngExpression } from "leaflet"
import GtfsRTBindings from "gtfs-realtime-bindings"

const sidebar = ref(false)
const search = ref("")

const { data, pending } = await useFetch<{
  feed: GtfsRTBindings.transit_realtime.FeedMessage
}>("/api/gtfs-realtime/rapid-bus-kl")

// Fetch static info every 7 days
useFetch("/api/staticInfo/rapid-bus-kl", {
  method: "POST",
})
</script>

<template>
  <div>
    <Toolbar>
      <template #start>
        <Avatar
          image="/img/icon.png"
          size="large"
          shape="circle"
        />
      </template>
      <template #center>
        <h1 class="mr-2 bold">Bus Tracker</h1>
      </template>
      <template #end>
        <!-- Logged In -->
        <LazySidebar v-model:visible="sidebar">
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
        </LazySidebar>

        <Button @click="sidebar = !sidebar">
          <Icon name="ph:list-bold" />
        </Button>
      </template>
    </Toolbar>

    <LazyMap
      v-if="!pending"
      :bus-locations="data?.feed.entity?.map((bus) =>( {
          id: bus.id,
          name: bus.vehicle?.trip?.routeId ?? 'Unknown',
          coord: [bus.vehicle?.position?.latitude, bus.vehicle?.position?.longitude] as LatLngExpression
      }))"
    />
  </div>
</template>
