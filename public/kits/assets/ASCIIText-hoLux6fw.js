import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,At as i,It as a,Rt as o,bt as s,en as c,o as l,v as u}from"./three.module-Da49k5ub.js";var d=e(t(),1),f=n(),p=`
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`,m=`
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;
    
    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;Math.map=function(e,t,n,r,i){return(e-t)/(n-t)*(i-r)+r};var h=typeof window<`u`?window.devicePixelRatio:1,g=class{constructor(e,{fontSize:t,fontFamily:n,charset:r,invert:i}={}){this.renderer=e,this.domElement=document.createElement(`div`),this.domElement.style.position=`absolute`,this.domElement.style.top=`0`,this.domElement.style.left=`0`,this.domElement.style.width=`100%`,this.domElement.style.height=`100%`,this.pre=document.createElement(`pre`),this.domElement.appendChild(this.pre),this.canvas=document.createElement(`canvas`),this.context=this.canvas.getContext(`2d`),this.domElement.appendChild(this.canvas),this.deg=0,this.invert=i??!0,this.fontSize=t??12,this.fontFamily=n??`'Courier New', monospace`,this.charset=r??` .'\`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`,this.context.webkitImageSmoothingEnabled=!1,this.context.mozImageSmoothingEnabled=!1,this.context.msImageSmoothingEnabled=!1,this.context.imageSmoothingEnabled=!1,this.onMouseMove=this.onMouseMove.bind(this),document.addEventListener(`mousemove`,this.onMouseMove)}setSize(e,t){this.width=e,this.height=t,this.renderer.setSize(e,t),this.reset(),this.center={x:e/2,y:t/2},this.mouse={x:this.center.x,y:this.center.y}}reset(){this.context.font=`${this.fontSize}px ${this.fontFamily}`;let e=this.context.measureText(`A`).width;this.cols=Math.floor(this.width/(this.fontSize*(e/this.fontSize))),this.rows=Math.floor(this.height/this.fontSize),this.canvas.width=this.cols,this.canvas.height=this.rows,this.pre.style.fontFamily=this.fontFamily,this.pre.style.fontSize=`${this.fontSize}px`,this.pre.style.margin=`0`,this.pre.style.padding=`0`,this.pre.style.lineHeight=`1em`,this.pre.style.position=`absolute`,this.pre.style.left=`0`,this.pre.style.top=`0`,this.pre.style.zIndex=`9`,this.pre.style.backgroundAttachment=`fixed`,this.pre.style.mixBlendMode=`difference`}render(e,t){this.renderer.render(e,t);let n=this.canvas.width,r=this.canvas.height;this.context.clearRect(0,0,n,r),this.context&&n&&r&&this.context.drawImage(this.renderer.domElement,0,0,n,r),this.asciify(this.context,n,r),this.hue()}onMouseMove(e){this.mouse={x:e.clientX*h,y:e.clientY*h}}get dx(){return this.mouse.x-this.center.x}get dy(){return this.mouse.y-this.center.y}hue(){let e=Math.atan2(this.dy,this.dx)*180/Math.PI;this.deg+=(e-this.deg)*.075,this.domElement.style.filter=`hue-rotate(${this.deg.toFixed(1)}deg)`}asciify(e,t,n){if(t&&n){let r=e.getImageData(0,0,t,n).data,i=``;for(let e=0;e<n;e++){for(let n=0;n<t;n++){let a=n*4+e*4*t,[o,s,c,l]=[r[a],r[a+1],r[a+2],r[a+3]];if(l===0){i+=` `;continue}let u=(.3*o+.6*s+.1*c)/255,d=Math.floor((1-u)*(this.charset.length-1));this.invert&&(d=this.charset.length-d-1),i+=this.charset[d]}i+=`
