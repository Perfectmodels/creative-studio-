import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import type {StudioProject,Scene} from '../lib/storyboard';
const fonts = {fashion:"'Georgia', 'Times New Roman', serif",news:"'Arial Black', Impact, sans-serif",story:"Arial, sans-serif"};
function ReelScene({scene,project,index,total}:{scene:Scene,project:StudioProject,index:number,total:number}){
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const entry=interpolate(frame,[0,Math.min(13,fps/2)],[48,0],{extrapolateRight:'clamp'});
 const opacity=interpolate(frame,[0,10],[0,1],{extrapolateRight:'clamp'});
 const scale=interpolate(frame,[0,120],[1,1.1],{extrapolateRight:'clamp'});
 const isNews=project.preset==='news';
 const isFashion=project.preset==='fashion';
 return <AbsoluteFill style={{background: isNews?'linear-gradient(140deg,#1b1b33,#080811 62%)':isFashion?'linear-gradient(135deg,#241c1a,#0c0d14 60%)':'linear-gradient(125deg,#171a36,#080b1a 65%)', color:'#f5f3ed',overflow:'hidden'}}>
  <AbsoluteFill style={{opacity:.7,transform:`scale(${scale})`,background:`radial-gradient(ellipse at ${index%2===0?'100% 20%':'0% 80%'}, ${project.accent}44, transparent 55%)`}}/>
  <div style={{position:'absolute',top:80,left:70,right:70,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'Arial,sans-serif',fontSize:22,letterSpacing:4}}>
   <span style={{fontWeight:900}}>{project.brand.toUpperCase()}</span><span style={{color:project.accent}}>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
  </div>
  <div style={{position:'absolute',top:310,left:70,right:75,transform:`translateY(${entry}px)`,opacity}}>
   <div style={{display:'inline-block',background:project.accent,color:'#101017',padding:'11px 20px',fontSize:23,fontWeight:850,fontFamily:'Arial,sans-serif',letterSpacing:3,marginBottom:32}}>{scene.title.toUpperCase()}</div>
   <div style={{fontFamily:fonts[project.preset],fontWeight:900,fontSize:isFashion?105:94,lineHeight:1.03,letterSpacing:-4,overflowWrap:'break-word',textTransform:isFashion?'none':'uppercase'}}>{scene.emphasis.slice(0,66)}</div>
   <div style={{width:100,height:5,background:project.accent,marginTop:44,marginBottom:34}}/>
   <div style={{fontSize:41,lineHeight:1.31,fontFamily:'Arial,sans-serif',fontWeight:500,color:'#e7e2e6',overflowWrap:'break-word',maxHeight:400,overflow:'hidden'}}>{scene.body.slice(0,235)}</div>
  </div>
  <div style={{position:'absolute',bottom:105,left:70,right:70,display:'flex',alignItems:'center',gap:20,fontSize:23,fontFamily:'Arial,sans-serif',letterSpacing:2,color:'#d3ccd0'}}><span style={{width:18,height:18,background:project.accent,borderRadius:20}}/>REELPILOT STUDIO <span style={{marginLeft:'auto'}}>VERTICAL / 9:16</span></div>
 </AbsoluteFill>
}
export function ReelComposition({project}:{project:StudioProject}){
 let offset=0;
 return <AbsoluteFill style={{background:'#0a0b12'}}>{project.scenes.map((scene,i)=>{
   const from=offset; const frames=Math.max(1,Math.round(scene.duration*30));offset+=frames;
   return <Sequence key={scene.id} from={from} durationInFrames={frames}><ReelScene scene={scene} project={project} index={i} total={project.scenes.length}/></Sequence>
 })}</AbsoluteFill>
}
export const projectFrames=(p:StudioProject)=>Math.max(1,p.scenes.reduce((a,s)=>a+Math.max(1,Math.round(s.duration*30)),0));
