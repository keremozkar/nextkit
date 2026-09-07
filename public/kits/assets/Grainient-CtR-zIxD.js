import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},u=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`,f=new WeakMap,p=({timeSpeed:e=.25,colorBalance:t=0,warpStrength:n=1,warpFrequency:p=5,warpSpeed:m=2,warpAmplitude:h=50,blendAngle:g=0,blendSoftness:_=.05,rotationAmount:v=500,noiseScale:y=2,grainAmount:b=.1,grainScale:x=2,grainAnimated:S=!1,contrast:C=1.5,gamma:w=1,saturation:T=1,centerX:E=0,centerY:D=0,zoom:O=.9,color1:k=`#FF9FFC`,color2:A=`#5227FF`,color3:j=`#B497CF`,lightMode:M=!1,className:N=``})=>{let P=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=P.current;if(!e)return;let t=new i({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl,s=n.canvas;s.style.width=`100%`,s.style.height=`100%`,s.style.display=`block`,e.appendChild(s);let c=new o(n),l=new r(n,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uTimeSpeed:{value:.25},uColorBalance:{value:0},uWarpStrength:{value:1},uWarpFrequency:{value:5},uWarpSpeed:{value:2},uWarpAmplitude:{value:50},uBlendAngle:{value:0},uBlendSoftness:{value:.05},uRotationAmount:{value:500},uNoiseScale:{value:2},uGrainAmount:{value:.1},uGrainScale:{value:2},uGrainAnimated:{value:0},uContrast:{value:1.5},uGamma:{value:1},uSaturation:{value:1},uCenterOffset:{value:new Float32Array([0,0])},uZoom:{value:.9},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])},uLightMode:{value:0}}}),p=new a(n,{geometry:c,program:l});f.set(e,{renderer:t,program:l,mesh:p});let m=()=>{let r=e.getBoundingClientRect(),i=Math.max(1,Math.floor(r.width)),a=Math.max(1,Math.floor(r.height));t.setSize(i,a);let o=l.uniforms.iResolution.value;o[0]=n.drawingBufferWidth,o[1]=n.drawingBufferHeight,t.render({scene:p})},h=new ResizeObserver(m);h.observe(e),m();let g=0,_=!0,v=!document.hidden,y=performance.now(),b=e=>{l.uniforms.iTime.value=(e-y)*.001,t.render({scene:p}),g=requestAnimationFrame(b)},x=()=>{_&&v&&g===0&&(g=requestAnimationFrame(b))},S=()=>{g!==0&&(cancelAnimationFrame(g),g=0)},C=new IntersectionObserver(([e])=>{_=e.isIntersecting,_?x():S()},{threshold:0});C.observe(e);let w=()=>{v=!document.hidden,v?x():S()};return document.addEventListener(`visibilitychange`,w),x(),()=>{S(),h.disconnect(),C.disconnect(),document.removeEventListener(`visibilitychange`,w),f.delete(e);try{e.removeChild(s)}catch{}}},[]),(0,s.useEffect)(()=>{let r=P.current;if(!r)return;let i=f.get(r);if(!i)return;let{program:a}=i,o=a.uniforms;o.uTimeSpeed.value=e,o.uColorBalance.value=t,o.uWarpStrength.value=n,o.uWarpFrequency.value=p,o.uWarpSpeed.value=m,o.uWarpAmplitude.value=h,o.uBlendAngle.value=g,o.uBlendSoftness.value=_,o.uRotationAmount.value=v,o.uNoiseScale.value=y,o.uGrainAmount.value=b,o.uGrainScale.value=x,o.uGrainAnimated.value=+!!S,o.uContrast.value=C,o.uGamma.value=w,o.uSaturation.value=T,o.uCenterOffset.value=new Float32Array([E,D]),o.uZoom.value=O,o.uColor1.value=new Float32Array(l(k)),o.uColor2.value=new Float32Array(l(A)),o.uColor3.value=new Float32Array(l(j)),o.uLightMode.value=+!!M},[e,t,n,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M]),(0,c.jsx)(`div`,{ref:P,className:`grainient-container ${N}`.trim()})};export{p as default};