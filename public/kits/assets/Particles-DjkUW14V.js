import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,o as a,t as o}from"./Mesh-D48iXpEj.js";import{t as s}from"./Camera-BKG7dRhe.js";var c=e(t(),1),l=n(),u=[`#ffffff`,`#ffffff`,`#ffffff`],d=e=>{e=e.replace(/^#/,``),e.length===3&&(e=e.split(``).map(e=>e+e).join(``));let t=parseInt(e.slice(0,6),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]},f=`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`,p=`
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`,m=({particleCount:e=200,particleSpread:t=10,speed:n=.1,particleColors:m,moveParticlesOnHover:h=!1,particleHoverFactor:g=1,alphaParticles:_=!1,particleBaseSize:v=100,sizeRandomness:y=1,cameraDistance:b=20,disableRotation:x=!1,pixelRatio:S=1,className:C})=>{let w=(0,c.useRef)(null),T=(0,c.useRef)({x:0,y:0});return(0,c.useEffect)(()=>{let c=w.current;if(!c)return;let l=new i({dpr:S,depth:!1,alpha:!0}),C=l.gl;c.appendChild(C.canvas),C.clearColor(0,0,0,0);let E=new s(C,{fov:15});E.position.set(0,0,b);let D=()=>{let e=c.clientWidth,t=c.clientHeight;l.setSize(e,t),E.perspective({aspect:C.canvas.width/C.canvas.height})};window.addEventListener(`resize`,D,!1),D();let O=e=>{let t=c.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,r=-((e.clientY-t.top)/t.height*2-1);T.current={x:n,y:r}};h&&c.addEventListener(`mousemove`,O);let k=e,A=new Float32Array(k*3),j=new Float32Array(k*4),M=new Float32Array(k*3),N=m&&m.length>0?m:u;for(let e=0;e<k;e++){let t,n,r,i;do t=Math.random()*2-1,n=Math.random()*2-1,r=Math.random()*2-1,i=t*t+n*n+r*r;while(i>1||i===0);let a=Math.cbrt(Math.random());A.set([t*a,n*a,r*a],e*3),j.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4);let o=d(N[Math.floor(Math.random()*N.length)]);M.set(o,e*3)}let P=new a(C,{position:{size:3,data:A},random:{size:4,data:j},color:{size:3,data:M}}),F=new r(C,{vertex:f,fragment:p,uniforms:{uTime:{value:0},uSpread:{value:t},uBaseSize:{value:v*S},uSizeRandomness:{value:y},uAlphaParticles:{value:+!!_}},transparent:!0,depthTest:!1}),I=new o(C,{mode:C.POINTS,geometry:P,program:F}),L,R=performance.now(),z=0,B=e=>{L=requestAnimationFrame(B);let t=e-R;R=e,z+=t*n,F.uniforms.uTime.value=z*.001,h?(I.position.x=-T.current.x*g,I.position.y=-T.current.y*g):(I.position.x=0,I.position.y=0),x||(I.rotation.x=Math.sin(z*2e-4)*.1,I.rotation.y=Math.cos(z*5e-4)*.15,I.rotation.z+=.01*n),l.render({scene:I,camera:E})};return L=requestAnimationFrame(B),()=>{window.removeEventListener(`resize`,D),h&&c.removeEventListener(`mousemove`,O),cancelAnimationFrame(L),c.contains(C.canvas)&&c.removeChild(C.canvas)}},[e,t,n,h,g,_,v,y,b,x,S]),(0,l.jsx)(`div`,{ref:w,className:`particles-container ${C}`})};export{m as default};