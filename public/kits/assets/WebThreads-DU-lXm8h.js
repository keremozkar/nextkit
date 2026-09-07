import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u={center:0,left:1,right:2},d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);

  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;

  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;

    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;

    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;

    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);

    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);

  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    float d2 = dot(md, md);
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-d2 * 6.0) * 0.6;
  }
  col *= bright;

  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;

  vec3 outRgb = col * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  if (uLightMode) {
    vec3 mapped = vec3(1.0) - exp(-max(col, vec3(0.0)) * 1.3);
    float rawEnergy = clamp(max(mapped.r, max(mapped.g, mapped.b)) * uOpacity, 0.0, 1.0);
    float coverage = smoothstep(0.18, 0.72, rawEnergy);
    coverage *= coverage;
    vec3 hue = mapped / max(max(mapped.r, max(mapped.g, mapped.b)), 1e-4);
    vec3 chroma = pow(clamp(hue, 0.0, 1.0), vec3(0.78));
    vec3 pigment = mix(chroma, vec3(0.08), 0.12);
    vec3 ink = mix(vec3(0.9), pigment, 0.82 + coverage * 0.18);
    fragColor = vec4(mix(uBackgroundColor, ink, coverage), 1.0);
  } else {
    fragColor = vec4(outRgb, alpha);
  }
}
`,p=new WeakMap,m=({color1:e=`#5227FF`,color2:t=`#FF9FFC`,color3:n=`#FFFFFF`,speed:m=.2,threadCount:h=6,frequency:g=5,spread:_=.18,taper:v=1,position:y=.5,fanMode:b=`center`,glow:x=.02,falloff:S=.6,thickness:C=1.1,brightness:w=.6,opacity:T=1,mirror:E=!0,shimmer:D=!1,grain:O=!0,grainIntensity:k=.05,mouseInteraction:A=!0,mouseStrength:j=.3,backgroundColor:M=`#FFFFFF`,lightMode:N=!1,className:P=``})=>{let F=(0,s.useRef)(null),I=(0,s.useRef)({enabled:!0,strength:.3});return(0,s.useEffect)(()=>{let e=F.current;if(!e)return;let t=new i({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:d,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.2},uThreadCount:{value:6},uFrequency:{value:5},uSpread:{value:.18},uTaper:{value:1},uPosition:{value:.5},uFanMode:{value:0},uGlow:{value:.02},uFalloff:{value:.6},uThickness:{value:1.1},uBrightness:{value:.6},uOpacity:{value:1},uMirror:{value:1},uShimmer:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uBackgroundColor:{value:new Float32Array([1,1,1])},uLightMode:{value:!1},uMouse:{value:new Float32Array([.5,.5])},uMouseStrength:{value:.3},uEnableMouse:{value:1},uMouseActive:{value:0}}}),u=new a(n,{geometry:c,program:l});p.set(e,{renderer:t,program:l,mesh:u});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:u})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=0,y=0,b=e=>{let t=s.getBoundingClientRect();_[0]=(e.clientX-t.left)/t.width,_[1]=1-(e.clientY-t.top)/t.height,y=1},x=()=>{y=1},S=()=>{y=0};s.addEventListener(`mousemove`,b),s.addEventListener(`mouseenter`,x),s.addEventListener(`mouseleave`,S);let C=0,w=!0,T=!document.hidden,E=performance.now(),D=e=>{l.uniforms.iTime.value=(e-E)*.001,g[0]+=.05*(_[0]-g[0]),g[1]+=.05*(_[1]-g[1]),v+=.05*(y-v),l.uniforms.uMouse.value[0]=g[0],l.uniforms.uMouse.value[1]=g[1],l.uniforms.uMouseActive.value=v,l.uniforms.uEnableMouse.value=+!!I.current.enabled,l.uniforms.uMouseStrength.value=I.current.strength,t.render({scene:u}),C=requestAnimationFrame(D)},O=()=>{w&&T&&C===0&&(C=requestAnimationFrame(D))},k=()=>{C!==0&&(cancelAnimationFrame(C),C=0)},A=new IntersectionObserver(([e])=>{w=e.isIntersecting,w?O():k()},{threshold:0});A.observe(e);let j=()=>{T=!document.hidden,T?O():k()};return document.addEventListener(`visibilitychange`,j),O(),()=>{k(),h.disconnect(),A.disconnect(),document.removeEventListener(`visibilitychange`,j),s.removeEventListener(`mousemove`,b),s.removeEventListener(`mouseenter`,x),s.removeEventListener(`mouseleave`,S),p.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=F.current;if(!r)return;let i=p.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=m,o.uThreadCount.value=Math.round(h),o.uFrequency.value=g,o.uSpread.value=_,o.uTaper.value=v,o.uPosition.value=y,o.uFanMode.value=u[b]??0,o.uGlow.value=x,o.uFalloff.value=S,o.uThickness.value=C,o.uBrightness.value=w,o.uOpacity.value=T,o.uMirror.value=+!!E,o.uShimmer.value=+!!D,o.uGrain.value=+!!O,o.uGrainIntensity.value=k;let s=o.uColor1.value,c=l(e);s[0]=c[0],s[1]=c[1],s[2]=c[2];let d=o.uColor2.value,f=l(t);d[0]=f[0],d[1]=f[1],d[2]=f[2];let P=o.uColor3.value,L=l(n);P[0]=L[0],P[1]=L[1],P[2]=L[2];let R=l(M);o.uBackgroundColor.value[0]=R[0],o.uBackgroundColor.value[1]=R[1],o.uBackgroundColor.value[2]=R[2],o.uLightMode.value=N,o.uMouseStrength.value=j,o.uEnableMouse.value=+!!A,I.current.enabled=A,I.current.strength=j},[e,t,n,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N]),(0,c.jsx)(`div`,{ref:F,className:`web-threads-container ${P}`.trim()})};export{m as default};