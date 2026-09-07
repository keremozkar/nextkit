import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=8,u=e=>{let t=e.replace(`#`,``).padEnd(6,`0`);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]},d=e=>{let t=(e&&e.length?e:[`#4F46E5`,`#06B6D4`,`#E0F2FE`]).slice(0,l),n=t.length,r=[];for(let e=0;e<l;e++)r.push(u(t[Math.min(e,t.length-1)]));let i=[0,0,0];for(let e=0;e<n;e++)i[0]+=r[e][0],i[1]+=r[e][1],i[2]+=r[e][2];return i[0]/=n,i[1]/=n,i[2]/=n,{arr:r,count:n,avg:i}},f=e=>{switch(e){case`up`:return[0,1];case`down`:return[0,-1];case`left`:return[-1,0];case`right`:return[1,0];default:return[0,-1]}},p=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,m=`
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

uniform vec3  uMouseColor;
uniform vec2  uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;

varying vec2 vUv;

#define PI 3.14159265

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

float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * PI - PI / 2.0) + 1.0) / 2.0);
}

float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}

float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 p = fragCoord / iResolution.y * ref;

  float spd = 200.0 * uSpeed;
  float t = iTime;

  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);

  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;

  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);

  float mapeaks = smin(peaks, peaks2, max(uFluidity, 0.001));

  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mp = iMouse / iResolution.y * ref;
    float md = length(p - mp) / ref;
    float rr = max(uMouseRadius, 0.02);
    mGlow = exp(-md * md / (rr * rr)) * uMouseStrength;
  }

  float band = (uRimWidth - abs((mapeaks - 0.4) * 2.0)) * 5.0;
  float ltn = clamp(band - vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer, 0.0, 1.0);
  ltn = pow(ltn, uSharpness) * uGlow;
  ltn *= clamp(1.0 - mGlow, 0.0, 1.0);

  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 col = palette(h);

  vec3 outc = col * ltn;
  float a = clamp(max(outc.r, max(outc.g, outc.b)), 0.0, 1.0);
  fragColor = vec4(outc, a * uOpacity);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`,h=({className:e,dpr:t,paused:n=!1,colors:l=[`#ffffff`,`#ffffff`,`#ffffff`],speed:u=.5,scale:h=1.6,turbulence:g=1,fluidity:_=.1,rimWidth:v=.2,sharpness:y=2.5,shimmer:b=1.5,glow:x=2,flowDirection:S=`down`,opacity:C=1,mouseInteraction:w=!0,mouseStrength:T=1,mouseRadius:E=.35,mouseDampening:D=.15,mixBlendMode:O})=>{let k=(0,s.useRef)(null),A=(0,s.useRef)(null),j=(0,s.useRef)(null),M=(0,s.useRef)(null),N=(0,s.useRef)(null),P=(0,s.useRef)(null),F=(0,s.useRef)([0,0]),I=(0,s.useRef)(0);return(0,s.useEffect)(()=>{let e=k.current;if(!e)return;let s=new i({dpr:t??(typeof window<`u`&&window.devicePixelRatio||1),alpha:!0,antialias:!0});P.current=s;let c=s.gl,O=c.canvas;c.clearColor(0,0,0,0),O.style.width=`100%`,O.style.height=`100%`,O.style.display=`block`,e.appendChild(O);let{arr:L,count:R,avg:z}=d(l),B={iResolution:{value:[c.drawingBufferWidth,c.drawingBufferHeight,1]},iMouse:{value:[0,0]},iTime:{value:0},uColor0:{value:L[0]},uColor1:{value:L[1]},uColor2:{value:L[2]},uColor3:{value:L[3]},uColor4:{value:L[4]},uColor5:{value:L[5]},uColor6:{value:L[6]},uColor7:{value:L[7]},uColorCount:{value:R},uMouseColor:{value:z},uFlow:{value:f(S)},uSpeed:{value:u},uScale:{value:h},uTurbulence:{value:g},uFluidity:{value:_},uRimWidth:{value:v},uSharpness:{value:y},uShimmer:{value:b},uGlow:{value:x},uOpacity:{value:C},uMouseEnabled:{value:+!!w},uMouseStrength:{value:T},uMouseRadius:{value:E}},V=new r(c,{vertex:p,fragment:m,uniforms:B});j.current=V;let H=new o(c);N.current=H;let U=new a(c,{geometry:H,program:V});M.current=U;let W=()=>{let t=e.getBoundingClientRect();s.setSize(t.width,t.height),B.iResolution.value=[c.drawingBufferWidth,c.drawingBufferHeight,1]};W();let G=new ResizeObserver(W);G.observe(e);let K=e=>{let t=O.getBoundingClientRect(),n=s.dpr||1,r=(e.clientX-t.left)*n,i=(t.height-(e.clientY-t.top))*n;F.current=[r,i],D<=0&&(B.iMouse.value=[r,i])};w&&O.addEventListener(`pointermove`,K);let q=e=>{if(A.current=requestAnimationFrame(q),B.iTime.value=e*.001,D>0){I.current||=e;let t=(e-I.current)/1e3;I.current=e;let n=Math.max(1e-4,D),r=1-Math.exp(-t/n);r>1&&(r=1);let i=F.current,a=B.iMouse.value;a[0]+=(i[0]-a[0])*r,a[1]+=(i[1]-a[1])*r}else I.current=e;if(!n&&j.current&&M.current)try{s.render({scene:M.current})}catch(e){console.error(e)}};return A.current=requestAnimationFrame(q),()=>{A.current&&cancelAnimationFrame(A.current),w&&O.removeEventListener(`pointermove`,K),G.disconnect(),O.parentElement===e&&e.removeChild(O);let t=(e,t)=>{let n=e&&e[t];typeof n==`function`&&n.call(e)};t(j.current,`remove`),t(N.current,`remove`),t(M.current,`remove`),t(P.current,`destroy`),j.current=null,N.current=null,M.current=null,P.current=null}},[t,n,l,u,h,g,_,v,y,b,x,S,C,w,T,E,D]),(0,c.jsx)(`div`,{ref:k,className:`ferrofluid-container ${e??``}`,style:{...O&&{mixBlendMode:O}}})};export{h as default};