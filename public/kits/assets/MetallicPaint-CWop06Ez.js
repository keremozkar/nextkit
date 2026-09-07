import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";var r=e(t(),1),i=n(),a=`#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`,o=`#version 300 es
precision highp float;
in vec2 vP;
out vec4 oC;
uniform sampler2D u_tex;
uniform float u_time,u_ratio,u_imgRatio,u_seed,u_scale,u_refract,u_blur,u_liquid;
uniform float u_bright,u_contrast,u_angle,u_fresnel,u_sharp,u_wave,u_noise,u_chroma;
uniform float u_distort,u_contour;
uniform vec3 u_lightColor,u_darkColor,u_tint;

vec3 sC,sM;

vec3 pW(vec3 v){
  vec3 i=floor(v),f=fract(v),s=sign(fract(v*.5)-.5),h=fract(sM*i+i.yzx),c=f*(f-1.);
  return s*c*((h*16.-4.)*c-1.);
}

vec3 aF(vec3 b,vec3 c){return pW(b+c.zxy-pW(b.zxy+c.yzx)+pW(b.yzx+c.xyz));}
vec3 lM(vec3 s,vec3 p){return(p+aF(s,p))*.5;}

vec2 fA(){
  vec2 c=vP-.5;
  c.x*=u_ratio>u_imgRatio?u_ratio/u_imgRatio:1.;
  c.y*=u_ratio>u_imgRatio?1.:u_imgRatio/u_ratio;
  return vec2(c.x+.5,.5-c.y);
}

vec2 rot(vec2 p,float r){float c=cos(r),s=sin(r);return vec2(p.x*c+p.y*s,p.y*c-p.x*s);}

float bM(vec2 c,float t){
  vec2 l=smoothstep(vec2(0.),vec2(t),c),u=smoothstep(vec2(0.),vec2(t),1.-c);
  return l.x*l.y*u.x*u.y;
}

float mG(float hi,float lo,float t,float sh,float cv){
  sh*=(2.-u_sharp);
  float ci=smoothstep(.15,.85,cv),r=lo;
  float e1=.08/u_scale;
  r=mix(r,hi,smoothstep(0.,sh*1.5,t));
  r=mix(r,lo,smoothstep(e1-sh,e1+sh,t));
  float e2=e1+.05/u_scale*(1.-ci*.35);
  r=mix(r,hi,smoothstep(e2-sh,e2+sh,t));
  float e3=e2+.025/u_scale*(1.-ci*.45);
  r=mix(r,lo,smoothstep(e3-sh,e3+sh,t));
  float e4=e1+.1/u_scale;
  r=mix(r,hi,smoothstep(e4-sh,e4+sh,t));
  float rm=1.-e4,gT=clamp((t-e4)/rm,0.,1.);
  r=mix(r,mix(hi,lo,smoothstep(0.,1.,gT)),smoothstep(e4-sh*.5,e4+sh*.5,t));
  return r;
}

