import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,n as a,s as o,t as s}from"./Mesh-D48iXpEj.js";import{t as c}from"./Camera-BKG7dRhe.js";import{t as l}from"./Triangle-qjVMgwr4.js";var u=e(t(),1),d=n();function f(e){let t=e.replace(`#`,``);return[parseInt(t.substring(0,2),16)/255,parseInt(t.substring(2,4),16)/255,parseInt(t.substring(4,6),16)/255]}function p(e){return e-Math.floor(e)}function m(e){let t=[e*.1031,e*.103,e*.0973].map(p),n=[t[1],t[2],t[0]],r=t[0]*(n[0]+33.33)+t[1]*(n[1]+33.33)+t[2]*(n[2]+33.33);for(let e=0;e<3;e++)t[e]=p(t[e]+r);return t}function h(e){let t=[e[0]*.1031,e[1]*.103,e[2]*.0973].map(p),n=[t[1],t[0],t[2]],r=t[0]*(n[0]+33.33)+t[1]*(n[1]+33.33)+t[2]*(n[2]+33.33);for(let e=0;e<3;e++)t[e]=p(t[e]+r);let i=[t[0],t[0],t[1]],a=[t[1],t[0],t[0]],o=[t[2],t[1],t[0]],s=[];for(let e=0;e<3;e++)s[e]=p((i[e]+a[e])*o[e]);return s}var g=`#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,_=`#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`,v=({className:e=``,color:t=`#ffffff`,speed:n=.3,enableMouseInteraction:p=!0,hoverSmoothness:v=.05,animationSize:y=30,ballCount:b=15,clumpFactor:x=1,cursorBallSize:S=3,cursorBallColor:C=`#ffffff`,enableTransparency:w=!0})=>{let T=(0,u.useRef)(null);return(0,u.useEffect)(()=>{let e=T.current;if(!e)return;let u=new i({dpr:1,alpha:!0,premultipliedAlpha:!1}),d=u.gl;d.clearColor(0,0,0,+!w),e.appendChild(d.canvas);let E=new c(d,{left:-1,right:1,top:1,bottom:-1,near:.1,far:10});E.position.z=1;let D=new l(d),[O,k,A]=f(t),[j,M,N]=f(C),P=[];for(let e=0;e<50;e++)P.push(new o(0,0,0));let F=new r(d,{vertex:g,fragment:_,uniforms:{iTime:{value:0},iResolution:{value:new o(0,0,0)},iMouse:{value:new o(0,0,0)},iColor:{value:new o(O,k,A)},iCursorColor:{value:new o(j,M,N)},iAnimationSize:{value:y},iBallCount:{value:b},iCursorBallSize:{value:S},iMetaBalls:{value:P},iClumpFactor:{value:x},enableTransparency:{value:w}}}),I=new s(d,{geometry:D,program:F}),L=new a;I.setParent(L);let R=Math.min(b,50),z=[];for(let e=0;e<R;e++){let t=m(e+1),n=t[0]*(2*Math.PI),r=.1*Math.PI+t[1]*(.4*Math.PI-.1*Math.PI),i=5+t[1]*5,a=h(t),o=Math.floor(a[0]*2),s=.5+a[2]*1.5;z.push({st:n,dtFactor:r,baseScale:i,toggle:o,radius:s})}let B={x:0,y:0},V=!1,H=0,U=0;function W(){if(!e)return;let t=e.clientWidth,n=e.clientHeight;u.setSize(t*1,n*1),d.canvas.style.width=t+`px`,d.canvas.style.height=n+`px`,F.uniforms.iResolution.value.set(d.canvas.width,d.canvas.height,0)}window.addEventListener(`resize`,W),W();function G(t){if(!p)return;let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;H=r/n.width*d.canvas.width,U=(1-i/n.height)*d.canvas.height}function K(){p&&(V=!0)}function q(){p&&(V=!1)}e.addEventListener(`pointermove`,G),e.addEventListener(`pointerenter`,K),e.addEventListener(`pointerleave`,q);let J=performance.now(),Y;function X(e){Y=requestAnimationFrame(X);let t=(e-J)*.001;F.uniforms.iTime.value=t;for(let e=0;e<R;e++){let r=z[e],i=t*n*r.dtFactor,a=r.st+i,o=Math.cos(a),s=Math.sin(a+i*r.toggle),c=o*r.baseScale*x,l=s*r.baseScale*x;P[e].set(c,l,r.radius)}let r,i;if(V)r=H,i=U;else{let e=d.canvas.width*.5,a=d.canvas.height*.5,o=d.canvas.width*.15,s=d.canvas.height*.15;r=e+Math.cos(t*n)*o,i=a+Math.sin(t*n)*s}B.x+=(r-B.x)*v,B.y+=(i-B.y)*v,F.uniforms.iMouse.value.set(B.x,B.y,0),u.render({scene:L,camera:E})}return Y=requestAnimationFrame(X),()=>{cancelAnimationFrame(Y),window.removeEventListener(`resize`,W),e.removeEventListener(`pointermove`,G),e.removeEventListener(`pointerenter`,K),e.removeEventListener(`pointerleave`,q),e.removeChild(d.canvas),d.getExtension(`WEBGL_lose_context`)?.loseContext()}},[t,C,n,p,v,y,b,x,S,w]),(0,d.jsx)(`div`,{ref:T,className:`metaballs-container ${e}`})};export{v as default};