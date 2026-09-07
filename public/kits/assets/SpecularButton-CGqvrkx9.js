import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Color-xVu7ktDx.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=20,d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,f=`#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both
  // catch a streak. The angular window (size + fade) is measured with an
  // elliptical normal so it varies continuously along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`,p=({children:e=`Get Started`,size:t=`lg`,radius:n=18,tint:p=`#ffffff`,tintOpacity:m=0,blur:h=0,textColor:g=`#f5f5f5`,lineColor:_=`#ffffff`,baseColor:v=`#525252`,intensity:y=1,shineSize:b=10,shineFade:x=40,thickness:S=1,speed:C=.35,followMouse:w=!0,proximity:T=250,autoAnimate:E=!1,disabled:D=!1,onClick:O,className:k=``,type:A=`button`})=>{let j=(0,c.useRef)(null),M=(0,c.useRef)(null),N=(0,c.useRef)({});return N.current={radius:n,lineColor:_,baseColor:v,intensity:y,shineSize:b,shineFade:x,thickness:S,speed:C,followMouse:w,proximity:T,autoAnimate:E},(0,c.useEffect)(()=>{let e=j.current,t=M.current;if(!e||!t)return;let n=window.devicePixelRatio||1,c=new i({alpha:!0,premultipliedAlpha:!0,antialias:!0,dpr:n}),l=c.gl;l.clearColor(0,0,0,0),l.enable(l.BLEND),l.blendFunc(l.ONE,l.ONE_MINUS_SRC_ALPHA);let p=new s(l);p.attributes.uv&&delete p.attributes.uv;let m=new r(l,{vertex:d,fragment:f,uniforms:{uCenter:{value:[0,0]},uHalfSize:{value:[1,1]},uRadius:{value:0},uAngle:{value:2.4},uPx:{value:n},uLineColor:{value:[1,1,1]},uBaseColor:{value:[.32,.32,.32]},uIntensity:{value:1},uShineSize:{value:.17},uShineFade:{value:.7},uThickness:{value:1},uBaseWidth:{value:n}}}),h=new a(l,{geometry:p,program:m});t.appendChild(l.canvas);let g={w:1,h:1},_=()=>{let t=e.getBoundingClientRect(),r=t.width,i=t.height;g.w=r,g.h=i,c.setSize(r+40,i+40),m.uniforms.uCenter.value=[(u+r/2)*n,(u+i/2)*n],m.uniforms.uHalfSize.value=[r/2*n,i/2*n]},v=new ResizeObserver(_);v.observe(e),_();let y=null,b=0,x=t=>{let n=e.getBoundingClientRect(),r=n.left+n.width/2,i=n.top+n.height/2,a=Math.max(n.left-t.clientX,0,t.clientX-n.right),o=Math.max(n.top-t.clientY,0,t.clientY-n.bottom),s=Math.hypot(a,o);if(s===0){let e=(t.clientX-r)/(n.width/2),a=(i-t.clientY)/(n.height/2);y=Math.atan2(2/n.height,-2/n.width)+e*.3+a*.15}else y=Math.atan2(i-t.clientY,t.clientX-r);let c=Math.max(0,1-s/Math.max(N.current.proximity,1));b=c*c*(3-2*c)};window.addEventListener(`pointermove`,x);let S=2.4,C=2.4,w=0,T=performance.now(),E=0,D=new o,O=new o,k=e=>{E=requestAnimationFrame(k);let t=Math.min((e-T)/1e3,.05);T=e;let r=N.current;C+=r.speed*t;let i=((r.followMouse&&y!=null&&(!r.autoAnimate||b>0)?y:C)-S+Math.PI*3)%(Math.PI*2)-Math.PI;S+=i*(1-Math.exp(-t*7));let a=r.autoAnimate?1:b;w+=(a-w)*(1-Math.exp(-t*8)),D.set(r.lineColor),O.set(r.baseColor),m.uniforms.uAngle.value=S,m.uniforms.uRadius.value=Math.min(r.radius,Math.min(g.w,g.h)/2)*n,m.uniforms.uLineColor.value=[D.r,D.g,D.b],m.uniforms.uBaseColor.value=[O.r,O.g,O.b],m.uniforms.uIntensity.value=r.intensity*w,m.uniforms.uShineSize.value=r.shineSize*Math.PI/180,m.uniforms.uShineFade.value=r.shineFade*Math.PI/180,m.uniforms.uThickness.value=r.thickness*n,c.render({scene:h})};return E=requestAnimationFrame(k),()=>{cancelAnimationFrame(E),v.disconnect(),window.removeEventListener(`pointermove`,x),l.canvas.parentNode===t&&t.removeChild(l.canvas),l.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,l.jsxs)(`button`,{ref:j,type:A,disabled:D,onClick:O,className:`specular-button specular-button--${t}${k?` ${k}`:``}`,style:{"--sb-radius":`${n}px`,"--sb-tint":p,"--sb-tint-opacity":m,"--sb-blur":`${h}px`,"--sb-text-color":g},children:[(0,l.jsx)(`span`,{ref:M,className:`specular-button__fx`,"aria-hidden":`true`}),(0,l.jsx)(`span`,{className:`specular-button__label`,children:e})]})};export{p as default};