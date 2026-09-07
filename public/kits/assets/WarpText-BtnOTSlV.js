import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Texture-C-0j2d6N.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;

uniform sampler2D uTextTexture;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uTime;
uniform float uWarpStrength;
uniform float uWarpScale;
uniform float uSpeed;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uRefraction;
uniform float uRipple;
uniform float uMotion;

in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

vec4 sampleText(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec4(0.0);
  }
  return texture(uTextTexture, uv);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float time = uTime * uSpeed;
  float scale = max(uWarpScale, 0.001);

  vec2 drift = vec2(time * 0.055, -time * 0.045);
  float n1 = fbm(uv * scale * 3.1 + drift);
  float n2 = fbm((uv + 19.17) * scale * 3.4 - drift.yx);
  vec2 ambient = (vec2(n1, n2) - 0.5) * uWarpStrength * 0.045 * uMotion;

  vec2 pointerDelta = uv - uPointer;
  vec2 aspectDelta = vec2(pointerDelta.x * aspect, pointerDelta.y);
  float dist = length(aspectDelta);
  float radius = max(uPointerInfluence, 0.001);
  float t = clamp(dist / radius, 0.0, 1.0);
  float lens = smoothstep(radius, 0.0, dist) * uPointerActive;
  float bulge = t * (1.0 - t) * (1.0 - t) * 6.75 * uPointerActive;
  vec2 dir = dist > 0.0001 ? vec2(aspectDelta.x / aspect, aspectDelta.y) / dist : vec2(0.0);

  float rippleWave = sin(dist * 28.0 - time * 4.2) * 0.5 + 0.5;
  float rippleRing = (rippleWave - 0.5) * uRipple;
  vec2 pointerWarp = -dir * bulge * uPointerStrength * 0.045;
  pointerWarp += dir * rippleRing * bulge * uPointerStrength * 0.016;

  vec2 displaced = uv + ambient + pointerWarp;
  vec2 splitDir = ambient + pointerWarp;
  float splitLen = length(splitDir);
  splitDir = splitLen > 0.00001 ? splitDir / splitLen : vec2(0.7071, 0.7071);
  vec2 split = splitDir * uRefraction * 0.16 * (0.35 + lens * 1.65);

  vec4 base = sampleText(displaced);
  float r = sampleText(displaced + split).r;
  float g = base.g;
  float b = sampleText(displaced - split).b;
  float a = max(max(sampleText(displaced + split).a, base.a), sampleText(displaced - split).a);

  vec3 color = vec3(r, g, b) + lens * base.a * 0.055;
  fragColor = vec4(color, a);
}
`,f=e=>typeof e==`number`?`${e}px`:e,p=(e,t,n)=>{let r=Array.from(t);return r.reduce((t,n)=>t+e.measureText(n).width,0)+Math.max(0,r.length-1)*n},m=(e,t,n,r,i)=>{let a=Array.from(t),o=n-p(e,t,i)/2;a.forEach((t,n)=>{e.fillText(t,o,r),o+=e.measureText(t).width+(n===a.length-1?0:i)})},h=({container:e,width:t,height:n,dpr:r,props:i})=>{let a=document.createElement(`canvas`);a.width=Math.max(1,Math.floor(t*r)),a.height=Math.max(1,Math.floor(n*r));let o=a.getContext(`2d`);if(!o)return a;let s=document.createElement(`span`);s.textContent=i.text,Object.assign(s.style,{position:`absolute`,visibility:`hidden`,pointerEvents:`none`,whiteSpace:`pre`,inset:`0 auto auto 0`,fontFamily:i.fontFamily,fontSize:f(i.fontSize),fontWeight:String(i.fontWeight),letterSpacing:f(i.letterSpacing),lineHeight:typeof i.lineHeight==`number`?String(i.lineHeight):i.lineHeight}),e.appendChild(s);let c=window.getComputedStyle(s),l=parseFloat(c.fontSize)||96,u=c.fontFamily||`sans-serif`,d=c.fontWeight||String(i.fontWeight),h=c.letterSpacing===`normal`?0:parseFloat(c.letterSpacing)||0,g=parseFloat(c.lineHeight);Number.isFinite(g)||(g=l*(typeof i.lineHeight==`number`?i.lineHeight:.92)),s.remove(),o.setTransform(r,0,0,r,0,0),o.clearRect(0,0,t,n),o.textAlign=`left`,o.textBaseline=`middle`,o.fillStyle=i.color,o.imageSmoothingEnabled=!0,o.imageSmoothingQuality=`high`;let _=String(i.text||``).split(`
`),v=()=>{o.font=`${d} ${l}px ${u}`};v();let y=t*.86,b=n*.78,x=Math.max(..._.map(e=>p(o,e,h)),1),S=Math.max(g*_.length,1),C=Math.min(1,y/x,b/S);C<1&&(l*=C,h*=C,g*=C,v());let w=n/2-g*(_.length-1)/2;return _.forEach((e,n)=>m(o,e,t/2,w+n*g,h)),a},g=(e,t)=>{let n=e.uniforms;n.uWarpStrength.value=t.warpStrength,n.uWarpScale.value=t.warpScale,n.uSpeed.value=t.speed,n.uPointerInfluence.value=t.pointerInfluence,n.uPointerStrength.value=t.pointerStrength,n.uRefraction.value=t.refraction,n.uRipple.value=+!!t.ripple},_=({text:e=`Bend the moment`,color:t=`#f8f5ff`,warpStrength:n=.08,warpScale:f=1.7,speed:p=.55,pointerInfluence:m=.42,pointerStrength:_=.38,refraction:v=.018,ripple:y=!0,fontSize:b=`clamp(3rem, 10vw, 9rem)`,fontWeight:x=800,fontFamily:S=`inherit`,letterSpacing:C=`-0.06em`,lineHeight:w=.9,className:T=``,style:E})=>{let D=(0,c.useRef)(null),O=(0,c.useRef)({text:e,color:t,fontSize:b,fontWeight:x,fontFamily:S,letterSpacing:C,lineHeight:w,warpStrength:n,warpScale:f,speed:p,pointerInfluence:m,pointerStrength:_,refraction:v,ripple:y}),k=(0,c.useRef)(null);return(0,c.useEffect)(()=>{O.current={text:e,color:t,fontSize:b,fontWeight:x,fontFamily:S,letterSpacing:C,lineHeight:w,warpStrength:n,warpScale:f,speed:p,pointerInfluence:m,pointerStrength:_,refraction:v,ripple:y},k.current&&(g(k.current.program,O.current),k.current.rasterize())},[e,t,b,x,S,C,w,n,f,p,m,_,v,y]),(0,c.useEffect)(()=>{let e=D.current;if(!e||typeof window>`u`)return;let t,n,c,l,f,p,m,_,v=0,y=!1,b=!1,x=!0,S=!document.hidden,C=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,w=0,T={x:.5,y:.5,tx:.5,ty:.5,active:0,activeTarget:0},E=performance.now();try{t=new i({webgl:2,alpha:!0,premultipliedAlpha:!1,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl}catch(e){console.warn(`WarpText: WebGL could not be initialized.`,e);return}n.clearColor(0,0,0,0);let A=n.canvas;A.style.position=`absolute`,A.style.inset=`0`,A.style.width=`100%`,A.style.height=`100%`,A.style.display=`block`,A.setAttribute(`aria-hidden`,`true`),e.appendChild(A),p=new o(n,{generateMipmaps:!1,minFilter:n.LINEAR,magFilter:n.LINEAR,wrapS:n.CLAMP_TO_EDGE,wrapT:n.CLAMP_TO_EDGE}),l=new s(n),c=new r(n,{vertex:u,fragment:d,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uTextTexture:{value:p},uResolution:{value:new Float32Array([1,1])},uPointer:{value:new Float32Array([.5,.5])},uPointerActive:{value:0},uTime:{value:0},uWarpStrength:{value:O.current.warpStrength},uWarpScale:{value:O.current.warpScale},uSpeed:{value:O.current.speed},uPointerInfluence:{value:O.current.pointerInfluence},uPointerStrength:{value:O.current.pointerStrength},uRefraction:{value:O.current.refraction},uRipple:{value:+!!O.current.ripple},uMotion:{value:+!C}}}),f=new a(n,{geometry:l,program:c});let j=()=>{y||b||t.render({scene:f})},M=async()=>{let t=++w;if(document.fonts?.ready)try{await document.fonts.ready}catch{}if(y||b||t!==w)return;let n=e.getBoundingClientRect();if(n.width<=0||n.height<=0)return;let r=Math.min(window.devicePixelRatio||1,2),i=h({container:e,width:n.width,height:n.height,dpr:r,props:O.current});p.image=i,p.needsUpdate=!0,j()},N=()=>{if(y||b)return;let r=e.getBoundingClientRect();r.width<=0||r.height<=0||(t.dpr=Math.min(window.devicePixelRatio||1,2),t.setSize(r.width,r.height),c.uniforms.uResolution.value[0]=n.drawingBufferWidth,c.uniforms.uResolution.value[1]=n.drawingBufferHeight,M())},P=e=>{if(e.pointerType===`touch`)return;let t=A.getBoundingClientRect();t.width<=0||t.height<=0||(T.tx=(e.clientX-t.left)/t.width,T.ty=1-(e.clientY-t.top)/t.height,T.activeTarget=1)},F=()=>{T.activeTarget=0},I=e=>{e.preventDefault(),b=!0,v&&cancelAnimationFrame(v),v=0},L=()=>{S=!document.hidden,S&&x&&!v&&(v=requestAnimationFrame(B)),!S&&v&&(cancelAnimationFrame(v),v=0)},R=window.matchMedia?.(`(prefers-reduced-motion: reduce)`),z=e=>{C=e.matches,c.uniforms.uMotion.value=+!C,j()},B=e=>{if(y||b)return;let t=(e-E)*.001,n=.5+Math.sin(t*.33)*.12,r=.5+Math.cos(t*.27)*.1,i=T.activeTarget>0?T.tx:n,a=T.activeTarget>0?T.ty:r,o=T.activeTarget>0?.12:.035;T.x+=(i-T.x)*o,T.y+=(a-T.y)*o,T.active+=((T.activeTarget>0?1:.18)-T.active)*.06,c.uniforms.uPointer.value[0]=T.x,c.uniforms.uPointer.value[1]=T.y,c.uniforms.uPointerActive.value=C?T.active*.35:T.active,c.uniforms.uTime.value=C?0:t,j(),v=requestAnimationFrame(B)};return m=new ResizeObserver(N),m.observe(e),_=new IntersectionObserver(([e])=>{x=e.isIntersecting,x&&S&&!v&&(v=requestAnimationFrame(B)),!x&&v&&(cancelAnimationFrame(v),v=0)},{threshold:0}),_.observe(e),A.addEventListener(`pointermove`,P),A.addEventListener(`pointerleave`,F),A.addEventListener(`webglcontextlost`,I,!1),document.addEventListener(`visibilitychange`,L),R?.addEventListener(`change`,z),g(c,O.current),k.current={program:c,rasterize:M},N(),v=requestAnimationFrame(B),()=>{if(y=!0,k.current=null,v&&cancelAnimationFrame(v),m?.disconnect(),_?.disconnect(),A.removeEventListener(`pointermove`,P),A.removeEventListener(`pointerleave`,F),A.removeEventListener(`webglcontextlost`,I),document.removeEventListener(`visibilitychange`,L),R?.removeEventListener(`change`,z),!b)try{p?.texture&&n.deleteTexture(p.texture),l?.remove?.(),c?.remove?.(),n.getExtension(`WEBGL_lose_context`)?.loseContext()}catch{}A.parentNode===e&&e.removeChild(A)}},[]),(0,l.jsx)(`div`,{ref:D,className:`warp-text ${T}`.trim(),style:E,role:`img`,"aria-label":e})};export{_ as default};