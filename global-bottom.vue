<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { slides } from '#slidev/slides'

const { currentSlideNo } = useNav()

/**
 * Pre-compute a mapping: slideNo -> parent h2 title text.
 */
const h2RefMap = computed(() => {
  const map = {}
  const allSlides = slides.value
  if (!allSlides) return map

  let lastH2Title = ''

  for (const slide of allSlides) {
    const info = slide.meta?.slide
    if (!info) continue

    const level = info.level
    const title = info.title

    if (level === 2 && title) {
      lastH2Title = title
    } else if (level === 3 && title && lastH2Title) {
      map[slide.no] = lastH2Title
    }
  }

  return map
})

/** The h2-ref breadcrumb text for the current slide, or empty string */
const h2RefText = computed(() => h2RefMap.value[currentSlideNo.value] || '')
</script>

<template>
  <div
    v-if="h2RefText"
    class="h2-ref-overlay"
  >
    {{ h2RefText }}
  </div>
</template>

<style scoped>
.h2-ref-overlay {
  position: absolute;
  top: 24px;
  left: 3.5rem;
  font-size: 12px;
  color: #999;
  font-weight: 400;
  font-family: 'Source Sans Pro', sans-serif;
  pointer-events: none;
  z-index: 10;
}
</style>
