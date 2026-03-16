import { defineCodeRunnersSetup } from '@slidev/types'

async function runCode(endpoint: string, code: string) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    const data = await res.json()
    if (data.error)
      return { error: data.error }
    const escaped = data.output
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
    return { html: escaped }
  } catch (e: any) {
    return { error: e.message }
  }
}

export default defineCodeRunnersSetup(() => {
  return {
    python: (code: string) => runCode('/__python_run', code),
    bash: (code: string) => runCode('/__bash_run', code),
    shell: (code: string) => runCode('/__bash_run', code),
    sh: (code: string) => runCode('/__bash_run', code),
    r: (code: string) => runCode('/__r_run', code),
    R: (code: string) => runCode('/__r_run', code),
  }
})
