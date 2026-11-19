import {NextRequest,NextResponse} from 'next/server';
import {createScenes} from '../../../lib/storyboard';
export const runtime='nodejs';
export async function GET(){return NextResponse.json({aiConfigured:Boolean(process.env.OPENAI_API_KEY)})}
export async function POST(request:NextRequest){
 try{
  const body=await request.json();const prompt=String(body.prompt||'').trim().slice(0,12000);const duration=Math.max(15,Math.min(90,Number(body.duration)||30));
  if(!prompt)return NextResponse.json({error:'Texte requis'},{status:400});
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({mode:'local',title:prompt.slice(0,58),scenes:createScenes(prompt,duration)});
  const count=Math.max(3,Math.min(6,Math.round(duration/8)));
  const system=`Tu produis des storyboards de Reels en français. Tu fournis du JSON strict sans Markdown sous la forme {"title":"...","scenes":[{"title":"...","body":"...","emphasis":"...","duration":number}]}. Exactement ${count} scènes, durée totale ${duration}s. Hook fort, français naturel, textes concis et lisibles, sans inventer des faits ou des citations. N'utilise que les faits fournis. Le texte doit être prêt à être publié après vérification humaine.`;
  const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',temperature:0.7,response_format:{type:'json_object'},messages:[{role:'system',content:system},{role:'user',content:`Sujet: ${prompt}`}]})});
  if(!r.ok)throw new Error(`Erreur du fournisseur IA (${r.status})`);
  const data=await r.json();const output=JSON.parse(data.choices?.[0]?.message?.content||'{}');
  if(!Array.isArray(output.scenes)||!output.scenes.length)throw new Error('Réponse IA incomplète');
  const base=duration/output.scenes.length;const scenes=output.scenes.slice(0,8).map((s:{title?:string;body?:string;emphasis?:string},i:number)=>({id:`scene-${i}-${Date.now()}`,title:String(s.title||`SCÈNE ${i+1}`).slice(0,65),body:String(s.body||'').slice(0,550),emphasis:String(s.emphasis||s.title||'').slice(0,65),duration:base}));
  return NextResponse.json({mode:'ai',title:String(output.title||prompt).slice(0,90),scenes});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Erreur inattendue'},{status:502})}
}
