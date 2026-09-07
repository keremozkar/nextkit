import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./RenderTarget-CTgTThLo.js";import{t as s}from"./Color-xVu7ktDx.js";import{t as c}from"./Triangle-qjVMgwr4.js";var l=e(t(),1),u=n(),d=12,f=8,p=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,m=`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${f}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < ${d}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
`,h=`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
`,g=e=>{let t=e&&e.length?e:[`#ffffff`],n=[];for(let e=0;e<f;e++){let r=t[e]??t[t.length-1],i=new s(r);n.push([i.r,i.g,i.b])}return n};function _({colors:e=[`#FF4242`,`#7C3AED`,`#06B6D4`,`#EAB308`],count:t=3,speed:n=.5,amplitude:s=1,waviness:_=1,thickness:v=.7,glow:y=2.6,taper:b=3,spread:x=1,hueShift:S=0,intensity:C=.6,saturation:w=1.5,opacity:T=1,scale:E=1.5,glass:D=!1,refraction:O=1,dispersion:k=1,glassSize:A=1,className:j=``,style:M}){let N=(0,l.useRef)({});N.current={colors:e,count:t,speed:n,amplitude:s,waviness:_,thickness:v,glow:y,taper:b,spread:x,hueShift:S,intensity:C,saturation:w,opacity:T,scale:E,glass:D,refraction:O,dispersion:k,glassSize:A};let P=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=P.current;if(!e)return;let t=new i({alpha:!0,premultipliedAlpha:!0,antialias:!0}),l=t.gl;l.clearColor(0,0,0,0),l.enable(l.BLEND),l.blendFunc(l.ONE,l.ONE_MINUS_SRC_ALPHA),l.canvas.style.backgroundColor=`transparent`;let u=new c(l);u.attributes.uv&&delete u.attributes.uv;let D=new r(l,{vertex:p,fragment:m,uniforms:{uTime:{value:0},uResolution:{value:[e.offsetWidth,e.offsetHeight]},uColors:{value:g(N.current.colors)},uColorCount:{value:Math.min(N.current.colors.length,f)},uStrandCount:{value:Math.min(N.current.count,d)},uSpeed:{value:n},uAmplitude:{value:s},uWaviness:{value:_},uThickness:{value:v},uGlow:{value:y},uTaper:{value:b},uSpread:{value:x},uHueShift:{value:S},uIntensity:{value:C},uOpacity:{value:T},uScale:{value:E},uSaturation:{value:w}}}),j=new a(l,{geometry:u,program:D}),M=new o(l,{width:e.offsetWidth,height:e.offsetHeight}),F=new r(l,{vertex:p,fragment:h,uniforms:{uScene:{value:M.texture},uResolution:{value:[e.offsetWidth,e.offsetHeight]},uRadius:{value:.46*A},uRefraction:{value:O},uDispersion:{value:k}}}),I=new a(l,{geometry:u,program:F});e.appendChild(l.canvas);function L(){if(!e)return;let n=e.offsetWidth,r=e.offsetHeight;t.setSize(n,r),D.uniforms.uResolution.value=[n,r],M.setSize(n,r),F.uniforms.uResolution.value=[n,r]}window.addEventListener(`resize`,L),L();let R=0,z=e=>{R=requestAnimationFrame(z);let n=N.current;D.uniforms.uTime.value=e*.001,D.uniforms.uColors.value=g(n.colors),D.uniforms.uColorCount.value=Math.min(n.colors.length,f),D.uniforms.uStrandCount.value=Math.min(Math.max(Math.round(n.count),1),d),D.uniforms.uSpeed.value=n.speed,D.uniforms.uAmplitude.value=n.amplitude,D.uniforms.uWaviness.value=n.waviness,D.uniforms.uThickness.value=n.thickness,D.uniforms.uGlow.value=n.glow,D.uniforms.uTaper.value=n.taper,D.uniforms.uSpread.value=n.spread,D.uniforms.uHueShift.value=n.hueShift,D.uniforms.uIntensity.value=n.intensity,D.uniforms.uOpacity.value=n.opacity,D.uniforms.uScale.value=n.scale,D.uniforms.uSaturation.value=n.saturation,n.glass?(t.render({scene:j,target:M}),F.uniforms.uScene.value=M.texture,F.uniforms.uRefraction.value=n.refraction,F.uniforms.uDispersion.value=n.dispersion,F.uniforms.uRadius.value=.46*n.glassSize,t.render({scene:I})):t.render({scene:j})};return R=requestAnimationFrame(z),()=>{cancelAnimationFrame(R),window.removeEventListener(`resize`,L),e&&l.canvas.parentNode===e&&e.removeChild(l.canvas),l.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,u.jsx)(`div`,{ref:P,className:`strands-container ${j}`,style:M})}export{_ as default};