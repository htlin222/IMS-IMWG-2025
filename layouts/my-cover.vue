<script setup>
import { computed } from 'vue'

defineProps({
  date: { type: String, default: '2026-02-21' },
  author: { type: String, default: '' },
  email: { type: String, default: '' },
  seriesName: { type: String, default: '' },
})
</script>

<template>
  <div class="cover-layout">
    <!-- Top row: series label (left) + date (right) -->
    <div class="cover-top">
      <div v-if="seriesName || $slidev.configs.title" class="series-label">
        {{ seriesName || $slidev.configs.title }}
      </div>
      <div class="cover-date">{{ date }}</div>
    </div>

    <!-- Center: main title slot -->
    <div class="cover-center">
      <slot />
    </div>

    <!-- Dotted separator line -->
    <div class="cover-separator"></div>

    <!-- Author info row -->
    <div v-if="author || email" class="cover-author-row">
      <div v-if="author" class="cover-author-name">{{ author }}</div>
      <div v-if="author && email" class="cover-author-divider"></div>
      <div v-if="email" class="cover-author-email">{{ email }}</div>
    </div>

    <!-- Bottom-right: CC BY-NC placeholder -->
    <div class="cover-cc">CC BY-NC</div>
  </div>
</template>

<style scoped>
.cover-layout {
  position: absolute;
  inset: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  overflow: hidden;
  font-family: 'Source Sans Pro', sans-serif;
}

/* Top row */
.cover-top {
  position: absolute;
  top: 24px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.series-label {
  background: #3D6869;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 20px;
  line-height: 1.3;
  border-radius: 2px;
}

.cover-date {
  color: #888;
  font-size: 16px;
  line-height: 1.3;
  padding-top: 6px;
}

/* Center title area */
.cover-center {
  text-align: center;
  max-width: 80%;
}

.cover-center :deep(h1) {
  color: #3D6869;
  font-size: 2.8em;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
}

.cover-center :deep(p) {
  color: #666;
  font-size: 1.1em;
  margin-top: 12px;
}

/* Dotted separator */
.cover-separator {
  width: 80%;
  border-top: 2px dotted #ccc;
  margin: 28px 0;
}

/* Author info row */
.cover-author-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.cover-author-name {
  font-weight: 700;
  font-size: 20px;
  color: #333;
}

.cover-author-divider {
  width: 0;
  height: 24px;
  border-left: 2px dotted #ccc;
}

.cover-author-email {
  font-size: 16px;
  color: #666;
}

/* CC BY-NC badge */
.cover-cc {
  position: absolute;
  bottom: 20px;
  right: 40px;
  font-size: 11px;
  color: #aaa;
  letter-spacing: 0.5px;
}
</style>
