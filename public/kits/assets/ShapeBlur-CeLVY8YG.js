import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{$t as r,Ft as i,Rt as a,_t as o,bt as s,en as c,o as l,yn as u}from"./three.module-Da49k5ub.js";var d=e(t(),1),f=n(),p=`
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`,m=`
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef VAR
#define VAR 0
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}
float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float strokeAA(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float size = u_shapeSize;
    float roundness = u_roundness;
    float borderSize = u_borderSize;
    float circleSize = u_circleSize;
    float circleEdge = u_circleEdge;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 color = vec3(1.0);
    float alpha = sdf;
    gl_FragColor = vec4(color.rgb, alpha);
}
`,h=({className:e=``,variation:t=0,pixelRatioProp:n=2,shapeSize:h=1.2,roundness:g=.4,borderSize:_=.05,circleSize:v=.3,circleEdge:y=.5})=>{let b=(0,d.useRef)(),x=(0,d.useRef)();return(0,d.useEffect)(()=>{let e=b.current;if(!e)return;let d=!0,f,S=0,C=0,w=new u,T=new u,E=new u,D=1,O=1,k=new r,A=new i;A.position.z=1;let j=new l({alpha:!0});j.setClearColor(0,0),e.appendChild(j.domElement);let M=new a(1,1),N=new c({vertexShader:p,fragmentShader:m,uniforms:{u_mouse:{value:T},u_resolution:{value:E},u_pixelRatio:{value:n},u_shapeSize:{value:h},u_roundness:{value:g},u_borderSize:{value:_},u_circleSize:{value:v},u_circleEdge:{value:y}},defines:{VAR:t},transparent:!0});x.current=N;let P=new s(M,N);k.add(P);let F=t=>{let n=e.getBoundingClientRect();w.set(t.clientX-n.left,t.clientY-n.top)};document.addEventListener(`mousemove`,F),document.addEventListener(`pointermove`,F);let I=()=>{if(!d)return;D=e.clientWidth,O=e.clientHeight;let t=Math.min(window.devicePixelRatio,2);j.setSize(D,O),j.setPixelRatio(t),A.left=-D/2,A.right=D/2,A.top=O/2,A.bottom=-O/2,A.updateProjectionMatrix(),P.scale.set(D,O,1),E.set(D,O).multiplyScalar(t),N.uniforms.u_pixelRatio.value=t};I(),window.addEventListener(`resize`,I);let L=new ResizeObserver(()=>{d&&I()});L.observe(e);let R=()=>{if(!d)return;S=performance.now()*.001;let e=S-C;C=S,[`x`,`y`].forEach(t=>{T[t]=o.damp(T[t],w[t],8,e)}),j.render(k,A),f=requestAnimationFrame(R)};return R(),()=>{d=!1,cancelAnimationFrame(f),window.removeEventListener(`resize`,I),L.disconnect(),document.removeEventListener(`mousemove`,F),document.removeEventListener(`pointermove`,F),e.contains(j.domElement)&&e.removeChild(j.domElement),M.dispose(),N.dispose(),x.current=null,j.dispose(),j.forceContextLoss()}},[t]),(0,d.useEffect)(()=>{let e=x.current;e&&(e.uniforms.u_pixelRatio.value=n,e.uniforms.u_shapeSize.value=h,e.uniforms.u_roundness.value=g,e.uniforms.u_borderSize.value=_,e.uniforms.u_circleSize.value=v,e.uniforms.u_circleEdge.value=y)},[n,h,g,_,v,y]),(0,f.jsx)(`div`,{className:e,ref:b,style:{width:`100%`,height:`100%`}})};export{h as default};