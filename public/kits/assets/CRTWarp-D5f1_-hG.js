import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,Ft as i,Qt as a,Rt as o,S as s,bt as c,en as l,o as u,x as d,yn as f}from"./three.module-Da49k5ub.js";var p=e(t(),1),m=n(),h=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`,g=`
precision highp float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanlineFrequency;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uBloom;
uniform float uBloomRadius;
uniform float uNoise;
uniform float uVignette;
uniform float uBrightness;
uniform float uPixelation;
uniform float uRgbShift;
uniform vec2 uPointer;
uniform float uMouseStrength;
uniform float uMouseReact;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  float safeRadius = max(radius, 1.415);
  float cornerScale = safeRadius / sqrt(max(safeRadius * safeRadius - 2.0, 0.001));
  p = safeRadius * p / sqrt(max(safeRadius * safeRadius - dot(p, p), 0.001));
  p /= cornerScale;
  return p * 0.5 + 0.5;
}

float referencePlasma(vec2 uv, float t) {
  float frequencyScale = max(uWaveFrequency / 2.2, 0.001);
  uv = (uv - 0.5) * frequencyScale + 0.5;

  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);

  uv *= vec2(80.0, 24.0);
  uv = ceil(uv);
  uv /= vec2(80.0, 24.0);

  float amplitude = uWaveAmplitude / 0.28;
  float field = 0.0;
  field += 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);

  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field += 0.3 * sin(0.5 * uv.y + uv.x + sin(t));

  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * amplitude))) / 3.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    uv = (floor(uv * cells) + 0.5) / cells;
  }

  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  if (uMouseReact > 0.5) {
    curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  }
  vec2 curvedUv = crtCurve(uv, curveRadius);
  if (uMouseReact > 0.5) {
    curvedUv.x -= uPointer.x * uMouseStrength * 0.035;
  }

  float signal = referencePlasma(curvedUv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += referencePlasma(curvedUv + vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv - vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(radius, -radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(-radius, radius), uTime) * 0.08;

  float redSignal = referencePlasma(curvedUv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = referencePlasma(curvedUv - vec2(uRgbShift, 0.0), uTime);
  vec3 channelSignal = vec3(redSignal, signal, blueSignal);
  vec3 waveColor = uColor * (0.3 + signal * 0.7 + glow * uBloom * 0.65);
  waveColor += (channelSignal - signal) * 0.42;

  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float waveMask = clamp(signal * 0.82 + glow * 0.52, 0.0, 1.0) * edgeFade;

  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  waveColor = max(waveColor * uBrightness, vec3(0.0));
  vec3 color = mix(uBackgroundColor, waveColor, waveMask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;function _({color:e=`#c755f7`,backgroundColor:t=`#05010a`,speed:n=.5,curvature:_=.25,scanlineStrength:v=.25,scanlineFrequency:y=200,waveAmplitude:b=.3,waveFrequency:x=2.5,bloom:S=1.5,bloomRadius:C=1,noise:w=.1,vignette:T=0,brightness:E=1.25,pixelation:D=1,rgbShift:O=.015,mouseReact:k=!0,mouseStrength:A=.5,dpr:j=1,fps:M=30,paused:N=!1,className:P,style:F}){let I=(0,p.useRef)(null),L=(0,p.useRef)(null),R=(0,p.useRef)(null),z=(0,p.useRef)(null),B=(0,p.useRef)(N),V=(0,p.useRef)(new f(0,0)),H=(0,p.useRef)(new f(0,0)),U=(0,p.useRef)(!0),W=(0,p.useRef)(M),G=(0,p.useRef)(0);return(0,p.useEffect)(()=>{B.current=N},[N]),(0,p.useEffect)(()=>{W.current=Math.max(1,M)},[M]),(0,p.useEffect)(()=>{let e=I.current;if(!e)return;let t=new r,n=new i(-1,1,1,-1,0,1),p=new o(2,2),m=new l({vertexShader:h,fragmentShader:g,uniforms:{uResolution:{value:new f(1,1)},uTime:{value:0},uSpeed:{value:.5},uColor:{value:new s(`#c755f7`)},uBackgroundColor:{value:new s(`#05010a`)},uCurvature:{value:.25},uScanlineStrength:{value:.25},uScanlineFrequency:{value:200},uWaveAmplitude:{value:.3},uWaveFrequency:{value:2.5},uBloom:{value:1.5},uBloomRadius:{value:1},uNoise:{value:.1},uVignette:{value:0},uBrightness:{value:1.25},uPixelation:{value:1},uRgbShift:{value:.015},uPointer:{value:new f(0,0)},uMouseStrength:{value:.5},uMouseReact:{value:1}}});L.current=m;let _=new c(p,m);t.add(_);let v=new u({antialias:!1,alpha:!1,powerPreference:`low-power`});R.current=v,v.outputColorSpace=a,v.setPixelRatio(Math.min(window.devicePixelRatio||1,1)),v.domElement.style.width=`100%`,v.domElement.style.height=`100%`,v.domElement.style.display=`block`,e.appendChild(v.domElement);let y=()=>{let t=Math.max(e.clientWidth,1),n=Math.max(e.clientHeight,1);v.setSize(t,n,!1),m.uniforms.uResolution.value.set(v.domElement.width,v.domElement.height)},b=new ResizeObserver(y);b.observe(e),y();let x=new d,S=new IntersectionObserver(([e])=>{U.current=e.isIntersecting});S.observe(e);let C=e=>{if(z.current=requestAnimationFrame(C),!U.current||document.hidden)return;let r=1e3/W.current;if(e-G.current<r)return;G.current=e-(e-G.current)%r;let i=Math.min(x.getDelta(),.1);B.current||(m.uniforms.uTime.value+=i*m.uniforms.uSpeed.value),H.current.lerp(V.current,.08),m.uniforms.uPointer.value.copy(H.current),v.render(t,n)};C(0);let w=t=>{let n=e.getBoundingClientRect();V.current.set((t.clientX-n.left)/Math.max(n.width,1)*2-1,-((t.clientY-n.top)/Math.max(n.height,1)*2-1))},T=()=>V.current.set(0,0);return e.addEventListener(`pointermove`,w,{passive:!0}),e.addEventListener(`pointerleave`,T),()=>{cancelAnimationFrame(z.current),b.disconnect(),S.disconnect(),e.removeEventListener(`pointermove`,w),e.removeEventListener(`pointerleave`,T),p.dispose(),m.dispose(),v.dispose(),v.domElement.remove(),L.current=null,R.current=null}},[]),(0,p.useEffect)(()=>{let r=L.current,i=R.current;if(!r||!i)return;let a=r.uniforms;a.uColor.value.set(e),a.uBackgroundColor.value.set(t),a.uSpeed.value=n,a.uCurvature.value=_,a.uScanlineStrength.value=v,a.uScanlineFrequency.value=y,a.uWaveAmplitude.value=b,a.uWaveFrequency.value=x,a.uBloom.value=S,a.uBloomRadius.value=C,a.uNoise.value=w,a.uVignette.value=T,a.uBrightness.value=E,a.uPixelation.value=D,a.uRgbShift.value=O,a.uMouseReact.value=+!!k,a.uMouseStrength.value=A,i.setPixelRatio(Math.min(window.devicePixelRatio||1,j));let o=I.current;o&&(i.setSize(Math.max(o.clientWidth,1),Math.max(o.clientHeight,1),!1),a.uResolution.value.set(i.domElement.width,i.domElement.height))},[t,S,C,E,e,_,j,k,A,w,D,O,y,v,n,M,T,b,x]),(0,m.jsx)(`div`,{ref:I,className:`crt-warp-container ${P||``}`,style:F})}export{_ as default};