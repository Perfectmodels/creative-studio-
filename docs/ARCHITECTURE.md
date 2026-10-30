# Architecture

## Guiding constraints
Creative Studio is a local-first PWA. Vercel distributes the application and may host lightweight metadata endpoints, but must not be used as a general-purpose video-rendering or media-storage backend.

## Application layers
- **Presentation:** Next.js App Router, React and accessible UI components.
- **Project core:** versioned project schema, undo/redo, autosave and import/export.
- **Media manager:** local file handles, metadata, thumbnails and permission-aware access.
- **Timeline engine:** tracks, clips, transitions, keyframes and deterministic edits.
- **Video engine:** WebCodecs where supported; FFmpeg.wasm as a carefully bounded fallback.
- **Audio engine:** Web Audio API, waveform analysis and audio processing.
- **Image engine:** Canvas/WebGL with optional WASM processing.
- **AI engine:** browser inference first; external providers behind explicit opt-in adapters.
- **Export engine:** format presets, progress reporting, cancellation and integrity checks.
- **Plugin SDK:** capability-based permissions, isolated execution and explicit user approval.

## Local persistence
Use OPFS for large binary working data where available and IndexedDB for project metadata, settings and indexes. Provide export/import backups and clear deletion controls. Never assume browser storage is permanent or unlimited.

## Media privacy
1. Import must not upload media.
2. External inference requires a clear provider, purpose and file-level confirmation.
3. Do not store media in analytics, logs or crash reports.
4. Explain browser limitations before requesting file-system permissions.
5. Provide a visible way to revoke permissions and delete local project data.

## Performance
Use Web Workers for expensive tasks. Avoid loading FFmpeg or AI model weights until a feature is invoked. Check memory and codec support before processing. Provide cancellation and progress for long operations.

## Deployment
Deploy the Next.js frontend on Vercel. Keep CPU/GPU-intensive media work in the browser. Any future server-side adapter must be optional, bounded, documented and disabled by default.
