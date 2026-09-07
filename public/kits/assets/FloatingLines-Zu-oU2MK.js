import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,Ft as i,Rt as a,bn as o,bt as s,en as c,o as l,x as u,yn as d}from"./three.module-Da49k5ub.js";var f=e(t(),1),p=n(),m=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,h=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;
uniform vec3 backgroundColor;
uniform bool lightMode;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

if (lightMode) {
  vec3 energy = max(col, vec3(0.0));
  float peak = max(energy.r, max(energy.g, energy.b));
  float coverage = smoothstep(0.018, 0.5, peak);
  vec3 chroma = clamp(energy / max(peak, 0.0001), 0.0, 1.0);
  chroma = pow(chroma, vec3(1.35));
  float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
  chroma /= max(chromaPeak, 0.0001);
  vec3 ink = mix(chroma, clamp(chroma * 0.82, 0.0, 1.0), smoothstep(0.5, 1.0, coverage));
  fragColor = vec4(mix(vec3(1.0), ink, coverage * 0.94), 1.0);
} else {
    fragColor = vec4(col, 1.0);
  }
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,g=8;function _(e){let t=e.trim();t.startsWith(`#`)&&(t=t.slice(1));let n=255,r=255,i=255;return t.length===3?(n=parseInt(t[0]+t[0],16),r=parseInt(t[1]+t[1],16),i=parseInt(t[2]+t[2],16)):t.length===6&&(n=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16)),new o(n/255,r/255,i/255)}function v({linesGradient:e,enabledWaves:t=[`top`,`middle`,`bottom`],lineCount:n=[6],lineDistance:v=[5],topWavePosition:y,middleWavePosition:b,bottomWavePosition:x={x:2,y:-.7,rotate:-1},animationSpeed:S=1,interactive:C=!0,bendRadius:w=5,bendStrength:T=-.5,mouseDamping:E=.05,parallax:D=!0,parallaxStrength:O=.2,mixBlendMode:k=`screen`,backgroundColor:A=`#000000`,lightMode:j=!1}){let M=(0,f.useRef)(null),N=(0,f.useRef)(new d(-1e3,-1e3)),P=(0,f.useRef)(new d(-1e3,-1e3)),F=(0,f.useRef)(0),I=(0,f.useRef)(0),L=(0,f.useRef)(new d(0,0)),R=(0,f.useRef)(new d(0,0)),z=e=>typeof n==`number`?n:t.includes(e)?n[t.indexOf(e)]??6:0,B=e=>typeof v==`number`?v:t.includes(e)?v[t.indexOf(e)]??.1:.1,V=t.includes(`top`)?z(`top`):0,ee=t.includes(`middle`)?z(`middle`):0,te=t.includes(`bottom`)?z(`bottom`):0,H=t.includes(`top`)?B(`top`)*.01:.01,U=t.includes(`middle`)?B(`middle`)*.01:.01,W=t.includes(`bottom`)?B(`bottom`)*.01:.01;return(0,f.useEffect)(()=>{let n=M.current;if(!n)return;let f=!0,p=new r,v=new i(-1,1,1,-1,0,1);v.position.z=1;let k=new l({antialias:!0,alpha:!1});k.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),k.domElement.style.width=`100%`,k.domElement.style.height=`100%`,n.appendChild(k.domElement);let z={iTime:{value:0},iResolution:{value:new o(1,1,1)},animationSpeed:{value:S},enableTop:{value:t.includes(`top`)},enableMiddle:{value:t.includes(`middle`)},enableBottom:{value:t.includes(`bottom`)},topLineCount:{value:V},middleLineCount:{value:ee},bottomLineCount:{value:te},topLineDistance:{value:H},middleLineDistance:{value:U},bottomLineDistance:{value:W},topWavePosition:{value:new o(y?.x??10,y?.y??.5,y?.rotate??-.4)},middleWavePosition:{value:new o(b?.x??5,b?.y??0,b?.rotate??.2)},bottomWavePosition:{value:new o(x?.x??2,x?.y??-.7,x?.rotate??.4)},iMouse:{value:new d(-1e3,-1e3)},interactive:{value:C},bendRadius:{value:w},bendStrength:{value:T},bendInfluence:{value:0},parallax:{value:D},parallaxStrength:{value:O},parallaxOffset:{value:new d(0,0)},lineGradient:{value:Array.from({length:g},()=>new o(1,1,1))},lineGradientCount:{value:0},backgroundColor:{value:_(A)},lightMode:{value:j}};if(e&&e.length>0){let t=e.slice(0,g);z.lineGradientCount.value=t.length,t.forEach((e,t)=>{let n=_(e);z.lineGradient.value[t].set(n.x,n.y,n.z)})}let B=new c({uniforms:z,vertexShader:m,fragmentShader:h}),G=new a(2,2),K=new s(G,B);p.add(K);let q=new u,J=()=>{if(!f)return;let e=n.clientWidth||1,t=n.clientHeight||1;k.setSize(e,t,!1);let r=k.domElement.width,i=k.domElement.height;z.iResolution.value.set(r,i,1)};J();let Y=typeof ResizeObserver<`u`?new ResizeObserver(()=>{f&&J()}):null;Y&&Y.observe(n);let X=e=>{let t=k.domElement.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=k.getPixelRatio();if(N.current.set(n*i,(t.height-r)*i),F.current=1,D){let e=t.width/2,i=t.height/2,a=(n-e)/t.width,o=-(r-i)/t.height;L.current.set(a*O,o*O)}},Z=()=>{F.current=0};C&&(k.domElement.addEventListener(`pointermove`,X),k.domElement.addEventListener(`pointerleave`,Z));let Q=0,$=()=>{f&&(z.iTime.value=q.getElapsedTime(),C&&(P.current.lerp(N.current,E),z.iMouse.value.copy(P.current),I.current+=(F.current-I.current)*E,z.bendInfluence.value=I.current),D&&(R.current.lerp(L.current,E),z.parallaxOffset.value.copy(R.current)),k.render(p,v),Q=requestAnimationFrame($))};return $(),()=>{f=!1,cancelAnimationFrame(Q),Y&&Y.disconnect(),C&&(k.domElement.removeEventListener(`pointermove`,X),k.domElement.removeEventListener(`pointerleave`,Z)),G.dispose(),B.dispose(),k.dispose(),k.forceContextLoss(),k.domElement.parentElement&&k.domElement.parentElement.removeChild(k.domElement)}},[e,t,n,v,y,b,x,S,C,w,T,E,D,O,A,j]),(0,p.jsx)(`div`,{ref:M,className:`floating-lines-container`,style:{mixBlendMode:j?`normal`:k}})}export{v as default};