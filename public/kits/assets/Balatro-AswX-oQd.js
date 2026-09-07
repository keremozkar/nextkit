import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n();function l(e){let t=e.replace(`#`,``),n=0,r=0,i=0,a=1;return t.length===6?(n=parseInt(t.slice(0,2),16)/255,r=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255):t.length===8&&(n=parseInt(t.slice(0,2),16)/255,r=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255,a=parseInt(t.slice(6,8),16)/255),[n,r,i,a]}var u=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,d=`
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);
    
    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;
    
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;
    
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
    
    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;
    
    vec2 uv2 = vec2(uv.x + uv.y);
    
    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }
    
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
    
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;function f({spinRotation:e=-2,spinSpeed:t=7,offset:n=[0,0],color1:f=`#DE443B`,color2:p=`#006BB4`,color3:m=`#162325`,contrast:h=3.5,lighting:g=.4,spinAmount:_=.25,pixelFilter:v=745,spinEase:y=1,isRotate:b=!1,mouseInteraction:x=!0}){let S=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!S.current)return;let s=S.current,c=new i,C=c.gl;C.clearColor(0,0,0,1);let w;function T(){c.setSize(s.offsetWidth,s.offsetHeight),w&&(w.uniforms.iResolution.value=[C.canvas.width,C.canvas.height,C.canvas.width/C.canvas.height])}window.addEventListener(`resize`,T),T();let E=new o(C);w=new r(C,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:[C.canvas.width,C.canvas.height,C.canvas.width/C.canvas.height]},uSpinRotation:{value:e},uSpinSpeed:{value:t},uOffset:{value:n},uColor1:{value:l(f)},uColor2:{value:l(p)},uColor3:{value:l(m)},uContrast:{value:h},uLighting:{value:g},uSpinAmount:{value:_},uPixelFilter:{value:v},uSpinEase:{value:y},uIsRotate:{value:b},uMouse:{value:[.5,.5]}}});let D=new a(C,{geometry:E,program:w}),O;function k(e){O=requestAnimationFrame(k),w.uniforms.iTime.value=e*.001,c.render({scene:D})}O=requestAnimationFrame(k),s.appendChild(C.canvas);function A(e){if(!x)return;let t=s.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;w.uniforms.uMouse.value=[n,r]}return s.addEventListener(`mousemove`,A),()=>{cancelAnimationFrame(O),window.removeEventListener(`resize`,T),s.removeEventListener(`mousemove`,A),s.removeChild(C.canvas),C.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,f,p,m,h,g,_,v,y,b,x,S]),(0,c.jsx)(`div`,{ref:S,className:`balatro-container`})}export{f as default};