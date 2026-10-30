"use client";
import { useState } from "react";
import { Film, Image as ImageIcon, AudioLines, Scissors, Captions, FolderOpen, ShieldCheck, Sparkles, Upload, ArrowUpRight } from "lucide-react";
const tools = [
  { icon: Scissors, title: "AI Video Clipper", desc: "Repérez les meilleurs moments et préparez des formats courts." },
  { icon: Film, title: "Video Editor", desc: "Montez vos séquences sur une timeline multipiste." },
  { icon: Captions, title: "Sous-titres", desc: "Transcrivez, corrigez et stylisez vos sous-titres." },
  { icon: ImageIcon, title: "Image Studio", desc: "Recadrez, retouchez et optimisez vos visuels." },
  { icon: AudioLines, title: "Audio Studio", desc: "Nettoyez, découpez et mixez vos pistes audio." },
  { icon: FolderOpen, title: "Projets locaux", desc: "Retrouvez vos projets enregistrés sur cet appareil." },
];
export default function Home() {
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  return <main className="min-h-screen">
    <header className="border-b border-studio-line"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
      <a href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400 text-black"><Sparkles size={19}/></span><span>creative<span className="text-violet-300">studio</span></span></a>
      <div className="hidden items-center gap-2 rounded-full border border-studio-line px-3 py-1.5 text-xs text-studio-muted sm:flex"><ShieldCheck size={14}/> Local-first · Open source</div>
      <a href="https://github.com/Perfectmodels/creative-studio-" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-studio-muted hover:text-white">GitHub <ArrowUpRight size={15}/></a>
    </div></header>
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:pt-24">
      <div className="max-w-3xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[.24em] text-violet-300">The Open Creative Platform</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Your creative workspace.<br/><span className="text-studio-muted">Your files stay yours.</span></h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-studio-muted sm:text-lg">Une plateforme libre pour créer, monter et transformer vos contenus vidéo, audio et image. Le traitement local est la priorité : vos médias restent sur votre appareil.</p></div>
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <label onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); setFileName(e.dataTransfer.files?.[0]?.name ?? ""); }} className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition ${dragging ? "border-violet-300 bg-violet-300/10" : "border-studio-line bg-studio-panel hover:border-violet-300/60"}`}>
          <input type="file" accept="video/*,audio/*,image/*" className="sr-only" onChange={e => setFileName(e.target.files?.[0]?.name ?? "")}/>
          <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-violet-300"><Upload size={22}/></span>
          <strong className="text-base">{fileName || "Importez un média pour commencer"}</strong><span className="mt-2 text-sm text-studio-muted">Glissez un fichier ici ou parcourez votre appareil</span><span className="mt-4 text-xs text-studio-muted">Aucun transfert serveur · Import local uniquement</span>
        </label>
        <div className="flex flex-col justify-between rounded-2xl border border-studio-line bg-studio-panel p-6"><div><p className="text-sm text-studio-muted">Espace de travail</p><h2 className="mt-2 text-2xl font-semibold">Tout commence ici.</h2><p className="mt-3 text-sm leading-6 text-studio-muted">La première version pose les bases d’un studio multimédia accessible, installable et respectueux de la vie privée.</p></div><div className="mt-8 flex items-center gap-2 text-xs text-emerald-300"><ShieldCheck size={15}/> Vos médias ne sont pas envoyés dans le cloud.</div></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 pb-24"><div className="mb-6 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-studio-muted">Workspace</p><h2 className="mt-2 text-2xl font-semibold">Creative tools</h2></div><span className="text-xs text-studio-muted">Feuille de route initiale</span></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tools.map(({ icon: Icon, title, desc }) => <article key={title} className="rounded-2xl border border-studio-line bg-studio-panel p-5"><div className="mb-5 flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-violet-300"><Icon size={19}/></span><span className="rounded-full border border-studio-line px-2.5 py-1 text-[10px] text-studio-muted">À construire</span></div><h3 className="font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-studio-muted">{desc}</p></article>)}</div>
    </section>
    <footer className="border-t border-studio-line px-5 py-7 text-center text-xs text-studio-muted">Creative Studio · Logiciel libre · Conçu pour garder le contrôle de vos créations.</footer>
  </main>;
}
