import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Texture-C-0j2d6N.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n();function u(e){let t=e.replace(`#`,``);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}function d(e=256){let t=new Uint8Array(e*e*4);function n(e,t,n){let r=e*374761393+t*668265263+n*1274126177;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296}function r(t,r,i,a){let o=t/e*i,s=r/e*i,c=Math.floor(o),l=Math.floor(s),u=o-c,d=s-l,f=i|0,p=n((c%f+f)%f,(l%f+f)%f,a),m=n(((c+1)%f+f)%f,(l%f+f)%f,a),h=n((c%f+f)%f,((l+1)%f+f)%f,a),g=n(((c+1)%f+f)%f,((l+1)%f+f)%f,a);return p*(1-u)*(1-d)+m*u*(1-d)+h*(1-u)*d+g*u*d}for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=0,o=.4,s=0;for(let e=0;e<8;e++){let t=32*(1<<e);a+=o*r(i,n,t,e*31),s+=o,o*=.65}a/=s,a=(a-.5)*2.2+.5,a=Math.max(0,Math.min(1,a));let c=Math.round(a*255),l=(n*e+i)*4;t[l]=c,t[l+1]=c,t[l+2]=c,t[l+3]=255}return t}var f=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,p=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uNoiseTexture;
uniform float uPupilSize;
uniform float uIrisWidth;
uniform float uGlowIntensity;
uniform float uIntensity;
uniform float uScale;
uniform float uNoiseScale;
uniform vec2 uMouse;
uniform float uPupilFollow;
uniform float uFlameSpeed;
uniform vec3 uEyeColor;
uniform vec3 uBgColor;
uniform bool uLightMode;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  uv /= uScale;
  float ft = uTime * uFlameSpeed;

  float polarRadius = length(uv) * 2.0;
  float polarAngle = (2.0 * atan(uv.x, uv.y)) / 6.28 * 0.3;
  vec2 polarUv = vec2(polarRadius, polarAngle);

  vec4 noiseA = texture2D(uNoiseTexture, polarUv * vec2(0.2, 7.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));
  vec4 noiseB = texture2D(uNoiseTexture, polarUv * vec2(0.3, 4.0) * uNoiseScale + vec2(-ft * 0.2, 0.0));
  vec4 noiseC = texture2D(uNoiseTexture, polarUv * vec2(0.1, 5.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));

  float distanceMask = 1.0 - length(uv);

  // Inner ring
  float innerRing = clamp(-1.0 * ((distanceMask - 0.7) / uIrisWidth), 0.0, 1.0);
  innerRing = (innerRing * distanceMask - 0.2) / 0.28;
  innerRing += noiseA.r - 0.5;
  innerRing *= 1.3;
  innerRing = clamp(innerRing, 0.0, 1.0);

  float outerRing = clamp(-1.0 * ((distanceMask - 0.5) / 0.2), 0.0, 1.0);
  outerRing = (outerRing * distanceMask - 0.1) / 0.38;
  outerRing += noiseC.r - 0.5;
  outerRing *= 1.3;
  outerRing = clamp(outerRing, 0.0, 1.0);

  innerRing += outerRing;

  // Inner eye
  float innerEye = distanceMask - 0.1 * 2.0;
  innerEye *= noiseB.r * 2.0;

  // Pupil with cursor tracking
  vec2 pupilOffset = uMouse * uPupilFollow * 0.12;
  vec2 pupilUv = uv - pupilOffset;
  float pupil = 1.0 - length(pupilUv * vec2(9.0, 2.3));
  pupil *= uPupilSize;
  pupil = clamp(pupil, 0.0, 1.0);
  pupil /= 0.35;

  // Outer eye
  float outerEyeGlow = 1.0 - length(uv * vec2(0.5, 1.5));
  outerEyeGlow = clamp(outerEyeGlow + 0.5, 0.0, 1.0);
  outerEyeGlow += noiseC.r - 0.5;
  float outerBgGlow = outerEyeGlow;
  outerEyeGlow = pow(outerEyeGlow, 2.0);
  outerEyeGlow += distanceMask;
  outerEyeGlow *= uGlowIntensity;
  outerEyeGlow = clamp(outerEyeGlow, 0.0, 1.0);
  outerEyeGlow *= pow(1.0 - distanceMask, 2.0) * 2.5;

  // Outer eye bg glow
  outerBgGlow += distanceMask;
  outerBgGlow = pow(outerBgGlow, 0.5);
  outerBgGlow *= 0.15;

  vec3 eyeEnergy = uEyeColor * uIntensity * clamp(max(innerRing + innerEye, outerEyeGlow + outerBgGlow) - pupil, 0.0, 3.0);
  vec3 color;
  if (uLightMode) {
    vec3 mapped = vec3(1.0) - exp(-max(eyeEnergy, vec3(0.0)) * 1.3);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    hue = pow(clamp(hue, 0.0, 1.0), vec3(1.2));
    color = mix(uBgColor, hue, smoothstep(0.02, 0.82, energy) * 0.96);
  } else {
    color = eyeEnergy + uBgColor;
  }

  gl_FragColor = vec4(color, 1.0);
}
`;function m({eyeColor:e=`#FF6F37`,intensity:t=1.5,pupilSize:n=.6,irisWidth:m=.25,glowIntensity:h=.35,scale:g=.8,noiseScale:_=1,pupilFollow:v=1,flameSpeed:y=1,backgroundColor:b=`#000000`,lightMode:x=!1}){let S=(0,c.useRef)(null);return(0,c.useEffect)(()=>{if(!S.current)return;let c=S.current,l=new i({alpha:!0,premultipliedAlpha:!1}),C=l.gl;C.clearColor(0,0,0,0);let w=d(256),T=new o(C,{image:w,width:256,height:256,generateMipmaps:!1,flipY:!1});T.minFilter=C.LINEAR,T.magFilter=C.LINEAR,T.wrapS=C.REPEAT,T.wrapT=C.REPEAT;let E={x:0,y:0,tx:0,ty:0};function D(e){let t=c.getBoundingClientRect();E.tx=(e.clientX-t.left)/t.width*2-1,E.ty=-((e.clientY-t.top)/t.height*2-1)}function O(){E.tx=0,E.ty=0}c.addEventListener(`mousemove`,D),c.addEventListener(`mouseleave`,O);let k;function A(){l.setSize(c.offsetWidth,c.offsetHeight),k&&(k.uniforms.uResolution.value=[C.canvas.width,C.canvas.height,C.canvas.width/C.canvas.height])}window.addEventListener(`resize`,A),A();let j=new s(C);k=new r(C,{vertex:f,fragment:p,uniforms:{uTime:{value:0},uResolution:{value:[C.canvas.width,C.canvas.height,C.canvas.width/C.canvas.height]},uNoiseTexture:{value:T},uPupilSize:{value:n},uIrisWidth:{value:m},uGlowIntensity:{value:h},uIntensity:{value:t},uScale:{value:g},uNoiseScale:{value:_},uMouse:{value:[0,0]},uPupilFollow:{value:v},uFlameSpeed:{value:y},uEyeColor:{value:u(e)},uBgColor:{value:u(b)},uLightMode:{value:x}}});let M=new a(C,{geometry:j,program:k});c.appendChild(C.canvas);let N;function P(e){N=requestAnimationFrame(P),E.x+=(E.tx-E.x)*.05,E.y+=(E.ty-E.y)*.05,k.uniforms.uMouse.value=[E.x,E.y],k.uniforms.uTime.value=e*.001,l.render({scene:M})}return N=requestAnimationFrame(P),()=>{cancelAnimationFrame(N),window.removeEventListener(`resize`,A),c.removeEventListener(`mousemove`,D),c.removeEventListener(`mouseleave`,O),c.removeChild(C.canvas),C.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,m,h,g,_,v,y,b,x]),(0,l.jsx)(`div`,{ref:S,className:`evil-eye-container`})}export{m as default};