import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{Ot as r,S as i,en as a,h as o,hn as s,m as c,r as l}from"./three.module-Da49k5ub.js";import{l as u,s as d,t as f}from"./react-three-fiber.esm-DRgTq3Fi.js";import{t as p}from"./extends-CvVTau-c.js";import{t as m}from"./Fbo-CvWXJvFF.js";var h=e(t()),g=e=>typeof e==`function`,_=h.forwardRef(({envMap:e,resolution:t=256,frames:n=1/0,makeDefault:r,children:i,...a},o)=>{let s=u(({set:e})=>e),c=u(({camera:e})=>e),l=u(({size:e})=>e),f=h.useRef(null);h.useImperativeHandle(o,()=>f.current,[]);let _=h.useRef(null),v=m(t);h.useLayoutEffect(()=>{a.manual||(f.current.aspect=l.width/l.height)},[l,a]),h.useLayoutEffect(()=>{f.current.updateProjectionMatrix()});let y=0,b=null,x=g(i);return d(t=>{x&&(n===1/0||y<n)&&(_.current.visible=!1,t.gl.setRenderTarget(v),b=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,f.current),t.scene.background=b,t.gl.setRenderTarget(null),_.current.visible=!0,y++)}),h.useLayoutEffect(()=>{if(r){let e=c;return s(()=>({camera:f.current})),()=>s(()=>({camera:e}))}},[f,r,s]),h.createElement(h.Fragment,null,h.createElement(`perspectiveCamera`,p({ref:f},a),!x&&i),h.createElement(`group`,{ref:_},x&&i(v.texture)))}),v=Math.PI/180;180/Math.PI;function y(e){return e*v}var b=n();function x(e,t){let n=l.physical,{vertexShader:r,fragmentShader:i,uniforms:o}=n,c=n.defines??{},u=s.clone(o),d=new e(t.material||{});d.color&&(u.diffuse.value=d.color),`roughness`in d&&(u.roughness.value=d.roughness),`metalness`in d&&(u.metalness.value=d.metalness),`envMap`in d&&(u.envMap.value=d.envMap),`envMapIntensity`in d&&(u.envMapIntensity.value=d.envMapIntensity),Object.entries(t.uniforms??{}).forEach(([e,t])=>{u[e]=typeof t==`object`&&t&&`value`in t?t:{value:t}});let f=`${t.header}\n${t.vertexHeader??``}\n${r}`,p=`${t.header}\n${t.fragmentHeader??``}\n${i}`;for(let[e,n]of Object.entries(t.vertex??{}))f=f.replace(e,`${e}\n${n}`);for(let[e,n]of Object.entries(t.fragment??{}))p=p.replace(e,`${e}\n${n}`);return new a({defines:{...c},uniforms:u,vertexShader:f,fragmentShader:p,lights:!0,fog:!!t.material?.fog})}var S=({children:e})=>(0,b.jsx)(f,{dpr:[1,2],frameloop:`always`,className:`beams-container`,children:e}),C=e=>{let t=e.replace(`#`,``),n=parseInt(t.substring(0,2),16),r=parseInt(t.substring(2,4),16),i=parseInt(t.substring(4,6),16);return[n/255,r/255,i/255]},w=`
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`,T=({beamWidth:e=2,beamHeight:t=15,beamNumber:n=12,lightColor:a=`#ffffff`,beamColor:o=`#000000`,backgroundColor:s=`#000000`,speed:c=2,noiseIntensity:l=1.75,scale:u=.2,rotation:d=0,lightMode:f=!1})=>{let p=(0,h.useRef)(null),m=(0,h.useMemo)(()=>x(r,{header:`
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${w}`,vertexHeader:`
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,fragmentHeader:`uniform float uLightMode;`,vertex:{"#include <begin_vertex>":`transformed.z += getPos(transformed.xyz);`,"#include <beginnormal_vertex>":`objectNormal = getNormal(position.xyz);`},fragment:{"#include <dithering_fragment>":`
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;
    if (uLightMode > 0.5) {
      float energy = max(max(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b);
      vec3 chroma = clamp(gl_FragColor.rgb / max(energy, 0.0001), 0.0, 1.0);
      chroma = pow(chroma, vec3(1.2));
      gl_FragColor.rgb = mix(vec3(1.0), chroma, clamp(energy * 0.98, 0.0, 0.94));
    }`},material:{fog:!0},uniforms:{diffuse:new i(...C(o)),time:{shared:!0,mixed:!0,linked:!0,value:0},roughness:.3,metalness:.3,uSpeed:{shared:!0,mixed:!0,linked:!0,value:c},envMapIntensity:10,uNoiseIntensity:l,uScale:u,uLightMode:+!!f}}),[o,c,l,u,f]);return(0,b.jsxs)(S,{children:[(0,b.jsxs)(`group`,{rotation:[0,0,y(d)],children:[(0,b.jsx)(O,{ref:p,material:m,count:n,width:e,height:t}),(0,b.jsx)(k,{color:a,position:[0,3,10]})]}),(0,b.jsx)(`ambientLight`,{intensity:1}),(0,b.jsx)(`color`,{attach:`background`,args:[s]}),(0,b.jsx)(_,{makeDefault:!0,position:[0,0,20],fov:30})]})};function E(e,t,n,r,i){let a=new o,s=e*(i+1)*2,l=e*i*2,u=new Float32Array(s*3),d=new Uint32Array(l*3),f=new Float32Array(s*2),p=0,m=0,h=0,g=-(e*t+(e-1)*r)/2;for(let a=0;a<e;a++){let e=g+a*(t+r),o=Math.random()*300,s=Math.random()*300;for(let r=0;r<=i;r++){let a=n*(r/i-.5),c=[e,a,0],l=[e+t,a,0];u.set([...c,...l],p*3);let g=r/i;if(f.set([o,g+s,o+1,g+s],h),r<i){let e=p,t=p+1,n=p+2,r=p+3;d.set([e,t,n,n,t,r],m),m+=6}p+=2,h+=4}}return a.setAttribute(`position`,new c(u,3)),a.setAttribute(`uv`,new c(f,2)),a.setIndex(new c(d,1)),a.computeVertexNormals(),a}var D=(0,h.forwardRef)(({material:e,width:t,count:n,height:r},i)=>{let a=(0,h.useRef)(null);(0,h.useImperativeHandle)(i,()=>a.current);let o=(0,h.useMemo)(()=>E(n,t,r,0,100),[n,t,r]);return d((e,t)=>{a.current.material.uniforms.time.value+=.1*t}),(0,b.jsx)(`mesh`,{ref:a,geometry:o,material:e})});D.displayName=`MergedPlanes`;var O=(0,h.forwardRef)((e,t)=>(0,b.jsx)(D,{ref:t,material:e.material,width:e.width,count:e.count,height:e.height}));O.displayName=`PlaneNoise`;var k=({position:e,color:t})=>{let n=(0,h.useRef)(null);return(0,h.useEffect)(()=>{if(!n.current)return;let e=n.current.shadow.camera;e&&(e.top=24,e.bottom=-24,e.left=-24,e.right=24,e.far=64,n.current.shadow.bias=-.004)},[]),(0,b.jsx)(`directionalLight`,{ref:n,color:t,intensity:1,position:e})};export{T as default};