import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {ReelComposition} from '../components/reel-composition';
import {examplePrompt,newProject} from '../lib/storyboard';
const demo=newProject(examplePrompt,'fashion',30);
const RemotionRoot=()=> <Composition id="ReelPilot" component={ReelComposition} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{project:demo}} calculateMetadata={({props})=>({durationInFrames:props.project.scenes.reduce((a,s)=>a+Math.max(1,Math.round(s.duration*30)),0)})}/>;
registerRoot(RemotionRoot);
