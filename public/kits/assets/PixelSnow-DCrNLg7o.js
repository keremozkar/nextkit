import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{$t as r,Ft as i,Rt as a,S as o,bn as s,bt as c,en as l,o as u,yn as d}from"./three.module-Da49k5ub.js";var f=e(t(),1),p=n(),m=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,h=`
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uFlakeSize;
uniform float uMinFlakeSize;
uniform float uPixelResolution;
uniform float uSpeed;
uniform float uDepthFade;
uniform float uFarPlane;
uniform vec3 uColor;
uniform float uBrightness;
uniform float uGamma;
uniform float uDensity;
uniform float uVariant;
uniform float uDirection;

// Precomputed constants
#define PI 3.14159265
#define PI_OVER_6 0.5235988
#define PI_OVER_3 1.0471976
#define INV_SQRT3 0.57735027
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10

// Optimized hash - inline multiplication
#define hash(n) (n * (n ^ (n >> 15)))
#define coord3(p) (uvec3(p).x * M1 ^ uvec3(p).y * M2 ^ uvec3(p).z * M3)

// Precomputed camera basis vectors (normalized vec3(1,1,1), vec3(1,0,-1))
const vec3 camK = vec3(0.57735027, 0.57735027, 0.57735027);
const vec3 camI = vec3(0.70710678, 0.0, -0.70710678);
const vec3 camJ = vec3(-0.40824829, 0.81649658, -0.40824829);

// Precomputed branch direction
const vec2 b1d = vec2(0.574, 0.819);

vec3 hash3(uint n) {
  uvec3 hashed = hash(n) * uvec3(1U, 511U, 262143U);
  return vec3(hashed) * F0;
}

float snowflakeDist(vec2 p) {
  float r = length(p);
  float a = atan(p.y, p.x);
  a = abs(mod(a + PI_OVER_6, PI_OVER_3) - PI_OVER_6);
  vec2 q = r * vec2(cos(a), sin(a));
  float dMain = max(abs(q.y), max(-q.x, q.x - 1.0));
  float b1t = clamp(dot(q - vec2(0.4, 0.0), b1d), 0.0, 0.4);
  float dB1 = length(q - vec2(0.4, 0.0) - b1t * b1d);
  float b2t = clamp(dot(q - vec2(0.7, 0.0), b1d), 0.0, 0.25);
  float dB2 = length(q - vec2(0.7, 0.0) - b2t * b1d);
  return min(dMain, min(dB1, dB2)) * 10.0;
}

void main() {
  // Precompute reciprocals to avoid division
  float invPixelRes = 1.0 / uPixelResolution;
  float pixelSize = max(1.0, floor(0.5 + uResolution.x * invPixelRes));
  float invPixelSize = 1.0 / pixelSize;
  
  vec2 fragCoord = floor(gl_FragCoord.xy * invPixelSize);
  vec2 res = uResolution * invPixelSize;
  float invResX = 1.0 / res.x;

  vec3 ray = normalize(vec3((fragCoord - res * 0.5) * invResX, 1.0));
  ray = ray.x * camI + ray.y * camJ + ray.z * camK;

  // Precompute time-based values
  float timeSpeed = uTime * uSpeed;
  float windX = cos(uDirection) * 0.4;
  float windY = sin(uDirection) * 0.4;
  vec3 camPos = (windX * camI + windY * camJ + 0.1 * camK) * timeSpeed;
  vec3 pos = camPos;

  // Precompute ray reciprocal for strides
  vec3 absRay = max(abs(ray), vec3(0.001));
  vec3 strides = 1.0 / absRay;
  vec3 raySign = step(ray, vec3(0.0));
  vec3 phase = fract(pos) * strides;
  phase = mix(strides - phase, phase, raySign);

  // Precompute for intersection test
  float rayDotCamK = dot(ray, camK);
  float invRayDotCamK = 1.0 / rayDotCamK;
  float invDepthFade = 1.0 / uDepthFade;
  float halfInvResX = 0.5 * invResX;
  vec3 timeAnim = timeSpeed * 0.1 * vec3(7.0, 8.0, 5.0);

  float t = 0.0;
  for (int i = 0; i < 128; i++) {
    if (t >= uFarPlane) break;
    
    vec3 fpos = floor(pos);
    uint cellCoord = coord3(fpos);
    float cellHash = hash3(cellCoord).x;

    if (cellHash < uDensity) {
      vec3 h = hash3(cellCoord);
      
      // Optimized flake position calculation
      vec3 sinArg1 = fpos.yzx * 0.073;
      vec3 sinArg2 = fpos.zxy * 0.27;
      vec3 flakePos = 0.5 - 0.5 * cos(4.0 * sin(sinArg1) + 4.0 * sin(sinArg2) + 2.0 * h + timeAnim);
      flakePos = flakePos * 0.8 + 0.1 + fpos;

      float toIntersection = dot(flakePos - pos, camK) * invRayDotCamK;
      
      if (toIntersection > 0.0) {
        vec3 testPos = pos + ray * toIntersection - flakePos;
        float testX = dot(testPos, camI);
        float testY = dot(testPos, camJ);
        vec2 testUV = abs(vec2(testX, testY));
        
        float depth = dot(flakePos - camPos, camK);
        float flakeSize = max(uFlakeSize, uMinFlakeSize * depth * halfInvResX);
        
        // Avoid branching with step functions where possible
        float dist;
        if (uVariant < 0.5) {
          dist = max(testUV.x, testUV.y);
        } else if (uVariant < 1.5) {
          dist = length(testUV);
        } else {
          float invFlakeSize = 1.0 / flakeSize;
          dist = snowflakeDist(vec2(testX, testY) * invFlakeSize) * flakeSize;
        }

        if (dist < flakeSize) {
          float flakeSizeRatio = uFlakeSize / flakeSize;
          float intensity = exp2(-(t + toIntersection) * invDepthFade) *
                           min(1.0, flakeSizeRatio * flakeSizeRatio) * uBrightness;
          gl_FragColor = vec4(uColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
          return;
        }
      }
    }

    float nextStep = min(min(phase.x, phase.y), phase.z);
    vec3 sel = step(phase, vec3(nextStep));
    phase = phase - nextStep + strides * sel;
    t += nextStep;
    pos = mix(pos + ray * nextStep, floor(pos + ray * nextStep + 0.5), sel);
  }

  gl_FragColor = vec4(0.0);
}
`;function g({color:e=`#ffffff`,flakeSize:t=.01,minFlakeSize:n=1.25,pixelResolution:g=200,speed:_=1.25,depthFade:v=8,farPlane:y=20,brightness:b=1,gamma:x=.4545,density:S=.3,variant:C=`square`,direction:w=125,className:T=``,style:E={}}){let D=(0,f.useRef)(null),O=(0,f.useRef)(0),k=(0,f.useRef)(!0),A=(0,f.useRef)(null),j=(0,f.useRef)(null),M=(0,f.useRef)(null),N=(0,f.useMemo)(()=>C===`round`?1:C===`snowflake`?2:0,[C]),P=(0,f.useMemo)(()=>{let t=new o(e);return new s(t.r,t.g,t.b)},[e]),F=(0,f.useCallback)(()=>{M.current&&clearTimeout(M.current),M.current=window.setTimeout(()=>{let e=D.current,t=A.current,n=j.current;if(!e||!t||!n)return;let r=e.offsetWidth,i=e.offsetHeight;t.setSize(r,i),n.uniforms.uResolution.value.set(r,i)},100)},[]);return(0,f.useEffect)(()=>{let e=D.current;if(!e)return;let t=new IntersectionObserver(([e])=>{k.current=e.isIntersecting},{threshold:0});return t.observe(e),()=>t.disconnect()},[]),(0,f.useEffect)(()=>{let e=D.current;if(!e)return;let o=new r,s=new i(-1,1,1,-1,0,1),f=new u({antialias:!1,alpha:!0,premultipliedAlpha:!1,powerPreference:`high-performance`,stencil:!1,depth:!1});f.setPixelRatio(Math.min(window.devicePixelRatio,2)),f.setSize(e.offsetWidth,e.offsetHeight),f.setClearColor(0,0),e.appendChild(f.domElement),A.current=f;let p=new l({vertexShader:m,fragmentShader:h,uniforms:{uTime:{value:0},uResolution:{value:new d(e.offsetWidth,e.offsetHeight)},uFlakeSize:{value:t},uMinFlakeSize:{value:n},uPixelResolution:{value:g},uSpeed:{value:_},uDepthFade:{value:v},uFarPlane:{value:y},uColor:{value:P.clone()},uBrightness:{value:b},uGamma:{value:x},uDensity:{value:S},uVariant:{value:N},uDirection:{value:w*Math.PI/180}},transparent:!0});j.current=p;let C=new a(2,2);o.add(new c(C,p)),window.addEventListener(`resize`,F);let T=performance.now(),E=()=>{O.current=requestAnimationFrame(E),k.current&&(p.uniforms.uTime.value=(performance.now()-T)*.001,f.render(o,s))};return E(),()=>{cancelAnimationFrame(O.current),window.removeEventListener(`resize`,F),M.current&&clearTimeout(M.current),e.contains(f.domElement)&&e.removeChild(f.domElement),f.dispose(),f.forceContextLoss(),C.dispose(),p.dispose(),A.current=null,j.current=null}},[F]),(0,f.useEffect)(()=>{let e=j.current;e&&(e.uniforms.uFlakeSize.value=t,e.uniforms.uMinFlakeSize.value=n,e.uniforms.uPixelResolution.value=g,e.uniforms.uSpeed.value=_,e.uniforms.uDepthFade.value=v,e.uniforms.uFarPlane.value=y,e.uniforms.uBrightness.value=b,e.uniforms.uGamma.value=x,e.uniforms.uDensity.value=S,e.uniforms.uVariant.value=N,e.uniforms.uDirection.value=w*Math.PI/180,e.uniforms.uColor.value.copy(P))},[t,n,g,_,v,y,b,x,S,N,w,P]),(0,p.jsx)(`div`,{ref:D,className:`pixel-snow-container ${T}`,style:E})}export{g as default};