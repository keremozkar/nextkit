import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Color-xVu7ktDx.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`
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
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;function f({color:e=[1,1,1],speed:t=1,amplitude:n=.1,mouseReact:f=!0,...p}){let m=(0,c.useRef)(null),h=(0,c.useRef)({x:.5,y:.5});return(0,c.useEffect)(()=>{if(!m.current)return;let c=m.current,l=new i,p=l.gl;p.clearColor(1,1,1,1);let g;function _(){l.setSize(c.offsetWidth*1,c.offsetHeight*1),g&&(g.uniforms.uResolution.value=new o(p.canvas.width,p.canvas.height,p.canvas.width/p.canvas.height))}window.addEventListener(`resize`,_,!1),_();let v=new s(p);g=new r(p,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uColor:{value:new o(...e)},uResolution:{value:new o(p.canvas.width,p.canvas.height,p.canvas.width/p.canvas.height)},uMouse:{value:new Float32Array([h.current.x,h.current.y])},uAmplitude:{value:n},uSpeed:{value:t}}});let y=new a(p,{geometry:v,program:g}),b;function x(e){b=requestAnimationFrame(x),g.uniforms.uTime.value=e*.001,l.render({scene:y})}b=requestAnimationFrame(x),c.appendChild(p.canvas);function S(e){let t=c.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;h.current={x:n,y:r},g.uniforms.uMouse.value[0]=n,g.uniforms.uMouse.value[1]=r}return f&&c.addEventListener(`mousemove`,S),()=>{cancelAnimationFrame(b),window.removeEventListener(`resize`,_),f&&c.removeEventListener(`mousemove`,S),c.removeChild(p.canvas),p.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,f]),(0,l.jsx)(`div`,{ref:m,className:`iridescence-container`,...p})}export{f as default};