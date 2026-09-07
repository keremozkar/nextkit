import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{t as r}from"./gsap-CvDoa17S.js";import{a as i,i as a,t as o}from"./Mesh-D48iXpEj.js";import{t as s}from"./Texture-C-0j2d6N.js";import{t as c}from"./Triangle-qjVMgwr4.js";var l=e(t(),1),u=n(),d={melt:0,ripple:1,shear:2,swirl:3},f=[{image:`https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop`,caption:`One`},{image:`https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop`,caption:`Two`},{image:`https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop`,caption:`Three`},{image:`https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop`,caption:`Four`}],p=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,m=`
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);

  vec2 uv = vUv;

  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
      m = smoothstep(0.0, 1.0, p);
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 1e-4);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float slices = 14.0;
      float row = floor(uv.y * slices);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);

  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );

  vec3 col = mix(colC, colN, m);

  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.28);

  gl_FragColor = vec4(col, 1.0);
}
`;function h(e){let t=new Uint8Array(64);for(let e=0;e<16;e++)t[e*4]=24,t[e*4+1]=24,t[e*4+2]=28,t[e*4+3]=255;return new s(e,{image:t,width:4,height:4,generateMipmaps:!1})}function g(e){let t=(e||`#000000`).replace(`#`,``);t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=parseInt(t,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}var _=class{constructor(e,{items:t,startIndex:n,reducedMotion:r,getOptions:s,onIndexChange:l,dprCap:u}){this.container=e,this.items=t,this.getOptions=s,this.onIndexChange=l,this.reducedMotion=r,this.current=n,this.animating=!1,this.dragging=!1,this.dragDir=0,this.shownIndex=n,this.tween=null,this.renderer=new a({alpha:!1,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,u)}),this.gl=this.renderer.gl,this.gl.clearColor(.05,.05,.06,1),this.canvas=this.gl.canvas,this.canvas.className=`morph-slider-canvas`,e.appendChild(this.canvas),this.geometry=new c(this.gl),this.textures=this.items.map(()=>h(this.gl)),this.sizes=this.items.map(()=>[1,1]);let f=this.getOptions();this.program=new i(this.gl,{vertex:p,fragment:m,uniforms:{tCurrent:{value:this.textures[this.current]},tNext:{value:this.textures[this.current]},uResolution:{value:[1,1]},uCurrentSize:{value:this.sizes[this.current]},uNextSize:{value:this.sizes[this.current]},uProgress:{value:0},uDir:{value:1},uMode:{value:d[f.transition]??0},uIntensity:{value:f.intensity},uScale:{value:f.scale},uAberration:{value:f.aberration},uDrift:{value:f.drift},uTime:{value:0},uReduce:{value:+!!r},uPointer:{value:[.5,.5]},uOverlay:{value:g(f.overlayColor)}}}),this.mesh=new o(this.gl,{geometry:this.geometry,program:this.program}),this.boundContextLost=this.onContextLost.bind(this),this.canvas.addEventListener(`webglcontextlost`,this.boundContextLost,!1),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.loadTextures(),this.boundLoop=this.loop.bind(this),this.raf=requestAnimationFrame(this.boundLoop)}loadTextures(){this.items.forEach((e,t)=>{let n=new Image;n.crossOrigin=`anonymous`,n.src=e.image,n.onload=()=>{let e=new s(this.gl,{generateMipmaps:!1});e.image=n,this.textures[t]=e,this.sizes[t]=[n.naturalWidth||1,n.naturalHeight||1],t===this.current&&(this.program.uniforms.tCurrent.value=e,this.program.uniforms.uCurrentSize.value=this.sizes[t])},n.onerror=()=>{}})}resize(){let e=this.container.getBoundingClientRect(),t=Math.max(e.width,1),n=Math.max(e.height,1);this.renderer.setSize(t,n),this.program.uniforms.uResolution.value=[this.gl.canvas.width,this.gl.canvas.height]}syncOptions(){let e=this.getOptions();this.program.uniforms.uMode.value=d[e.transition]??0,this.program.uniforms.uIntensity.value=e.intensity,this.program.uniforms.uScale.value=e.scale,this.program.uniforms.uAberration.value=e.aberration,this.program.uniforms.uDrift.value=e.drift,this.program.uniforms.uOverlay.value=g(e.overlayColor)}loop(e){this.program.uniforms.uTime.value=e*.001,!this.dragging&&!this.animating&&this.syncOptions(),this.renderer.render({scene:this.mesh}),this.raf=requestAnimationFrame(this.boundLoop)}wrap(e){let t=this.items.length;return(e%t+t)%t}prepareNext(e){let t=this.wrap(this.current+e);return this.program.uniforms.tCurrent.value=this.textures[this.current],this.program.uniforms.uCurrentSize.value=this.sizes[this.current],this.program.uniforms.tNext.value=this.textures[t],this.program.uniforms.uNextSize.value=this.sizes[t],this.program.uniforms.uDir.value=e,t}goTo(e){if(this.animating||this.dragging||this.items.length<2)return;let t=this.getOptions();if(!t.loop){let t=this.current+e;if(t<0||t>this.items.length-1)return}this.syncOptions();let n=this.prepareNext(e);this.animating=!0,this.announce(n);let i=this.reducedMotion?Math.min(t.duration,.4):t.duration;this.tween=r.fromTo(this.program.uniforms.uProgress,{value:0},{value:1,duration:i,ease:t.ease,onComplete:()=>this.commit(n)})}announce(e){e!==this.shownIndex&&(this.shownIndex=e,this.onIndexChange&&this.onIndexChange(e))}commit(e){this.current=e,this.program.uniforms.tCurrent.value=this.textures[e],this.program.uniforms.uCurrentSize.value=this.sizes[e],this.program.uniforms.uProgress.value=0,this.animating=!1,this.tween=null,this.announce(e)}next(){this.goTo(1)}prev(){this.goTo(-1)}setPointer(e,t){this.program.uniforms.uPointer.value=[e,t]}beginDrag(){return this.animating||this.items.length<2?!1:(this.dragging=!0,this.dragDir=0,this.syncOptions(),!0)}drag(e){if(!this.dragging)return;let t=this.getOptions(),n=e<0?1:-1;if(!t.loop){let e=this.current+n;if(e<0||e>this.items.length-1){this.program.uniforms.uProgress.value=0;return}}n!==this.dragDir&&(this.dragDir=n,this.prepareNext(n));let r=Math.min(Math.abs(e),1);this.program.uniforms.uProgress.value=r,this.announce(r>.5?this.wrap(this.current+n):this.current)}endDrag(){if(!this.dragging)return;this.dragging=!1;let e=this.program.uniforms.uProgress.value;if(this.dragDir===0)return;let t=this.wrap(this.current+this.dragDir),n=this.reducedMotion?.3:.5;this.animating=!0,e>.4?(this.announce(t),this.tween=r.to(this.program.uniforms.uProgress,{value:1,duration:n,ease:`power2.out`,onComplete:()=>this.commit(t)})):(this.announce(this.current),this.tween=r.to(this.program.uniforms.uProgress,{value:0,duration:n,ease:`power2.out`,onComplete:()=>{this.animating=!1,this.tween=null}}))}onContextLost(e){e.preventDefault(),cancelAnimationFrame(this.raf)}destroy(){cancelAnimationFrame(this.raf),this.tween&&this.tween.kill(),this.resizeObserver.disconnect(),this.canvas.removeEventListener(`webglcontextlost`,this.boundContextLost),this.textures.forEach(e=>{e&&e.texture&&this.gl.deleteTexture(e.texture)}),this.program&&this.program.program&&this.gl.deleteProgram(this.program.program);let e=this.gl.getExtension(`WEBGL_lose_context`);e&&e.loseContext(),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};function v({items:e=f,startIndex:t=0,transition:n=`melt`,duration:r=1.1,ease:i=`power2.inOut`,intensity:a=.55,scale:o=2.4,aberration:s=.35,drift:c=.4,autoplay:d=!1,autoplayDelay:p=4,loop:m=!0,radius:h=16,overlayColor:g=`#000000`,showCaptions:v=!0,showControls:y=!0,showIndicators:b=!0,className:x=``,...S}){let C=(0,l.useRef)(null),w=(0,l.useRef)(null),[T,E]=(0,l.useState)(t),[D,O]=(0,l.useState)(!1),k=(0,l.useRef)();k.current={transition:n,duration:r,ease:i,intensity:a,scale:o,aberration:s,drift:c,overlayColor:g,loop:m},(0,l.useEffect)(()=>{if(!C.current)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=new _(C.current,{items:e,startIndex:t,reducedMotion:n,dprCap:2,getOptions:()=>k.current,onIndexChange:E});return w.current=r,E(t),()=>{r.destroy(),w.current=null}},[e,t]);let A=(0,l.useCallback)(()=>w.current?.next(),[]),j=(0,l.useCallback)(()=>w.current?.prev(),[]);(0,l.useEffect)(()=>{if(!d||D)return;let e=setTimeout(()=>w.current?.next(),Math.max(p,1)*1e3);return()=>clearTimeout(e)},[d,p,D,T]),(0,l.useEffect)(()=>{let e=C.current;if(!e)return;let t=0,n=1,r=!1,i=i=>{let a=e.getBoundingClientRect();n=a.width||1,t=i.clientX;let o=(i.clientX-a.left)/a.width,s=(i.clientY-a.top)/a.height;if(w.current?.setPointer(o,1-s),r=w.current?.beginDrag()??!1,r&&e.setPointerCapture)try{e.setPointerCapture(i.pointerId)}catch{}},a=e=>{if(!r)return;let i=(e.clientX-t)/n;w.current?.drag(i)},o=()=>{r&&(r=!1,w.current?.endDrag())};return e.addEventListener(`pointerdown`,i),e.addEventListener(`pointermove`,a),e.addEventListener(`pointerup`,o),e.addEventListener(`pointercancel`,o),()=>{e.removeEventListener(`pointerdown`,i),e.removeEventListener(`pointermove`,a),e.removeEventListener(`pointerup`,o),e.removeEventListener(`pointercancel`,o)}},[]);let M=(0,l.useCallback)(e=>{e.key===`ArrowRight`?(e.preventDefault(),A()):e.key===`ArrowLeft`&&(e.preventDefault(),j())},[A,j]),N=e.some(e=>e.caption);return(0,u.jsxs)(`div`,{className:`morph-slider ${x}`.trim(),style:{borderRadius:`${h}px`,"--ms-swap":`${(r*.66).toFixed(3)}s`,"--ms-dot":`${(r*.45).toFixed(3)}s`},onMouseEnter:()=>O(!0),onMouseLeave:()=>O(!1),...S,children:[(0,u.jsx)(`div`,{ref:C,className:`morph-slider-stage`,role:`group`,"aria-roledescription":`carousel`,"aria-label":`Image morph slider`,tabIndex:0,onKeyDown:M}),v&&N&&(0,u.jsx)(`div`,{className:`morph-slider-caption`,"aria-live":`polite`,children:e.map((e,t)=>e.caption?(0,u.jsx)(`span`,{"aria-hidden":t!==T||void 0,className:`morph-slider-caption-text ${t===T?`is-active`:``}`,children:e.caption},t):null)}),y&&(0,u.jsxs)(`div`,{className:`morph-slider-controls`,children:[(0,u.jsx)(`button`,{type:`button`,className:`morph-slider-btn`,"aria-label":`Previous slide`,onClick:j,children:(0,u.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`18`,height:`18`,"aria-hidden":`true`,children:(0,u.jsx)(`path`,{d:`M15 5l-7 7 7 7`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),(0,u.jsx)(`button`,{type:`button`,className:`morph-slider-btn`,"aria-label":`Next slide`,onClick:A,children:(0,u.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`18`,height:`18`,"aria-hidden":`true`,children:(0,u.jsx)(`path`,{d:`M9 5l7 7-7 7`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]}),b&&(0,u.jsx)(`div`,{className:`morph-slider-indicators`,role:`tablist`,"aria-label":`Slides`,children:e.map((e,t)=>(0,u.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":t===T,"aria-label":`Go to slide ${t+1}`,className:`morph-slider-dot ${t===T?`is-active`:``}`,onClick:()=>{let e=w.current;e&&t!==T&&e.goTo(t>T?1:-1)}},t))})]})}export{v as default};