void main(){
  sC=fract(vec3(.7548,.5698,.4154)*(u_seed+17.31))+.5;
  sM=fract(sC.zxy-sC.yzx*1.618);
  vec2 sc=vec2(vP.x*u_ratio,1.-vP.y);
  float angleRad=u_angle*3.14159/180.;
  sc=rot(sc-.5,angleRad)+.5;
  sc=clamp(sc,0.,1.);
  float sl=sc.x-sc.y,an=u_time*.001;
  vec2 iC=fA();
  vec4 texSample=texture(u_tex,iC);
  float dp=texSample.r;
  float shapeMask=texSample.a;
  vec3 hi=u_lightColor*u_bright;
  vec3 lo=u_darkColor*(2.-u_bright);
  lo.b+=smoothstep(.6,1.4,sc.x+sc.y)*.08;
  vec2 fC=sc-.5;
  float rd=length(fC+vec2(0.,sl*.15));
  vec2 ag=rot(fC,(.22-sl*.18)*3.14159);
  float cv=1.-pow(rd*1.65,1.15);
  cv*=pow(sc.y,.35);
  float vs=shapeMask;
  vs*=bM(iC,.01);
  float fr=pow(1.-cv,u_fresnel)*.3;
  vs=min(vs+fr*vs,1.);
  float mT=an*.0625;
  vec3 wO=vec3(-1.05,1.35,1.55);
  vec3 wA=aF(vec3(31.,73.,56.),mT+wO)*.22*u_wave;
  vec3 wB=aF(vec3(24.,64.,42.),mT-wO.yzx)*.22*u_wave;
  vec2 nC=sc*45.*u_noise;
  nC+=aF(sC.zxy,an*.17*sC.yzx-sc.yxy*.35).xy*18.*u_wave;
  vec3 tC=vec3(.00041,.00053,.00076)*mT+wB*nC.x+wA*nC.y;
  tC=lM(sC,tC);
  tC=lM(sC+1.618,tC);
  float tb=sin(tC.x*3.14159)*.5+.5;
  tb=tb*2.-1.;
  float noiseVal=pW(vec3(sc*8.+an,an*.5)).x;
  float edgeFactor=smoothstep(0.,.5,dp)*smoothstep(1.,.5,dp);
  float lD=dp+(1.-dp)*u_liquid*tb;
  lD+=noiseVal*u_distort*.15*edgeFactor;
  float rB=clamp(1.-cv,0.,1.);
  float fl=ag.x+sl;
  fl+=noiseVal*sl*u_distort*edgeFactor;
  fl*=mix(1.,1.-dp*.5,u_contour);
  fl-=dp*u_contour*.8;
  float eI=smoothstep(0.,1.,lD)*smoothstep(1.,0.,lD);
  fl-=tb*sl*1.8*eI;
  float cA=cv*clamp(pow(sc.y,.12),.25,1.);
  fl*=.12+(1.05-lD)*cA;
  fl*=smoothstep(1.,.65,lD);
  float vA1=smoothstep(.08,.18,sc.y)*smoothstep(.38,.18,sc.y);
  float vA2=smoothstep(.08,.18,1.-sc.y)*smoothstep(.38,.18,1.-sc.y);
  fl+=vA1*.16+vA2*.025;
  fl*=.45+pow(sc.y,2.)*.55;
  fl*=u_scale;
  fl-=an;
  float rO=rB+cv*tb*.025;
  float vM1=smoothstep(-.12,.18,sc.y)*smoothstep(.48,.08,sc.y);
  float cM1=smoothstep(.35,.55,cv)*smoothstep(.95,.35,cv);
  rO+=vM1*cM1*4.5;
  rO-=sl;
  float bO=rB*1.25;
  float vM2=smoothstep(-.02,.35,sc.y)*smoothstep(.75,.08,sc.y);
  float cM2=smoothstep(.35,.55,cv)*smoothstep(.75,.35,cv);
  bO+=vM2*cM2*.9;
  bO-=lD*.18;
  rO*=u_refract*u_chroma;
  bO*=u_refract*u_chroma;
  float sf=u_blur;
  float rP=fract(fl+rO);
  float rC=mG(hi.r,lo.r,rP,sf+.018+u_refract*cv*.025,cv);
  float gP=fract(fl);
  float gC=mG(hi.g,lo.g,gP,sf+.008/max(.01,1.-sl),cv);
  float bP=fract(fl-bO);
  float bC=mG(hi.b,lo.b,bP,sf+.008,cv);
  vec3 col=vec3(rC,gC,bC);
  col=(col-.5)*u_contrast+.5;
  col=clamp(col,0.,1.);
  col=mix(col,1.-min(vec3(1.),(1.-col)/max(u_tint,vec3(.001))),length(u_tint-1.)*.5);
  col=clamp(col,0.,1.);
  oC=vec4(col*vs,vs);
}`;function s(e){let t=1e3,n=e.naturalWidth||e.width,r=e.naturalHeight||e.height;if(n>t||r>t||n<500||r<500){let e=n>r?n>t?t/n:n<500?500/n:1:r>t?t/r:r<500?500/r:1;n=Math.round(n*e),r=Math.round(r*e)}let i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`);a.drawImage(e,0,0,n,r);let o=a.getImageData(0,0,n,r).data,s=n*r,c=new Float32Array(s),l=new Uint8Array(s),u=new Uint8Array(s);for(let e=0;e<s;e++){let t=e*4,n=o[t],r=o[t+1],i=o[t+2],a=o[t+3];c[e]=n>250&&r>250&&i>250&&a===255||a<5?0:a/255,l[e]=+(c[e]>.1)}for(let e=0;e<r;e++)for(let t=0;t<n;t++){let i=e*n+t;l[i]&&(t===0||t===n-1||e===0||e===r-1||!l[i-1]||!l[i+1]||!l[i-n]||!l[i+n])&&(u[i]=1)}let d=new Float32Array(s);for(let e=0;e<200;e++)for(let e=1;e<r-1;e++)for(let t=1;t<n-1;t++){let r=e*n+t;l[r]&&!u[r]&&(d[r]=1.85*((.01+((l[r+1]?d[r+1]:0)+(l[r-1]?d[r-1]:0)+(l[r+n]?d[r+n]:0)+(l[r-n]?d[r-n]:0)))/4)+-.8500000000000001*d[r])}let f=0;for(let e=0;e<s;e++)d[e]>f&&(f=d[e]);f===0&&(f=1);let p=a.createImageData(n,r);for(let e=0;e<s;e++){let t=e*4,n=d[e]/f,r=Math.round(255*(1-n*n));p.data[t]=p.data[t+1]=p.data[t+2]=r,p.data[t+3]=Math.round(c[e]*255)}return p}function c(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]}function l({imageSrc:e,seed:t=42,scale:n=4,refraction:l=.01,blur:u=.015,liquid:d=.75,speed:f=.3,brightness:p=2,contrast:m=.5,angle:h=0,fresnel:g=1,lightColor:_=`#ffffff`,darkColor:v=`#000000`,patternSharpness:y=1,waveAmplitude:b=1,noiseScale:x=.5,chromaticSpread:S=2,mouseAnimation:C=!1,distortion:w=1,contour:T=.2,tintColor:E=`#feb3ff`}){let D=(0,r.useRef)(null),O=(0,r.useRef)(null),k=(0,r.useRef)(null),A=(0,r.useRef)({}),j=(0,r.useRef)(null),M=(0,r.useRef)(0),N=(0,r.useRef)(0),P=(0,r.useRef)(null),F=(0,r.useRef)(null),I=(0,r.useRef)(f),L=(0,r.useRef)({x:.5,y:.5,targetX:.5,targetY:.5}),R=(0,r.useRef)(C),[z,B]=(0,r.useState)(!1),[V,H]=(0,r.useState)(!1);(0,r.useEffect)(()=>{I.current=f},[f]),(0,r.useEffect)(()=>{R.current=C},[C]);let U=(0,r.useCallback)(()=>{let e=D.current;if(!e)return!1;let t=e.getContext(`webgl2`,{antialias:!0,alpha:!0});if(!t)return!1;let n=(e,n)=>{let r=t.createShader(n);return t.shaderSource(r,e),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error(t.getShaderInfoLog(r)),null)},r=n(a,t.VERTEX_SHADER),i=n(o,t.FRAGMENT_SHADER);if(!r||!i)return!1;let s=t.createProgram();if(t.attachShader(s,r),t.attachShader(s,i),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))return console.error(t.getProgramInfoLog(s)),!1;let c={},l=t.getProgramParameter(s,t.ACTIVE_UNIFORMS);for(let e=0;e<l;e++){let n=t.getActiveUniform(s,e);n&&(c[n.name]=t.getUniformLocation(s,n.name))}let u=new Float32Array([-1,-1,1,-1,-1,1,1,1]),d=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,d),t.bufferData(t.ARRAY_BUFFER,u,t.STATIC_DRAW),t.useProgram(s);let f=t.getAttribLocation(s,`a_position`);return t.enableVertexAttribArray(f),t.vertexAttribPointer(f,2,t.FLOAT,!1,0,0),O.current=t,k.current=s,A.current=c,!0},[]),W=(0,r.useCallback)(e=>{let t=O.current,n=A.current;if(!t||!e)return;j.current&&t.deleteTexture(j.current);let r=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.width,e.height,0,t.RGBA,t.UNSIGNED_BYTE,e.data),t.uniform1i(n.u_tex,0);let i=e.width/e.height;t.uniform1f(n.u_imgRatio,i),t.uniform1f(n.u_ratio,1),j.current=r,F.current=e},[]);return(0,r.useEffect)(()=>{if(!U())return;let e=D.current,t=O.current,n=1e3*devicePixelRatio;return e.width=n,e.height=n,t.viewport(0,0,n,n),B(!0),()=>{P.current&&cancelAnimationFrame(P.current),j.current&&O.current&&O.current.deleteTexture(j.current)}},[U]),(0,r.useEffect)(()=>{if(!z||!e)return;H(!1);let t=new Image;t.crossOrigin=`anonymous`,t.onload=()=>{let e=s(t);W(e),H(!0)},t.src=e},[z,e,W]),(0,r.useEffect)(()=>{let e=O.current,r=A.current;if(!e||!z)return;e.uniform1f(r.u_seed,t),e.uniform1f(r.u_scale,n),e.uniform1f(r.u_refract,l),e.uniform1f(r.u_blur,u),e.uniform1f(r.u_liquid,d),e.uniform1f(r.u_bright,p),e.uniform1f(r.u_contrast,m),e.uniform1f(r.u_angle,h),e.uniform1f(r.u_fresnel,g);let i=c(_),a=c(v),o=c(E);e.uniform3f(r.u_lightColor,i[0],i[1],i[2]),e.uniform3f(r.u_darkColor,a[0],a[1],a[2]),e.uniform1f(r.u_sharp,y),e.uniform1f(r.u_wave,b),e.uniform1f(r.u_noise,x),e.uniform1f(r.u_chroma,S),e.uniform1f(r.u_distort,w),e.uniform1f(r.u_contour,T),e.uniform3f(r.u_tint,o[0],o[1],o[2])},[z,t,n,l,u,d,p,m,h,g,_,v,y,b,x,S,w,T,E]),(0,r.useEffect)(()=>{if(!z||!V)return;let e=O.current,t=A.current,n=D.current,r=L.current,i=e=>{let t=n.getBoundingClientRect();r.targetX=(e.clientX-t.left)/t.width,r.targetY=(e.clientY-t.top)/t.height};n.addEventListener(`mousemove`,i);let a=n=>{let i=n-N.current;N.current=n,R.current?(r.x+=(r.targetX-r.x)*.08,r.y+=(r.targetY-r.y)*.08,M.current=r.x*3e3+r.y*1500):M.current+=i*I.current,e.uniform1f(t.u_time,M.current),e.drawArrays(e.TRIANGLE_STRIP,0,4),P.current=requestAnimationFrame(a)};return N.current=performance.now(),P.current=requestAnimationFrame(a),()=>{P.current&&cancelAnimationFrame(P.current),n.removeEventListener(`mousemove`,i)}},[z,V]),(0,i.jsx)(`canvas`,{ref:D,className:`paint-container`})}export{l as default};