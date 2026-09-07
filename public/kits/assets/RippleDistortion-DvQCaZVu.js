import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,o as ee,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Texture-C-0j2d6N.js";import{t as te}from"./RenderTarget-CTgTThLo.js";import{t as ne}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=100,u={low:.4,medium:.7,high:1},d=1.5,re=Math.log(500),ie=`
precision highp float;

attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;

varying vec2 vUv;
varying float vOpacity;

void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);
}
`,ae=`
precision highp float;

varying vec2 vUv;
varying float vOpacity;

uniform float uRings;

const float PI = 3.141592653589793;
const float EDGE = 0.006737947;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = dot(p, p);
  if (r > 1.0) discard;

  float brush = (exp(-r * 5.0) - EDGE) / (1.0 - EDGE);

  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2.0 * uRings);

  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);
}
`,f=`
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,oe=`
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uTexel;
uniform vec3 uTint;
uniform vec3 uHighlight;
uniform float uStrength;
uniform float uSwirl;
uniform float uDispersion;
uniform float uGlint;
uniform float uTintAmount;
uniform float uGrayscale;

const float TAU = 6.283185307179586;

vec2 coverUV(vec2 uv) {
  vec2 safe = max(uTextureSize, vec2(1.0));
  vec2 s = uResolution / safe;
  vec2 scaledSize = safe * max(s.x, s.y);
  vec2 offset = (uResolution - scaledSize) * 0.5;
  return (uv * uResolution - offset) / scaledSize;
}

void main() {
  float amount = texture2D(uDisplacement, vUv).r;
  vec2 base = coverUV(vUv);

  float theta = amount * uSwirl * TAU;
  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 push = dir * amount * uStrength;

  vec3 color;
  if (uDispersion > 0.001) {
    float split = uDispersion * 0.25;
    color.r = texture2D(uTexture, base + push * (1.0 + split)).r;
    color.g = texture2D(uTexture, base + push).g;
    color.b = texture2D(uTexture, base + push * (1.0 - split)).b;
  } else {
    color = texture2D(uTexture, base + push).rgb;
  }

  if (uGrayscale > 0.001) {
    color = mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), uGrayscale);
  }

  if (uTintAmount > 0.001) {
    color = mix(color, color * uTint * 1.9, clamp(amount * 1.6, 0.0, 1.0) * uTintAmount);
  }

  if (uGlint > 0.001) {
    float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;
    float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;
    vec3 normal = normalize(vec3(-ex * 26.0, -ey * 26.0, 1.0));
    vec3 light = normalize(vec3(-0.35, 0.55, 1.0));
    float raw = pow(max(dot(normal, light), 0.0), 22.0);
    float flatSpec = pow(max(light.z, 0.0), 22.0);
    color += uHighlight * clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0) * uGlint;
  }

  gl_FragColor = vec4(color, 1.0);
}
`,p=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return Number.isNaN(r)?[1,1,1]:[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]},m=({src:e=`https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=3416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,brushSize:t=150,strength:n=.2,swirl:m=1,rings:h=4,spread:g=5,fade:_=3,spacing:v=15,dispersion:y=0,glint:b=0,tint:x=`#a855f7`,tintAmount:S=.1,grayscale:C=!0,highlightColor:w=`#ffffff`,trigger:T=`hover`,clickStrength:E=2,quality:D=`low`,enabled:O=!0,className:k=``,style:A})=>{let j=(0,s.useRef)(null),M=(0,s.useRef)({}),N=(0,s.useRef)(null);return M.current={brushSize:t,spread:g,fade:_,spacing:v,clickStrength:E,trigger:T,enabled:O},(0,s.useEffect)(()=>{let t=j.current;if(!t)return;let s=typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,c=new i({alpha:!1,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),g=c.gl;g.clearColor(0,0,0,1);let _=g.canvas;_.style.width=`100%`,_.style.height=`100%`,_.style.display=`block`,t.appendChild(_);let v=new o(g,{generateMipmaps:!1,minFilter:g.LINEAR,magFilter:g.LINEAR,wrapS:g.CLAMP_TO_EDGE,wrapT:g.CLAMP_TO_EDGE}),T=!1,E=new window.Image;E.crossOrigin=`anonymous`,E.decoding=`async`,E.onload=()=>{T||(v.image=E,B.uTextureSize.value=[E.naturalWidth||1,E.naturalHeight||1])},E.src=e;let O=new Float32Array(200),k=new Float32Array(200),A=new Float32Array(l),P=Array.from({length:l},()=>({x:0,y:0,scale:d,target:d,size:1,opacity:0})),F=0,I=new ee(g,{position:{size:2,data:new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])},uv:{size:2,data:new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])},iOffset:{instanced:1,size:2,data:O},iScale:{instanced:1,size:2,data:k},iOpacity:{instanced:1,size:1,data:A}}),L={uRings:{value:h}},R=new r(g,{vertex:ie,fragment:ae,uniforms:L,transparent:!0,depthTest:!1,depthWrite:!1,cullFace:!1});R.setBlendFunc(g.ONE,g.ONE);let se=new a(g,{geometry:I,program:R,frustumCulled:!1}),z=new te(g,{width:2,height:2,depth:!1,minFilter:g.LINEAR,magFilter:g.LINEAR,wrapS:g.CLAMP_TO_EDGE,wrapT:g.CLAMP_TO_EDGE}),B={uTexture:{value:v},uDisplacement:{value:z.texture},uResolution:{value:[1,1]},uTextureSize:{value:[1,1]},uTexel:{value:[1,1]},uTint:{value:p(x)},uHighlight:{value:p(w)},uStrength:{value:n},uSwirl:{value:m},uDispersion:{value:y},uGlint:{value:b},uTintAmount:{value:S},uGrayscale:{value:+!!C}},ce=new a(g,{geometry:new ne(g),program:new r(g,{vertex:f,fragment:oe,uniforms:B,depthTest:!1,depthWrite:!1})});N.current={wave:L,composite:B};let V=1,H=1,U=()=>{V=Math.max(1,t.clientWidth),H=Math.max(1,t.clientHeight),c.setSize(V,H),B.uResolution.value=[V,H];let e=u[D]||u.high,n=Math.max(2,Math.round(V*e)),r=Math.max(2,Math.round(H*e));z.setSize(n,r),B.uTexel.value=[1/n,1/r]},W=new ResizeObserver(U);W.observe(t),U();let G=(e,t,n)=>{let r=M.current,i=P[F];F=(F+1)%l,i.x=e,i.y=t,i.scale=d*n,i.target=d*Math.max(1,r.spread)*n,i.size=Math.max(1,r.brushSize),i.opacity=1},K=(e,n)=>{let r=t.getBoundingClientRect();return r.width===0||r.height===0||e<r.left||e>r.right||n<r.top||n>r.bottom?null:[e-r.left,r.height-(n-r.top)]},q=0,J=0,Y=e=>{let t=M.current;if(!t.enabled||s||t.trigger===`click`)return;let n=K(e.clientX,e.clientY);if(!n)return;let r=Math.max(1,t.spacing);(Math.abs(n[0]-q)>r||Math.abs(n[1]-J)>r)&&(G(n[0],n[1],1),q=n[0],J=n[1])},X=e=>{let t=M.current;if(!t.enabled||s||t.trigger===`hover`)return;let n=K(e.clientX,e.clientY);n&&G(n[0],n[1],Math.max(1,t.clickStrength))};window.addEventListener(`pointermove`,Y,{passive:!0}),window.addEventListener(`pointerdown`,X,{passive:!0});let Z=0,Q=0,$=e=>{Z=requestAnimationFrame($);let t=Q?Math.min(.05,(e-Q)/1e3):0;Q=e;let n=M.current,r=s?0:1-Math.exp(-t*1.09),i=s?1:Math.exp(-t*re/Math.max(.15,n.fade));for(let e=0;e<l;e+=1){let t=P[e];if(t.opacity<=0){A[e]=0;continue}if(t.opacity*=i,t.scale+=(t.target-t.scale)*r,t.opacity<.002){t.opacity=0,A[e]=0;continue}let n=t.scale*t.size/2;O[e*2]=t.x/V*2-1,O[e*2+1]=t.y/H*2-1,k[e*2]=n/V*2,k[e*2+1]=n/H*2,A[e]=t.opacity}I.attributes.iOffset.needsUpdate=!0,I.attributes.iScale.needsUpdate=!0,I.attributes.iOpacity.needsUpdate=!0,c.render({scene:se,target:z,clear:!0}),c.render({scene:ce})};return Z=requestAnimationFrame($),()=>{T=!0,cancelAnimationFrame(Z),W.disconnect(),window.removeEventListener(`pointermove`,Y),window.removeEventListener(`pointerdown`,X),N.current=null,_.parentNode===t&&t.removeChild(_);let e=g.getExtension(`WEBGL_lose_context`);e&&e.loseContext()}},[e,D]),(0,s.useEffect)(()=>{let e=N.current;e&&(e.wave.uRings.value=h,e.composite.uStrength.value=n,e.composite.uSwirl.value=m,e.composite.uDispersion.value=y,e.composite.uGlint.value=b,e.composite.uTintAmount.value=S,e.composite.uGrayscale.value=+!!C,e.composite.uHighlight.value=p(w),e.composite.uTint.value=p(x))},[h,n,m,y,b,S,C,w,x]),(0,c.jsx)(`div`,{ref:j,className:`ripple-distortion ${k}`.trim(),style:A})};export{m as default};