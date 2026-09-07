import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,n as a,t as o}from"./Mesh-D48iXpEj.js";import{t as s}from"./Camera-BKG7dRhe.js";import{t as c}from"./Texture-C-0j2d6N.js";import{t as l}from"./Plane-BIq2Pkjc.js";var u=e(t(),1),d=n(),f=`
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`,p=`
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;function m(e,{include:t,exclude:n}={}){let r=e=>{let t=new Set;do for(let n of Reflect.ownKeys(e))t.add([e,n]);while((e=Reflect.getPrototypeOf(e))&&e!==Object.prototype);return t},i=e=>{let r=t=>typeof t==`string`?e===t:t.test(e);return t?t.some(r):!n||!n.some(r)};for(let[t,n]of r(e.constructor.prototype)){if(n===`constructor`||!i(n))continue;let r=Reflect.getOwnPropertyDescriptor(t,n);r&&typeof r.value==`function`&&(e[n]=e[n].bind(e))}return e}function h(e,t,n){return e+(t-e)*n}function g(e,t,n,r,i,a=!1){let o=(e-t)/(n-t)*(i-r)+r;return a?Math.round(o):o}var _=class{constructor({gl:e,geometry:t,scene:n,screen:r,viewport:i,image:a,length:o,index:s,planeWidth:c,planeHeight:l,distortion:u}){this.extra=0,this.gl=e,this.geometry=t,this.scene=n,this.screen=r,this.viewport=i,this.image=a,this.length=o,this.index=s,this.planeWidth=c,this.planeHeight=l,this.distortion=u,this.createShader(),this.createMesh(),this.onResize()}createShader(){let e=new c(this.gl,{generateMipmaps:!1});this.program=new r(this.gl,{depthTest:!1,depthWrite:!1,fragment:p,vertex:f,uniforms:{tMap:{value:e},uPosition:{value:0},uPlaneSize:{value:[0,0]},uImageSize:{value:[0,0]},uSpeed:{value:0},rotationAxis:{value:[0,1,0]},distortionAxis:{value:[1,1,0]},uDistortion:{value:this.distortion},uViewportSize:{value:[this.viewport.width,this.viewport.height]},uTime:{value:0}},cullFace:!1});let t=new Image;t.crossOrigin=`anonymous`,t.src=this.image,t.onload=()=>{e.image=t,this.program.uniforms.uImageSize.value=[t.naturalWidth,t.naturalHeight]}}createMesh(){this.plane=new o(this.gl,{geometry:this.geometry,program:this.program}),this.plane.setParent(this.scene)}setScale(){this.plane.scale.x=this.viewport.width*this.planeWidth/this.screen.width,this.plane.scale.y=this.viewport.height*this.planeHeight/this.screen.height,this.plane.position.x=0,this.plane.program.uniforms.uPlaneSize.value=[this.plane.scale.x,this.plane.scale.y]}onResize({screen:e,viewport:t}={}){e&&(this.screen=e),t&&(this.viewport=t,this.plane.program.uniforms.uViewportSize.value=[this.viewport.width,this.viewport.height]),this.setScale(),this.padding=5,this.height=this.plane.scale.y+this.padding,this.heightTotal=this.height*this.length,this.y=-this.heightTotal/2+(this.index+.5)*this.height}update(e){this.plane.position.y=this.y-e.current-this.extra;let t=g(this.plane.position.y,-this.viewport.height,this.viewport.height,5,15);this.program.uniforms.uPosition.value=t,this.program.uniforms.uTime.value+=.04,this.program.uniforms.uSpeed.value=e.current;let n=this.plane.scale.y,r=this.viewport.height,i=this.plane.position.y+n/2,a=this.plane.position.y-n/2;i<-r/2?this.extra-=this.heightTotal:a>r/2&&(this.extra+=this.heightTotal)}},v=class{constructor({container:e,canvas:t,items:n,planeWidth:r,planeHeight:i,distortion:a,scrollEase:o,cameraFov:s,cameraZ:c}){this.container=e,this.canvas=t,this.items=n,this.planeWidth=r,this.planeHeight=i,this.distortion=a,this.scroll={ease:o,current:0,target:0,last:0},this.cameraFov=s,this.cameraZ=c,m(this),this.createRenderer(),this.createCamera(),this.createScene(),this.onResize(),this.createGeometry(),this.createMedias(),this.update(),this.addEventListeners(),this.createPreloader()}createRenderer(){this.renderer=new i({canvas:this.canvas,alpha:!0,antialias:!0,dpr:Math.min(window.devicePixelRatio,2)}),this.gl=this.renderer.gl}createCamera(){this.camera=new s(this.gl),this.camera.fov=this.cameraFov,this.camera.position.z=this.cameraZ}createScene(){this.scene=new a}createGeometry(){this.planeGeometry=new l(this.gl,{heightSegments:1,widthSegments:100})}createMedias(){this.medias=this.items.map((e,t)=>new _({gl:this.gl,geometry:this.planeGeometry,scene:this.scene,screen:this.screen,viewport:this.viewport,image:e,length:this.items.length,index:t,planeWidth:this.planeWidth,planeHeight:this.planeHeight,distortion:this.distortion}))}createPreloader(){this.loaded=0,this.items.length&&this.items.forEach(e=>{let t=new Image;t.crossOrigin=`anonymous`,t.src=e,t.onload=()=>{this.loaded+=1,this.loaded===this.items.length&&(document.documentElement.classList.remove(`loading`),document.documentElement.classList.add(`loaded`))}})}onResize(){let e=this.container.getBoundingClientRect();this.screen={width:e.width,height:e.height},this.renderer.setSize(this.screen.width,this.screen.height),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height});let t=this.camera.fov*Math.PI/180,n=2*Math.tan(t/2)*this.camera.position.z,r=n*this.camera.aspect;this.viewport={height:n,width:r},this.medias&&this.medias.forEach(e=>e.onResize({screen:this.screen,viewport:this.viewport}))}onTouchDown(e){this.isDown=!0,this.scroll.position=this.scroll.current,this.start=e.touches?e.touches[0].clientY:e.clientY}onTouchMove(e){if(!this.isDown)return;let t=e.touches?e.touches[0].clientY:e.clientY,n=(this.start-t)*.1;this.scroll.target=this.scroll.position+n}onTouchUp(){this.isDown=!1}onWheel(e){let t=e.deltaY;this.scroll.target+=t*.005}update(){this.scroll.current=h(this.scroll.current,this.scroll.target,this.scroll.ease),this.medias&&this.medias.forEach(e=>e.update(this.scroll)),this.renderer.render({scene:this.scene,camera:this.camera}),this.scroll.last=this.scroll.current,requestAnimationFrame(this.update)}addEventListeners(){window.addEventListener(`resize`,this.onResize),window.addEventListener(`wheel`,this.onWheel),window.addEventListener(`mousewheel`,this.onWheel),window.addEventListener(`mousedown`,this.onTouchDown),window.addEventListener(`mousemove`,this.onTouchMove),window.addEventListener(`mouseup`,this.onTouchUp),window.addEventListener(`touchstart`,this.onTouchDown),window.addEventListener(`touchmove`,this.onTouchMove),window.addEventListener(`touchend`,this.onTouchUp)}destroy(){window.removeEventListener(`resize`,this.onResize),window.removeEventListener(`wheel`,this.onWheel),window.removeEventListener(`mousewheel`,this.onWheel),window.removeEventListener(`mousedown`,this.onTouchDown),window.removeEventListener(`mousemove`,this.onTouchMove),window.removeEventListener(`mouseup`,this.onTouchUp),window.removeEventListener(`touchstart`,this.onTouchDown),window.removeEventListener(`touchmove`,this.onTouchMove),window.removeEventListener(`touchend`,this.onTouchUp)}};function y({items:e=[],planeWidth:t=320,planeHeight:n=320,distortion:r=3,scrollEase:i=.01,cameraFov:a=45,cameraZ:o=20,className:s,...c}){let l=(0,u.useRef)(null),f=(0,u.useRef)(null),p=(0,u.useRef)(null);return(0,u.useEffect)(()=>{if(l.current)return p.current=new v({container:l.current,canvas:f.current,items:e,planeWidth:t,planeHeight:n,distortion:r,scrollEase:i,cameraFov:a,cameraZ:o}),()=>{p.current&&=(p.current.destroy(),null)}},[e,t,n,r,i,a,o]),(0,u.useEffect)(()=>{if(!f.current)return;let e=f.current,t=e=>{e.preventDefault(),p.current&&p.current.onWheel(e)},n=e=>{e.preventDefault()};return e.addEventListener(`wheel`,t,{passive:!1}),e.addEventListener(`touchmove`,n,{passive:!1}),()=>{e.removeEventListener(`wheel`,t),e.removeEventListener(`touchmove`,n)}},[]),(0,d.jsx)(`div`,{ref:l,className:`posters-container ${s}`,...c,children:(0,d.jsx)(`canvas`,{ref:f,className:`posters-canvas`})})}export{y as default};