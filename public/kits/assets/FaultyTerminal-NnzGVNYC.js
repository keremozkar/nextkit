import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Color-xVu7ktDx.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uLightMode;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    if (uLightMode > 0.5) {
      float energy = max(max(col.r, col.g), col.b);
      float coverage = clamp(smoothstep(0.0, 0.72, energy) * 0.9, 0.0, 0.9);
      vec3 ink = clamp(col * 0.42, 0.0, 0.76);
      col = mix(vec3(1.0), ink, coverage);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;function f(e){let t=e.replace(`#`,``).trim();t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=parseInt(t.slice(0,6),16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function p({scale:e=1,gridMul:t=[2,1],digitSize:n=1.5,timeScale:p=.3,pause:m=!1,scanlineIntensity:h=.3,glitchAmount:g=1,flickerAmount:_=1,noiseAmp:v=1,chromaticAberration:y=0,dither:b=0,curvature:x=.2,tint:S=`#ffffff`,mouseReact:C=!0,mouseStrength:w=.2,dpr:T=Math.min(window.devicePixelRatio||1,2),pageLoadAnimation:E=!0,brightness:D=1,lightMode:O=!1,className:k,style:A,...j}){let M=(0,c.useRef)(null),N=(0,c.useRef)(null),P=(0,c.useRef)(null),F=(0,c.useRef)({x:.5,y:.5}),I=(0,c.useRef)({x:.5,y:.5}),L=(0,c.useRef)(0),R=(0,c.useRef)(0),z=(0,c.useRef)(0),B=(0,c.useRef)(Math.random()*100),V=(0,c.useMemo)(()=>f(S),[S]),H=(0,c.useMemo)(()=>typeof b==`boolean`?+!!b:b,[b]),U=(0,c.useCallback)(e=>{let t=M.current;if(!t)return;let n=t.getBoundingClientRect(),r=(e.clientX-n.left)/n.width,i=1-(e.clientY-n.top)/n.height;F.current={x:r,y:i}},[]);return(0,c.useEffect)(()=>{let c=M.current;if(!c)return;let l=new i({dpr:T});P.current=l;let f=l.gl;f.clearColor(+!!O,+!!O,+!!O,1);let b=new s(f),S=new r(f,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new o(f.canvas.width,f.canvas.height,f.canvas.width/f.canvas.height)},uScale:{value:e},uGridMul:{value:new Float32Array(t)},uDigitSize:{value:n},uScanlineIntensity:{value:h},uGlitchAmount:{value:g},uFlickerAmount:{value:_},uNoiseAmp:{value:v},uChromaticAberration:{value:y},uDither:{value:H},uCurvature:{value:x},uTint:{value:new o(V[0],V[1],V[2])},uMouse:{value:new Float32Array([I.current.x,I.current.y])},uMouseStrength:{value:w},uUseMouse:{value:+!!C},uPageLoadProgress:{value:+!E},uUsePageLoadAnimation:{value:+!!E},uBrightness:{value:D},uLightMode:{value:+!!O}}});N.current=S;let k=new a(f,{geometry:b,program:S});function A(){c&&l&&(l.setSize(c.offsetWidth,c.offsetHeight),S.uniforms.iResolution.value=new o(f.canvas.width,f.canvas.height,f.canvas.width/f.canvas.height))}let j=new ResizeObserver(()=>A());j.observe(c),A();let W=e=>{if(R.current=requestAnimationFrame(W),E&&z.current===0&&(z.current=e),m)S.uniforms.iTime.value=L.current;else{let t=(e*.001+B.current)*p;S.uniforms.iTime.value=t,L.current=t}if(E&&z.current>0){let t=e-z.current,n=Math.min(t/2e3,1);S.uniforms.uPageLoadProgress.value=n}if(C){let e=.08,t=I.current,n=F.current;t.x+=(n.x-t.x)*e,t.y+=(n.y-t.y)*e;let r=S.uniforms.uMouse.value;r[0]=t.x,r[1]=t.y}l.render({scene:k})};return R.current=requestAnimationFrame(W),c.appendChild(f.canvas),C&&c.addEventListener(`mousemove`,U),()=>{cancelAnimationFrame(R.current),j.disconnect(),C&&c.removeEventListener(`mousemove`,U),f.canvas.parentElement===c&&c.removeChild(f.canvas),f.getExtension(`WEBGL_lose_context`)?.loseContext(),z.current=0,B.current=Math.random()*100}},[T,m,p,e,t,n,h,g,_,v,y,H,x,V,C,w,E,D,O,U]),(0,l.jsx)(`div`,{ref:M,className:`faulty-terminal-container ${k}`,style:A,...j})}export{p as default};