import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Color-xVu7ktDx.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,d=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;function f({focal:e=[.5,.5],rotation:t=[1,0],starSpeed:n=.5,density:f=1,hueShift:p=140,disableAnimation:m=!1,speed:h=1,mouseInteraction:g=!0,glowIntensity:_=.3,saturation:v=0,mouseRepulsion:y=!0,repulsionStrength:b=2,twinkleIntensity:x=.3,rotationSpeed:S=.1,autoCenterRepulsion:C=0,transparent:w=!0,lightMode:T=!1,...E}){let D=(0,c.useRef)(null),O=(0,c.useRef)({x:.5,y:.5}),k=(0,c.useRef)({x:.5,y:.5}),A=(0,c.useRef)(0),j=(0,c.useRef)(0);return(0,c.useEffect)(()=>{if(!D.current)return;let c=D.current,l=new i({alpha:w,premultipliedAlpha:!1}),E=l.gl;T?E.clearColor(1,1,1,1):w?(E.enable(E.BLEND),E.blendFunc(E.SRC_ALPHA,E.ONE_MINUS_SRC_ALPHA),E.clearColor(0,0,0,0)):E.clearColor(0,0,0,1);let M;function N(){l.setSize(c.offsetWidth*1,c.offsetHeight*1),M&&(M.uniforms.uResolution.value=new o(E.canvas.width,E.canvas.height,E.canvas.width/E.canvas.height))}window.addEventListener(`resize`,N,!1),N();let P=new s(E);M=new r(E,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uResolution:{value:new o(E.canvas.width,E.canvas.height,E.canvas.width/E.canvas.height)},uFocal:{value:new Float32Array(e)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:n},uDensity:{value:f},uHueShift:{value:p},uSpeed:{value:h},uMouse:{value:new Float32Array([k.current.x,k.current.y])},uGlowIntensity:{value:_},uSaturation:{value:v},uMouseRepulsion:{value:y},uTwinkleIntensity:{value:x},uRotationSpeed:{value:S},uRepulsionStrength:{value:b},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:C},uTransparent:{value:w},uLightMode:{value:+!!T}}});let F=new a(E,{geometry:P,program:M}),I;function L(e){I=requestAnimationFrame(L),m||(M.uniforms.uTime.value=e*.001,M.uniforms.uStarSpeed.value=e*.001*n/10);let t=.05;k.current.x+=(O.current.x-k.current.x)*t,k.current.y+=(O.current.y-k.current.y)*t,j.current+=(A.current-j.current)*t,M.uniforms.uMouse.value[0]=k.current.x,M.uniforms.uMouse.value[1]=k.current.y,M.uniforms.uMouseActiveFactor.value=j.current,l.render({scene:F})}I=requestAnimationFrame(L),c.appendChild(E.canvas);function R(e){let t=c.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;O.current={x:n,y:r},A.current=1}function z(){A.current=0}return g&&(c.addEventListener(`mousemove`,R),c.addEventListener(`mouseleave`,z)),()=>{cancelAnimationFrame(I),window.removeEventListener(`resize`,N),g&&(c.removeEventListener(`mousemove`,R),c.removeEventListener(`mouseleave`,z)),c.removeChild(E.canvas),E.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,f,p,m,h,g,_,v,y,x,S,b,C,w,T]),(0,l.jsx)(`div`,{ref:D,className:`galaxy-container`,...E})}export{f as default};