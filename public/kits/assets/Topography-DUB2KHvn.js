import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=e=>e===`uniform`?1:e===`alternating`?2:0,d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uMorphAmount;
uniform float uBands;
uniform float uThickness;
uniform float uScale;
uniform float uPixelSize;
uniform float uGlow;
uniform float uColorMode;
uniform float uContrast;
uniform float uBrightness;
uniform float uFillBands;
uniform float uOpacity;
uniform float uLightMode;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec2 uMouse;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec4 uCtrlA;
uniform vec4 uCtrlB;
uniform vec4 uCtrlC;
uniform vec4 uCtrlD;
out vec4 fragColor;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

vec3 elevationColor(float e) {
  vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.5, e));
  c = mix(c, uHigh, smoothstep(0.5, 1.0, e));
  return c;
}

void main() {
  vec2 res = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;

  vec2 suv = (uv - 0.5) / max(uScale, 0.001) + 0.5;

  vec2 sampleUv = suv;
  if (uPixelSize > 1.0) {
    vec2 px = res / uPixelSize;
    sampleUv = (floor(suv * px) + 0.5) / px;
  }

  float fv = field(sampleUv);

  if (uMouseEnabled > 0.5) {
    vec2 d = uv - uMouse;
    d.x *= res.x / max(res.y, 1.0);
    float r = max(uMouseRadius, 0.001);
    float bump = exp(-dot(d, d) / (r * r)) * uMouseStrength * uMouseActive;
    fv += bump;
  }

  float f = fv * uBands;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);

  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);

  float glowR = uThickness + uGlow * 0.5 + aa;
  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);

  float elev = clamp(fv / (uMorphAmount * 2.5 + 0.001), 0.0, 1.0);

  vec3 lineCol;
  if (uColorMode < 0.5) {
    lineCol = elevationColor(elev);
  } else if (uColorMode < 1.5) {
    lineCol = uMid;
  } else {
    float parity = mod(floor(f), 2.0);
    lineCol = mix(uMid, uHigh, parity);
  }

  float coverage = clamp(mask + glow * 0.55, 0.0, 1.0);
  coverage = pow(coverage, max(uContrast, 0.001));

  vec3 outColor = lineCol;
  float outAlpha = coverage;

  if (uFillBands > 0.5) {
    vec3 fillCol = elevationColor(elev);
    float fillA = 0.1 * elev;
    outColor = mix(fillCol, lineCol, coverage);
    outAlpha = clamp(coverage + fillA, 0.0, 1.0);
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    outAlpha += (g - 0.5) * uGrainIntensity;
  }

  outColor *= uBrightness;
  outColor = clamp(outColor, 0.0, 1.0);

  float a = clamp(outAlpha, 0.0, 1.0) * uOpacity;
  if (uLightMode > 0.5) {
    float peak = max(outColor.r, max(outColor.g, outColor.b));
    vec3 chroma = pow(clamp(outColor / max(peak, 0.0001), 0.0, 1.0), vec3(1.18));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outColor * a, a);
  }
}
`,p=new WeakMap,m=[[1,-2,3,-4],[9,-8,7,-6],[5,2,5,-5],[-1,-3,8,9]],h=({lowColor:e=`#5227FF`,midColor:t=`#FF9FFC`,highColor:n=`#FFFFFF`,speed:h=.35,morphAmount:g=3,morphSpeed:_=.05,bands:v=2,thickness:y=.01,scale:b=1,pixelSize:x=1,glow:S=.5,colorMode:C=`elevation`,contrast:w=3,brightness:T=1,fillBands:E=!1,opacity:D=1,grain:O=!0,grainIntensity:k=.05,mouseInteraction:A=!0,mouseRadius:j=.3,mouseStrength:M=.4,lightMode:N=!1,className:P=``})=>{let F=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=F.current;if(!e)return;let t=new i({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl;n.clearColor(0,0,0,0);let s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:d,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.35},uMorphAmount:{value:3},uMorphSpeed:{value:.05},uBands:{value:2},uThickness:{value:.01},uScale:{value:1},uPixelSize:{value:1},uGlow:{value:.5},uColorMode:{value:0},uContrast:{value:3},uBrightness:{value:1},uFillBands:{value:0},uOpacity:{value:1},uLightMode:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uLow:{value:new Float32Array([1,1,1])},uMid:{value:new Float32Array([1,1,1])},uHigh:{value:new Float32Array([1,1,1])},uMouse:{value:new Float32Array([.5,.5])},uMouseEnabled:{value:1},uMouseRadius:{value:.3},uMouseStrength:{value:.4},uMouseActive:{value:0},uCtrlA:{value:new Float32Array([0,0,0,0])},uCtrlB:{value:new Float32Array([0,0,0,0])},uCtrlC:{value:new Float32Array([0,0,0,0])},uCtrlD:{value:new Float32Array([0,0,0,0])}}}),u=new a(n,{geometry:c,program:l});p.set(e,{renderer:t,program:l,mesh:u});let h=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:u})},g=new ResizeObserver(h);g.observe(e),h();let _=[.5,.5],v=[.5,.5],y=0,b=0,x=e=>{let t=s.getBoundingClientRect();v[0]=(e.clientX-t.left)/t.width,v[1]=1-(e.clientY-t.top)/t.height,b=1},S=()=>{b=0};s.addEventListener(`mousemove`,x),s.addEventListener(`mouseleave`,S);let C=[l.uniforms.uCtrlA.value,l.uniforms.uCtrlB.value,l.uniforms.uCtrlC.value,l.uniforms.uCtrlD.value],w=0,T=!0,E=!document.hidden,D=performance.now(),O=e=>{let n=(e-D)*.001,r=l.uniforms;r.iTime.value=n;let i=r.uMorphAmount.value,a=r.uSpeed.value,o=r.uMorphSpeed.value;for(let e=0;e<4;e++){let t=C[e],r=m[e];for(let e=0;e<4;e++){let s=r[e];t[e]=i*Math.sin(n*a*Math.sin(s*o)+s)}}_[0]+=.05*(v[0]-_[0]),_[1]+=.05*(v[1]-_[1]),r.uMouse.value[0]=_[0],r.uMouse.value[1]=_[1],y+=.05*(b-y),r.uMouseActive.value=y,t.render({scene:u}),w=requestAnimationFrame(O)},k=()=>{T&&E&&w===0&&(w=requestAnimationFrame(O))},A=()=>{w!==0&&(cancelAnimationFrame(w),w=0)},j=new IntersectionObserver(([e])=>{T=e.isIntersecting,T?k():A()},{threshold:0});j.observe(e);let M=()=>{E=!document.hidden,E?k():A()};return document.addEventListener(`visibilitychange`,M),k(),()=>{A(),g.disconnect(),j.disconnect(),document.removeEventListener(`visibilitychange`,M),s.removeEventListener(`mousemove`,x),s.removeEventListener(`mouseleave`,S),p.delete(e);try{e.removeChild(s)}catch{}n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,s.useEffect)(()=>{let r=F.current;if(!r)return;let i=p.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uSpeed.value=h,o.uMorphAmount.value=g,o.uMorphSpeed.value=_,o.uBands.value=v,o.uThickness.value=y,o.uScale.value=b,o.uPixelSize.value=x,o.uGlow.value=S,o.uColorMode.value=u(C),o.uContrast.value=w,o.uBrightness.value=T,o.uFillBands.value=+!!E,o.uOpacity.value=D,o.uLightMode.value=+!!N,o.uGrain.value=+!!O,o.uGrainIntensity.value=k,o.uLow.value=new Float32Array(l(e)),o.uMid.value=new Float32Array(l(t)),o.uHigh.value=new Float32Array(l(n)),o.uMouseEnabled.value=+!!A,o.uMouseRadius.value=j,o.uMouseStrength.value=M},[e,t,n,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N]),(0,c.jsx)(`div`,{ref:F,className:`topography-container ${P}`.trim()})};export{h as default};