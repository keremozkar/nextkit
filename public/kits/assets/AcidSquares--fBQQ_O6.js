import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./RenderTarget-CTgTThLo.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},d={low:20,medium:32,high:48},f=e=>d[e]||d.medium,p=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,m=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uWaveDepth;
uniform float uZoom;
uniform float uDensity;
uniform float uSpread;
uniform float uStepSize;
uniform float uGlow;
uniform float uExposure;
uniform float uColorShift;
uniform float uContrast;
uniform float uBrightness;
uniform float uOpacity;
uniform float uSteps;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uEnableMouse;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
out vec4 fragColor;

void main() {
  vec2 frag = gl_FragCoord.xy;
  float zoom = max(uZoom, 0.05);
  float aspect = iResolution.x / iResolution.y;
  vec2 ndc = (2.0 * frag - iResolution.xy) / iResolution.y;
  vec2 dir = ndc * (0.5 / zoom);

  vec2 mouseNdc = vec2(uMouse.x * aspect, uMouse.y);
  float mr = max(uMouseRadius, 0.01);
  vec2 md = ndc - mouseNdc;
  float dent = exp(-dot(md, md) / (mr * mr)) * (3.0 * uMouseStrength * uEnableMouse * uMouseActive);

  float travel = sin(iTime * uSpeed) * uWaveDepth;
  float density = max(uDensity, 1.0);
  float spread = clamp(uSpread, 0.05, 0.6);
  float stepSize = max(uStepSize, 0.0005);
  float glowGain = max(uGlow, 0.0);

  vec3 tOffset = vec3(0.0, dent, travel);
  vec3 p = vec3(0.0);
  float s = 0.0;
  float glow = 0.0;

  for (int i = 0; i < 64; i++) {
    if (float(i) >= uSteps) break;
    p += vec3(dir * s, s);
    vec3 q = p + tOffset;
    s += density - length(q.xz) + length(ceil(q).xy);
    s = stepSize + abs(s) * spread;
    glow += glowGain / s;
  }

  float e = glow / max(uExposure, 1.0);
  float shimmer = 0.5 + 0.5 * dot(cos(iTime * uColorShift + p), vec3(0.3333));
  float v = tanh(e * uBrightness * mix(0.7, 1.05, shimmer));
  v = clamp((v - 0.5) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.55, v));
  col = mix(col, uColor3, smoothstep(0.55, 1.0, v));
  col *= v;

  float a = clamp(v, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * a;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    a = clamp(a + gv, 0.0, 1.0);
  }
  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outRgb, a);
  }
}
`,h=`#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uDirection;
uniform float uRadius;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float iTime;
out vec4 fragColor;

