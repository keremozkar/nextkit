import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{$t as r,Ft as ee,Rt as i,S as a,bn as o,bt as s,en as c,o as te,yn as l}from"./three.module-Da49k5ub.js";var u=e(t(),1),d=n(),f=({topColor:e=`#5227FF`,bottomColor:t=`#FF9FFC`,intensity:n=1,rotationSpeed:f=.3,interactive:p=!1,className:m=``,glowAmount:h=.005,pillarWidth:g=3,pillarHeight:_=.4,noiseIntensity:v=.5,mixBlendMode:y=`screen`,pillarRotation:b=0,quality:x=`high`,lightMode:S=!1})=>{let C=(0,u.useRef)(null),w=(0,u.useRef)(null),T=(0,u.useRef)(null),E=(0,u.useRef)(null),D=(0,u.useRef)(null),O=(0,u.useRef)(null),k=(0,u.useRef)(null),A=(0,u.useRef)(new l(0,0)),j=(0,u.useRef)(0),M=(0,u.useRef)(f),[N,P]=(0,u.useState)(!0);return(0,u.useEffect)(()=>{let e=document.createElement(`canvas`);e.getContext(`webgl`)||e.getContext(`experimental-webgl`)||P(!1)},[]),(0,u.useEffect)(()=>{if(!C.current||!N)return;let u=C.current,d=u.clientWidth,f=u.clientHeight,m=new r;D.current=m;let y=new ee(-1,1,1,-1,0,1);O.current=y;let F=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),ne=F||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4,I=x;ne&&x===`high`&&(I=`medium`),F&&x!==`low`&&(I=`low`);let L={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:`mediump`,stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:`mediump`,stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:`highp`,stepMultiplier:1}},R=L[I]||L.medium,z;try{z=new te({antialias:!1,alpha:!0,powerPreference:I===`high`?`high-performance`:`low-power`,precision:R.precision,stencil:!1,depth:!1})}catch{P(!1);return}z.setSize(d,f),z.setPixelRatio(R.pixelRatio),u.appendChild(z.domElement),T.current=z;let B=e=>{let t=new a(e);return new o(t.r,t.g,t.b)},V=`
      precision ${R.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uLightMode;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      const float STEP_MULT = ${R.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${R.iterations};
      const int WAVE_ITER = ${R.waveIterations};

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;
        if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.283185;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;
        
        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;
          
          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }
          
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);
        
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
        
        vec3 result = clamp(col * uIntensity, 0.0, 1.0);
        if (uLightMode > 0.5) {
          float energy = max(result.r, max(result.g, result.b));
          vec3 hue = result / max(energy, 0.001);
          float coverage = smoothstep(0.025, 0.95, energy);
          hue = pow(clamp(hue, 0.0, 1.0), vec3(1.25));
          result = mix(vec3(1.0), hue, coverage * 0.94);
        }
        gl_FragColor = vec4(result, 1.0);
      }
    `,H=b*Math.PI/180,U=Math.sin(.4),re=Math.cos(.4),W=new c({vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,fragmentShader:V,uniforms:{uTime:{value:0},uResolution:{value:new l(d,f)},uMouse:{value:A.current},uTopColor:{value:B(e)},uBottomColor:{value:B(t)},uIntensity:{value:n},uInteractive:{value:p},uGlowAmount:{value:h},uPillarWidth:{value:g},uPillarHeight:{value:_},uNoiseIntensity:{value:v},uLightMode:{value:+!!S},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(H)},uPillarRotSin:{value:Math.sin(H)},uWaveSin:{value:U},uWaveCos:{value:re}},transparent:!0,depthWrite:!1,depthTest:!1});E.current=W;let G=new i(2,2);k.current=G;let K=new s(G,W);m.add(K);let q=null,J=e=>{if(!p||q)return;q=window.setTimeout(()=>{q=null},16);let t=u.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,r=-((e.clientY-t.top)/t.height)*2+1;A.current.set(n,r)};p&&u.addEventListener(`mousemove`,J,{passive:!0});let Y=performance.now(),X=1e3/(I===`low`?30:60),Z=e=>{if(!E.current||!T.current||!D.current||!O.current)return;let t=e-Y;if(t>=X){j.current+=.016*M.current;let n=j.current;E.current.uniforms.uTime.value=n,E.current.uniforms.uRotCos.value=Math.cos(n*.3),E.current.uniforms.uRotSin.value=Math.sin(n*.3),T.current.render(D.current,O.current),Y=e-t%X}w.current=requestAnimationFrame(Z)};w.current=requestAnimationFrame(Z);let Q=null,$=()=>{Q&&clearTimeout(Q),Q=window.setTimeout(()=>{if(!T.current||!E.current||!C.current)return;let e=C.current.clientWidth,t=C.current.clientHeight;T.current.setSize(e,t),E.current.uniforms.uResolution.value.set(e,t)},150)};return window.addEventListener(`resize`,$,{passive:!0}),()=>{window.removeEventListener(`resize`,$),p&&u.removeEventListener(`mousemove`,J),w.current&&cancelAnimationFrame(w.current),T.current&&(T.current.dispose(),T.current.forceContextLoss(),u.contains(T.current.domElement)&&u.removeChild(T.current.domElement)),E.current&&E.current.dispose(),k.current&&k.current.dispose(),T.current=null,E.current=null,D.current=null,O.current=null,k.current=null,w.current=null}},[N,x]),(0,u.useEffect)(()=>{M.current=f},[f]),(0,u.useEffect)(()=>{if(!E.current)return;let t=e=>{let t=new a(e);return new o(t.r,t.g,t.b)};E.current.uniforms.uTopColor.value=t(e)},[e]),(0,u.useEffect)(()=>{if(!E.current)return;let e=e=>{let t=new a(e);return new o(t.r,t.g,t.b)};E.current.uniforms.uBottomColor.value=e(t)},[t]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uIntensity.value=n)},[n]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uInteractive.value=p)},[p]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uGlowAmount.value=h)},[h]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uPillarWidth.value=g)},[g]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uPillarHeight.value=_)},[_]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uNoiseIntensity.value=v)},[v]),(0,u.useEffect)(()=>{E.current&&(E.current.uniforms.uLightMode.value=+!!S)},[S]),(0,u.useEffect)(()=>{if(!E.current)return;let e=b*Math.PI/180;E.current.uniforms.uPillarRotCos.value=Math.cos(e),E.current.uniforms.uPillarRotSin.value=Math.sin(e)},[b]),N?(0,d.jsx)(`div`,{ref:C,className:`light-pillar-container ${m}`,style:{mixBlendMode:y}}):(0,d.jsx)(`div`,{className:`light-pillar-fallback ${m}`,style:{mixBlendMode:y},children:`WebGL not supported`})};export{f as default};