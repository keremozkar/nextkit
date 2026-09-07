import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,D as i,Ft as a,Kt as o,Rt as s,b as c,bt as l,en as u,o as d,st as f,un as p,xn as m,z as h}from"./three.module-Da49k5ub.js";var g=e(t(),1),_=n(),v=`
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,y=`
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`,b=({grid:e=15,mouse:t=.1,strength:n=.15,relaxation:b=.9,imageSrc:x,className:S=``})=>{let C=(0,g.useRef)(null),w=(0,g.useRef)(null),T=(0,g.useRef)(null),E=(0,g.useRef)(null),D=(0,g.useRef)(null),O=(0,g.useRef)(1),k=(0,g.useRef)(null),A=(0,g.useRef)(null);return(0,g.useEffect)(()=>{if(!C.current)return;let g=C.current,_=new r;w.current=_;let S=new d({antialias:!0,alpha:!0,powerPreference:`high-performance`});S.setPixelRatio(Math.min(window.devicePixelRatio,2)),S.setClearColor(0,0),T.current=S,g.innerHTML=``,g.appendChild(S.domElement);let j=new a(0,0,0,0,-1e3,1e3);j.position.z=2,E.current=j;let M={time:{value:0},resolution:{value:new m},uTexture:{value:null},uDataTexture:{value:null}};new p().load(x,e=>{e.minFilter=f,e.magFilter=f,e.wrapS=c,e.wrapT=c,O.current=e.image.width/e.image.height,M.uTexture.value=e,z()});let N=e,P=new Float32Array(4*N*N);for(let e=0;e<N*N;e++)P[e*4]=Math.random()*255-125,P[e*4+1]=Math.random()*255-125;let F=new i(P,N,N,o,h);F.needsUpdate=!0,M.uDataTexture.value=F;let I=new u({side:2,uniforms:M,vertexShader:v,fragmentShader:y,transparent:!0}),L=new s(1,1,N-1,N-1),R=new l(L,I);D.current=R,_.add(R);let z=()=>{if(!g||!S||!j)return;let e=g.getBoundingClientRect(),t=e.width,n=e.height;if(t===0||n===0)return;let r=t/n;S.setSize(t,n),R&&R.scale.set(r,1,1);let i=1*r;j.left=-i/2,j.right=i/2,j.top=1/2,j.bottom=-1/2,j.updateProjectionMatrix(),M.resolution.value.set(t,n,1,1)};if(window.ResizeObserver){let e=new ResizeObserver(()=>{z()});e.observe(g),A.current=e}else window.addEventListener(`resize`,z);let B={x:0,y:0,prevX:0,prevY:0,vX:0,vY:0},V=e=>{let t=g.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;B.vX=n-B.prevX,B.vY=r-B.prevY,Object.assign(B,{x:n,y:r,prevX:n,prevY:r})},H=()=>{F&&(F.needsUpdate=!0),Object.assign(B,{x:0,y:0,prevX:0,prevY:0,vX:0,vY:0})};g.addEventListener(`mousemove`,V),g.addEventListener(`mouseleave`,H),z();let U=()=>{if(k.current=requestAnimationFrame(U),!S||!_||!j)return;M.time.value+=.05;let e=F.image.data;for(let t=0;t<N*N;t++)e[t*4]*=b,e[t*4+1]*=b;let r=N*B.x,i=N*B.y,a=N*t;for(let t=0;t<N;t++)for(let o=0;o<N;o++){let s=(r-t)**2+(i-o)**2;if(s<a*a){let r=4*(t+N*o),i=Math.min(a/Math.sqrt(s),10);e[r]+=n*100*B.vX*i,e[r+1]-=n*100*B.vY*i}}F.needsUpdate=!0,S.render(_,j)};return U(),()=>{k.current&&cancelAnimationFrame(k.current),A.current?A.current.disconnect():window.removeEventListener(`resize`,z),g.removeEventListener(`mousemove`,V),g.removeEventListener(`mouseleave`,H),S&&(S.dispose(),S.forceContextLoss(),g.contains(S.domElement)&&g.removeChild(S.domElement)),L&&L.dispose(),I&&I.dispose(),F&&F.dispose(),M.uTexture.value&&M.uTexture.value.dispose(),w.current=null,T.current=null,E.current=null,D.current=null}},[e,t,n,b,x]),(0,_.jsx)(`div`,{ref:C,className:`distortion-container ${S}`,style:{width:`100%`,height:`100%`,minWidth:`0`,minHeight:`0`}})};export{b as default};