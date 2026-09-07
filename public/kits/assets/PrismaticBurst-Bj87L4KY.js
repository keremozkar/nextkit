import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Texture-C-0j2d6N.js";import{t as s}from"./Triangle-qjVMgwr4.js";var c=e(t(),1),l=n(),u=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;
uniform float uLightMode;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    col = clamp(col, 0.0, 1.0);
    if (uLightMode > 0.5) {
        float energy = max(max(col.r, col.g), col.b);
        vec3 hue = col / max(energy, 0.0001);
        float neutral = min(hue.r, min(hue.g, hue.b));
        hue = max(hue - vec3(neutral * 0.68), vec3(0.0));
        hue /= max(max(hue.r, max(hue.g, hue.b)), 0.0001);
        vec3 pigment = mix(hue, hue * hue, 0.24) * 0.64;
        float coverage = smoothstep(0.001, 0.32, energy);
        coverage = pow(coverage, 0.72) * 0.92;
        col = mix(vec3(1.0), pigment, coverage);
    }
    fragColor = vec4(col, 1.0);
}`,f=e=>{let t=e.trim();if(t.startsWith(`#`)&&(t=t.slice(1)),t.length===3){let e=t[0],n=t[1],r=t[2];t=e+e+n+n+r+r}let n=parseInt(t.slice(0,6),16);return isNaN(n)||t.length!==6&&t.length!==8?[1,1,1]:[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},p=e=>{if(e==null)return 0;if(typeof e==`number`)return e;let t=String(e).trim(),n=parseFloat(t.replace(`px`,``));return isNaN(n)?0:n},m=({intensity:e=2,speed:t=.5,animationType:n=`rotate3d`,colors:m,distort:h=0,paused:g=!1,offset:_={x:0,y:0},hoverDampness:v=0,rayCount:y,mixBlendMode:b=`lighten`,lightMode:x=!1})=>{let S=(0,c.useRef)(null),C=(0,c.useRef)(null),w=(0,c.useRef)(null),T=(0,c.useRef)([.5,.5]),E=(0,c.useRef)([.5,.5]),D=(0,c.useRef)(g),O=(0,c.useRef)(null),k=(0,c.useRef)(v),A=(0,c.useRef)(!0),j=(0,c.useRef)(null),M=(0,c.useRef)(null);return(0,c.useEffect)(()=>{D.current=g},[g]),(0,c.useEffect)(()=>{k.current=v},[v]),(0,c.useEffect)(()=>{let e=S.current;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),n=new i({dpr:t,alpha:!1,antialias:!1});w.current=n;let c=n.gl;c.canvas.style.position=`absolute`,c.canvas.style.inset=`0`,c.canvas.style.width=`100%`,c.canvas.style.height=`100%`,c.canvas.style.mixBlendMode=x?`normal`:b&&b!==`none`?b:``,e.appendChild(c.canvas);let l=new Uint8Array([255,255,255,255]),f=new o(c,{image:l,width:1,height:1,generateMipmaps:!1,flipY:!1});f.minFilter=c.LINEAR,f.magFilter=c.LINEAR,f.wrapS=c.CLAMP_TO_EDGE,f.wrapT=c.CLAMP_TO_EDGE,O.current=f;let p=new r(c,{vertex:u,fragment:d,uniforms:{uResolution:{value:[1,1]},uTime:{value:0},uIntensity:{value:1},uSpeed:{value:1},uAnimType:{value:0},uMouse:{value:[.5,.5]},uColorCount:{value:0},uDistort:{value:0},uOffset:{value:[0,0]},uGradient:{value:f},uNoiseAmount:{value:.8},uRayCount:{value:0},uLightMode:{value:+!!x}}});C.current=p;let m=new s(c),h=new a(c,{geometry:m,program:p});M.current=m,j.current=h;let g=()=>{let t=e.clientWidth||1,r=e.clientHeight||1;n.setSize(t,r),p.uniforms.uResolution.value=[c.drawingBufferWidth,c.drawingBufferHeight]},_=null;`ResizeObserver`in window?(_=new ResizeObserver(g),_.observe(e)):window.addEventListener(`resize`,g),g();let v=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/Math.max(n.width,1),i=(t.clientY-n.top)/Math.max(n.height,1);T.current=[Math.min(Math.max(r,0),1),Math.min(Math.max(i,0),1)]};e.addEventListener(`pointermove`,v,{passive:!0});let y=null;`IntersectionObserver`in window&&(y=new IntersectionObserver(e=>{e[0]&&(A.current=e[0].isIntersecting)},{root:null,threshold:.01}),y.observe(e));let N=()=>{};document.addEventListener(`visibilitychange`,N);let P=0,F=performance.now(),I=0,L=e=>{let t=Math.max(0,e-F)*.001;F=e;let r=A.current&&!document.hidden;if(D.current||(I+=t),!r){P=requestAnimationFrame(L);return}let i=.02+Math.max(0,Math.min(1,k.current))*.5,a=1-Math.exp(-t/i),o=T.current,s=E.current;s[0]+=(o[0]-s[0])*a,s[1]+=(o[1]-s[1])*a,p.uniforms.uMouse.value=s,p.uniforms.uTime.value=I,n.render({scene:j.current}),P=requestAnimationFrame(L)};return P=requestAnimationFrame(L),()=>{cancelAnimationFrame(P),e.removeEventListener(`pointermove`,v),_?.disconnect(),_||window.removeEventListener(`resize`,g),y?.disconnect(),document.removeEventListener(`visibilitychange`,N);try{e.removeChild(c.canvas)}catch{console.warn(`Canvas already removed`)}try{j.current?.remove?.()}catch{}try{M.current?.remove?.()}catch{}try{C.current?.remove?.()}catch{}try{let e=w.current?.gl;e&&O.current?.texture&&e.deleteTexture(O.current.texture)}catch{}C.current=null,w.current=null,O.current=null,j.current=null,M.current=null}},[]),(0,c.useEffect)(()=>{let e=w.current?.gl?.canvas;e&&(e.style.mixBlendMode=x?`normal`:b&&b!==`none`?b:``)},[b,x]),(0,c.useEffect)(()=>{let r=C.current,i=w.current,a=O.current;if(!r||!i||!a)return;r.uniforms.uIntensity.value=e??1,r.uniforms.uSpeed.value=t??1;let o={rotate:0,rotate3d:1,hover:2};r.uniforms.uAnimType.value=o[n??`rotate`],r.uniforms.uDistort.value=typeof h==`number`?h:0;let s=p(_?.x),c=p(_?.y);r.uniforms.uOffset.value=[s,c],r.uniforms.uRayCount.value=Math.max(0,Math.floor(y??0)),r.uniforms.uLightMode.value=+!!x;let l=0;if(Array.isArray(m)&&m.length>0){let e=i.gl,t=m.slice(0,64);l=t.length;let n=new Uint8Array(l*4);for(let e=0;e<l;e++){let[r,i,a]=f(t[e]);n[e*4+0]=Math.round(r*255),n[e*4+1]=Math.round(i*255),n[e*4+2]=Math.round(a*255),n[e*4+3]=255}a.image=n,a.width=l,a.height=1,a.minFilter=e.LINEAR,a.magFilter=e.LINEAR,a.wrapS=e.CLAMP_TO_EDGE,a.wrapT=e.CLAMP_TO_EDGE,a.flipY=!1,a.generateMipmaps=!1,a.format=e.RGBA,a.type=e.UNSIGNED_BYTE,a.needsUpdate=!0}else l=0;r.uniforms.uColorCount.value=l},[e,t,n,m,h,_,y,x]),(0,l.jsx)(`div`,{className:`prismatic-burst-container`,ref:S})};export{m as default};