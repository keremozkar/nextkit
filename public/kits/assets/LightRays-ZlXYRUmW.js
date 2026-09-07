import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=`#ffffff`,u=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},d=(e,t,n)=>{switch(e){case`top-left`:return{anchor:[0,-.2*n],dir:[0,1]};case`top-right`:return{anchor:[t,-.2*n],dir:[0,1]};case`left`:return{anchor:[-.2*t,.5*n],dir:[1,0]};case`right`:return{anchor:[1.2*t,.5*n],dir:[-1,0]};case`bottom-left`:return{anchor:[0,1.2*n],dir:[0,-1]};case`bottom-center`:return{anchor:[.5*t,1.2*n],dir:[0,-1]};case`bottom-right`:return{anchor:[t,1.2*n],dir:[0,-1]};default:return{anchor:[.5*t,-.2*n],dir:[0,1]}}},f=({raysOrigin:e=`top-center`,raysColor:t=l,raysSpeed:n=1,lightSpread:f=1,rayLength:p=2,pulsating:m=!1,fadeDistance:h=1,saturation:g=1,followMouse:_=!0,mouseInfluence:v=.1,noiseAmount:y=0,distortion:b=0,lightMode:x=!1,className:S=``})=>{let C=(0,s.useRef)(null),w=(0,s.useRef)(null),T=(0,s.useRef)(null),E=(0,s.useRef)({x:.5,y:.5}),D=(0,s.useRef)({x:.5,y:.5}),O=(0,s.useRef)(null),k=(0,s.useRef)(null),A=(0,s.useRef)(null),[j,M]=(0,s.useState)(!1),N=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(C.current)return N.current=new IntersectionObserver(e=>{let t=e[0];M(t.isIntersecting)},{threshold:.1}),N.current.observe(C.current),()=>{N.current&&=(N.current.disconnect(),null)}},[]),(0,s.useEffect)(()=>!j||!C.current?void 0:(A.current&&=(A.current(),null),(async()=>{if(!C.current||(await new Promise(e=>setTimeout(e,10)),!C.current))return;let s=new i({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});T.current=s;let c=s.gl;for(c.canvas.style.width=`100%`,c.canvas.style.height=`100%`;C.current.firstChild;)C.current.removeChild(C.current.firstChild);C.current.appendChild(c.canvas);let l={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:u(t)},raysSpeed:{value:n},lightSpread:{value:f},rayLength:{value:p},pulsating:{value:+!!m},fadeDistance:{value:h},saturation:{value:g},mousePos:{value:[.5,.5]},mouseInfluence:{value:v},noiseAmount:{value:y},distortion:{value:b},lightMode:{value:+!!x}};w.current=l;let S=new o(c),j=new r(c,{vertex:`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,fragment:`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
uniform float lightMode;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;

  if (lightMode > 0.5) {
    vec3 mapped = vec3(1.0) - exp(-max(fragColor.rgb, vec3(0.0)) * 1.35);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    vec3 ink = mix(hue * 0.25, hue * 0.72, energy);
    fragColor = vec4(mix(vec3(1.0), ink, energy), 1.0);
  }
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`,uniforms:l}),M=new a(c,{geometry:S,program:j});k.current=M;let N=()=>{if(!C.current||!s)return;s.dpr=Math.min(window.devicePixelRatio,2);let{clientWidth:t,clientHeight:n}=C.current;s.setSize(t,n);let r=s.dpr,i=t*r,a=n*r;l.iResolution.value=[i,a];let{anchor:o,dir:c}=d(e,i,a);l.rayPos.value=o,l.rayDir.value=c},P=e=>{if(T.current&&w.current&&k.current){if(l.iTime.value=e*.001,_&&v>0){let e=.92;D.current.x=D.current.x*e+E.current.x*.07999999999999996,D.current.y=D.current.y*e+E.current.y*.07999999999999996,l.mousePos.value=[D.current.x,D.current.y]}try{s.render({scene:M}),O.current=requestAnimationFrame(P)}catch(e){console.warn(`WebGL rendering error:`,e);return}}};window.addEventListener(`resize`,N),N(),O.current=requestAnimationFrame(P),A.current=()=>{if(O.current&&=(cancelAnimationFrame(O.current),null),window.removeEventListener(`resize`,N),s)try{let e=s.gl.canvas,t=s.gl.getExtension(`WEBGL_lose_context`);t&&t.loseContext(),e&&e.parentNode&&e.parentNode.removeChild(e)}catch(e){console.warn(`Error during WebGL cleanup:`,e)}T.current=null,w.current=null,k.current=null}})(),()=>{A.current&&=(A.current(),null)}),[j,e,t,n,f,p,m,h,g,_,v,y,b,x]),(0,s.useEffect)(()=>{if(!w.current||!C.current||!T.current)return;let r=w.current,i=T.current;r.raysColor.value=u(t),r.raysSpeed.value=n,r.lightSpread.value=f,r.rayLength.value=p,r.pulsating.value=+!!m,r.fadeDistance.value=h,r.saturation.value=g,r.mouseInfluence.value=v,r.noiseAmount.value=y,r.distortion.value=b,r.lightMode.value=+!!x;let{clientWidth:a,clientHeight:o}=C.current,s=i.dpr,{anchor:c,dir:l}=d(e,a*s,o*s);r.rayPos.value=c,r.rayDir.value=l},[t,n,f,e,p,m,h,g,v,y,b,x]),(0,s.useEffect)(()=>{let e=e=>{if(!C.current||!T.current)return;let t=C.current.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;E.current={x:n,y:r}};if(_)return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[_]),(0,c.jsx)(`div`,{ref:C,className:`light-rays-container ${S}`.trim()})};export{f as default};