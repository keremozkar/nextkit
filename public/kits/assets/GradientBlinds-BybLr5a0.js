import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=8,u=e=>{let t=e.replace(`#`,``).padEnd(6,`0`);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]},d=e=>{let t=(e&&e.length?e:[`#FF9FFC`,`#5227FF`]).slice(0,l);for(t.length===1&&t.push(t[0]);t.length<l;)t.push(t[t.length-1]);let n=[];for(let e=0;e<l;e++)n.push(u(t[e]));return{arr:n,count:Math.max(2,Math.min(l,e?.length??2))}},f=({className:e,dpr:t,paused:n=!1,gradientColors:l,angle:u=0,noise:f=.3,blindCount:p=16,blindMinWidth:m=60,mouseDampening:h=.15,mirrorGradient:g=!1,spotlightRadius:_=.5,spotlightSoftness:v=1,spotlightOpacity:y=1,distortAmount:b=0,shineDirection:x=`left`,mixBlendMode:S=`lighten`,lightMode:C=!1})=>{let w=(0,s.useRef)(null),T=(0,s.useRef)(null),E=(0,s.useRef)(null),D=(0,s.useRef)(null),O=(0,s.useRef)(null),k=(0,s.useRef)(null),A=(0,s.useRef)([0,0]),j=(0,s.useRef)(0),M=(0,s.useRef)(!0);return(0,s.useEffect)(()=>{let e=w.current;if(!e)return;let s=new i({dpr:t??(typeof window<`u`&&window.devicePixelRatio||1),alpha:!0,antialias:!0});k.current=s;let c=s.gl,S=c.canvas;S.style.width=`100%`,S.style.height=`100%`,S.style.display=`block`,e.appendChild(S);let{arr:N,count:P}=d(l),F={iResolution:{value:[c.drawingBufferWidth,c.drawingBufferHeight,1]},iMouse:{value:[0,0]},iTime:{value:0},uAngle:{value:u*Math.PI/180},uNoise:{value:f},uBlindCount:{value:Math.max(1,p)},uSpotlightRadius:{value:_},uSpotlightSoftness:{value:v},uSpotlightOpacity:{value:y},uMirror:{value:+!!g},uDistort:{value:b},uShineFlip:{value:+(x===`right`)},uColor0:{value:N[0]},uColor1:{value:N[1]},uColor2:{value:N[2]},uColor3:{value:N[3]},uColor4:{value:N[4]},uColor5:{value:N[5]},uColor6:{value:N[6]},uColor7:{value:N[7]},uColorCount:{value:P},uLightMode:{value:+!!C}},I=new r(c,{vertex:`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,fragment:`
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;
uniform float uLightMode;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv0 = fragCoord.xy / iResolution.xy;

    float aspect = iResolution.x / iResolution.y;
    vec2 p = uv0 * 2.0 - 1.0;
    p.x *= aspect;
    vec2 pr = rotate2D(p, uAngle);
    pr.x /= aspect;
    vec2 uv = pr * 0.5 + 0.5;

    vec2 uvMod = uv;
    if (uDistort > 0.0) {
      float a = uvMod.y * 6.0;
      float b = uvMod.x * 6.0;
      float w = 0.01 * uDistort;
      uvMod.x += sin(a) * w;
      uvMod.y += cos(b) * w;
    }
    float t = uvMod.x;
    if (uMirror > 0.5) {
      t = 1.0 - abs(1.0 - 2.0 * fract(t));
    }
    vec3 base = getGradientColor(t);

    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float blindCount = max(uBlindCount, 1.0);
  float stripePhase = uvMod.x * blindCount;
  float stripe = fract(stripePhase);
  float stripeAA = clamp(blindCount * 1.25 / min(iResolution.x, iResolution.y), 0.001, 0.12);
  float edgeDistance = min(stripe, 1.0 - stripe);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, edgeDistance);
  stripe = mix(stripe, 0.5, edgeBlend);
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
    vec3 ran = vec3(stripe);
    vec3 revealSignal = cir + base - ran;

    vec3 col;
    if (uLightMode > 0.5) {
        float peak = max(base.r, max(base.g, base.b));
        vec3 pigment = base / max(peak, 0.0001);
        float neutral = min(pigment.r, min(pigment.g, pigment.b));
        pigment = max(pigment - vec3(neutral * 0.72), vec3(0.0));
        pigment /= max(max(pigment.r, max(pigment.g, pigment.b)), 0.0001);
        pigment = mix(pigment, pigment * pigment, 0.12) * 0.72;
        vec3 revealed = clamp(revealSignal, 0.0, 1.0);
        float coverage = max(revealed.r, max(revealed.g, revealed.b));
        col = mix(vec3(1.0), pigment, coverage);
        float grain = max(rand(gl_FragCoord.xy + iTime) - 0.5, 0.0);
        float grainAmount = grain * uNoise * mix(0.12, 0.18, coverage);
        col = clamp(col - vec3(grainAmount), 0.0, 1.0);
    } else {
        col = revealSignal;
        col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
    }

    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
}
`,uniforms:F});E.current=I;let L=new o(c);O.current=L;let R=new a(c,{geometry:L,program:I});D.current=R;let z=()=>{let t=e.getBoundingClientRect();if(s.setSize(t.width,t.height),F.iResolution.value=[c.drawingBufferWidth,c.drawingBufferHeight,1],m&&m>0){let e=Math.max(1,Math.floor(t.width/m)),n=p?Math.min(p,e):e;F.uBlindCount.value=Math.max(1,n)}else F.uBlindCount.value=Math.max(1,p);if(M.current){M.current=!1;let e=c.drawingBufferWidth/2,t=c.drawingBufferHeight/2;F.iMouse.value=[e,t],A.current=[e,t]}};z();let B=new ResizeObserver(z);B.observe(e);let V=e=>{let t=S.getBoundingClientRect(),n=s.dpr||1,r=(e.clientX-t.left)*n,i=(t.height-(e.clientY-t.top))*n;A.current=[r,i],h<=0&&(F.iMouse.value=[r,i])};S.addEventListener(`pointermove`,V);let H=e=>{if(T.current=requestAnimationFrame(H),F.iTime.value=e*.001,h>0){j.current||=e;let t=(e-j.current)/1e3;j.current=e;let n=Math.max(1e-4,h),r=1-Math.exp(-t/n);r>1&&(r=1);let i=A.current,a=F.iMouse.value;a[0]+=(i[0]-a[0])*r,a[1]+=(i[1]-a[1])*r}else j.current=e;if(!n&&E.current&&D.current)try{s.render({scene:D.current})}catch(e){console.error(e)}};return T.current=requestAnimationFrame(H),()=>{T.current&&cancelAnimationFrame(T.current),S.removeEventListener(`pointermove`,V),B.disconnect(),S.parentElement===e&&e.removeChild(S);let t=(e,t)=>{e&&typeof e[t]==`function`&&e[t].call(e)};t(E.current,`remove`),t(O.current,`remove`),t(D.current,`remove`),t(k.current,`destroy`),E.current=null,O.current=null,D.current=null,k.current=null}},[t,n,l,u,f,p,m,h,g,_,v,y,b,x,C]),(0,c.jsx)(`div`,{ref:w,className:`gradient-blinds-container ${e}`,style:{...!C&&S&&{mixBlendMode:S}}})};export{f as default};