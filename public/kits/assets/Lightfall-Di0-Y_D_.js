import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=8,u=e=>{let t=e.replace(`#`,``).padEnd(6,`0`);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]},d=e=>{let t=(e&&e.length?e:[`#A6C8FF`,`#5227FF`,`#FF9FFC`]).slice(0,l),n=t.length,r=[];for(let e=0;e<l;e++)r.push(u(t[Math.min(e,t.length-1)]));let i=[0,0,0];for(let e=0;e<n;e++)i[0]+=r[e][0],i[1]+=r[e][1],i[2]+=r[e][2];return i[0]/=n,i[1]/=n,i[2]/=n,{arr:r,count:n,avg:i}},f=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,p=`
precision highp float;

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

uniform vec3  uBgColor;
uniform vec3  uMouseColor;
uniform float uSpeed;
uniform int   uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uLightMode;

varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

vec3 tanhv(vec3 x) {
  vec3 e = exp(-2.0 * x);
  return (1.0 - e) / (1.0 + e);
}

vec2 sceneC(vec2 frag, vec2 r) {
  vec2 P = (frag + frag - r) / r.x;
  float z = 0.0;
  float d = 1e3;
  vec4 O = vec4(0.0);
  for (int k = 0; k < 39; k++) {
    if (d <= 1e-4) break;
    O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
    d = 1.0 - sqrt(length(O * O));
    z += d;
  }
  return vec2(O.x, atan(O.z, O.y));
}

void mainImage(out vec4 o, vec2 C) {
  vec2 r = iResolution.xy;
  vec2 uv0 = (C + C - r) / r.x;
  float T = 0.1 * iTime * uSpeed + 9.0;
  float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
  vec2 Y = vec2(5e-3, 6.28318530718 / angRings);

  vec2 c0 = sceneC(C, r);
  vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);
  vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);
  vec2 dCx = cdx - c0;
  vec2 dCy = cdy - c0;
  dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);
  dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);
  vec2 fw = abs(dCx) + abs(dCy);
  C = c0;

  vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);
  vec4 O = uLightMode > 0.5
    ? vec4(0.0)
    : vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);

  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mN = (iMouse + iMouse - r) / r.x;
    float md = length(uv0 - mN);
    mGlow = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;
    O.rgb += uMouseColor * mGlow * 0.25;
  }

  float zr = 5e-4 * uStreakWidth;
  vec2 rr = vec2(max(length(fw), 1e-5));
  float tail = 19.0 / max(uStreakLength, 0.05);

  for (int m = 0; m < 16; m++) {
    if (m >= uStreakCount) break;
    float jf = float(m) + 1.0;
    float ic = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));
    vec2 Pp = C - (T + T * ic) * vec2(0.0, 1.0);
    Pp -= floor(Pp / Y + 0.5) * Y;
    float h = fract(8663.0 * ic);
    vec3 col = palette(h);
    float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);
    weight *= (1.0 + mGlow * 2.0);
    vec2 inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;
    vec2 sm = vec2(1.0) - smoothstep(-rr, rr, inner);
    O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;
    C.x += Y.x / 8.0;
  }

  vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));
if (uLightMode > 0.5) {
  float peak = max(colr.r, max(colr.g, colr.b));
  float coverage = smoothstep(0.035, 0.58, peak) * uOpacity;
  vec3 chroma = clamp(colr / max(peak, 1e-4), 0.0, 1.0);
  chroma = pow(chroma, vec3(1.35));
  float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
  chroma /= max(chromaPeak, 1e-4);
  o = vec4(mix(vec3(1.0), chroma, coverage * 0.94), 1.0);
} else {
    o = vec4(colr, uOpacity);
  }
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`,m=({className:e,dpr:t,paused:n=!1,colors:l=[`#A6C8FF`,`#5227FF`,`#FF9FFC`],backgroundColor:m=`#0A29FF`,speed:h=.5,streakCount:g=2,streakWidth:_=1,streakLength:v=1,glow:y=1,density:b=.6,twinkle:x=1,zoom:S=3,backgroundGlow:C=.5,opacity:w=1,mouseInteraction:T=!0,mouseStrength:E=.5,mouseRadius:D=1,mouseDampening:O=.15,lightMode:k=!1,mixBlendMode:A})=>{let j=(0,s.useRef)(null),M=(0,s.useRef)(null),N=(0,s.useRef)(null),P=(0,s.useRef)(null),F=(0,s.useRef)(null),I=(0,s.useRef)(null),L=(0,s.useRef)([0,0]),R=(0,s.useRef)(0);return(0,s.useEffect)(()=>{let e=j.current;if(!e)return;let s=new i({dpr:t??(typeof window<`u`&&window.devicePixelRatio||1),alpha:!0,antialias:!0});I.current=s;let c=s.gl,A=c.canvas;A.style.width=`100%`,A.style.height=`100%`,A.style.display=`block`,e.appendChild(A);let{arr:z,count:B,avg:V}=d(l),H={iResolution:{value:[c.drawingBufferWidth,c.drawingBufferHeight,1]},iMouse:{value:[0,0]},iTime:{value:0},uColor0:{value:z[0]},uColor1:{value:z[1]},uColor2:{value:z[2]},uColor3:{value:z[3]},uColor4:{value:z[4]},uColor5:{value:z[5]},uColor6:{value:z[6]},uColor7:{value:z[7]},uColorCount:{value:B},uBgColor:{value:u(m)},uMouseColor:{value:V},uSpeed:{value:h},uStreakCount:{value:Math.max(1,Math.min(16,Math.round(g)))},uStreakWidth:{value:_},uStreakLength:{value:v},uGlow:{value:y},uDensity:{value:b},uTwinkle:{value:x},uZoom:{value:S},uBgGlow:{value:C},uOpacity:{value:w},uMouseEnabled:{value:+!!T},uMouseStrength:{value:E},uMouseRadius:{value:D},uLightMode:{value:+!!k}},U=new r(c,{vertex:f,fragment:p,uniforms:H});N.current=U;let W=new o(c);F.current=W;let G=new a(c,{geometry:W,program:U});P.current=G;let K=()=>{let t=e.getBoundingClientRect();s.setSize(t.width,t.height),H.iResolution.value=[c.drawingBufferWidth,c.drawingBufferHeight,1]};K();let q=new ResizeObserver(K);q.observe(e);let J=e=>{let t=A.getBoundingClientRect(),n=s.dpr||1,r=(e.clientX-t.left)*n,i=(t.height-(e.clientY-t.top))*n;L.current=[r,i],O<=0&&(H.iMouse.value=[r,i])};T&&A.addEventListener(`pointermove`,J);let Y=e=>{if(M.current=requestAnimationFrame(Y),H.iTime.value=e*.001,O>0){R.current||=e;let t=(e-R.current)/1e3;R.current=e;let n=Math.max(1e-4,O),r=1-Math.exp(-t/n);r>1&&(r=1);let i=L.current,a=H.iMouse.value;a[0]+=(i[0]-a[0])*r,a[1]+=(i[1]-a[1])*r}else R.current=e;if(!n&&N.current&&P.current)try{s.render({scene:P.current})}catch(e){console.error(e)}};return M.current=requestAnimationFrame(Y),()=>{M.current&&cancelAnimationFrame(M.current),T&&A.removeEventListener(`pointermove`,J),q.disconnect(),A.parentElement===e&&e.removeChild(A);let t=(e,t)=>{e&&typeof e[t]==`function`&&e[t].call(e)};t(N.current,`remove`),t(F.current,`remove`),t(P.current,`remove`),t(I.current,`destroy`),N.current=null,F.current=null,P.current=null,I.current=null}},[t,n,l,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k]),(0,c.jsx)(`div`,{ref:j,className:`lightfall-container ${e??``}`,style:{...A&&{mixBlendMode:A}}})};export{m as default};