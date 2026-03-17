# IMS-IMWG 2025 Slidev Project

## Dev Server

- Tailscale Funnel: `tailscale funnel --set-path=/ims-imwg-2025 3030`
- URL: `https://hsieh-tingmac-mini.tail33af84.ts.net/ims-imwg-2025/`
- `vite.config.ts` sets `base: '/ims-imwg-2025/'` to match the funnel path
- `vite.config.ts`: `server.allowedHosts` includes the Tailscale hostname
- `NODE_OPTIONS='--dns-result-order=ipv4first'` in the dev script forces IPv4 binding (Node/Vite defaults to IPv6 `[::1]` which Tailscale Funnel can't reach)

## Formatting

- Use `<!-- prettier-ignore -->` before markdown tables inside HTML `<div>` containers to prevent prettier from breaking table alignment in two-column layouts
