import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=({enableRainbow:e=!1,gridColor:t=`#ffffff`,rippleIntensity:n=.05,gridSize:l=10,gridThickness:u=15,fadeDistance:d=1.5,vignetteStrength:f=2,glowIntensity:p=.1,opacity:m=1,gridRotation:h=0,mouseInteraction:g=!0,mouseInteractionRadius:_=1,lightMode:v=!1})=>{let y=(0,s.useRef)(null),b=(0,s.useRef)({x:.5,y:.5}),x=(0,s.useRef)({x:.5,y:.5}),S=(0,s.useRef)(0),C=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!y.current)return;let s=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},c=new i({dpr:Math.min(window.devicePixelRatio,2),alpha:!0}),w=c.gl;w.enable(w.BLEND),w.blendFunc(w.SRC_ALPHA,w.ONE_MINUS_SRC_ALPHA),w.canvas.style.width=`100%`,w.canvas.style.height=`100%`,y.current.appendChild(w.canvas);let T={iTime:{value:0},iResolution:{value:[1,1]},enableRainbow:{value:e},gridColor:{value:s(t)},rippleIntensity:{value:n},gridSize:{value:l},gridThickness:{value:u},fadeDistance:{value:d},vignetteStrength:{value:f},glowIntensity:{value:p},opacity:{value:m},gridRotation:{value:h},mouseInteraction:{value:g},mousePosition:{value:[.5,.5]},mouseInfluence:{value:0},mouseInteractionRadius:{value:_},lightMode:{value:v}};C.current=T;let E=new o(w),D=new r(w,{vertex:`
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`,fragment:`precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
uniform bool lightMode;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    vec3 effect = color * t * finalFade * opacity;
    if (lightMode) {
        float peak = max(effect.r, max(effect.g, effect.b));
        vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));
        gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);
    } else {
        gl_FragColor = vec4(effect, alpha);
    }
}`,uniforms:T}),O=new a(w,{geometry:E,program:D}),k=()=>{let{clientWidth:e,clientHeight:t}=y.current;c.setSize(e,t),T.iResolution.value=[e,t]},A=e=>{if(!g||!y.current)return;let t=y.current.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;x.current={x:n,y:r}},j=()=>{g&&(S.current=1)},M=()=>{g&&(S.current=0)};window.addEventListener(`resize`,k),g&&(y.current.addEventListener(`mousemove`,A),y.current.addEventListener(`mouseenter`,j),y.current.addEventListener(`mouseleave`,M)),k();let N,P=e=>{T.iTime.value=e*.001;let t=.1;b.current.x+=(x.current.x-b.current.x)*t,b.current.y+=(x.current.y-b.current.y)*t;let n=T.mouseInfluence.value,r=S.current;T.mouseInfluence.value+=(r-n)*.05,T.mousePosition.value=[b.current.x,b.current.y],c.render({scene:O}),N=requestAnimationFrame(P)};N=requestAnimationFrame(P);let F=y.current;return()=>{cancelAnimationFrame(N),window.removeEventListener(`resize`,k),g&&F&&(F.removeEventListener(`mousemove`,A),F.removeEventListener(`mouseenter`,j),F.removeEventListener(`mouseleave`,M)),c.gl.getExtension(`WEBGL_lose_context`)?.loseContext(),F?.removeChild(w.canvas)}},[]),(0,s.useEffect)(()=>{if(!C.current)return;let r=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]};C.current.enableRainbow.value=e,C.current.gridColor.value=r(t),C.current.rippleIntensity.value=n,C.current.gridSize.value=l,C.current.gridThickness.value=u,C.current.fadeDistance.value=d,C.current.vignetteStrength.value=f,C.current.glowIntensity.value=p,C.current.opacity.value=m,C.current.gridRotation.value=h,C.current.mouseInteraction.value=g,C.current.mouseInteractionRadius.value=_,C.current.lightMode.value=v},[e,t,n,l,u,d,f,p,m,h,g,_,v]),(0,c.jsx)(`div`,{ref:y,className:`ripple-grid-container`})};export{l as default};