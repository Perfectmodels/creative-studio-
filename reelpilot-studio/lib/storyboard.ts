export type Preset = 'fashion' | 'news' | 'story';
export type Scene = {id:string; title:string; body:string; duration:number; emphasis:string};
export type StudioProject = {
  id:string; name:string; prompt:string; preset:Preset; duration:number;
  brand:string; accent:string; scenes:Scene[]; createdAt:string; updatedAt:string;
};
export const presets: {id:Preset; label:string; eyebrow:string; color:string; description:string}[] = [
  {id:'fashion',label:'Fashion Editorial',eyebrow:'MODE / LUXE',color:'#e7ad86',description:'Titres cinétiques, élégance, typographie affirmée.'},
  {id:'news',label:'Flash Actualité',eyebrow:'NEWS / FLASH',color:'#ff6c7a',description:'Rythme court, faits saillants, transitions franches.'},
  {id:'story',label:'Storytelling',eyebrow:'RÉCIT / CRÉATEUR',color:'#a8b8ff',description:'Narration immersive, découpage, progression.'}
];
export const examplePrompt = 'La nouvelle génération de créateurs gabonais réinvente la mode contemporaine en valorisant les savoir-faire locaux, les matières et les silhouettes audacieuses.';
const makeId = () => Math.random().toString(36).slice(2,10);
export function createScenes(text:string, duration:number):Scene[] {
  const raw = text.trim().replace(/\s+/g, ' ');
  const chunks = raw.split(/(?<=[.!?])\s+/).filter(Boolean);
  const pieces = chunks.length > 1 ? chunks : (raw.match(/.{1,90}(?:\s|$)/g) || [raw]);
  const count = Math.max(3, Math.min(6, Math.ceil(duration / 8)));
  const groups:string[] = Array.from({length:count},()=> '');
  pieces.forEach((piece,i) => {const idx=Math.min(count-1,Math.floor(i*count/pieces.length)); groups[idx]+=(groups[idx]?' ':'')+piece.trim()});
  const words=raw.split(' ').filter(Boolean);
  const defaults=['L’IDÉE', 'LE CONTEXTE', 'CE QUI CHANGE', 'À RETENIR', 'L’ESSENTIEL', 'LA SUITE'];
  return groups.map((text,i)=>{
    const fallback=words.slice(Math.floor(i*words.length/count),Math.floor((i+1)*words.length/count)).join(' ');
    const body=text || fallback || raw;
    return {id:makeId(),title:i===0?'L’ACCROCHE':defaults[i],body,duration:duration/count,emphasis:(body.split(' ').slice(0,4).join(' ') || 'REELPILOT').toUpperCase()};
  });
}
export function newProject(prompt:string,preset:Preset,duration:number):StudioProject {
 const date=new Date().toISOString(); const meta=presets.find(p=>p.id===preset)!;
 return {id:makeId(), name:prompt.trim().slice(0,58) || 'Sans titre',prompt,preset,duration,brand:'Ma marque',accent:meta.color,scenes:createScenes(prompt,duration),createdAt:date,updatedAt:date};
}
export function prettyDate(v:string){try{return new Date(v).toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})}catch{return '—'}}
