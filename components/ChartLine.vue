<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const props = withDefaults(defineProps<{
  labels?: string[]
  datasets?: Array<{
    label: string
    data: number[]
    borderColor?: string
    fill?: boolean
  }>
  title?: string
}>(), {
  labels: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: () => [{ label: 'Series 1', data: [10, 20, 15, 30, 25] }],
  title: '',
})

const palette = ['#3D6869', '#E07A5F', '#5B9A9C', '#F2CC8F', '#81B29A', '#F4A261']

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => ({
    ...ds,
    borderColor: ds.borderColor ?? palette[i % palette.length],
    backgroundColor: ds.fill ? `${palette[i % palette.length]}33` : undefined,
    tension: 0.3,
    pointRadius: 4,
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
    y: { beginAtZero: true },
  },
}))
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
