<script lang="ts" setup>
import type { LatLngExpression, PointExpression } from "leaflet"
const props = defineProps({
  path: {
    type: Array<{
      coord: LatLngExpression
      index: number
    }>,
    required: true,
    default() {
      return []
    },
  },
})
const mapShow = ref(false)
const centerPoint = computed(() => {
  const totalLat = props.path.reduce((acc, point) => {
    const lat = Number(point.coord.toString().split(",")[0])
    return acc + lat
  }, 0)
  const totalLng = props.path.reduce((acc, point) => {
    const lng = Number(point.coord.toString().split(",")[1])
    return acc + lng
  }, 0)
  return [
    totalLat / props.path.length,
    totalLng / props.path.length,
  ] as PointExpression
})

const url = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
const subdomains: string | string[] | undefined = ["mt0", "mt1", "mt2", "mt3"]

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
      class="w-[100%] h-[85vh] px-5"
    >
      <LMap
        :use-global-leaflet="false"
        :options="{
          attributionControl: false,
        }"
        :zoom="15"
        :center="centerPoint"
      >
        <LTileLayer
          :url="url"
          :subdomains="subdomains"
          :min-zoom="2"
          :no-wrap="true"
          :max-zoom="22"
        />
        <LPolyline :lat-lngs="props.path.map((point) => point.coord)" />
      </LMap>
    </div>
  </div>
</template>
