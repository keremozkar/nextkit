import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,n as a,o,t as s}from"./Mesh-D48iXpEj.js";import{t as c}from"./Camera-BKG7dRhe.js";var l=e(t(),1),u=n();function d(e){return[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255]}var f=`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,p=`
precision highp float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform float uLightMode;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  float field = max(raw.r, max(raw.g, raw.b));
  float outerMask = smoothstep(0.0, 0.055, field);
  float glowMask = smoothstep(0.012, 0.13, field);
  float coreMask = smoothstep(0.075, 0.27, field);
  if (uLightMode < 0.5 && field < 0.15) discard;
  raw.gb += uLightMode > 0.5 ? 0.1 * glowMask : 0.1;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 baseColor = (uColor1 * w1 + uColor2 * w2) / wt;
  vec3 c = baseColor * lum * 3.5;
  if (uLightMode > 0.5) {
    float lightW1 = exp(-max(k.x, 0.0) * 4.0);
    float lightW2 = exp(-max(k.y, 0.0) * 4.0);
    vec3 lightBase = (uColor1 * lightW1 + uColor2 * lightW2) / (lightW1 + lightW2 + 0.001);
    float lightLuma = dot(lightBase, vec3(0.299, 0.587, 0.114));
    vec3 vividColor = clamp(pow(max(mix(vec3(lightLuma), lightBase, 1.35), 0.0), vec3(0.64)) * 1.14, 0.0, 1.0);
    float colorPresence = clamp(outerMask * 0.34 + glowMask * 1.08 + coreMask * 0.22, 0.0, 1.0);
    vec3 lightColor = mix(vec3(1.0), vividColor, colorPresence);
    lightColor = mix(lightColor, vec3(1.0), coreMask * smoothstep(0.16, 0.95, lum) * 0.1);
    C = vec4(lightColor, 1.0);
  } else {
    C = vec4(c, 1.0);
  }
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
`;function m(e){let{xOffset:t=0,yOffset:n=0,rotationDeg:m=0,focalLength:h=.8,speed1:g=.05,speed2:_=.05,dir2:v=1,bend1:y=1,bend2:b=.5,colors:x=[`#A855F7`,`#06B6D4`],lightMode:S=!1}=e,C=(0,l.useRef)(e);C.current=e;let w=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=w.current;if(!e)return;let l=new i({alpha:!0,dpr:Math.min(window.devicePixelRatio,1.5),antialias:!0,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:`high-performance`}),u=l.gl;u.clearColor(0,0,0,0),e.appendChild(u.canvas);let T=new c(u),E=new a,D=new o(u,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])}}),O=new Float32Array([t,n]),k=new Float32Array([1,1]),A=d(x[0]),j=d(x[1]),M=new r(u,{vertex:f,fragment:p,uniforms:{iTime:{value:0},iResolution:{value:k},uOffset:{value:O},uRotation:{value:m*Math.PI/180},uFocalLength:{value:h},uSpeed1:{value:g},uSpeed2:{value:_},uDir2:{value:v},uBend1:{value:y},uBend2:{value:b},uColor1:{value:A},uColor2:{value:j},uLightMode:{value:+!!S}}});new s(u,{geometry:D,program:M}).setParent(E);function N(){if(!e)return;let{width:t,height:n}=e.getBoundingClientRect();l.setSize(t,n),k[0]=t*l.dpr,k[1]=n*l.dpr,u.viewport(0,0,u.drawingBufferWidth,u.drawingBufferHeight)}let P=new ResizeObserver(N);P.observe(e),N();let F=performance.now(),I,L=e=>{let{xOffset:t=0,yOffset:n=0,rotationDeg:r=0,focalLength:i=.8,speed1:a=.05,speed2:o=.05,dir2:s=1,bend1:c=1,bend2:u=.5,colors:f=[`#A855F7`,`#06B6D4`],lightMode:p=!1}=C.current;O[0]=t,O[1]=n,M.uniforms.iTime.value=(e-F)*.001,M.uniforms.uRotation.value=r*Math.PI/180,M.uniforms.uFocalLength.value=i,M.uniforms.uSpeed1.value=a,M.uniforms.uSpeed2.value=o,M.uniforms.uDir2.value=s,M.uniforms.uBend1.value=c,M.uniforms.uBend2.value=u,M.uniforms.uColor1.value=d(f[0]),M.uniforms.uColor2.value=d(f[1]),M.uniforms.uLightMode.value=+!!p,l.render({scene:E,camera:T}),I=requestAnimationFrame(L)};return I=requestAnimationFrame(L),()=>{cancelAnimationFrame(I),P.disconnect(),e&&u.canvas.parentNode===e&&e.removeChild(u.canvas),u.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,u.jsx)(`div`,{ref:w,className:`plasma-wave-container`})}export{m as default};