import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n();function l(e){let t=e.replace(`#`,``);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}var u=`
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
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;
uniform float uLightMode;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  if (uLightMode > 0.5) {
    vec3 weights = pow(max(vec3(rChannel, gChannel, bChannel), vec3(0.0)), vec3(3.0));
    float weightSum = max(weights.r + weights.g + weights.b, 0.0001);
    vec3 chroma = (weights.r * uColor1 + weights.g * uColor2 + weights.b * uColor3) / weightSum;
    float neutral = min(chroma.r, min(chroma.g, chroma.b));
    chroma = max(chroma - vec3(neutral * 0.92), vec3(0.0));
    float peak = max(chroma.r, max(chroma.g, chroma.b));
    chroma = pow(clamp(chroma / max(peak, 0.0001), 0.0, 1.0), vec3(1.08));
    float ink = clamp(max(rChannel, max(gChannel, bChannel)) * uBrightness * 1.15, 0.0, 0.92);
    gl_FragColor = vec4(mix(vec3(1.0), chroma, ink), 1.0);
  } else {
    gl_FragColor = vec4(col, alpha);
  }
}
`;function f({speed:e=.3,innerLineCount:t=32,outerLineCount:n=36,warpIntensity:f=1,rotation:p=-45,edgeFadeWidth:m=0,colorCycleSpeed:h=1,brightness:g=.2,color1:_=`#ffffff`,color2:v=`#ffffff`,color3:y=`#ffffff`,enableMouseInteraction:b=!0,mouseInfluence:x=2,lightMode:S=!1}){let C=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!C.current)return;let s=C.current,c=new i({alpha:!0,premultipliedAlpha:!1}),w=c.gl;w.clearColor(0,0,0,0);let T,E=[.5,.5],D=[.5,.5];function O(e){let t=w.canvas.getBoundingClientRect();D=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]}function k(){D=[.5,.5]}function A(){c.setSize(s.offsetWidth,s.offsetHeight),T&&(T.uniforms.uResolution.value=[w.canvas.width,w.canvas.height,w.canvas.width/w.canvas.height])}window.addEventListener(`resize`,A),A();let j=new o(w),M=p*Math.PI/180;T=new r(w,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uResolution:{value:[w.canvas.width,w.canvas.height,w.canvas.width/w.canvas.height]},uSpeed:{value:e},uInnerLines:{value:t},uOuterLines:{value:n},uWarpIntensity:{value:f},uRotation:{value:M},uEdgeFadeWidth:{value:m},uColorCycleSpeed:{value:h},uBrightness:{value:g},uColor1:{value:l(_)},uColor2:{value:l(v)},uColor3:{value:l(y)},uMouse:{value:new Float32Array([.5,.5])},uMouseInfluence:{value:x},uEnableMouse:{value:b},uLightMode:{value:+!!S}}});let N=new a(w,{geometry:j,program:T});s.appendChild(w.canvas),b&&(w.canvas.addEventListener(`mousemove`,O),w.canvas.addEventListener(`mouseleave`,k));let P;function F(e){P=requestAnimationFrame(F),T.uniforms.uTime.value=e*.001,b?(E[0]+=.05*(D[0]-E[0]),E[1]+=.05*(D[1]-E[1]),T.uniforms.uMouse.value[0]=E[0],T.uniforms.uMouse.value[1]=E[1]):(T.uniforms.uMouse.value[0]=.5,T.uniforms.uMouse.value[1]=.5),c.render({scene:N})}return P=requestAnimationFrame(F),()=>{cancelAnimationFrame(P),window.removeEventListener(`resize`,A),b&&(w.canvas.removeEventListener(`mousemove`,O),w.canvas.removeEventListener(`mouseleave`,k)),s.removeChild(w.canvas),w.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,f,p,m,h,g,_,v,y,b,x,S]),(0,c.jsx)(`div`,{ref:C,className:`line-waves-container`})}export{f as default};