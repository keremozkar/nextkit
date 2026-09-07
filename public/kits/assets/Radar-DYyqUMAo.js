import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n();function l(e){let t=e.replace(`#`,``);return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}var u=`
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
uniform float uScale;
uniform float uRingCount;
uniform float uSpokeCount;
uniform float uRingThickness;
uniform float uSpokeThickness;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepLobes;
uniform vec3 uColor;
uniform vec3 uBgColor;
uniform bool uLightMode;
uniform float uFalloff;
uniform float uBrightness;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318530718
#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= uResolution.x / uResolution.y;

  if (uEnableMouse) {
    vec2 mShift = (uMouse * 2.0 - 1.0);
    mShift.x *= uResolution.x / uResolution.y;
    st -= mShift * uMouseInfluence;
  }

  st *= uScale;

  float dist = length(st);
  float theta = atan(st.y, st.x);
  float t = uTime * uSpeed;

  float ringPhase = dist * uRingCount - t;
  float ringDist = abs(fract(ringPhase) - 0.5);
  float ringGlow = 1.0 - smoothstep(0.0, uRingThickness, ringDist);

  float spokeAngle = abs(fract(theta * uSpokeCount / TAU + 0.5) - 0.5) * TAU / uSpokeCount;
  float arcDist = spokeAngle * dist;
  float spokeGlow = (1.0 - smoothstep(0.0, uSpokeThickness, arcDist)) * smoothstep(0.0, 0.1, dist);

  float sweepPhase = t * uSweepSpeed;
  float sweepBeam = pow(max(0.5 * sin(uSweepLobes * theta + sweepPhase) + 0.5, 0.0), uSweepWidth);

  float fade = smoothstep(1.05, 0.85, dist) * pow(max(1.0 - dist, 0.0), uFalloff);

  float intensity = max((ringGlow + spokeGlow + sweepBeam) * fade * uBrightness, 0.0);
  vec3 signal = uColor * intensity;
  vec3 col;
  if (uLightMode) {
    vec3 mapped = vec3(1.0) - exp(-max(signal, vec3(0.0)) * 1.45);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    hue = pow(clamp(hue, 0.0, 1.0), vec3(1.2));
    col = mix(uBgColor, hue, smoothstep(0.015, 0.8, energy) * 0.96);
    gl_FragColor = vec4(col, 1.0);
  } else {
    col = signal + uBgColor;
    float alpha = clamp(length(col), 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
}
`;function f({speed:e=1,scale:t=.5,ringCount:n=10,spokeCount:f=10,ringThickness:p=.05,spokeThickness:m=.01,sweepSpeed:h=1,sweepWidth:g=2,sweepLobes:_=1,color:v=`#9f29ff`,backgroundColor:y=`#000000`,falloff:b=2,brightness:x=1,enableMouseInteraction:S=!0,mouseInfluence:C=.1,lightMode:w=!1}){let T=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!T.current)return;let s=T.current,c=new i({alpha:!0,premultipliedAlpha:!1}),E=c.gl;E.clearColor(0,0,0,0);let D,O=[.5,.5],k=[.5,.5];function A(e){let t=E.canvas.getBoundingClientRect();k=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]}function j(){k=[.5,.5]}function M(){c.setSize(s.offsetWidth,s.offsetHeight),D&&(D.uniforms.uResolution.value=[E.canvas.width,E.canvas.height,E.canvas.width/E.canvas.height])}window.addEventListener(`resize`,M),M();let N=new o(E);D=new r(E,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uResolution:{value:[E.canvas.width,E.canvas.height,E.canvas.width/E.canvas.height]},uSpeed:{value:e},uScale:{value:t},uRingCount:{value:n},uSpokeCount:{value:f},uRingThickness:{value:p},uSpokeThickness:{value:m},uSweepSpeed:{value:h},uSweepWidth:{value:g},uSweepLobes:{value:_},uColor:{value:l(v)},uBgColor:{value:l(y)},uLightMode:{value:w},uFalloff:{value:b},uBrightness:{value:x},uMouse:{value:new Float32Array([.5,.5])},uMouseInfluence:{value:C},uEnableMouse:{value:S}}});let P=new a(E,{geometry:N,program:D});s.appendChild(E.canvas),S&&(E.canvas.addEventListener(`mousemove`,A),E.canvas.addEventListener(`mouseleave`,j));let F;function I(e){F=requestAnimationFrame(I),D.uniforms.uTime.value=e*.001,S?(O[0]+=.05*(k[0]-O[0]),O[1]+=.05*(k[1]-O[1]),D.uniforms.uMouse.value[0]=O[0],D.uniforms.uMouse.value[1]=O[1]):(D.uniforms.uMouse.value[0]=.5,D.uniforms.uMouse.value[1]=.5),c.render({scene:P})}return F=requestAnimationFrame(I),()=>{cancelAnimationFrame(F),window.removeEventListener(`resize`,M),S&&(E.canvas.removeEventListener(`mousemove`,A),E.canvas.removeEventListener(`mouseleave`,j)),s.removeChild(E.canvas),E.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,f,p,m,h,g,_,v,y,b,x,S,C,w]),(0,c.jsx)(`div`,{ref:T,className:`radar-container`})}export{f as default};