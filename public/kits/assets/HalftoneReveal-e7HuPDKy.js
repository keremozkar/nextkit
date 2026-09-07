import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Texture-C-0j2d6N.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`https://picsum.photos/seed/halftone-reveal/1200/800`,d=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e||``);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[0,0,0]},f={mono:0,duotone:1,color:2},p={circle:0,square:1,diamond:2,line:3},m={off:0,hover:1,always:2},h=`#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,g=`#version 300 es
precision highp float;

uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform float uActivity;

uniform float uDotSize;
uniform float uDensity;
uniform float uAngle;
uniform int uShape;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform int uMode;
uniform float uContrast;
uniform float uInvert;

uniform float uRevealRadius;
uniform float uEdge;
uniform float uIdleReveal;
uniform int uTrigger;

in vec2 vUv;
out vec4 fragColor;

vec2 uAspect() {
  return vec2(iResolution.x / max(iResolution.y, 1.0), 1.0);
}

vec2 coverUv(vec2 uv) {
  float ia = uImageSize.x / max(uImageSize.y, 1.0);
  float pa = iResolution.x / max(iResolution.y, 1.0);
  vec2 s = pa > ia ? vec2(1.0, ia / pa) : vec2(pa / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

vec3 gradeRGB(vec3 c) {
  c = clamp((c - 0.5) * uContrast + 0.5, 0.0, 1.0);
  return mix(c, 1.0 - c, uInvert);
}

float shapeDist(vec2 f) {
  if (uShape == 1) return max(abs(f.x), abs(f.y));
  if (uShape == 2) return abs(f.x) + abs(f.y);
  if (uShape == 3) return abs(f.y);
  return length(f);
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec4 sampleCell(vec2 st, float dens, float ang) {
  vec2 rp = rot(ang) * st * dens;
  vec2 center = floor(rp) + 0.5;
  vec2 stC = rot(-ang) * (center / dens);
  vec2 uvC = stC / uAspect();
  return texture(tMap, clamp(coverUv(uvC), 0.0, 1.0));
}

float coverage(vec2 st, float dens, float ang, float ink, float rscale) {
  vec2 rp = rot(ang) * st * dens;
  vec2 f = fract(rp) - 0.5;
  float d = shapeDist(f);
  float r = sqrt(clamp(ink, 0.0, 1.0)) * 0.72 * rscale * uDotSize;
  float w = length(fwidth(rp)) * 0.6 + 1e-4;
  return smoothstep(r + w, r - w, d);
}

void main() {
  vec2 aspect = uAspect();
  vec2 st = vUv * aspect;
  float ang = radians(uAngle);

  vec2 duv = (vUv - uMouse) * aspect;
  float dist = length(duv);

  float act = uTrigger == 2 ? 1.0 : (uTrigger == 0 ? 0.0 : uActivity);
  float radius = max(uRevealRadius, 1e-4) * mix(0.4, 1.0, act);

  float px = 1.4 / max(iResolution.y, 1.0);
  float band = max(px, radius * (1.0 - clamp(uEdge, 0.0, 1.0)) * 0.45);
  float loupe = 1.0 - smoothstep(radius - band, radius + band, dist);
  float focus = clamp(max(loupe * act, uIdleReveal), 0.0, 1.0);

  float dens = uDensity;

  vec3 print;
  if (uMode == 2) {
    vec3 gc = gradeRGB(sampleCell(st, dens, ang + radians(15.0)).rgb);
    vec3 gm = gradeRGB(sampleCell(st, dens, ang + radians(75.0)).rgb);
    vec3 gy = gradeRGB(sampleCell(st, dens, ang).rgb);
    vec3 gk = gradeRGB(sampleCell(st, dens, ang + radians(45.0)).rgb);
    float c = 1.0 - gc.r;
    float m = 1.0 - gm.g;
    float y = 1.0 - gy.b;
    float k = 1.0 - dot(gk, vec3(0.299, 0.587, 0.114));
    float gcr = min(min(c, m), y) * 0.5;
    c = clamp(c - gcr, 0.0, 1.0);
    m = clamp(m - gcr, 0.0, 1.0);
    y = clamp(y - gcr, 0.0, 1.0);
    k = clamp(max(gcr, k * k * 0.9), 0.0, 1.0);
    float covC = coverage(st, dens, ang + radians(15.0), c, 0.82);
    float covM = coverage(st, dens, ang + radians(75.0), m, 0.82);
    float covY = coverage(st, dens, ang, y, 0.82);
    float covK = coverage(st, dens, ang + radians(45.0), k, 0.78);
    print = uPaper;
    print = mix(print, print * vec3(0.10, 0.72, 0.90), covC);
    print = mix(print, print * vec3(0.92, 0.10, 0.52), covM);
    print = mix(print, print * vec3(0.98, 0.86, 0.10), covY);
    print = mix(print, print * vec3(0.08), covK);
  } else if (uMode == 1) {
    vec3 ink2 = mix(uInk.gbr, vec3(0.90, 0.24, 0.30), 0.7);
    float lumA = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float lumB = dot(gradeRGB(sampleCell(st, dens, ang + radians(38.0)).rgb), vec3(0.299, 0.587, 0.114));
    float covA = coverage(st, dens, ang, 1.0 - lumA, 1.0);
    float covB = coverage(st, dens, ang + radians(38.0), pow(1.0 - lumB, 1.4), 0.92);
    print = uPaper;
    print = mix(print, ink2, covB * 0.85);
    print = mix(print, uInk, covA);
  } else {
    float lum = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float cov = coverage(st, dens, ang, 1.0 - lum, 1.0);
    print = mix(uPaper, uInk, cov);
  }

  float t = clamp(dist / radius, 0.0, 1.0);
  float bend = t * t * t * t;
  vec2 dir = dist > 1e-5 ? duv / dist : vec2(0.0);
  vec2 off = dir * bend * radius * 0.22 / aspect;
  vec2 ca = dir * bend * 0.0045 / aspect;
  vec3 sharp = gradeRGB(vec3(
    texture(tMap, clamp(coverUv(vUv - off - ca), 0.0, 1.0)).r,
    texture(tMap, clamp(coverUv(vUv - off), 0.0, 1.0)).g,
    texture(tMap, clamp(coverUv(vUv - off + ca), 0.0, 1.0)).b
  ));

  vec3 col = mix(print, sharp, focus);
  fragColor = vec4(col, 1.0);
}
`,_=({src:e=u,inkColor:t=`#141414`,paperColor:n=`#fff7e6`,mode:_=`mono`,dotSize:v=1,dotDensity:y=71,angle:b=45,shape:x=`circle`,contrast:S=1.15,invert:C=!1,revealRadius:w=.4,edge:T=.8,follow:E=.37,idleReveal:D=0,trigger:O=`hover`,borderRadius:k=`16px`,className:A=``,style:j})=>{let M=(0,c.useRef)(null),N=(0,c.useRef)(null),P=(0,c.useRef)(null),F=(0,c.useRef)(null),I=(0,c.useRef)(E),L=(0,c.useRef)({x:.5,y:.5,sx:.5,sy:.5,active:0,target:0});return(0,c.useEffect)(()=>{I.current=E},[E]),(0,c.useEffect)(()=>{let c=M.current;if(!c)return;let l=typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,u=new i({dpr:Math.min(window.devicePixelRatio||1,2),alpha:!1,antialias:!0});N.current=u;let E=u.gl;E.clearColor(0,0,0,1),E.canvas.style.width=`100%`,E.canvas.style.height=`100%`,E.canvas.style.display=`block`,c.appendChild(E.canvas);let k=new o(E,{generateMipmaps:!1}),A={tMap:{value:k},iResolution:{value:[1,1]},uImageSize:{value:[1,1]},uMouse:{value:[.5,.5]},uActivity:{value:0},uDotSize:{value:v},uDensity:{value:y},uAngle:{value:b},uShape:{value:p[x]??0},uInk:{value:d(t)},uPaper:{value:d(n)},uMode:{value:f[_]??0},uContrast:{value:S},uInvert:{value:+!!C},uRevealRadius:{value:w},uEdge:{value:T},uIdleReveal:{value:D},uTrigger:{value:m[O]??1}};P.current=A;let j=new r(E,{vertex:h,fragment:g,uniforms:A}),R=new a(E,{geometry:new s(E),program:j}),z=new Image;z.crossOrigin=`anonymous`,z.src=e,z.onload=()=>{k.image=z,A.uImageSize.value=[z.naturalWidth,z.naturalHeight]};let B=()=>{let e=c.clientWidth||1,t=c.clientHeight||1;u.setSize(e,t),A.iResolution.value=[E.canvas.width,E.canvas.height]};B();let V=new ResizeObserver(B);V.observe(c);let H=e=>{let t=c.getBoundingClientRect();L.current.x=(e.clientX-t.left)/t.width,L.current.y=1-(e.clientY-t.top)/t.height,L.current.target=+!l},U=()=>{L.current.target=0};c.addEventListener(`pointermove`,H,{passive:!0}),c.addEventListener(`pointerenter`,H,{passive:!0}),c.addEventListener(`pointerleave`,U,{passive:!0});let W=performance.now(),G=e=>{F.current=requestAnimationFrame(G);let t=Math.min(.05,Math.max(.001,(e-W)/1e3));W=e;let n=L.current,r=1-Math.exp(-t/Math.max(.001,I.current));n.sx+=(n.x-n.sx)*r,n.sy+=(n.y-n.sy)*r;let i=1-Math.exp(-t/.18);n.active+=(n.target-n.active)*i,A.uMouse.value[0]=n.sx,A.uMouse.value[1]=n.sy,A.uActivity.value=n.active,u.render({scene:R})};return F.current=requestAnimationFrame(G),()=>{F.current&&cancelAnimationFrame(F.current),V.disconnect(),c.removeEventListener(`pointermove`,H),c.removeEventListener(`pointerenter`,H),c.removeEventListener(`pointerleave`,U);let e=E.getExtension(`WEBGL_lose_context`);e&&e.loseContext(),E.canvas.parentNode&&E.canvas.parentNode.removeChild(E.canvas),N.current=null,P.current=null}},[e]),(0,c.useEffect)(()=>{let e=P.current;e&&(e.uDotSize.value=v,e.uDensity.value=y,e.uAngle.value=b,e.uShape.value=p[x]??0,e.uInk.value=d(t),e.uPaper.value=d(n),e.uMode.value=f[_]??0,e.uContrast.value=S,e.uInvert.value=+!!C,e.uRevealRadius.value=w,e.uEdge.value=T,e.uIdleReveal.value=D,e.uTrigger.value=m[O]??1)},[v,y,b,x,t,n,_,S,C,w,T,D,O]),(0,l.jsx)(`div`,{ref:M,className:`halftone-reveal ${A}`.trim(),style:{borderRadius:k,...j}})};export{_ as default};