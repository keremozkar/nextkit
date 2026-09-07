import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{$t as r,Ft as i,Rt as a,S as o,V as s,bt as c,en as ee,ln as l,mn as u,o as te,st as d,x as ne,yn as f}from"./three.module-Da49k5ub.js";import{a as p,o as m,s as h,u as g}from"./build-Di7SJOIL.js";var _=e(t(),1),v=n(),re=()=>{let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);if(!t)throw Error(`2D context not available`);t.fillStyle=`black`,t.fillRect(0,0,e.width,e.height);let n=new l(e);n.minFilter=d,n.magFilter=d,n.generateMipmaps=!1;let r=[],i=null,a=6.4,o=()=>{t.fillStyle=`black`,t.fillRect(0,0,e.width,e.height)},s=e=>{let n={x:e.x*64,y:(1-e.y)*64},r=1;r=e.age<19.2?(e=>Math.sin(e*Math.PI/2))(e.age/19.2):(e=>-e*(e-2))(1-(e.age-19.2)/44.8)||0,r*=e.force;let i=`${(e.vx+1)/2*255}, ${(e.vy+1)/2*255}, ${r*255}`;t.shadowOffsetX=320,t.shadowOffsetY=320,t.shadowBlur=a,t.shadowColor=`rgba(${i},${.22*r})`,t.beginPath(),t.fillStyle=`rgba(255,0,0,1)`,t.arc(n.x-320,n.y-320,a,0,Math.PI*2),t.fill()};return{canvas:e,texture:n,addTouch:e=>{let t=0,n=0,a=0;if(i){let r=e.x-i.x,o=e.y-i.y;if(r===0&&o===0)return;let s=r*r+o*o,c=Math.sqrt(s);n=r/(c||1),a=o/(c||1),t=Math.min(s*1e4,1)}i={x:e.x,y:e.y},r.push({x:e.x,y:e.y,age:0,force:t,vx:n,vy:a})},update:()=>{o();for(let e=r.length-1;e>=0;e--){let t=r[e],n=t.force*.015625*(1-t.age/64);t.x+=t.vx*n,t.y+=t.vy*n,t.age++,t.age>64&&r.splice(e,1)}for(let e=0;e<r.length;e++)s(r[e]);n.needsUpdate=!0},set radiusScale(e){a=6.4*e},get radiusScale(){return a/6.4},size:64}},ie=(e,t)=>new p(`LiquidEffect`,`
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `,{uniforms:new Map([[`uTexture`,new u(e)],[`uStrength`,new u(t?.strength??.025)],[`uTime`,new u(0)],[`uFreq`,new u(t?.freq??4.5)]])}),y={square:0,circle:1,triangle:2,diamond:3},ae=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,b=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  // sRGB gamma correction - convert linear to sRGB for accurate color output
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`,x=10,S=({variant:e=`square`,pixelSize:t=3,color:n=`#B497CF`,className:l,style:d,antialias:S=!0,patternScale:C=2,patternDensity:w=1,liquid:T=!1,liquidStrength:E=.1,liquidRadius:D=1,pixelSizeJitter:O=0,enableRipples:k=!0,rippleIntensityScale:A=1,rippleThickness:j=.1,rippleSpeed:M=.3,liquidWobbleSpeed:N=4.5,autoPauseOffscreen:P=!0,speed:F=.5,transparent:I=!0,edgeFade:L=.5,noiseAmount:R=0})=>{let z=(0,_.useRef)(null),oe=(0,_.useRef)({visible:!0}),B=(0,_.useRef)(F),V=(0,_.useRef)(null),H=(0,_.useRef)(null);return(0,_.useEffect)(()=>{let l=z.current;if(!l)return;B.current=F;let d=[`antialias`,`liquid`,`noiseAmount`],_={antialias:S,liquid:T,noiseAmount:R},v=!1;if(!V.current)v=!0;else if(H.current){for(let e of d)if(H.current[e]!==_[e]){v=!0;break}}if(v){if(V.current){let e=V.current;e.resizeObserver?.disconnect(),cancelAnimationFrame(e.raf),e.quad?.geometry.dispose(),e.material.dispose(),e.composer?.dispose(),e.renderer.dispose(),e.renderer.forceContextLoss(),e.renderer.domElement.parentElement===l&&l.removeChild(e.renderer.domElement),V.current=null}let d=document.createElement(`canvas`),_=new te({canvas:d,antialias:S,alpha:!0,powerPreference:`high-performance`});_.domElement.style.width=`100%`,_.domElement.style.height=`100%`,_.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),l.appendChild(_.domElement),I?_.setClearAlpha(0):_.setClearColor(0,1);let v={uResolution:{value:new f(0,0)},uTime:{value:0},uColor:{value:new o(n)},uClickPos:{value:Array.from({length:x},()=>new f(-1,-1))},uClickTimes:{value:new Float32Array(x)},uShapeType:{value:y[e]??0},uPixelSize:{value:t*_.getPixelRatio()},uScale:{value:C},uDensity:{value:w},uPixelJitter:{value:O},uEnableRipples:{value:+!!k},uRippleSpeed:{value:M},uRippleThickness:{value:j},uRippleIntensity:{value:A},uEdgeFade:{value:L}},F=new r,z=new i(-1,1,1,-1,0,1),H=new ee({vertexShader:ae,fragmentShader:b,uniforms:v,transparent:!0,depthTest:!1,depthWrite:!1,glslVersion:s}),se=new a(2,2),U=new c(se,H);F.add(U);let W=new ne,G=()=>{let e=l.clientWidth||1,n=l.clientHeight||1;_.setSize(e,n,!1),v.uResolution.value.set(_.domElement.width,_.domElement.height),V.current?.composer&&V.current.composer.setSize(_.domElement.width,_.domElement.height),v.uPixelSize.value=t*_.getPixelRatio()};G();let K=new ResizeObserver(G);K.observe(l);let q=(()=>{if(typeof window<`u`&&window.crypto?.getRandomValues){let e=new Uint32Array(1);return window.crypto.getRandomValues(e),e[0]/4294967295}return Math.random()})()*1e3,J,Y,X;if(T){Y=re(),Y.radiusScale=D,J=new m(_);let e=new g(F,z);X=ie(Y.texture,{strength:E,freq:N});let t=new h(z,X);t.renderToScreen=!0,J.addPass(e),J.addPass(t)}if(R>0){J||(J=new m(_),J.addPass(new g(F,z)));let e=new p(`NoiseEffect`,`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,{uniforms:new Map([[`uTime`,new u(0)],[`uAmount`,new u(R)]])}),t=new h(z,e);t.renderToScreen=!0,J&&J.passes.length>0&&J.passes.forEach(e=>e.renderToScreen=!1),J.addPass(t)}J&&J.setSize(_.domElement.width,_.domElement.height);let Z=e=>{let t=_.domElement.getBoundingClientRect(),n=_.domElement.width/t.width,r=_.domElement.height/t.height;return{fx:(e.clientX-t.left)*n,fy:(t.height-(e.clientY-t.top))*r,w:_.domElement.width,h:_.domElement.height}};_.domElement.addEventListener(`pointerdown`,e=>{let{fx:t,fy:n}=Z(e),r=V.current?.clickIx??0;v.uClickPos.value[r].set(t,n),v.uClickTimes.value[r]=v.uTime.value,V.current&&(V.current.clickIx=(r+1)%x)},{passive:!0}),_.domElement.addEventListener(`pointermove`,e=>{if(!Y)return;let{fx:t,fy:n,w:r,h:i}=Z(e);Y.addTouch({x:t/r,y:n/i})},{passive:!0});let Q=0,$=()=>{if(P&&!oe.current.visible){Q=requestAnimationFrame($);return}v.uTime.value=q+W.getElapsedTime()*B.current,X&&(X.uniforms.get(`uTime`).value=v.uTime.value),J?(Y&&Y.update(),J.passes.forEach(e=>{let t=e.effects;t&&t.forEach(e=>{let t=e.uniforms?.get(`uTime`);t&&(t.value=v.uTime.value)})}),J.render()):_.render(F,z),Q=requestAnimationFrame($)};Q=requestAnimationFrame($),V.current={renderer:_,scene:F,camera:z,material:H,clock:W,clickIx:0,uniforms:v,resizeObserver:K,raf:Q,quad:U,timeOffset:q,composer:J,touch:Y,liquidEffect:X}}else{let r=V.current;if(r.uniforms.uShapeType.value=y[e]??0,r.uniforms.uPixelSize.value=t*r.renderer.getPixelRatio(),r.uniforms.uColor.value.set(n),r.uniforms.uScale.value=C,r.uniforms.uDensity.value=w,r.uniforms.uPixelJitter.value=O,r.uniforms.uEnableRipples.value=+!!k,r.uniforms.uRippleIntensity.value=A,r.uniforms.uRippleThickness.value=j,r.uniforms.uRippleSpeed.value=M,r.uniforms.uEdgeFade.value=L,I?r.renderer.setClearAlpha(0):r.renderer.setClearColor(0,1),r.liquidEffect){let e=r.liquidEffect;e&&(e.value=E);let t=r.liquidEffect.uniforms.get(`uFreq`);t&&(t.value=N)}r.touch&&(r.touch.radiusScale=D)}return H.current=_,()=>{if(V.current&&v||!V.current)return;let e=V.current;e.resizeObserver?.disconnect(),cancelAnimationFrame(e.raf),e.quad?.geometry.dispose(),e.material.dispose(),e.composer?.dispose(),e.renderer.dispose(),e.renderer.forceContextLoss(),e.renderer.domElement.parentElement===l&&l.removeChild(e.renderer.domElement),V.current=null}},[S,T,R,t,C,w,k,A,j,M,O,L,I,E,D,N,P,e,n,F]),(0,v.jsx)(`div`,{ref:z,className:`pixel-blast-container ${l??``}`,style:d,"aria-label":`PixelBlast interactive background`})};export{S as default};