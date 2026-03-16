<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = withDefaults(defineProps<{
  labels?: string[]
  data?: number[]
  title?: string
}>(), {
  labels: () => ['A', 'B', 'C', 'D'],
  data: () => [30, 25, 20, 25],
  title: '',
})

const palette = ['#3D6869', '#E07A5F', '#5B9A9C', '#F2CC8F', '#81B29A', '#F4A261', '#8FC1C0', '#C4E0DF']

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    data: props.data,
    backgroundColor: palette.slice(0, props.data.length),
  }],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  devicePixelRatio: 2,
  plugins: {
    title: { display: !!props.title, text: props.title },
    legend: { display: true, position: 'bottom' as const },
  },
}))
</script>

<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
