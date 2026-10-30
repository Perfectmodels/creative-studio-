# Creative Studio
**The Open Creative Platform**

Creative Studio is a privacy-first, open-source multimedia creation workspace. Its goal is to make video editing, short-form clipping, subtitles, image processing and social-media exports accessible from one installable web application.

## Product principles
- **Local-first:** media and projects stay on the user's device by default.
- **No mandatory account:** core workflows work without registration.
- **No central media storage:** no upload is required for local editing.
- **Private by design:** external AI providers are optional and require explicit consent before media leaves the device.
- **Open source:** no essential paid features, advertising or vendor lock-in.
- **Progressive enhancement:** features adapt to browser capabilities and available memory.

## Current status
This repository contains the initial application foundation and technical roadmap. It is an early-stage project; advanced editing, transcription and AI processing are not implemented yet.

## Planned stack
- Next.js App Router, React and TypeScript
- Tailwind CSS
- PWA manifest and service worker
- Web APIs: WebCodecs, Web Audio API, Canvas, Web Workers and OPFS, with feature detection and fallbacks
- FFmpeg.wasm only where native browser APIs are insufficient
- ONNX Runtime Web and local models as optional, license-verified AI components

## Development
Requirements: Node.js 20.9+ and pnpm 9+.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Roadmap
1. Import local media and manage a local project.
2. Generate transcripts and identify candidate short clips.
3. Edit a vertical timeline with subtitles and basic overlays.
4. Export MP4 and common social formats.
5. Add image tools, templates, audio tools and a permission-based plugin system.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/ROADMAP.md](docs/ROADMAP.md).

## Privacy
Creative Studio must never upload, persist or transmit user media without clear, informed, per-action consent. Browser storage is local to the device and can be cleared by the browser or operating system. Users must be able to export and delete their projects.

## License
The application code is intended to be distributed under **GNU AGPL v3 or later**. See [LICENSE](LICENSE). Third-party libraries, models, fonts, templates and media assets retain their own licenses; each must be reviewed before distribution.
