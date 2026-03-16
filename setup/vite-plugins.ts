import { defineVitePluginsSetup } from '@slidev/types'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Plugin } from 'vite'

const exec = promisify(execFile)

function codeRunnerPlugin(): Plugin {
  return {
    name: 'code-runner',
    configureServer(server) {
      server.middlewares.use('/__python_run', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let body = ''
        for await (const chunk of req) body += chunk
        try {
          const { code } = JSON.parse(body)
          const { stdout, stderr } = await exec('/opt/homebrew/bin/uv', ['run', 'python', '-c', code], { timeout: 10000 })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ output: stderr ? `${stdout}\n${stderr}` : stdout }))
        } catch (e: any) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: e.stderr || e.message }))
        }
      })

      server.middlewares.use('/__bash_run', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let body = ''
        for await (const chunk of req) body += chunk
        try {
          const { code } = JSON.parse(body)
          const { stdout, stderr } = await exec('/bin/bash', ['-c', code], { timeout: 10000 })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ output: stderr ? `${stdout}\n${stderr}` : stdout }))
        } catch (e: any) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: e.stderr || e.message }))
        }
      })

      server.middlewares.use('/__r_run', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let body = ''
        for await (const chunk of req) body += chunk
        try {
          const { code } = JSON.parse(body)
          const { stdout, stderr } = await exec('/usr/local/bin/Rscript', ['-e', code], { timeout: 10000 })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ output: stderr ? `${stdout}\n${stderr}` : stdout }))
        } catch (e: any) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: e.stderr || e.message }))
        }
      })

      server.middlewares.use('/__gemini_run', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let body = ''
        for await (const chunk of req) body += chunk
        try {
          const { code } = JSON.parse(body)
          const apiKey = process.env.GEMINI_API_KEY
          if (!apiKey) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'GEMINI_API_KEY not set. Add it to .env or export it.' }))
            return
          }
          const apiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: code }] }],
              }),
              signal: AbortSignal.timeout(30000),
            },
          )
          if (!apiRes.ok) {
            const err = await apiRes.text()
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: `Gemini API error: ${apiRes.status} ${err}` }))
            return
          }
          const reader = apiRes.body!.getReader()
          const decoder = new TextDecoder()
          let fullText = ''
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk_text = decoder.decode(value, { stream: true })
            for (const line of chunk_text.split('\n')) {
              if (!line.startsWith('data: ')) continue
              const jsonStr = line.slice(6).trim()
              if (!jsonStr || jsonStr === '[DONE]') continue
              try {
                const parsed = JSON.parse(jsonStr)
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
                if (text) fullText += text
              } catch {}
            }
          }
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ output: fullText || '(no response)' }))
        } catch (e: any) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: e.message }))
        }
      })
    },
  }
}

export default defineVitePluginsSetup(() => {
  return [codeRunnerPlugin()]
})
