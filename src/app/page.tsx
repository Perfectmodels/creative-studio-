"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight, AudioLines, Captions, CheckCircle2, FileImage, FileVideo,
  FolderOpen, Image as ImageIcon, Music2, Scissors, ShieldCheck, Sparkles,
  Upload, X,
} from "lucide-react";

type MediaKind = "video" | "audio" | "image" | "other";

const tools = [
  { icon: Scissors, title: "AI Video Clipper", desc: "Repérez les meilleurs moments et préparez des formats courts." },
  { icon: FileVideo, title: "Video Editor", desc: "Montez vos séquences sur une timeline multipiste." },
  { icon: Captions, title: "Sous-titres", desc: "Transcrivez, corrigez et stylisez vos sous-titres." },
  { icon: ImageIcon, title: "Image Studio", desc: "Recadrez, retouchez et optimisez vos visuels." },
  { icon: AudioLines, title: "Audio Studio", desc: "Nettoyez, découpez et mixez vos pistes audio." },
  { icon: FolderOpen, title: "Projets locaux", desc: "Retrouvez vos projets enregistrés sur cet appareil." },
];

function getKind(file: File): MediaKind {
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("image/")) return "image";
  return "other";
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " o";
  const units = ["Ko", "Mo", "Go", "To"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return value.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " " + units[unit];
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return "—";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return hours > 0
    ? [hours, String(minutes).padStart(2, "0"), String(secs).padStart(2, "0")].join(":")
    : [minutes, String(secs).padStart(2, "0")].join(":");
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [error, setError] = useState("");

  const kind = file ? getKind(file) : null;
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function selectFile(nextFile?: File) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("video/") && !nextFile.type.startsWith("audio/") && !nextFile.type.startsWith("image/")) {
      setError("Ce format n’est pas encore pris en charge. Sélectionnez une vidéo, une image ou un fichier audio.");
      return;
    }
    setError("");
    setDuration(null);
    setDimensions(null);
    setFile(nextFile);
  }

  function clearFile() {
    setFile(null);
    setDuration(null);
    setDimensions(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-studio-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400 text-black"><Sparkles size={19} /></span>
            <span>creative<span className="text-violet-300">studio</span></span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-studio-line px-3 py-1.5 text-xs text-studio-muted sm:flex"><ShieldCheck size={14} /> Local-first · Open source</div>
          <a href="https://github.com/Perfectmodels/creative-studio-" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-studio-muted hover:text-white">GitHub <ArrowUpRight size={15} /></a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[.24em] text-violet-300">The Open Creative Platform</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Your creative workspace.<br /><span className="text-studio-muted">Your files stay yours.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-studio-muted sm:text-lg">Une plateforme libre pour créer, monter et transformer vos contenus vidéo, audio et image. Le traitement local est la priorité : vos médias restent sur votre appareil.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-studio-line bg-studio-panel p-5 sm:p-6">
            {!file ? (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files?.[0]); }}
                className={`flex min-h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition ${dragging ? "border-violet-300 bg-violet-300/10" : "border-studio-line hover:border-violet-300/60"}`}
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-violet-300"><Upload size={22} /></span>
                <strong className="text-base">Importez un média pour commencer</strong>
                <span className="mt-2 text-sm text-studio-muted">Glissez un fichier ici ou parcourez votre appareil</span>
                <span className="mt-4 text-xs text-studio-muted">Vidéo · Image · Audio · Aucun transfert serveur</span>
              </button>
            ) : (
              <div>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                      {kind === "video" ? <FileVideo size={19} /> : kind === "image" ? <FileImage size={19} /> : <Music2 size={19} />}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="mt-1 text-xs text-studio-muted">{formatBytes(file.size)} · {file.type || "Type inconnu"}</p>
                    </div>
                  </div>
                  <button type="button" onClick={clearFile} aria-label="Retirer le média" className="rounded-lg p-2 text-studio-muted hover:bg-white/5 hover:text-white"><X size={18} /></button>
                </div>

                <div className="overflow-hidden rounded-xl border border-studio-line bg-black">
                  {kind === "video" && previewUrl && (
                    <video src={previewUrl} controls playsInline className="max-h-[420px] w-full" onLoadedMetadata={(event) => {
                      const video = event.currentTarget;
                      setDuration(video.duration);
                      setDimensions({ width: video.videoWidth, height: video.videoHeight });
                    }} />
                  )}
                  {kind === "audio" && previewUrl && (
                    <div className="flex min-h-44 flex-col items-center justify-center gap-5 p-8">
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-400/10 text-violet-300"><Music2 size={28} /></span>
                      <audio src={previewUrl} controls className="w-full max-w-lg" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} />
                    </div>
                  )}
                  {kind === "image" && previewUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt={file.name} className="mx-auto max-h-[420px] w-auto max-w-full object-contain" onLoad={(event) => {
                      const image = event.currentTarget;
                      setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
                    }} />
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-studio-line p-3"><p className="text-[11px] text-studio-muted">Format</p><p className="mt-1 text-sm font-medium">{file.type.split("/")[1]?.toUpperCase() || "—"}</p></div>
                  <div className="rounded-xl border border-studio-line p-3"><p className="text-[11px] text-studio-muted">Durée</p><p className="mt-1 text-sm font-medium">{duration === null ? "—" : formatDuration(duration)}</p></div>
                  <div className="rounded-xl border border-studio-line p-3"><p className="text-[11px] text-studio-muted">Dimensions</p><p className="mt-1 text-sm font-medium">{dimensions ? `${dimensions.width} × ${dimensions.height}` : "—"}</p></div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300"><CheckCircle2 size={15} /> Média chargé localement sur cet appareil</div>
              </div>
            )}
            <input ref={inputRef} type="file" accept="video/*,audio/*,image/*" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} />
            {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-studio-line bg-studio-panel p-6">
            <div>
              <p className="text-sm text-studio-muted">Espace de travail</p>
              <h2 className="mt-2 text-2xl font-semibold">Tout commence ici.</h2>
              <p className="mt-3 text-sm leading-6 text-studio-muted">Sélectionnez un média, prévisualisez-le et consultez ses propriétés. Cette première brique fonctionne directement dans votre navigateur.</p>
            </div>
            <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300"><ShieldCheck size={16} /> Confidentialité locale</div>
              <p className="mt-2 text-xs leading-5 text-studio-muted">Le fichier est lu depuis votre appareil via une URL temporaire du navigateur. Il n’est ni téléversé ni conservé sur un serveur.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="mb-6 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-studio-muted">Workspace</p><h2 className="mt-2 text-2xl font-semibold">Creative tools</h2></div><span className="text-xs text-studio-muted">Feuille de route initiale</span></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tools.map(({ icon: Icon, title, desc }) => <article key={title} className="rounded-2xl border border-studio-line bg-studio-panel p-5"><div className="mb-5 flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-violet-300"><Icon size={19} /></span><span className="rounded-full border border-studio-line px-2.5 py-1 text-[10px] text-studio-muted">À construire</span></div><h3 className="font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-studio-muted">{desc}</p></article>)}</div>
      </section>
      <footer className="border-t border-studio-line px-5 py-7 text-center text-xs text-studio-muted">Creative Studio · Logiciel libre · Conçu pour garder le contrôle de vos créations.</footer>
    </main>
  );
}
