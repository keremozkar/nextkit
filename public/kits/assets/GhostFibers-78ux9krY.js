import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=e.trim().replace(/^#/,``),n=t.length===3?t.replace(/./g,e=>e+e):t,r=/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return r?[parseInt(r[1],16)/255,parseInt(r[2],16)/255,parseInt(r[3],16)/255]:[1,1,1]},u=(e,t)=>{let n=l(t);e.value[0]=n[0],e.value[1]=n[1],e.value[2]=n[2]},d=`#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uLayerSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uTwistSpeed;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform float uRotationSpeed;
uniform float uLightMode;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;

out vec4 fragColor;

#define MAX_LAYERS 10

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float grainHash(vec2 point) {
  point = floor(point);
  float hash = 52.9829189 * fract(dot(point, vec2(0.065, 0.005)));
  return fract(hash);
}

float layeredGrain(vec2 fragmentPixel) {
  vec2 point = mod(fragmentPixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
  float grain = 0.0;
  grain += 0.40 * grainHash(rotated);
  grain += 0.25 * grainHash(rotated * 2.0 + 17.0);
  grain += 0.20 * grainHash(rotated * 4.0 + 47.0);
  grain += 0.10 * grainHash(rotated * 8.0 + 113.0);
  grain += 0.05 * grainHash(rotated * 16.0 + 191.0);
  return grain;
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
  float time = uTime * uSpeed;
  vec3 backdrop = mix(vec3(0.070588, 0.058824, 0.090196), vec3(1.0), step(0.5, uLightMode));
  vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
  vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;
  vec2 p = uv;
  p /= max(uScale, 0.05);
  p = rotate2d(radians(uRotation) + time * uRotationSpeed) * p;
  vec3 color = vec3(0.0);
  float fiberField = 0.0;

  for (int index = 0; index < MAX_LAYERS; index++) {
    float fi = float(index) + 1.0;
    if (fi > uLayers) break;

    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + time * (uWaveSpeed + fi * uLayerSpeed));

    float radius = length(p);
    float polarAngle = atan(p.y, p.x);
    polarAngle += sin(radius * uTwistFrequency - time * uTwistSpeed + fi) * uTwist;
    p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

    float lines = abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + time)));
    lines = pow(max(0.0, 1.0 - lines), uLineSharpness);
    fiberField += lines / fi;
    color += uLineColor * lines / fi;

    float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + time + fi)));
    color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
  }

  float center = exp(-2.2 * dot(uv, uv));
  color += centerTone * center;

  float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
  color += cloudTone * cloud;

  float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  color = 1.0 - exp(-color * uBrightness);
  color.b *= uBlueBoost;

  vec3 outputColor;
  if (uLightMode > 0.5) {
    float edgeFade = mix(1.0 - uVignette, 1.0, vignette);
    float fibers = pow(smoothstep(0.12, 1.05, fiberField) * edgeFade, 1.5);
    float atmosphere = (center * 0.025 + cloud * 0.015) * edgeFade;
    vec3 fiberInk = mix(backdrop, uLineColor, 0.52);
    vec3 airColor = mix(backdrop, uGlowColor, 0.16);

    outputColor = mix(backdrop, airColor, atmosphere);
    outputColor = mix(outputColor, fiberInk, fibers * 0.3);
  } else {
    outputColor = backdrop + color;
  }

  float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
  outputColor = clamp(outputColor + noise, 0.0, 1.0);
  fragColor = vec4(outputColor, 1.0);
}
`,p=new WeakMap,m=({lineColor:e=`#140E35`,glowColor:t=`#3437A0`,speed:n=.2,scale:m=2,rotation:h=0,rotationSpeed:g=.25,layers:_=4,waveAmplitude:v=.015,waveFrequency:y=3,waveSpeed:b=.15,layerSpeed:x=.08,twist:S=.1,twistFrequency:C=5,twistSpeed:w=1.2,lineFrequency:T=5,lineSpacing:E=2,lineSharpness:D=16,glowFalloff:O=10,glowIntensity:k=1.6,brightness:A=2,blueBoost:j=1.25,vignette:M=.8,grain:N=.05,lightMode:P=!1,dpr:F=1,fps:I=60,paused:L=!1,className:R=``})=>{let z=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=z.current;if(!e)return;let t=new i({webgl:2,alpha:!1,antialias:!1,dpr:Math.min(Math.max(F,.5),2)}),n=t.gl,s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,s.setAttribute(`aria-hidden`,`true`),e.appendChild(s);let c=new o(n),u=new r(n,{vertex:d,fragment:f,uniforms:{uResolution:{value:new Float32Array([1,1])},uTime:{value:0},uSpeed:{value:.2},uScale:{value:2},uRotation:{value:0},uRotationSpeed:{value:.25},uLayers:{value:4},uWaveAmplitude:{value:.015},uWaveFrequency:{value:3},uWaveSpeed:{value:.15},uLayerSpeed:{value:.08},uTwist:{value:.1},uTwistFrequency:{value:5},uTwistSpeed:{value:1.2},uLineFrequency:{value:5},uLineSpacing:{value:2},uLineSharpness:{value:16},uGlowFalloff:{value:10},uGlowIntensity:{value:1.6},uBrightness:{value:2},uBlueBoost:{value:1.25},uVignette:{value:.8},uGrain:{value:.05},uLightMode:{value:0},uLineColor:{value:new Float32Array(l(`#140E35`))},uGlowColor:{value:new Float32Array(l(`#3437A0`))}}}),m=new a(n,{geometry:c,program:u}),h=0,g=0,_=performance.now(),v=0,y=60,b=!1,x=!0,S=!document.hidden,C=window.matchMedia(`(prefers-reduced-motion: reduce)`),w=()=>t.render({scene:m}),T=()=>{h!==0&&cancelAnimationFrame(h),h=0},E=()=>x&&S&&!b&&!C.matches,D=e=>{if(h=0,!E())return;let t=Math.min((e-_)/1e3,.1);_=e,g+=t,e-v>=1e3/y-.5&&(u.uniforms.uTime.value=g,w(),v=e),h=requestAnimationFrame(D)},O=()=>{E()&&h===0&&(_=performance.now(),h=requestAnimationFrame(D))},k=()=>{let r=e.getBoundingClientRect();t.setSize(Math.max(1,Math.floor(r.width)),Math.max(1,Math.floor(r.height))),u.uniforms.uResolution.value[0]=n.drawingBufferWidth,u.uniforms.uResolution.value[1]=n.drawingBufferHeight,w()},A=()=>{S=!document.hidden,E()?O():T()},j=()=>{E()?O():(T(),w())},M=new ResizeObserver(k);M.observe(e);let N=new IntersectionObserver(([e])=>{x=e.isIntersecting,E()?O():T()},{threshold:0});return N.observe(e),document.addEventListener(`visibilitychange`,A),C.addEventListener(`change`,j),p.set(e,{renderer:t,program:u,mesh:m,render:w,setPaused(e){b=e,E()?O():(T(),w())},setFps(e){y=Math.min(Math.max(e,1),120)}}),k(),O(),()=>{T(),M.disconnect(),N.disconnect(),document.removeEventListener(`visibilitychange`,A),C.removeEventListener(`change`,j),p.delete(e),s.parentNode===e&&e.removeChild(s),n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[F]),(0,s.useEffect)(()=>{let r=z.current;if(!r)return;let i=p.get(r);if(!i)return;let a=i.program.uniforms;u(a.uLineColor,e),u(a.uGlowColor,t),a.uSpeed.value=n,a.uScale.value=m,a.uRotation.value=h,a.uRotationSpeed.value=g,a.uLayers.value=Math.min(Math.max(Math.round(_),1),10),a.uWaveAmplitude.value=v,a.uWaveFrequency.value=y,a.uWaveSpeed.value=b,a.uLayerSpeed.value=x,a.uTwist.value=S,a.uTwistFrequency.value=C,a.uTwistSpeed.value=w,a.uLineFrequency.value=T,a.uLineSpacing.value=E,a.uLineSharpness.value=D,a.uGlowFalloff.value=O,a.uGlowIntensity.value=k,a.uBrightness.value=A,a.uBlueBoost.value=j,a.uVignette.value=M,a.uGrain.value=N,a.uLightMode.value=+!!P,i.setFps(I),i.setPaused(L),i.render()},[e,t,n,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,I,L,F]),(0,c.jsx)(`div`,{ref:z,className:`ghost-fibers-container ${R}`.trim()})};export{m as default};