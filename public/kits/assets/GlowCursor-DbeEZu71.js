import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=64,u=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`
precision highp float;

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 p, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(p);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    float active = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`,f=e=>{let t=(e||``).replace(`#`,``).trim();t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=Number.parseInt(t||`000000`,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},p=(e,t,n)=>Math.min(Math.max(e,t),n),m=({color:e=`#67E8F9`,secondaryColor:t=`#A78BFA`,trailLength:n=40,trailWidth:m=8,trailTaper:h=.8,followSpeed:g=.16,glowIntensity:_=1.9,glowSpread:v=1.2,hotspot:y=.65,brightness:b=1.25,opacity:x=1,pulseSpeed:S=1.1,noiseStrength:C=.035,idleFade:w=!0,idleTimeout:T=700,fadeDuration:E=900,blendMode:D=`screen`,maxDevicePixelRatio:O=1.5,enabled:k=!0,children:A,className:j=``,style:M,...N})=>{let P=(0,s.useRef)(null),F=(0,s.useRef)(null),I=(0,s.useRef)({});return I.current={color:e,secondaryColor:t,trailLength:n,trailWidth:m,trailTaper:h,followSpeed:g,glowIntensity:_,glowSpread:v,hotspot:y,brightness:b,opacity:x,pulseSpeed:S,noiseStrength:C,idleFade:w,idleTimeout:T,fadeDuration:E,maxDevicePixelRatio:O,blendMode:D,enabled:k},(0,s.useEffect)(()=>{let e=P.current,t=F.current;if(!e||!t)return;let n=I.current,s=new i({canvas:t,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,n.maxDevicePixelRatio)}),c=s.gl;c.clearColor(0,0,0,0);let m=Array(128).fill(0),h=Array.from({length:l},()=>({x:0,y:0})),g={x:0,y:0},_={x:0,y:0},v=new r(c,{vertex:u,fragment:d,uniforms:{uResolution:{value:[1,1]},uPoints:{value:m},uPointCount:{value:n.trailLength},uColor:{value:f(n.color)},uSecondaryColor:{value:f(n.secondaryColor)},uTrailWidth:{value:n.trailWidth},uTaper:{value:n.trailTaper},uGlowIntensity:{value:n.glowIntensity},uGlowSpread:{value:n.glowSpread},uHotspot:{value:n.hotspot},uBrightness:{value:n.brightness},uOpacity:{value:n.opacity},uPulseSpeed:{value:n.pulseSpeed},uNoiseStrength:{value:n.noiseStrength},uNormalBlend:{value:+(n.blendMode===`normal`)},uTime:{value:0},uFade:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1}),y=new a(c,{geometry:new o(c),program:v}),b=1,x=1,S=!1,C=!1,w=0,T=performance.now(),E=performance.now(),D=0,O=!1,k=()=>{b=Math.max(e.clientWidth,1),x=Math.max(e.clientHeight,1),s.setSize(b,x),v.uniforms.uResolution.value=[b,x]},A=(e,t)=>{g.x=e,g.y=t,_.x=e,_.y=t;for(let n of h)n.x=e,n.y=t;S=!0,w=1},j=t=>{let n=e.getBoundingClientRect(),r=p(t.clientX-n.left,0,n.width),i=p(n.height-(t.clientY-n.top),0,n.height);S||A(r,i),g.x=r,g.y=i,C=!0,T=performance.now()},M=()=>{C=!1,T=performance.now()},N=e=>{if(O)return;let t=I.current,n=Math.min((e-E)/16.667,3);if(E=e,S){let e=1-(1-p(t.followSpeed,.01,.99))**n,r=1-(1-p(.28+t.followSpeed*.35,.08,.92))**n;_.x+=(g.x-_.x)*e,_.y+=(g.y-_.y)*e,h[0].x=_.x,h[0].y=_.y;for(let e=1;e<l;e++)h[e].x+=(h[e-1].x-h[e].x)*r,h[e].y+=(h[e-1].y-h[e].y)*r;for(let e=0;e<l;e++)m[e*2]=h[e].x,m[e*2+1]=h[e].y}let r=e-T,i=t.idleFade&&(!C||r>t.idleTimeout),a=16.667*n/Math.max(t.fadeDuration,16),o=S&&t.enabled&&!i?1:0;w+=(o-w)*Math.min(1,a*7),v.uniforms.uPointCount.value=p(Math.round(t.trailLength),2,l),v.uniforms.uColor.value=f(t.color),v.uniforms.uSecondaryColor.value=f(t.secondaryColor),v.uniforms.uTrailWidth.value=Math.max(t.trailWidth,.1),v.uniforms.uTaper.value=p(t.trailTaper,0,1),v.uniforms.uGlowIntensity.value=Math.max(t.glowIntensity,0),v.uniforms.uGlowSpread.value=Math.max(t.glowSpread,0),v.uniforms.uHotspot.value=p(t.hotspot,0,1),v.uniforms.uBrightness.value=Math.max(t.brightness,0),v.uniforms.uOpacity.value=p(t.opacity,0,1),v.uniforms.uPulseSpeed.value=t.pulseSpeed,v.uniforms.uNoiseStrength.value=p(t.noiseStrength,0,1),v.uniforms.uNormalBlend.value=+(t.blendMode===`normal`),v.uniforms.uTime.value=e*.001,v.uniforms.uFade.value=w,s.render({scene:y}),O||(D=requestAnimationFrame(N))},L=new ResizeObserver(k);return L.observe(e),e.addEventListener(`pointermove`,j),e.addEventListener(`pointerenter`,j),e.addEventListener(`pointerleave`,M),k(),D=requestAnimationFrame(N),()=>{O=!0,cancelAnimationFrame(D),L.disconnect(),e.removeEventListener(`pointermove`,j),e.removeEventListener(`pointerenter`,j),e.removeEventListener(`pointerleave`,M),y.geometry.remove(),v.remove()}},[O]),(0,c.jsxs)(`div`,{ref:P,className:`glow-cursor${j?` ${j}`:``}`,style:M,...N,children:[(0,c.jsx)(`canvas`,{ref:F,className:`glow-cursor__canvas`,style:{mixBlendMode:D},"aria-hidden":`true`}),A&&(0,c.jsx)(`div`,{className:`glow-cursor__content`,children:A})]})};export{m as default};