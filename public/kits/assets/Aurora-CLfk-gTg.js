import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Color-xVu7ktDx.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {                int index = 0;                                              for (int i = 0; i < 2; i++) {                                    ColorStop currentColor = colors[i];                         bool isInBetween = currentColor.position <= factor;         index = int(mix(float(index), float(i), float(isInBetween)));   }                                                           ColorStop currentColor = colors[index];                     ColorStop nextColor = colors[index + 1];                    float range = nextColor.position - currentColor.position;   float lerpFactor = (factor - currentColor.position) / range;   finalColor = mix(currentColor.color, nextColor.color, lerpFactor); }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;function f(e){let{colorStops:t=[`#5227FF`,`#7cff67`,`#5227FF`],amplitude:n=1,blend:f=.5,lightMode:p=!1}=e,m=(0,c.useRef)(e);m.current=e;let h=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let e=h.current;if(!e)return;let c=new i({alpha:!0,premultipliedAlpha:!0,antialias:!0}),l=c.gl;l.clearColor(0,0,0,0),l.enable(l.BLEND),l.blendFunc(l.ONE,l.ONE_MINUS_SRC_ALPHA),l.canvas.style.backgroundColor=`transparent`;let g;function _(){if(!e)return;let t=e.offsetWidth,n=e.offsetHeight;c.setSize(t,n),g&&(g.uniforms.uResolution.value=[t,n])}window.addEventListener(`resize`,_);let v=new s(l);v.attributes.uv&&delete v.attributes.uv;let y=t.map(e=>{let t=new o(e);return[t.r,t.g,t.b]});g=new r(l,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uAmplitude:{value:n},uColorStops:{value:y},uResolution:{value:[e.offsetWidth,e.offsetHeight]},uBlend:{value:f},uLightMode:{value:+!!p}}});let b=new a(l,{geometry:v,program:g});e.appendChild(l.canvas);let x=0,S=e=>{x=requestAnimationFrame(S);let{time:n=e*.01,speed:r=1}=m.current;g.uniforms.uTime.value=n*r*.1,g.uniforms.uAmplitude.value=m.current.amplitude??1,g.uniforms.uBlend.value=m.current.blend??f,g.uniforms.uLightMode.value=m.current.lightMode??p?1:0;let i=m.current.colorStops??t;g.uniforms.uColorStops.value=i.map(e=>{let t=new o(e);return[t.r,t.g,t.b]}),c.render({scene:b})};return x=requestAnimationFrame(S),_(),()=>{cancelAnimationFrame(x),window.removeEventListener(`resize`,_),e&&l.canvas.parentNode===e&&e.removeChild(l.canvas),l.getExtension(`WEBGL_lose_context`)?.loseContext()}},[n,f,p]),(0,l.jsx)(`div`,{ref:h,className:`aurora-container`})}export{f as default};