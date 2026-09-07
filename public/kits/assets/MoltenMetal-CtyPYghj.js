import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=e=>e===`ember`?1:e===`frost`?2:0,d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;

  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  if (uLightMode) {
    float signal = 1.0 - exp(-max(c, 0.0) * 6.5);
    float body = smoothstep(0.075, 0.68, signal);
    float ridge = smoothstep(0.42, 0.92, signal);

    vec3 lightCol = mix(uColor1, uColor2, smoothstep(0.08, 0.52, signal));
    lightCol = mix(lightCol, uColor3, smoothstep(0.52, 0.96, signal));
    lightCol = mix(lightCol, lightCol * 0.72, ridge * 0.24);

    float coverage = body * mix(0.2, 0.86, signal) * uOpacity;
    if (uGrain > 0.5) {
      float gr = hash(gl_FragCoord.xy + iTime);
      coverage += (gr - 0.5) * uGrainIntensity * body * 0.16;
    }
    fragColor = vec4(mix(uBackgroundColor, lightCol, clamp(coverage, 0.0, 0.92)), 1.0);
  } else {
    fragColor = vec4(col * a, a);
  }
}
`,p=new WeakMap,m=({color1:e=`#5227FF`,color2:t=`#FF9FFC`,color3:n=`#FFFFFF`,speed:m=.35,scale:h=4,detail:g=3,glow:_=1.6,coreSize:v=.1,swirl:y=1,fold:b=-.2,blackPoint:x=.05,brightness:S=1.3,colorMode:C=`molten`,grain:w=!0,grainIntensity:T=.05,mouseInteraction:E=!0,mouseStrength:D=.3,opacity:O=1,backgroundColor:k=`#FFFFFF`,lightMode:A=!1,className:j=``})=>{let M=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=M.current;if(!e)return;let t=new i({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:d,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.35},uScale:{value:4},uDetail:{value:3},uGlow:{value:1.6},uCoreSize:{value:.1},uSwirl:{value:1},uFold:{value:-.2},uBlackPoint:{value:.05},uBrightness:{value:1.3},uColorMode:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uOpacity:{value:1},uMouse:{value:new Float32Array([.5,.5])},uMouseStrength:{value:.3},uEnableMouse:{value:!0},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uBackgroundColor:{value:new Float32Array([1,1,1])},uLightMode:{value:!1}}}),u=new a(n,{geometry:c,program:l});p.set(e,{renderer:t,program:l,mesh:u});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:u})},h=new ResizeObserver(m);h.observe(e),m();let g=[.5,.5],_=[.5,.5],v=e=>{let t=s.getBoundingClientRect();g[0]=(e.clientX-t.left)/t.width,g[1]=1-(e.clientY-t.top)/t.height},y=()=>{g[0]=.5,g[1]=.5};s.addEventListener(`mousemove`,v),s.addEventListener(`mouseleave`,y);let b=0,x=!0,S=!document.hidden,C=performance.now(),w=e=>{l.uniforms.iTime.value=(e-C)*.001,_[0]+=.05*(g[0]-_[0]),_[1]+=.05*(g[1]-_[1]),l.uniforms.uMouse.value[0]=_[0],l.uniforms.uMouse.value[1]=_[1],t.render({scene:u}),b=requestAnimationFrame(w)},T=()=>{x&&S&&b===0&&(b=requestAnimationFrame(w))},E=()=>{b!==0&&(cancelAnimationFrame(b),b=0)},D=new IntersectionObserver(([e])=>{x=e.isIntersecting,x?T():E()},{threshold:0});D.observe(e);let O=()=>{S=!document.hidden,S?T():E()};return document.addEventListener(`visibilitychange`,O),T(),()=>{E(),h.disconnect(),D.disconnect(),document.removeEventListener(`visibilitychange`,O),s.removeEventListener(`mousemove`,v),s.removeEventListener(`mouseleave`,y),p.delete(e),s.parentNode===e&&e.removeChild(s),n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=M.current;if(!r)return;let i=p.get(r);if(!i)return;let a=i.program.uniforms;a.uSpeed.value=m,a.uScale.value=h,a.uDetail.value=g,a.uGlow.value=_,a.uCoreSize.value=Math.max(v,.001),a.uSwirl.value=y,a.uFold.value=b,a.uBlackPoint.value=x,a.uBrightness.value=S,a.uColorMode.value=u(C),a.uGrain.value=+!!w,a.uGrainIntensity.value=T,a.uOpacity.value=O,a.uMouseStrength.value=D,a.uEnableMouse.value=E,a.uLightMode.value=A;let o=l(e),s=l(t),c=l(n),d=l(k),f=a.uColor1.value,j=a.uColor2.value,N=a.uColor3.value;f[0]=o[0],f[1]=o[1],f[2]=o[2],j[0]=s[0],j[1]=s[1],j[2]=s[2],N[0]=c[0],N[1]=c[1],N[2]=c[2],a.uBackgroundColor.value[0]=d[0],a.uBackgroundColor.value[1]=d[1],a.uBackgroundColor.value[2]=d[2]},[e,t,n,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A]),(0,c.jsx)(`div`,{ref:M,className:`molten-metal-container ${j}`.trim()})};export{m as default};