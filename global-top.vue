<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { slides } from '#slidev/slides'

const { currentSlideNo, go } = useNav()

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

  const total = allSlides.length
  return h1Slides.map((ch, i) => ({
    ...ch,
    end: i < h1Slides.length - 1 ? h1Slides[i + 1].start - 1 : total,
  }))
})

/** Compute which chapter the current slide belongs to */
const activeChapterIndex = computed(() => {
  const page = currentSlideNo.value
  const chs = chapters.value
  for (let i = chs.length - 1; i >= 0; i--) {
    if (page >= chs[i].start && page <= chs[i].end) {
      return i
    }
  }
  return -1
})

/** Hide nav bar on cover (slide 1) and chapter divider slides */
const navVisible = computed(() => {
  if (currentSlideNo.value === 1) return false
  const allSlides = slides.value
  if (!allSlides) return true
  const current = allSlides.find(s => s.no === currentSlideNo.value)
  const fm = current?.meta?.slide?.frontmatter
  return fm?.layout !== 'chapter'
})

/** Hide bottom decorations only on cover slide */
const bottomVisible = computed(() => currentSlideNo.value !== 1)

function navigateTo(slideNo) {
  go(slideNo)
}
</script>

<template>
  <div v-if="navVisible" class="nav-bar">
    <button
      v-for="(chapter, index) in chapters"
      :key="chapter.label"
      :class="['nav-btn', { active: index === activeChapterIndex }]"
      @click="navigateTo(chapter.start)"
    >
      {{ chapter.label }}
    </button>
  </div>

  <div v-if="bottomVisible" class="bottom-decorations">
    <div class="page-number">
      {{ $slidev.nav.currentSlideNo }} / {{ $slidev.nav.total }}
    </div>
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: `${($slidev.nav.currentSlideNo / $slidev.nav.total) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: stretch;
  height: 18px;
  background: #fff;
  border-bottom: 1px solid #3D6869;
  font-family: 'Source Sans Pro', sans-serif;
}

.nav-btn {
  all: unset;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #9ca3af;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease, background-color 0.2s ease;
  user-select: none;
}

.nav-btn:hover {
  color: #6b7280;
}

.nav-btn.active {
  color: #fff;
  background: #3D6869;
  font-weight: 600;
}

.bottom-decorations {
  pointer-events: none;
}

.page-number {
  position: absolute;
  bottom: 14px;
  right: 24px;
  font-size: 12px;
  color: #999;
  font-weight: 700;
}

.progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
}

.progress-fill {
  height: 100%;
  background: #3D6869;
  transition: width 0.3s ease;
}
</style>
