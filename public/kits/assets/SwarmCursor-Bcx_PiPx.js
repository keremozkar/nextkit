import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,o as a,t as o}from"./Mesh-D48iXpEj.js";import{t as s}from"./RenderTarget-CTgTThLo.js";import{t as c}from"./Triangle-qjVMgwr4.js";var l=e(t(),1),u=n(),d=`
precision highp float;
attribute vec2 position;
attribute vec2 aLocal;
attribute float aWeight;
uniform vec2 uRes;
varying vec2 vLocal;
varying float vWeight;

void main() {
  vLocal = aLocal;
  vWeight = aWeight;
  vec2 clip = (position / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`,f=`
precision highp float;
varying vec2 vLocal;
varying float vWeight;

void main() {
  float d = length(vLocal);
  float a = exp(-d * d * 3.6) * vWeight;
  gl_FragColor = vec4(a, a, a, a);
}
`,p=`
precision highp float;
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,m=`
precision highp float;
uniform sampler2D tField;
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uMerge;
uniform float uGlow;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  float f = texture2D(tField, vUv).r;

  float edge = uMerge * 0.3;
  float core = smoothstep(uMerge - edge, uMerge + edge, f);
  float halo = smoothstep(uMerge * 0.12, uMerge, f);

  vec3 col = mix(uColor, uAccent, clamp(f / max(uMerge * 2.4, 0.001), 0.0, 1.0));

  float alpha = (core + halo * uGlow * (1.0 - core)) * uOpacity;
  if (alpha <= 0.002) discard;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`,h=e=>{let t=(e||``).replace(`#`,``).trim();t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=parseInt(t||`000000`,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},g=()=>{let e=new Uint8Array(256);for(let t=0;t<256;t++)e[t]=t;for(let t=255;t>0;t--){let n=Math.random()*(t+1)|0,r=e[t];e[t]=e[n],e[n]=r}let t=new Uint16Array(512);for(let n=0;n<512;n++)t[n]=e[n&255];return t},_=e=>e*e*e*(e*(e*6-15)+10),v=(e,t,n,r)=>{let i=e<8?t:n,a=e<4?n:e===12||e===14?t:r;return(e&1?-i:i)+(e&2?-a:a)},y=(e,t,n,r)=>{let i=Math.floor(t),a=Math.floor(n),o=Math.floor(r),s=i&255,c=a&255,l=o&255,u=t-i,d=n-a,f=r-o,p=_(u),m=_(d),h=_(f),g=e[s]+c,y=e[g&511]+l,b=e[g+1&511]+l,x=e[s+1&511]+c,S=e[x&511]+l,C=e[x+1&511]+l,w=v(e[y&511]&15,u,d,f),T=v(e[S&511]&15,u-1,d,f),E=v(e[b&511]&15,u,d-1,f),D=v(e[C&511]&15,u-1,d-1,f),O=v(e[y+1&511]&15,u,d,f-1),k=v(e[S+1&511]&15,u-1,d,f-1),A=v(e[b+1&511]&15,u,d-1,f-1),j=v(e[C+1&511]&15,u-1,d-1,f-1),M=w+p*(T-w),N=E+p*(D-E),P=O+p*(k-O),F=A+p*(j-A),I=M+m*(N-M);return I+h*(P+m*(F-P)-I)},b=({color:e=`#ffffff`,accentColor:t=`#ffffff`,count:n=10,size:_=10,merge:v=.77,glow:b=.75,opacity:x=1,spread:S=100,separation:C=.15,speed:w=2.5,wander:T=.25,trail:E=.75,scatterOnClick:D=!0,enabled:O=!0,children:k,className:A=``,style:j,...M})=>{let N=(0,l.useRef)(null),P=(0,l.useRef)({});return P.current={color:e,accentColor:t,count:n,size:_,merge:v,glow:b,opacity:x,spread:S,separation:C,speed:w,wander:T,trail:E,scatterOnClick:D,enabled:O},(0,l.useEffect)(()=>{let e=N.current;if(!e)return;let t=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,n=new i({alpha:!0,dpr:Math.min(window.devicePixelRatio||1,1.75)}),l=n.gl;l.clearColor(0,0,0,0),l.canvas.className=`swarm-cursor__canvas`,e.appendChild(l.canvas);let u=6e3,_=new Float32Array(u*4*2),v=new Float32Array(u*4*2),b=new Float32Array(u*4),x=new Uint16Array(u*6);for(let e=0;e<u;e++){let t=e*4;v.set([-1,-1,1,-1,1,1,-1,1],t*2),x.set([t,t+1,t+2,t,t+2,t+3],e*6)}let S=new a(l,{position:{size:2,data:_,usage:l.DYNAMIC_DRAW},aLocal:{size:2,data:v},aWeight:{size:1,data:b,usage:l.DYNAMIC_DRAW},index:{data:x}}),C=new r(l,{vertex:d,fragment:f,uniforms:{uRes:{value:[1,1]}},transparent:!0,depthTest:!1,depthWrite:!1,cullFace:!1});C.setBlendFunc(l.ONE,l.ONE);let w=new o(l,{geometry:S,program:C}),T=new r(l,{vertex:p,fragment:m,uniforms:{tField:{value:null},uColor:{value:h(P.current.color)},uAccent:{value:h(P.current.accentColor)},uMerge:{value:P.current.merge},uGlow:{value:P.current.glow},uOpacity:{value:P.current.opacity}},transparent:!0,depthTest:!1,depthWrite:!1,cullFace:!1}),E=new o(l,{geometry:new c(l),program:T}),D=null,O=1,k=1,A=()=>{O=e.clientWidth||1,k=e.clientHeight||1,n.setSize(O,k),C.uniforms.uRes.value=[O,k];let t=Math.max(1,Math.round(l.drawingBufferWidth)),r=Math.max(1,Math.round(l.drawingBufferHeight));D=new s(l,{width:t,height:r,depth:!1})},j=new ResizeObserver(A);j.observe(e),A();let M=g(),F=new Float32Array(120),I=new Float32Array(120),L=new Float32Array(120),R=new Float32Array(120),z=new Float32Array(120),B=new Float32Array(120),ee=new Float32Array(120),V=new Float32Array(120),H=new Float32Array(120),U=new Float32Array(14400),W=new Float32Array(14400),te=new Float32Array(120),G=0,K=0,q=-1,ne=(e,t,n)=>{let r=Math.random()*Math.PI*2,i=40+Math.random()*120;F[e]=t+Math.cos(r)*i,I[e]=n+Math.sin(r)*i,L[e]=Math.cos(r)*60,R[e]=Math.sin(r)*60;for(let t=0;t<120;t++)U[t*120+e]=F[e],W[t*120+e]=I[e]};for(let e=0;e<120;e++)ne(e,O*.5,k*.5),z[e]=.65+Math.random()*.6,B[e]=.75+Math.random()*.5,ee[e]=Math.random()<.5?-1:1,V[e]=Math.random()*260,H[e]=Math.random()*260;let J={x:O*.5,y:k*.5,has:!1},Y=0,re=Math.max(1,Math.min(120,Math.round(P.current.count))),X=t=>{let n=e.getBoundingClientRect();J.x=t.clientX-n.left,J.y=t.clientY-n.top,J.has=!0},Z=()=>{J.has=!1},Q=t=>{if(!P.current.scatterOnClick||!P.current.enabled)return;let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top,a=620+P.current.speed*130;for(let e=0;e<120;e++){let t=F[e]-r,n=I[e]-i,o=Math.hypot(t,n);if(o<.001){let e=Math.random()*Math.PI*2;t=Math.cos(e),n=Math.sin(e),o=1}let s=a*(.75+Math.random()*.5);L[e]=t/o*s,R[e]=n/o*s}Y=1};e.addEventListener(`pointermove`,X,{passive:!0}),e.addEventListener(`pointerenter`,X,{passive:!0}),e.addEventListener(`pointerleave`,Z),e.addEventListener(`pointerdown`,Q);let $=0,ie=performance.now(),ae=e=>{$=requestAnimationFrame(ae);let r=P.current,i=Math.min((e-ie)/1e3,.05);if(ie=e,!r.enabled||t){n.render({scene:E});return}let a=Math.max(1,Math.min(120,Math.round(r.count))),o=J.has?J.x:O*.5,s=J.has?J.y:k*.5;for(let e=re;e<a;e++)ne(e,o,s);re=a;let c=e*.001;Y=Math.max(0,Y-i/.5);let l=110+Math.max(.1,r.speed)*165,d=4.5+Math.max(.1,r.speed)*1.15,f=l*9,p=Math.max(20,r.spread*.55),m=Math.max(1,r.spread*.42*(.35+r.separation)),g=r.wander*2.4,v=.08,x=.0016,C=x*3.6;for(let e=0;e<a;e++){let t=o-F[e],n=s-I[e],u=Math.hypot(t,n)||1e-4,h=t/u,_=n/u,b=y(M,V[e],H[e],c*.13),S=p*(.34+1.35*Math.max(0,Math.min(1,b+.5))),w=Math.max(-1,Math.min(1,(u-S)/(p*.85))),T=Math.sqrt(Math.max(0,1-w*w))*ee[e],E=h*w-_*T,D=_*w+h*T;if(g>.001){let t=F[e]*x,n=I[e]*x,r=c*.22,i=(y(M,t,n+v,r)-y(M,t,n-v,r))/(2*v),a=-(y(M,t+v,n,r)-y(M,t-v,n,r))/(2*v),o=F[e]*C+V[e],s=I[e]*C+H[e],l=c*.55,u=(y(M,o,s+v,l)-y(M,o,s-v,l))/(2*v),d=-(y(M,o+v,s,l)-y(M,o-v,s,l))/(2*v);E+=(i+u*.7)*g,D+=(a+d*.7)*g}let O=Math.hypot(E,D)||1e-4;E/=O,D/=O;let k=d*B[e]*(1-Y),A=(E*l-L[e])*k,j=(D*l-R[e])*k;Y>.001&&(A-=h*l*Y*5.5,j-=_*l*Y*5.5);for(let t=0;t<a;t++){if(t===e)continue;let n=F[e]-F[t],i=I[e]-I[t],a=n*n+i*i;if(a>1e-4&&a<m*m){let e=Math.sqrt(a),t=(1-e/m)*l*3.2*r.separation;A+=n/e*t,j+=i/e*t}}let N=Math.hypot(A,j),P=f*(1+Y*4);N>P&&(A=A/N*P,j=j/N*P),L[e]+=A*i,R[e]+=j*i;let z=Math.hypot(L[e],R[e]),U=l*(1+Y*3.5),W=l*.32;z>U?(L[e]=L[e]/z*U,R[e]=R[e]/z*U):z<W&&z>1e-4&&(L[e]=L[e]/z*W,R[e]=R[e]/z*W),F[e]+=L[e]*i,I[e]+=R[e]*i}let A=e*.001;if(q<0||A-q>=.008){q=A,te[G]=A;let e=G*120;for(let t=0;t<a;t++)U[e+t]=F[t],W[e+t]=I[t];G=(G+1)%120,K<120&&K++}let j=r.trail*.85,N=Math.max(0,Math.floor(u/a)-1),X=Math.min(46,N),Z=0,Q=(e,t,n,r)=>{let i=Z*8;_[i]=e-n,_[i+1]=t-n,_[i+2]=e+n,_[i+3]=t-n,_[i+4]=e+n,_[i+5]=t+n,_[i+6]=e-n,_[i+7]=t+n;let a=Z*4;b[a]=r,b[a+1]=r,b[a+2]=r,b[a+3]=r,Z++};for(let e=0;e<a;e++){let t=r.size*z[e]*2.1,n=1.06+.3*z[e];if(Q(F[e],I[e],t,n),j<.01||X<2||K<2)continue;let i=Math.max(2,r.size*z[e]*.5),a=i*X,o=F[e],s=I[e],c=0,l=i,u=0;for(let r=0;r<K&&u<X;r++){let d=(G-1-r+120)%120;if(A-te[d]>j)break;let f=U[d*120+e],p=W[d*120+e],m=f-o,h=p-s,g=Math.hypot(m,h);if(!(g<1e-4)){for(;l<=c+g&&u<X;){let e=(l-c)/g,r=l/a,d=t*Math.max(0,1-r)**.55;if(d<i){u=X;break}let f=Math.min(n,n*i/(d*.934));Q(o+m*e,s+h*e,d,f),u++,l+=i}c+=g,o=f,s=p}}}S.attributes.position.needsUpdate=!0,S.attributes.aWeight.needsUpdate=!0,S.setDrawRange(0,Z*6),T.uniforms.uColor.value=h(r.color),T.uniforms.uAccent.value=h(r.accentColor),T.uniforms.uMerge.value=r.merge,T.uniforms.uGlow.value=r.glow,T.uniforms.uOpacity.value=r.opacity,n.render({scene:w,target:D,clear:!0}),T.uniforms.tField.value=D.texture,n.render({scene:E})};return $=requestAnimationFrame(ae),()=>{cancelAnimationFrame($),j.disconnect(),e.removeEventListener(`pointermove`,X),e.removeEventListener(`pointerenter`,X),e.removeEventListener(`pointerleave`,Z),e.removeEventListener(`pointerdown`,Q),l.canvas.parentElement===e&&e.removeChild(l.canvas);let t=l.getExtension(`WEBGL_lose_context`);t&&t.loseContext()}},[]),(0,u.jsx)(`div`,{ref:N,className:`swarm-cursor ${A}`.trim(),style:j,...M,children:k?(0,u.jsx)(`div`,{className:`swarm-cursor__content`,children:k}):null})};export{b as default};