vec4 samp(vec2 uv) {
  return texture(tMap, uv);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  vec2 texel = uDirection / iResolution;
  float st = uRadius * 0.25;
  vec4 sum = samp(uv) * 0.2026;
  sum += (samp(uv + texel * st) + samp(uv - texel * st)) * 0.179;
  sum += (samp(uv + texel * (st * 2.0)) + samp(uv - texel * (st * 2.0))) * 0.124;
  sum += (samp(uv + texel * (st * 3.0)) + samp(uv - texel * (st * 3.0))) * 0.0672;
  sum += (samp(uv + texel * (st * 4.0)) + samp(uv - texel * (st * 4.0))) * 0.0285;
  vec4 col = sum;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    col.rgb = clamp(col.rgb + gv, 0.0, 1.0);
    col.a = clamp(col.a + gv, 0.0, 1.0);
  }
  fragColor = col;
}
`,g=new WeakMap,_=({color1:e=`#5227FF`,color2:t=`#A855F7`,color3:n=`#FFFFFF`,detail:d=`medium`,speed:_=.7,waveDepth:v=1,zoom:y=1.3,density:b=10,glow:x=1,exposure:S=2700,spread:C=.3,stepSize:w=.002,colorShift:T=0,contrast:E=1,brightness:D=1,opacity:O=1,mouseInteraction:k=!0,mouseStrength:A=.1,mouseRadius:j=.35,blur:M=0,grain:N=!0,grainIntensity:P=.05,lightMode:F=!1,className:I=``})=>{let L=(0,c.useRef)(null),R=(0,c.useRef)([0,0]),z=(0,c.useRef)([0,0]),B=(0,c.useRef)(k),V=(0,c.useRef)(A),H=(0,c.useRef)(0),U=(0,c.useRef)(0),W=(0,c.useRef)(M),G=(0,c.useRef)(N),K=(0,c.useRef)(P);return(0,c.useEffect)(()=>{let e=L.current;if(!e)return;let t=new i({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let c=n.canvas;c.style.width=`100%`,c.style.height=`100%`,c.style.display=`block`,e.appendChild(c);let l=new s(n),u=new r(n,{vertex:p,fragment:m,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.7},uWaveDepth:{value:1},uZoom:{value:1.3},uDensity:{value:10},uSpread:{value:.3},uStepSize:{value:.002},uGlow:{value:1},uExposure:{value:2700},uColorShift:{value:0},uContrast:{value:1},uBrightness:{value:1},uOpacity:{value:1},uSteps:{value:32},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uMouse:{value:new Float32Array([0,0])},uMouseStrength:{value:.1},uMouseRadius:{value:.35},uEnableMouse:{value:1},uMouseActive:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLightMode:{value:0}}}),d=new a(n,{geometry:l,program:u}),f=new r(n,{vertex:p,fragment:h,uniforms:{tMap:{value:null},iResolution:{value:new Float32Array([1,1])},uDirection:{value:new Float32Array([1,0])},uRadius:{value:0},uGrain:{value:0},uGrainIntensity:{value:.05},iTime:{value:0}}}),_=new a(n,{geometry:l,program:f}),v=null,y=null,b=()=>{if(!v){let e=n.drawingBufferWidth,t=n.drawingBufferHeight;v=new o(n,{width:e,height:t,depth:!1}),y=new o(n,{width:e,height:t,depth:!1})}},x=()=>{let e=+!!G.current,n=K.current;if(u.uniforms.uGrainIntensity.value=n,f.uniforms.uGrainIntensity.value=n,W.current>0){b(),u.uniforms.uGrain.value=0,t.render({scene:d,target:v});let n=f.uniforms;n.uRadius.value=W.current*14,n.tMap.value=v.texture,n.uDirection.value[0]=1,n.uDirection.value[1]=0,n.uGrain.value=0,t.render({scene:_,target:y}),n.tMap.value=y.texture,n.uDirection.value[0]=0,n.uDirection.value[1]=1,n.uGrain.value=e,t.render({scene:_})}else u.uniforms.uGrain.value=e,t.render({scene:d})};g.set(e,{renderer:t,program:u,mesh:d});let S=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=n.drawingBufferWidth,s=n.drawingBufferHeight,c=u.uniforms.iResolution.value;c[0]=o,c[1]=s;let l=f.uniforms.iResolution.value;l[0]=o,l[1]=s,v&&(v.setSize(o,s),y.setSize(o,s)),x()},C=new ResizeObserver(S);C.observe(e),S();let w=t=>{let n=e.getBoundingClientRect(),r=((t.clientX-n.left)/n.width-.5)*2,i=-((t.clientY-n.top)/n.height-.5)*2;R.current=[r,i],U.current=1},T=()=>{U.current=0};e.addEventListener(`mousemove`,w),e.addEventListener(`mouseleave`,T);let E=0,D=!0,O=!document.hidden,k=performance.now(),A=e=>{u.uniforms.iTime.value=(e-k)*.001;let t=z.current,n=R.current;t[0]+=.05*(n[0]-t[0]),t[1]+=.05*(n[1]-t[1]);let r=u.uniforms.uMouse.value;r[0]=t[0],r[1]=t[1];let i=B.current?U.current:0;H.current+=.05*(i-H.current),u.uniforms.uMouseActive.value=H.current,u.uniforms.uEnableMouse.value=+!!B.current,u.uniforms.uMouseStrength.value=V.current,f.uniforms.iTime.value=u.uniforms.iTime.value,x(),E=requestAnimationFrame(A)},j=()=>{D&&O&&E===0&&(E=requestAnimationFrame(A))},M=()=>{E!==0&&(cancelAnimationFrame(E),E=0)},N=new IntersectionObserver(([e])=>{D=e.isIntersecting,D?j():M()},{threshold:0});N.observe(e);let P=()=>{O=!document.hidden,O?j():M()};return document.addEventListener(`visibilitychange`,P),j(),()=>{M(),C.disconnect(),N.disconnect(),document.removeEventListener(`visibilitychange`,P),e.removeEventListener(`mousemove`,w),e.removeEventListener(`mouseleave`,T),g.delete(e),v&&(n.deleteFramebuffer(v.buffer),n.deleteFramebuffer(y.buffer),v.textures.forEach(e=>n.deleteTexture(e.texture)),y.textures.forEach(e=>n.deleteTexture(e.texture)));try{e.removeChild(c)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,c.useEffect)(()=>{let r=L.current;if(!r)return;let i=g.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=_,o.uWaveDepth.value=v,o.uZoom.value=y,o.uDensity.value=b,o.uSpread.value=C,o.uStepSize.value=w,o.uGlow.value=x,o.uExposure.value=S,o.uColorShift.value=T,o.uContrast.value=E,o.uBrightness.value=D,o.uOpacity.value=O,o.uLightMode.value=+!!F,o.uSteps.value=f(d),o.uMouseRadius.value=j;let s=u(e),c=o.uColor1.value;c[0]=s[0],c[1]=s[1],c[2]=s[2];let l=u(t),p=o.uColor2.value;p[0]=l[0],p[1]=l[1],p[2]=l[2];let m=u(n),h=o.uColor3.value;h[0]=m[0],h[1]=m[1],h[2]=m[2],B.current=k,V.current=A,W.current=M,G.current=N,K.current=P},[e,t,n,d,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F]),(0,l.jsx)(`div`,{ref:L,className:`acid-squares-container ${I}`.trim()})};export{_ as default};