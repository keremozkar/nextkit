import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,.5,.2]},u=`#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=60,f=e=>`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;   
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
uniform float uQuality;
uniform float uStepScale;
uniform float uLightMode;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.0; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z += d = (abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4) * uStepScale;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
    if (i >= uQuality) break;
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  if (uLightMode > 0.5) {
    vec3 source = clamp(finalColor, 0.0, 1.0);
    float peak = max(source.r, max(source.g, source.b));
    float floorColor = min(source.r, min(source.g, source.b));
    vec3 chroma = (source - vec3(floorColor)) / max(peak - floorColor, 0.0001);
    vec3 pigment = mix(source / max(peak, 0.0001), chroma, 0.68) * 0.72;
    float energy = clamp(length(rgb) / 1.7320508, 0.0, 1.0);
    float coverage = pow(smoothstep(0.035, 0.72, energy), 0.76) * min(uOpacity, 1.0) * 0.9;
    fragColor = vec4(mix(vec3(1.0), pigment, coverage), 1.0);
  } else {
    fragColor = vec4(finalColor, alpha);
  }
}`,p=({color:e=`#ffffff`,speed:t=1,direction:n=`forward`,scale:p=1,opacity:m=1,mouseInteractive:h=!0,renderScale:g=.55,maxDpr:_=1.5,targetFps:v=60,iterations:y=60,lightMode:b=!1})=>{let x=(0,s.useRef)(null),S=(0,s.useRef)({x:0,y:0}),C=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!x.current)return;let s=x.current,c=typeof window<`u`&&window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches,w=+!!e,T=e?l(e):[1,1,1],E=n===`reverse`?-1:1,D;try{D=new i({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,_)})}catch{return}let O=D.gl;if(!O)return;let k=O.canvas;k.style.display=`block`,k.style.width=`100%`,k.style.height=`100%`,s.appendChild(k);let A=new o(O),j=new r(O,{vertex:u,fragment:f(y),uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uCustomColor:{value:new Float32Array(T)},uUseCustomColor:{value:w},uSpeed:{value:t*.4},uDirection:{value:E},uScale:{value:p},uOpacity:{value:m},uMouse:{value:new Float32Array([0,0])},uMouseInteractive:{value:+!!h},uQuality:{value:y},uStepScale:{value:d/y},uLightMode:{value:+!!b}}}),M=new a(O,{geometry:A,program:j}),N=e=>{if(!h)return;let t=s.getBoundingClientRect();C.current={x:e.clientX-t.left,y:e.clientY-t.top}};h&&s.addEventListener(`mousemove`,N,{passive:!0});let P=!1,F=()=>{let e=s.getBoundingClientRect(),t=Math.max(1,Math.floor(e.width*g)),n=Math.max(1,Math.floor(e.height*g));D.setSize(t,n),k.style.width=`100%`,k.style.height=`100%`;let r=j.uniforms.iResolution.value;r[0]=O.drawingBufferWidth,r[1]=O.drawingBufferHeight},I=new ResizeObserver(()=>{P||(P=!0,requestAnimationFrame(()=>{P=!1,F()}))});I.observe(s),F();let L=0,R=!1,z=!0,B=document.visibilityState!==`hidden`,V=performance.now(),H=1e3/v,U=0,W=()=>{j.uniforms.iTime.value=0,D.render({scene:M})},G=e=>{if(R||!z||!B)return;if(e-U<H){L=requestAnimationFrame(G);return}if(U=e,C.current){S.current=C.current,C.current=null;let e=j.uniforms.uMouse.value;e[0]=S.current.x,e[1]=S.current.y}let t=(e-V)*.001;if(n===`pingpong`){let e=t%10,n=Math.floor(t/10)%2==0,r=e/10,i=r*r*(3-2*r),a=n?i*10:(1-i)*10;j.uniforms.uDirection.value=1,j.uniforms.iTime.value=a}else j.uniforms.iTime.value=t;D.render({scene:M}),L=requestAnimationFrame(G)},K=e=>{e.preventDefault(),R=!0,cancelAnimationFrame(L)},q=()=>{R=!1,z&&B&&!c&&(cancelAnimationFrame(L),L=requestAnimationFrame(G))};k.addEventListener(`webglcontextlost`,K),k.addEventListener(`webglcontextrestored`,q);let J=new IntersectionObserver(([e])=>{let t=z;z=e.isIntersecting,z&&!t&&!R&&B&&!c&&(cancelAnimationFrame(L),L=requestAnimationFrame(G))},{threshold:0});J.observe(s);let Y=()=>{B=document.visibilityState!==`hidden`,B&&z&&!R&&!c?(cancelAnimationFrame(L),U=0,L=requestAnimationFrame(G)):cancelAnimationFrame(L)};return document.addEventListener(`visibilitychange`,Y),c?W():L=requestAnimationFrame(G),()=>{cancelAnimationFrame(L),I.disconnect(),J.disconnect(),document.removeEventListener(`visibilitychange`,Y),k.removeEventListener(`webglcontextlost`,K),k.removeEventListener(`webglcontextrestored`,q),h&&s&&s.removeEventListener(`mousemove`,N);try{s?.removeChild(k)}catch{}}},[e,t,n,p,m,h,g,_,v,y,b]),(0,c.jsx)(`div`,{ref:x,className:`plasma-container`})};export{p as Plasma,p as default};