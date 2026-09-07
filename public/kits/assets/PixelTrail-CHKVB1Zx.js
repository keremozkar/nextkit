import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{At as r,S as i,b as a,ln as o,yn as s}from"./three.module-Da49k5ub.js";import{l as c,s as l,t as u}from"./react-three-fiber.esm-DRgTq3Fi.js";import{t as d}from"./shaderMaterial-C9yxj4K_.js";var f=e(t());function p(e,t,n=.9){return t*n+e*(1-n)}var m=e=>Math.sqrt(1-(e-1)**2),h=class{constructor({size:e=256,maxAge:t=750,radius:n=.3,intensity:r=.2,interpolate:i=0,smoothing:a=0,minForce:o=.3,blend:s=`screen`,ease:c=m}={}){this.size=e,this.maxAge=t,this.radius=n,this.intensity=r,this.ease=c,this.interpolate=i,this.smoothing=a,this.minForce=o,this.blend=s,this.trail=[],this.force=0,this.initTexture()}initTexture(){this.canvas=document.createElement(`canvas`),this.canvas.width=this.canvas.height=this.size;let e=this.canvas.getContext(`2d`);if(e===null)throw Error(`2D not available`);this.ctx=e,this.ctx.fillStyle=`black`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.texture=new o(this.canvas),this.canvas.id=`touchTexture`,this.canvas.style.width=this.canvas.style.height=`${this.canvas.width}px`}update(e){this.clear(),this.trail.forEach((t,n)=>{t.age+=e*1e3,t.age>this.maxAge&&this.trail.splice(n,1)}),this.trail.length||(this.force=0),this.trail.forEach(e=>{this.drawTouch(e)}),this.texture.needsUpdate=!0}clear(){this.ctx.globalCompositeOperation=`source-over`,this.ctx.fillStyle=`black`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}addTouch(e){let t=this.trail[this.trail.length-1];if(t){let n=t.x-e.x,r=t.y-e.y,i=n*n+r*r,a=Math.max(this.minForce,Math.min(i*1e4,1));if(this.force=p(a,this.force,this.smoothing),this.interpolate){let e=Math.ceil(i/(this.radius*.5/this.interpolate)**2);if(e>1)for(let i=1;i<e;i++)this.trail.push({x:t.x-n/e*i,y:t.y-r/e*i,age:0,force:a})}}this.trail.push({x:e.x,y:e.y,age:0,force:this.force})}drawTouch(e){let t={x:e.x*this.size,y:(1-e.y)*this.size},n=1;n=e.age<this.maxAge*.3?this.ease(e.age/(this.maxAge*.3)):this.ease(1-(e.age-this.maxAge*.3)/(this.maxAge*.7)),n*=e.force,this.ctx.globalCompositeOperation=this.blend;let r=this.size*this.radius*n,i=this.ctx.createRadialGradient(t.x,t.y,Math.max(0,r*.25),t.x,t.y,Math.max(0,r));i.addColorStop(0,`rgba(255, 255, 255, ${this.intensity})`),i.addColorStop(1,`rgba(0, 0, 0, 0.0)`),this.ctx.beginPath(),this.ctx.fillStyle=i,this.ctx.arc(t.x,t.y,Math.max(0,r),0,Math.PI*2),this.ctx.fill()}};function g(e={}){let{size:t,maxAge:n,radius:r,intensity:i,interpolate:a,smoothing:o,minForce:s,blend:c,ease:u}=e,d=(0,f.useMemo)(()=>new h(e),[t,n,r,i,a,o,s,c,u]);l((e,t)=>void d.update(t));let p=(0,f.useCallback)(e=>d.addTouch(e.uv),[d]);return[d.texture,p]}var _=n(),v=({id:e=`goo-filter`,strength:t=10})=>(0,_.jsx)(`svg`,{className:`goo-filter-container`,children:(0,_.jsx)(`defs`,{children:(0,_.jsxs)(`filter`,{id:e,children:[(0,_.jsx)(`feGaussianBlur`,{in:`SourceGraphic`,stdDeviation:t,result:`blur`}),(0,_.jsx)(`feColorMatrix`,{in:`blur`,type:`matrix`,values:`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9`,result:`goo`}),(0,_.jsx)(`feComposite`,{in:`SourceGraphic`,in2:`goo`,operator:`atop`})]})})}),y=d({resolution:new s,mouseTrail:null,gridSize:100,pixelColor:new i(`#ffffff`)},`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `),b=e=>e;function x({gridSize:e,trailSize:t,maxAge:n,interpolate:i,easingFunction:o,pixelColor:s}){let l=c(e=>e.size),u=c(e=>e.viewport),d=(0,f.useMemo)(()=>new y,[]);(0,f.useEffect)(()=>()=>d.dispose(),[d]),(0,f.useEffect)(()=>{d.uniforms.pixelColor.value.set(s)},[d,s]);let[p,m]=g({size:512,radius:t,maxAge:n,interpolate:i||.1,ease:o||b});(0,f.useEffect)(()=>{p&&(p.minFilter=r,p.magFilter=r,p.wrapS=a,p.wrapT=a)},[p]);let h=Math.max(u.width,u.height)/2;return(0,_.jsxs)(`mesh`,{scale:[h,h,1],onPointerMove:m,children:[(0,_.jsx)(`planeGeometry`,{args:[2,2]}),(0,_.jsx)(`primitive`,{object:d,attach:`material`,gridSize:e,resolution:[l.width*u.dpr,l.height*u.dpr],mouseTrail:p})]})}function S({gridSize:e=40,trailSize:t=.1,maxAge:n=250,interpolate:r=5,easingFunction:i=b,canvasProps:a={},glProps:o={antialias:!1,powerPreference:`high-performance`,alpha:!0},gooeyFilter:s,color:c=`#ffffff`,className:l=``}){return(0,_.jsxs)(_.Fragment,{children:[s&&(0,_.jsx)(v,{id:s.id,strength:s.strength}),(0,_.jsx)(u,{...a,dpr:a.dpr??[1,1.25],gl:o,className:`pixel-canvas ${l}`,style:s&&{filter:`url(#${s.id})`},children:(0,_.jsx)(x,{gridSize:e,trailSize:t,maxAge:n,interpolate:r,easingFunction:i,pixelColor:c})})]})}export{S as default};