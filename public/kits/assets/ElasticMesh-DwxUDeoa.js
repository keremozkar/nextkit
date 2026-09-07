import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,o as a,t as o}from"./Mesh-D48iXpEj.js";import{t as s}from"./Texture-C-0j2d6N.js";var c=e(t(),1),l=n(),u=4.6,d=.82,f=`
precision highp float;
attribute vec2 aGrid;
attribute vec2 uv;
attribute vec3 aOffset;
attribute vec3 aNormal;

uniform float uAspect;
uniform float uTilt;
uniform float uDist;
uniform float uFit;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

void main() {
  vUv = uv;

  vec2 base = vec2((aGrid.x * 2.0 - 1.0) * uAspect, 1.0 - aGrid.y * 2.0);
  vec3 p = vec3(base + aOffset.xy, aOffset.z);

  float ct = cos(uTilt);
  float st = sin(uTilt);
  float ry = p.y * ct - p.z * st;
  float rz = p.y * st + p.z * ct;
  p.y = ry;
  p.z = rz;

  float persp = uDist / (uDist - p.z);
  vec2 clip = vec2(p.x / uAspect, p.y) * persp * uFit;

  vNormal = aNormal;
  vDepth = aOffset.z;
  gl_Position = vec4(clip, 0.0, 1.0);
}
`,p=`
precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

uniform sampler2D tMap;
uniform float uHasImage;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uHighlight;
uniform float uShading;
uniform vec2 uRes;
uniform float uRadius;
uniform float uGrid;
uniform float uGridDensity;
uniform float uGridOpacity;
uniform vec3 uGridColor;

void main() {
  vec3 base;
  if (uHasImage > 0.5) {
    base = texture2D(tMap, vUv).rgb;
  } else {
    base = mix(uColor1, uColor2, clamp(vUv.y, 0.0, 1.0));
  }

  vec3 N = normalize(vNormal);
  vec3 L = normalize(vec3(-0.35, 0.55, 0.78));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);

  float diff = clamp(dot(N, L), 0.0, 1.0);
  float specRaw = pow(clamp(dot(N, H), 0.0, 1.0), 26.0);
  float specFlat = pow(clamp(H.z, 0.0, 1.0), 26.0);
  float spec = clamp((specRaw - specFlat) / (1.0 - specFlat), 0.0, 1.0);
  float ao = clamp(1.0 + vDepth * 0.45, 0.65, 1.25);

  vec3 lit = base * (1.0 - uShading * 0.28);
  lit += base * diff * uShading * 0.55;
  lit *= ao;
  lit += uHighlight * spec * uShading * 0.25;

  if (uGrid > 0.5) {
    vec2 g = vUv * uGridDensity;
    vec2 w = uGridDensity / max(uRes, vec2(1.0));
    vec2 d = abs(fract(g - 0.5) - 0.5) / max(w * 1.5, vec2(1e-4));
    float line = 1.0 - clamp(min(d.x, d.y), 0.0, 1.0);
    lit = mix(lit, uGridColor, line * uGridOpacity * (0.45 + diff * 0.55));
  }

  vec2 p = (vUv - 0.5) * uRes;
  vec2 halfRes = uRes * 0.5;
  float r = min(uRadius, min(halfRes.x, halfRes.y));
  vec2 q = abs(p) - (halfRes - r);
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  float alpha = 1.0 - smoothstep(-1.25, 1.25, sd);
  if (alpha <= 0.002) discard;

  gl_FragColor = vec4(lit, alpha);
}
`;function m(e){let t=(e||``).replace(`#`,``).trim();t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=parseInt(t||`000000`,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}var h=({image:e=``,color1:t=`#5227FF`,color2:n=`#B19EEF`,highlight:h=`#ffffff`,showGrid:g=!0,gridDensity:_=20,gridOpacity:v=.28,gridColor:y=`#ffffff`,borderRadius:b=25,stiffness:x=.05,damping:S=.2,grabRadius:C=.6,pull:w=.4,wobble:T=5,tilt:E=14,shading:D=.5,resolution:O=25,interaction:k=`hover`,enabled:A=!0,className:j=``,style:M,...N})=>{let P=(0,c.useRef)(null),F=(0,c.useRef)({});return F.current={color1:t,color2:n,highlight:h,showGrid:g,gridDensity:_,gridOpacity:v,gridColor:y,borderRadius:b,stiffness:x,damping:S,grabRadius:C,pull:w,wobble:T,tilt:E,shading:D,interaction:k,enabled:A},(0,c.useEffect)(()=>{let c=P.current;if(!c)return;let l=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,x=new i({alpha:!0,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,2)}),S=x.gl;S.clearColor(0,0,0,0),S.enable(S.BLEND),S.blendFunc(S.SRC_ALPHA,S.ONE_MINUS_SRC_ALPHA);let C=Math.max(6,Math.min(40,Math.round(O))),w=C*C,T=new Float32Array(w*2),k=new Float32Array(w*2),A=new Float32Array(w*3),j=new Float32Array(w*3);for(let e=0;e<C;e++)for(let t=0;t<C;t++){let n=e*C+t,r=t/(C-1),i=e/(C-1);T[n*2]=r,T[n*2+1]=i,k[n*2]=r,k[n*2+1]=i,j[n*3+2]=1}let M=(C-1)*(C-1),N=new Uint16Array(M*6),I=0;for(let e=0;e<C-1;e++)for(let t=0;t<C-1;t++){let n=e*C+t,r=n+1,i=n+C,a=i+1;N[I++]=n,N[I++]=i,N[I++]=r,N[I++]=r,N[I++]=i,N[I++]=a}let L=new a(S,{aGrid:{size:2,data:T},uv:{size:2,data:k},aOffset:{size:3,data:A},aNormal:{size:3,data:j},index:{data:N}}),ee=new s(S,{generateMipmaps:!1,flipY:!1});if(e){let t=new Image;t.crossOrigin=`anonymous`,t.src=e,t.onload=()=>{ee.image=t,R.uniforms.uHasImage.value=1}}let R=new r(S,{vertex:f,fragment:p,transparent:!0,cullFace:null,uniforms:{tMap:{value:ee},uHasImage:{value:0},uColor1:{value:m(t)},uColor2:{value:m(n)},uHighlight:{value:m(h)},uGrid:{value:+!!g},uGridDensity:{value:_},uGridOpacity:{value:v},uGridColor:{value:m(y)},uShading:{value:D},uRes:{value:[1,1]},uRadius:{value:b},uAspect:{value:1},uTilt:{value:E*Math.PI/180},uDist:{value:u},uFit:{value:d}}}),te=new o(S,{geometry:L,program:R}),z=new Float32Array(w),B=new Float32Array(w),V=new Float32Array(w*3),H=new Float32Array(w*3),U=new Float32Array(w*3),W=1;function ne(){for(let e=0;e<w;e++)z[e]=(T[e*2]*2-1)*W,B[e]=1-T[e*2+1]*2}function re(){let e=c.offsetWidth||1,t=c.offsetHeight||1;x.setSize(e,t),W=e/t,R.uniforms.uAspect.value=W,R.uniforms.uRes.value=[e,t],ne()}let ie=new ResizeObserver(re);ie.observe(c),re();let G={x:0,y:0,tx:0,ty:0,active:!1,targetActive:!1};function K(e,t){let n=c.getBoundingClientRect(),r=(e-n.left)/n.width,i=(t-n.top)/n.height,a=r*2-1,o=1-i*2,s=(F.current.tilt||0)*Math.PI/180,l=Math.cos(s),f=Math.sin(s),p=o/(l*d*u),m=p*u/(1+p*f),h=u/(u-m*f);G.tx=a*W/(h*d),G.ty=m}function ae(e){K(e.clientX,e.clientY),F.current.interaction===`hover`&&(G.targetActive=!0)}function oe(){F.current.interaction===`hover`&&(G.targetActive=!0)}function q(){G.targetActive=!1}function se(e){F.current.interaction===`drag`&&(K(e.clientX,e.clientY),G.x=G.tx,G.y=G.ty,G.targetActive=!0)}function ce(){F.current.interaction===`drag`&&(G.targetActive=!1)}function J(e){e.touches.length&&(K(e.touches[0].clientX,e.touches[0].clientY),G.targetActive=!0)}c.addEventListener(`mousemove`,ae),c.addEventListener(`mouseenter`,oe),c.addEventListener(`mouseleave`,q),c.addEventListener(`mousedown`,se),window.addEventListener(`mouseup`,ce),c.addEventListener(`touchstart`,J,{passive:!0}),c.addEventListener(`touchmove`,J,{passive:!0}),c.addEventListener(`touchend`,q);let Y=1/120,X=0,le=performance.now(),Z=0,Q=0;function ue(){let e=F.current,t=e.stiffness,n=1-e.damping,r=.06+e.wobble*.032,i=G.active&&e.enabled&&!l,a=1/(Math.max(.08,e.grabRadius)*1.4),o=e.pull*.009;for(let e=0;e<C;e++)for(let n=0;n<C;n++){let s=e*C+n,c=s*3,l=V[c],u=V[c+1],d=V[c+2],f=-t*l,p=-t*u,m=-t*d,h=0,g=0,_=0,v=0;if(n>0){let e=(s-1)*3;h+=V[e],g+=V[e+1],_+=V[e+2],v++}if(n<C-1){let e=(s+1)*3;h+=V[e],g+=V[e+1],_+=V[e+2],v++}if(e>0){let e=(s-C)*3;h+=V[e],g+=V[e+1],_+=V[e+2],v++}if(e<C-1){let e=(s+C)*3;h+=V[e],g+=V[e+1],_+=V[e+2],v++}if(f+=r*(h-v*l),p+=r*(g-v*u),m+=r*(_-v*d),i){let e=G.x-(z[s]+l),t=G.y-(B[s]+u),n=Math.sqrt(e*e+t*t),r=n*a;if(r<1){let i=1-r*r;if(m+=o*i*i*6,n>1e-4){let i=o*(r*(1-r)*(1-r)*6.75)*1.6/n;f+=e*i,p+=t*i}}}U[c]=f,U[c+1]=p,U[c+2]=m}for(let e=0;e<w;e++){let t=e*3,r=(H[t]+U[t])*n,i=(H[t+1]+U[t+1])*n,a=(H[t+2]+U[t+2])*n;H[t]=r,H[t+1]=i,H[t+2]=a;let o=V[t]+r,s=V[t+1]+i,c=V[t+2]+a;o>1.2?o=1.2:o<-1.2&&(o=-1.2),s>1.2?s=1.2:s<-1.2&&(s=-1.2),c>1.2?c=1.2:c<-1.2&&(c=-1.2),V[t]=o,V[t+1]=s,V[t+2]=c}}function de(){Z=0,Q=0;for(let e=0;e<C;e++)for(let t=0;t<C;t++){let n=e*C+t,r=n*3,i=t>0?n-1:n,a=t<C-1?n+1:n,o=e>0?n-C:n,s=e<C-1?n+C:n,c=z[i]+V[i*3],l=B[i]+V[i*3+1],u=V[i*3+2],d=z[a]+V[a*3],f=B[a]+V[a*3+1],p=V[a*3+2],m=z[o]+V[o*3],h=B[o]+V[o*3+1],g=V[o*3+2],_=z[s]+V[s*3],v=B[s]+V[s*3+1],y=V[s*3+2],b=d-c,x=f-l,S=p-u,w=_-m,T=v-h,E=y-g,D=x*E-S*T,O=S*w-b*E,k=b*T-x*w;k<0&&(D=-D,O=-O,k=-k);let M=Math.sqrt(D*D+O*O+k*k)||1;j[r]=D/M,j[r+1]=O/M,j[r+2]=k/M,A[r]=V[r],A[r+1]=V[r+1],A[r+2]=V[r+2];let N=Math.abs(V[r])+Math.abs(V[r+1])+Math.abs(V[r+2]);N>Z&&(Z=N);let P=Math.abs(H[r])+Math.abs(H[r+1])+Math.abs(H[r+2]);P>Q&&(Q=P)}L.attributes.aOffset.needsUpdate=!0,L.attributes.aNormal.needsUpdate=!0}let $=0;function fe(e){$=requestAnimationFrame(fe);let t=F.current;R.uniforms.uShading.value=t.shading,R.uniforms.uRadius.value=t.borderRadius,R.uniforms.uTilt.value=t.tilt*Math.PI/180,R.uniforms.uColor1.value=m(t.color1),R.uniforms.uColor2.value=m(t.color2),R.uniforms.uHighlight.value=m(t.highlight),R.uniforms.uGrid.value=+!!t.showGrid,R.uniforms.uGridDensity.value=t.gridDensity,R.uniforms.uGridOpacity.value=t.gridOpacity,R.uniforms.uGridColor.value=m(t.gridColor);let n=(e-le)/1e3;le=e,n>.25&&(n=.25);let r=1-Math.exp(-Math.max(n,1e-4)/.06);G.x+=(G.tx-G.x)*r,G.y+=(G.ty-G.y)*r,G.active=G.targetActive,X+=n;let i=0;for(;X>=Y&&i<5;)ue(),X-=Y,i++;X>Y&&(X=0),de(),x.render({scene:te})}return $=requestAnimationFrame(fe),c.appendChild(S.canvas),()=>{cancelAnimationFrame($),ie.disconnect(),c.removeEventListener(`mousemove`,ae),c.removeEventListener(`mouseenter`,oe),c.removeEventListener(`mouseleave`,q),c.removeEventListener(`mousedown`,se),window.removeEventListener(`mouseup`,ce),c.removeEventListener(`touchstart`,J),c.removeEventListener(`touchmove`,J),c.removeEventListener(`touchend`,q),S.canvas.parentElement===c&&c.removeChild(S.canvas);let e=S.getExtension(`WEBGL_lose_context`);e&&e.loseContext()}},[e,O]),(0,l.jsx)(`div`,{ref:P,className:`elastic-mesh${j?` ${j}`:``}`,style:M,...N})};export{h as default};