<script setup lang="ts">
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

const props = withDefaults(defineProps<{
  labels?: string[]
  datasets?: Array<{
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
  }>
  title?: string
}>(), {
  labels: () => ['Speed', 'Power', 'Defense', 'Range', 'Accuracy'],
  datasets: () => [{ label: 'Series 1', data: [80, 60, 70, 90, 75] }],
  title: '',
})

const palette = ['#3D6869', '#E07A5F', '#5B9A9C', '#F2CC8F', '#81B29A']

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => ({
    ...ds,
    borderColor: ds.borderColor ?? palette[i % palette.length],
    backgroundColor: ds.backgroundColor ?? `${palette[i % palette.length]}33`,
    pointBackgroundColor: ds.borderColor ?? palette[i % palette.length],
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  devicePixelRatio: 2,
  plugins: {
    title: { display: !!props.title, text: props.title },
    legend: { display: props.datasets.length > 1 },
  },
  scales: {
    r: { beginAtZero: true },
  },
}))
</script>

<template>
  <div class="chart-container">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
