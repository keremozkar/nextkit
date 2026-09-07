import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,Ft as i,Rt as a,S as o,bt as s,en as c,o as l,yn as u}from"./three.module-Da49k5ub.js";var d=e(t(),1),f=n(),p=`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,m=`
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform float uCoverageAlpha;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float coverage = 0.0;
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    float ringAmount = ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px);
    c = mix(c, rc, vec3(ringAmount));
    coverage = max(coverage, ringAmount);
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  float intensity = max(c.r, max(c.g, c.b));
  vec3 emissiveColor = intensity > 0.0001 ? clamp(c / intensity, 0.0, 1.0) : vec3(0.0);
  vec3 outputColor = mix(emissiveColor, clamp(c, 0.0, 1.0), uCoverageAlpha);
  float outputAlpha = mix(intensity, coverage, uCoverageAlpha);
  gl_FragColor = vec4(outputColor, clamp(outputAlpha * uOpacity, 0.0, 1.0));
}
`;function h({color:e=`#fc42ff`,colorTwo:t=`#42fcff`,speed:n=1,ringCount:h=6,attenuation:g=10,lineThickness:_=2,baseRadius:v=.35,radiusStep:y=.1,scaleRate:b=.1,opacity:x=1,blur:S=0,noiseAmount:C=.1,rotation:w=0,ringGap:T=1.5,fadeIn:E=.7,fadeOut:D=.5,followMouse:O=!1,mouseInfluence:k=.2,hoverScale:A=1.2,parallax:j=.05,clickBurst:M=!1,alphaMode:N=`luminance`}){let P=(0,d.useRef)(null),F=(0,d.useRef)(null),I=(0,d.useRef)([0,0]),L=(0,d.useRef)([0,0]),R=(0,d.useRef)(0),z=(0,d.useRef)(!1),B=(0,d.useRef)(0);return F.current={color:e,colorTwo:t,speed:n,ringCount:h,attenuation:g,lineThickness:_,baseRadius:v,radiusStep:y,scaleRate:b,opacity:x,noiseAmount:C,rotation:w,ringGap:T,fadeIn:E,fadeOut:D,followMouse:O,mouseInfluence:k,hoverScale:A,parallax:j,clickBurst:M,alphaMode:N},(0,d.useEffect)(()=>{let e=P.current;if(!e)return;let t;try{t=new l({alpha:!0})}catch{return}if(!t.capabilities.isWebGL2){t.dispose();return}t.setClearColor(0,0),e.appendChild(t.domElement);let n=new r,d=new i(-.5,.5,.5,-.5,.1,10);d.position.z=1;let f={uTime:{value:0},uAttenuation:{value:0},uResolution:{value:new u},uColor:{value:new o},uColorTwo:{value:new o},uLineThickness:{value:0},uBaseRadius:{value:0},uRadiusStep:{value:0},uScaleRate:{value:0},uRingCount:{value:0},uOpacity:{value:1},uNoiseAmount:{value:0},uRotation:{value:0},uRingGap:{value:1.6},uFadeIn:{value:.5},uFadeOut:{value:.75},uMouse:{value:new u},uMouseInfluence:{value:0},uHoverAmount:{value:0},uHoverScale:{value:1},uParallax:{value:0},uBurst:{value:0},uCoverageAlpha:{value:0}},h=new c({vertexShader:p,fragmentShader:m,uniforms:f,transparent:!0}),g=new s(new a(1,1),h);n.add(g);let _=()=>{let n=e.clientWidth,r=e.clientHeight,i=Math.min(window.devicePixelRatio,2);t.setSize(n,r),t.setPixelRatio(i),f.uResolution.value.set(n*i,r*i)};_(),window.addEventListener(`resize`,_);let v=new ResizeObserver(_);v.observe(e);let y=t=>{let n=e.getBoundingClientRect();I.current[0]=(t.clientX-n.left)/n.width-.5,I.current[1]=-((t.clientY-n.top)/n.height-.5)},b=()=>{z.current=!0},x=()=>{z.current=!1,I.current[0]=0,I.current[1]=0},S=()=>{B.current=1};e.addEventListener(`mousemove`,y),e.addEventListener(`mouseenter`,b),e.addEventListener(`mouseleave`,x),e.addEventListener(`click`,S);let C=0,w=!1,T=!document.hidden,E=0,D=0,O=e=>{C=requestAnimationFrame(O);let r=F.current,i=D===0?0:Math.min(e-D,100);D=e,E+=i*.001*r.speed,L.current[0]+=(I.current[0]-L.current[0])*.08,L.current[1]+=(I.current[1]-L.current[1])*.08,R.current+=(+!!z.current-R.current)*.08,B.current*=.95,B.current<.001&&(B.current=0),f.uTime.value=E,f.uAttenuation.value=r.attenuation,f.uColor.value.set(r.color),f.uColorTwo.value.set(r.colorTwo),f.uLineThickness.value=r.lineThickness,f.uBaseRadius.value=r.baseRadius,f.uRadiusStep.value=r.radiusStep,f.uScaleRate.value=r.scaleRate,f.uRingCount.value=r.ringCount,f.uOpacity.value=r.opacity,f.uNoiseAmount.value=r.noiseAmount,f.uRotation.value=r.rotation*Math.PI/180,f.uRingGap.value=r.ringGap,f.uFadeIn.value=r.fadeIn,f.uFadeOut.value=r.fadeOut,f.uMouse.value.set(L.current[0],L.current[1]),f.uMouseInfluence.value=r.followMouse?r.mouseInfluence:0,f.uHoverAmount.value=R.current,f.uHoverScale.value=r.hoverScale,f.uParallax.value=r.parallax,f.uBurst.value=r.clickBurst?B.current:0,f.uCoverageAlpha.value=+(r.alphaMode===`coverage`),t.render(n,d)};C=0;let k=()=>{w&&T&&C===0&&(D=0,C=requestAnimationFrame(O))},A=()=>{C!==0&&(cancelAnimationFrame(C),C=0)},j=new IntersectionObserver(([e])=>{w=e.isIntersecting,w?k():A()},{threshold:0});j.observe(e);let M=()=>{T=!document.hidden,T?k():A()};return document.addEventListener(`visibilitychange`,M),k(),()=>{A(),j.disconnect(),document.removeEventListener(`visibilitychange`,M),window.removeEventListener(`resize`,_),v.disconnect(),e.removeEventListener(`mousemove`,y),e.removeEventListener(`mouseenter`,b),e.removeEventListener(`mouseleave`,x),e.removeEventListener(`click`,S),e.removeChild(t.domElement),t.dispose(),h.dispose()}},[]),(0,f.jsx)(`div`,{ref:P,className:`magic-rings-container`,style:S>0?{filter:`blur(${S}px)`}:void 0})}export{h as default};