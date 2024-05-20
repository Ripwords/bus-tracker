<script lang="ts" setup>
import type { LatLngExpression } from "leaflet"
const props = defineProps({
  busLocations: {
    type: Array<{
      id: string
      name: string
      coord: LatLngExpression
    }>,
    required: true,
    default() {
      return []
    },
  },
})
const mapShow = ref(false)

const url = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
const subdomains: String | String[] | undefined = ["mt0", "mt1", "mt2", "mt3"]

onMounted(() => {
  setTimeout(() => {
    dispatchEvent(new Event("resize"))
    mapShow.value = true
  }, 0)
})
</script>

<template>
  <div class="w-full py-5">
    <div
      v-show="mapShow"
      class="w-[100%] h-[50vh] px-5"
    >
      <LMap
        :use-global-leaflet="false"
        :options="{
          attributionControl: false,
        }"
        :zoom="13"
        :center="[3.139, 101.6869]"
      >
        <LTileLayer
          :url="url"
          :subdomains="subdomains"
          :minZoom="2"
          :noWrap="true"
          :maxZoom="22"
        />
        <LMarker
          v-for="bus in props.busLocations"
          :latLng="bus.coord"
          :key="bus.id"
        />
      </LMap>
    </div>
  </div>
</template>
