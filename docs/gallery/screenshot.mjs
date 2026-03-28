import { chromium } from 'playwright-chromium'
import { spawn } from 'child_process'
import { setTimeout } from 'timers/promises'

const SLIDES = [1, 2, 3, 4, 5, 6]
const PORT = 3033
const OUT = 'docs/gallery'

// Start dev server without base path for local screenshots
const server = spawn('pnpm', ['exec', 'slidev', '--port', String(PORT), '--base', '/'], {
  env: { ...process.env, NODE_OPTIONS: '--dns-result-order=ipv4first' },
  stdio: 'pipe',
})

// Wait for server to be ready
await new Promise((resolve) => {
  server.stdout.on('data', (data) => {
    if (data.toString().includes('http')) resolve()
  })
  server.stderr.on('data', (data) => {
    if (data.toString().includes('http')) resolve()
  })
})
await setTimeout(5000)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 960, height: 540 } })

for (const n of SLIDES) {
  const url = `http://localhost:${PORT}/${n}`
  console.log(`Capturing slide ${n}: ${url}`)
  await page.goto(url, { waitUntil: 'networkidle' })
  await setTimeout(2000)
  await page.screenshot({ path: `${OUT}/slide-${String(n).padStart(2, '0')}.png` })
}

await browser.close()
server.kill()
console.log('Done!')
process.exit(0)