`}this.pre.innerHTML=i}}dispose(){document.removeEventListener(`mousemove`,this.onMouseMove)}},_=class{constructor(e,{fontSize:t=200,fontFamily:n=`Arial`,color:r=`#fdf9f3`}={}){this.canvas=document.createElement(`canvas`),this.context=this.canvas.getContext(`2d`),this.txt=e,this.fontSize=t,this.fontFamily=n,this.color=r,this.font=`600 ${this.fontSize}px ${this.fontFamily}`}resize(){this.context.font=this.font;let e=this.context.measureText(this.txt),t=Math.ceil(e.width)+20,n=Math.ceil(e.actualBoundingBoxAscent+e.actualBoundingBoxDescent)+20;this.canvas.width=t,this.canvas.height=n}render(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=this.color,this.context.font=this.font;let e=10+this.context.measureText(this.txt).actualBoundingBoxAscent;this.context.fillText(this.txt,10,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}get texture(){return this.canvas}},v=class{constructor({text:e,asciiFontSize:t,textFontSize:n,textColor:i,planeBaseHeight:o,enableWaves:s},c,l,u){this.textString=e,this.asciiFontSize=t,this.textFontSize=n,this.textColor=i,this.planeBaseHeight=o,this.container=c,this.width=l,this.height=u,this.enableWaves=s,this.camera=new a(45,this.width/this.height,1,1e3),this.camera.position.z=30,this.scene=new r,this.mouse={x:this.width/2,y:this.height/2},this.onMouseMove=this.onMouseMove.bind(this)}async init(){try{await document.fonts.load(`600 200px "IBM Plex Mono"`),await document.fonts.load(`500 12px "IBM Plex Mono"`)}catch{}await document.fonts.ready,this.setMesh(),this.setRenderer()}setMesh(){this.textCanvas=new _(this.textString,{fontSize:this.textFontSize,fontFamily:`IBM Plex Mono`,color:this.textColor}),this.textCanvas.resize(),this.textCanvas.render(),this.texture=new u(this.textCanvas.texture),this.texture.minFilter=i;let e=this.textCanvas.width/this.textCanvas.height,t=this.planeBaseHeight,n=t*e,r=t;this.geometry=new o(n,r,36,36),this.material=new c({vertexShader:p,fragmentShader:m,transparent:!0,uniforms:{uTime:{value:0},mouse:{value:1},uTexture:{value:this.texture},uEnableWaves:{value:+!!this.enableWaves}}}),this.mesh=new s(this.geometry,this.material),this.scene.add(this.mesh)}setRenderer(){this.renderer=new l({antialias:!1,alpha:!0}),this.renderer.setPixelRatio(1),this.renderer.setClearColor(0,0),this.filter=new g(this.renderer,{fontFamily:`IBM Plex Mono`,fontSize:this.asciiFontSize,invert:!0}),this.container.appendChild(this.filter.domElement),this.setSize(this.width,this.height),this.container.addEventListener(`mousemove`,this.onMouseMove),this.container.addEventListener(`touchmove`,this.onMouseMove)}setSize(e,t){this.width=e,this.height=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.filter.setSize(e,t),this.center={x:e/2,y:t/2}}load(){this.animate()}onMouseMove(e){let t=e.touches?e.touches[0]:e,n=this.container.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;this.mouse={x:r,y:i}}animate(){let e=()=>{this.animationFrameId=requestAnimationFrame(e),this.render()};e()}render(){let e=new Date().getTime()*.001;this.textCanvas.render(),this.texture.needsUpdate=!0,this.mesh.material.uniforms.uTime.value=Math.sin(e),this.updateRotation(),this.filter.render(this.scene,this.camera)}updateRotation(){let e=Math.map(this.mouse.y,0,this.height,.5,-.5),t=Math.map(this.mouse.x,0,this.width,-.5,.5);this.mesh.rotation.x+=(e-this.mesh.rotation.x)*.05,this.mesh.rotation.y+=(t-this.mesh.rotation.y)*.05}clear(){this.scene.traverse(e=>{e.isMesh&&typeof e.material==`object`&&e.material!==null&&(Object.keys(e.material).forEach(t=>{let n=e.material[t];typeof n==`object`&&n&&typeof n.dispose==`function`&&n.dispose()}),e.material.dispose(),e.geometry.dispose())}),this.scene.clear()}dispose(){cancelAnimationFrame(this.animationFrameId),this.filter&&(this.filter.dispose(),this.filter.domElement.parentNode&&this.container.removeChild(this.filter.domElement)),this.container.removeEventListener(`mousemove`,this.onMouseMove),this.container.removeEventListener(`touchmove`,this.onMouseMove),this.clear(),this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss())}};function y({text:e=`David!`,asciiFontSize:t=8,textFontSize:n=200,textColor:r=`#fdf9f3`,planeBaseHeight:i=8,enableWaves:a=!0}){let o=(0,d.useRef)(null),s=(0,d.useRef)(null);return(0,d.useEffect)(()=>{if(!o.current)return;let c=!1,l=null,u=null,d=async(o,s,c)=>{let l=new v({text:e,asciiFontSize:t,textFontSize:n,textColor:r,planeBaseHeight:i,enableWaves:a},o,s,c);return await l.init(),l};return(async()=>{let{width:e,height:t}=o.current.getBoundingClientRect();if(e===0||t===0){l=new IntersectionObserver(async([e])=>{if(!c&&e.isIntersecting&&e.boundingClientRect.width>0&&e.boundingClientRect.height>0){let{width:t,height:n}=e.boundingClientRect;l.disconnect(),l=null,c||(s.current=await d(o.current,t,n),!c&&s.current&&s.current.load())}},{threshold:.1}),l.observe(o.current);return}s.current=await d(o.current,e,t),!c&&s.current&&(s.current.load(),u=new ResizeObserver(e=>{if(!e[0]||!s.current)return;let{width:t,height:n}=e[0].contentRect;t>0&&n>0&&s.current.setSize(t,n)}),u.observe(o.current))})(),()=>{c=!0,l&&l.disconnect(),u&&u.disconnect(),s.current&&=(s.current.dispose(),null)}},[e,t,n,r,i,a]),(0,f.jsx)(`div`,{ref:o,className:`ascii-text-container`,style:{position:`absolute`,width:`100%`,height:`100%`},children:(0,f.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');

        .ascii-text-container canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          image-rendering: optimizeSpeed;
          image-rendering: -moz-crisp-edges;
          image-rendering: -o-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }

        .ascii-text-container pre {
          margin: 0;
          user-select: none;
          padding: 0;
          line-height: 1em;
          text-align: left;
          position: absolute;
          left: 0;
          top: 0;
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          z-index: 9;
          mix-blend-mode: difference;
        }
      `})})}export{y as default};