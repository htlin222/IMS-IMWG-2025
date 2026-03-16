<script setup>
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { slides } from '#slidev/slides'

const { go } = useNav()
const { $page } = useSlideContext()

/** Dynamically compute chapters from h1 slides (skip slide 1 = cover) */
const chapters = computed(() => {
  const allSlides = slides.value
  if (!allSlides) return []

  const h1Slides = []
  for (const slide of allSlides) {
    const info = slide.meta?.slide
    if (!info) continue
    if (info.level === 1 && slide.no > 1) {
      h1Slides.push({ label: info.title || '', start: slide.no })
    }
  }

  return h1Slides
})

/** Use injected $page (stable per-slide) instead of reactive currentSlideNo to prevent shrink-before-fade */
const sectionIndex = computed(() => {
  return chapters.value.findIndex(ch => ch.start === $page.value)
})
</script>

<template>
  <div class="section-layout">
    <!-- Top-left: section label -->
    <div class="section-label">
      Section: {{ sectionIndex + 1 }}
    </div>

    <!-- Main content area with chapter list -->
    <div class="section-content">
      <ol class="chapter-list">
        <li
          v-for="(chapter, index) in chapters"
          :key="chapter.label"
          :class="['chapter-item', { active: index === sectionIndex }]"
          @click="go(chapter.start)"
        >
          <span class="chapter-number">{{ index + 1 }}.</span>
          <span class="chapter-text">{{ chapter.label }}</span>
        </li>
      </ol>
    </div>

  </div>
</template>

<style scoped>
.section-layout {
  position: absolute;
  inset: 0;
  background: #fff;
  overflow: hidden;
  font-family: 'Source Sans Pro', sans-serif;
}

/* Section label top-left */
.section-label {
  position: absolute;
  top: 24px;
  left: 40px;
  background: #3D6869;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 2px;
}

/* Main chapter list area */
.section-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 4px;
  display: flex;
  align-items: center;
  padding-left: 60px;
}

.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 0;
  color: #b0b0b0;
  font-size: 20px;
  font-weight: 400;
  transition:
    color 0.2s,
    font-size 0.2s,
    font-weight 0.2s;
  cursor: pointer;
}

.chapter-item:not(.active):hover {
  color: #777;
}

.chapter-item.active {
  color: #3D6869;
  font-size: 28px;
  font-weight: 700;
}

.chapter-number {
  min-width: 28px;
  text-align: right;
}

</style>
