<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = withDefaults(defineProps<{
  labels?: string[]
  datasets?: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
  }>
  title?: string
  stacked?: boolean
}>(), {
  labels: () => ['A', 'B', 'C', 'D'],
  datasets: () => [{ label: 'Series 1', data: [40, 20, 30, 50] }],
  title: '',
  stacked: false,
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => ({
    ...ds,
    backgroundColor: ds.backgroundColor ?? [
      '#3D6869', '#5B9A9C', '#8FC1C0', '#C4E0DF',
      '#2A4A4B', '#7BB3B4', '#A8D4D3', '#E0F0EF',
    ][i % 8],
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
    x: { stacked: props.stacked },
    y: { stacked: props.stacked, beginAtZero: true },
  },
}))
</script>

<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
