"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6384],{3779:(e,t,r)=>{r.d(t,{A:()=>n});function n(){return function(e){function t(e,t){for(var r,n,a,i,o,s=/([MLQCZ])([^MLQCZ]*)/g;r=s.exec(e);){var l=r[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(e){return parseFloat(e)});switch(r[1]){case"M":i=n=l[0],o=a=l[1];break;case"L":(l[0]!==i||l[1]!==o)&&t("L",i,o,i=l[0],o=l[1]);break;case"Q":t("Q",i,o,i=l[2],o=l[3],l[0],l[1]);break;case"C":t("C",i,o,i=l[4],o=l[5],l[0],l[1],l[2],l[3]);break;case"Z":(i!==n||o!==a)&&t("L",i,o,n,a)}}}function r(e,r,n){void 0===n&&(n=16);var a={x:0,y:0};t(e,function(e,t,i,o,s,l,c,f,u){switch(e){case"L":r(t,i,o,s);break;case"Q":for(var v=t,d=i,m=1;m<n;m++)!function(e,t,r,n,a,i,o,s){var l=1-o;s.x=l*l*e+2*l*o*r+o*o*a,s.y=l*l*t+2*l*o*n+o*o*i}(t,i,l,c,o,s,m/(n-1),a),r(v,d,a.x,a.y),v=a.x,d=a.y;break;case"C":for(var h=t,p=i,g=1;g<n;g++)!function(e,t,r,n,a,i,o,s,l,c){var f=1-l;c.x=f*f*f*e+3*f*f*l*r+3*f*l*l*a+l*l*l*o,c.y=f*f*f*t+3*f*f*l*n+3*f*l*l*i+l*l*l*s}(t,i,l,c,f,u,o,s,g/(n-1),a),r(h,p,a.x,a.y),h=a.x,p=a.y}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function o(e,t){var r=e.getContext?e.getContext("webgl",i):e,n=a.get(r);if(!n){var o="undefined"!=typeof WebGL2RenderingContext&&r instanceof WebGL2RenderingContext,s={},l={},c={},f=-1,u=[];function v(e){var t=s[e];if(!t&&!(t=s[e]=r.getExtension(e)))throw Error(e+" not supported");return t}function d(e,t){var n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}function m(){s={},l={},c={},f=-1,u.length=0}r.canvas.addEventListener("webglcontextlost",function(e){m(),e.preventDefault()},!1),a.set(r,n={gl:r,isWebGL2:o,getExtension:v,withProgram:function(e,t,n,a){if(!l[e]){var i={},s={},c=r.createProgram();r.attachShader(c,d(t,r.VERTEX_SHADER)),r.attachShader(c,d(n,r.FRAGMENT_SHADER)),r.linkProgram(c),l[e]={program:c,transaction:function(e){r.useProgram(c),e({setUniform:function(e,t){for(var n=[],a=arguments.length-2;a-- >0;)n[a]=arguments[a+2];var i=s[t]||(s[t]=r.getUniformLocation(c,t));r["uniform"+e].apply(r,[i].concat(n))},setAttribute:function(e,t,n,a,s){var l=i[e];l||(l=i[e]={buf:r.createBuffer(),loc:r.getAttribLocation(c,e),data:null}),r.bindBuffer(r.ARRAY_BUFFER,l.buf),r.vertexAttribPointer(l.loc,t,r.FLOAT,!1,0,0),r.enableVertexAttribArray(l.loc),o?r.vertexAttribDivisor(l.loc,a):v("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(l.loc,a),s!==l.data&&(r.bufferData(r.ARRAY_BUFFER,s,n),l.data=s)}})}}}l[e].transaction(a)},withTexture:function(e,t){f++;try{r.activeTexture(r.TEXTURE0+f);var n=c[e];n||(n=c[e]=r.createTexture(),r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST)),r.bindTexture(r.TEXTURE_2D,n),t(n,f)}finally{f--}},withTextureFramebuffer:function(e,t,n){var a=r.createFramebuffer();u.push(a),r.bindFramebuffer(r.FRAMEBUFFER,a),r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);try{n(a)}finally{r.deleteFramebuffer(a),r.bindFramebuffer(r.FRAMEBUFFER,u[--u.length-1]||null)}},handleContextLoss:m})}t(n)}function s(e,t,r,a,i,s,l,c){void 0===l&&(l=15),void 0===c&&(c=null),o(e,function(e){var o=e.gl,f=e.withProgram;(0,e.withTexture)("copy",function(e,u){o.texImage2D(o.TEXTURE_2D,0,o.RGBA,i,s,0,o.RGBA,o.UNSIGNED_BYTE,t),f("copy",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",function(e){var t=e.setUniform;(0,e.setAttribute)("aUV",2,o.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),t("1i","image",u),o.bindFramebuffer(o.FRAMEBUFFER,c||null),o.disable(o.BLEND),o.colorMask(8&l,4&l,2&l,1&l),o.viewport(r,a,i,s),o.scissor(r,a,i,s),o.drawArrays(o.TRIANGLES,0,3)})})})}var l=Object.freeze({__proto__:null,withWebGLContext:o,renderImageData:s,resizeWebGLCanvasWithoutClearing:function(e,t,r){var n=e.width,a=e.height;o(e,function(i){var o=i.gl,l=new Uint8Array(n*a*4);o.readPixels(0,0,n,a,o.RGBA,o.UNSIGNED_BYTE,l),e.width=t,e.height=r,s(o,l,0,0,n,a)})}});function c(e,t,n,a,i,o){void 0===o&&(o=1);var s=new Uint8Array(e*t),l=a[2]-a[0],c=a[3]-a[1],f=[];r(n,function(e,t,r,n){f.push({x1:e,y1:t,x2:r,y2:n,minX:Math.min(e,r),minY:Math.min(t,n),maxX:Math.max(e,r),maxY:Math.max(t,n)})}),f.sort(function(e,t){return e.maxX-t.maxX});for(var u=0;u<e;u++)for(var v=0;v<t;v++){var d=function(e,t){for(var r=1/0,n=1/0,a=f.length;a--;){var i=f[a];if(i.maxX+n<=e)break;if(e+n>i.minX&&t-n<i.maxY&&t+n>i.minY){var o=function(e,t,r,n,a,i){var o=a-r,s=i-n,l=o*o+s*s,c=l?Math.max(0,Math.min(1,((e-r)*o+(t-n)*s)/l)):0,f=e-(r+c*o),u=t-(n+c*s);return f*f+u*u}(e,t,i.x1,i.y1,i.x2,i.y2);o<r&&(n=Math.sqrt(r=o))}}return function(e,t){for(var r=0,n=f.length;n--;){var a=f[n];if(a.maxX<=e)break;a.y1>t!=a.y2>t&&e<(a.x2-a.x1)*(t-a.y1)/(a.y2-a.y1)+a.x1&&(r+=a.y1<a.y2?1:-1)}return 0!==r}(e,t)&&(n=-n),n}(a[0]+l*(u+.5)/e,a[1]+c*(v+.5)/t),m=Math.pow(1-Math.abs(d)/i,o)/2;d<0&&(m=1-m),m=Math.max(0,Math.min(255,Math.round(255*m))),s[v*e+u]=m}return s}function f(e,t,r,n,a,i,o,s,l,c){void 0===i&&(i=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),u(e,t,r,n,a,i,o,null,s,l,c)}function u(e,t,r,n,a,i,o,l,f,u,v){void 0===i&&(i=1),void 0===f&&(f=0),void 0===u&&(u=0),void 0===v&&(v=0);for(var d=c(e,t,r,n,a,i),m=new Uint8Array(4*d.length),h=0;h<d.length;h++)m[4*h+v]=d[h];s(o,m,f,u,e,t,1<<3-v,l)}var v=Object.freeze({__proto__:null,generate:c,generateIntoCanvas:f,generateIntoFramebuffer:u}),d=new Float32Array([0,0,2,0,0,2]),m=null,h=!1,p={},g=new WeakMap;function y(e){if(!h&&!_(e))throw Error("WebGL generation not supported")}function b(e,t,r,n,a,i,s){if(void 0===i&&(i=1),void 0===s&&(s=null),!s&&!(s=m)){var l="function"==typeof OffscreenCanvas?new OffscreenCanvas(1,1):"undefined"!=typeof document?document.createElement("canvas"):null;if(!l)throw Error("OffscreenCanvas or DOM canvas not supported");s=m=l.getContext("webgl",{depth:!1})}y(s);var c=new Uint8Array(e*t*4);o(s,function(o){var s=o.gl,l=o.withTexture,f=o.withTextureFramebuffer;l("readable",function(o,l){s.texImage2D(s.TEXTURE_2D,0,s.RGBA,e,t,0,s.RGBA,s.UNSIGNED_BYTE,null),f(o,l,function(o){w(e,t,r,n,a,i,s,o,0,0,0),s.readPixels(0,0,e,t,s.RGBA,s.UNSIGNED_BYTE,c)})})});for(var f=new Uint8Array(e*t),u=0,v=0;u<c.length;u+=4)f[v++]=c[u];return f}function x(e,t,r,n,a,i,o,s,l,c){void 0===i&&(i=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),w(e,t,r,n,a,i,o,null,s,l,c)}function w(e,t,a,i,s,l,c,f,u,v,m){void 0===l&&(l=1),void 0===u&&(u=0),void 0===v&&(v=0),void 0===m&&(m=0),y(c);var h=[];r(a,function(e,t,r,n){h.push(e,t,r,n)}),h=new Float32Array(h),o(c,function(r){var a=r.gl,o=r.isWebGL2,c=r.getExtension,p=r.withProgram,g=r.withTexture,y=r.withTextureFramebuffer,b=r.handleContextLoss;if(g("rawDistances",function(r,g){(e!==r._lastWidth||t!==r._lastHeight)&&a.texImage2D(a.TEXTURE_2D,0,a.RGBA,r._lastWidth=e,r._lastHeight=t,0,a.RGBA,a.UNSIGNED_BYTE,null),p("main","precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}","precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",function(n){var f=n.setAttribute,u=n.setUniform,v=!o&&c("ANGLE_instanced_arrays"),m=!o&&c("EXT_blend_minmax");f("aUV",2,a.STATIC_DRAW,0,d),f("aLineSegment",4,a.DYNAMIC_DRAW,1,h),u.apply(void 0,["4f","uGlyphBounds"].concat(i)),u("1f","uMaxDistance",s),u("1f","uExponent",l),y(r,g,function(r){a.enable(a.BLEND),a.colorMask(!0,!0,!0,!0),a.viewport(0,0,e,t),a.scissor(0,0,e,t),a.blendFunc(a.ONE,a.ONE),a.blendEquationSeparate(a.FUNC_ADD,o?a.MAX:m.MAX_EXT),a.clear(a.COLOR_BUFFER_BIT),o?a.drawArraysInstanced(a.TRIANGLES,0,3,h.length/4):v.drawArraysInstancedANGLE(a.TRIANGLES,0,3,h.length/4)})}),p("post",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",function(r){r.setAttribute("aUV",2,a.STATIC_DRAW,0,d),r.setUniform("1i","tex",g),a.bindFramebuffer(a.FRAMEBUFFER,f),a.disable(a.BLEND),a.colorMask(0===m,1===m,2===m,3===m),a.viewport(u,v,e,t),a.scissor(u,v,e,t),a.drawArrays(a.TRIANGLES,0,3)})}),a.isContextLost())throw b(),Error("webgl context lost")})}function _(e){var t=e&&e!==m?e.canvas||e:p,r=g.get(t);if(void 0===r){h=!0;var n=null;try{var a=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],i=b(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,e);(r=i&&a.length===i.length&&i.every(function(e,t){return e===a[t]}))||(n="bad trial run results",console.info(a,i))}catch(e){r=!1,n=e.message}n&&console.warn("WebGL SDF generation not supported:",n),h=!1,g.set(t,r)}return r}var E=Object.freeze({__proto__:null,generate:b,generateIntoCanvas:x,generateIntoFramebuffer:w,isSupported:_});return e.forEachPathCommand=t,e.generate=function(e,t,r,n,a,i){void 0===a&&(a=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===i&&(i=1);try{return b.apply(E,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),c.apply(v,arguments)}},e.generateIntoCanvas=function(e,t,r,n,a,i,o,s,l,c){void 0===a&&(a=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===i&&(i=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0);try{return x.apply(E,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),f.apply(v,arguments)}},e.javascript=v,e.pathToLineSegments=r,e.webgl=E,e.webglUtils=l,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},9465:(e,t,r)=>{r.d(t,{M:()=>s});var n=r(36060),a=r(95163),i=r(12115),o=r(45181);function s({all:e,scene:t,camera:r}){let s=(0,o.C)(({gl:e})=>e),l=(0,o.C)(({camera:e})=>e),c=(0,o.C)(({scene:e})=>e);return i.useLayoutEffect(()=>{let i=[];e&&(t||c).traverse(e=>{!1===e.visible&&(i.push(e),e.visible=!0)}),s.compile(t||c,r||l);let o=new n.WebGLCubeRenderTarget(128);new a.F1T(.01,1e5,o).update(s,t||c),o.dispose(),i.forEach(e=>e.visible=!1)},[]),null}},33820:(e,t,r)=>{r.d(t,{b:()=>a});var n=r(95163);function a(e,t,r,a){var i;return(i=class extends n.BKk{constructor(i){for(let a in super({vertexShader:t,fragmentShader:r,...i}),e)this.uniforms[a]=new n.nc$(e[a]),Object.defineProperty(this,a,{get(){return this.uniforms[a].value},set(e){this.uniforms[a].value=e}});this.uniforms=n.LlO.clone(this.uniforms),null==a||a(this)}}).key=n.cj9.generateUUID(),i}},40609:(e,t,r)=>{r.d(t,{_:()=>h});var n=r(42065),a=r(12115),i=r(95163),o=r(45181),s=r(33820);let l=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function c(e,t){let r=(0,o.C)(e=>e.gl),n=(0,o.G)(i.Tap,l(e)?Object.values(e):e);return(0,a.useLayoutEffect)(()=>{null==t||t(n)},[t]),(0,a.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(n)?e=n:n instanceof i.gPd?e=[n]:l(n)&&(e=Object.values(n)),e.forEach(e=>{e instanceof i.gPd&&r.initTexture(e)})}},[r,n]),(0,a.useMemo)(()=>{if(!l(e))return n;{let t={},r=0;for(let a in e)t[a]=n[r++];return t}},[e,n])}c.preload=e=>o.G.preload(i.Tap,e),c.clear=e=>o.G.clear(i.Tap,e);let f=parseInt(i.sPf.replace(/\D+/g,"")),u=(0,s.b)({color:new i.Q1f("white"),scale:new i.I9Y(1,1),imageBounds:new i.I9Y(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${f>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),v=a.forwardRef(({children:e,color:t,segments:r=1,scale:i=1,zoom:s=1,grayscale:l=0,opacity:c=1,radius:f=0,texture:v,toneMapped:d,transparent:m,side:h,...p},g)=>{(0,o.e)({ImageMaterial:u});let y=a.useRef(null),b=(0,o.C)(e=>e.size),x=Array.isArray(i)?[i[0],i[1]]:[i,i],w=[v.image.width,v.image.height],_=Math.max(b.width,b.height);return a.useImperativeHandle(g,()=>y.current,[]),a.useLayoutEffect(()=>{y.current.geometry.parameters&&y.current.material.scale.set(x[0]*y.current.geometry.parameters.width,x[1]*y.current.geometry.parameters.height)},[x[0],x[1]]),a.createElement("mesh",(0,n.A)({ref:y,scale:Array.isArray(i)?[...i,1]:i},p),a.createElement("planeGeometry",{args:[1,1,r,r]}),a.createElement("imageMaterial",{color:t,map:v,zoom:s,grayscale:l,opacity:c,scale:x,imageBounds:w,resolution:_,radius:f,toneMapped:d,transparent:m,side:h,key:u.key}),e)}),d=a.forwardRef(({url:e,...t},r)=>{let i=c(e);return a.createElement(v,(0,n.A)({},t,{texture:i,ref:r}))}),m=a.forwardRef(({url:e,...t},r)=>a.createElement(v,(0,n.A)({},t,{ref:r}))),h=a.forwardRef((e,t)=>{if(e.url)return a.createElement(d,(0,n.A)({},e,{ref:t}));if(e.texture)return a.createElement(m,(0,n.A)({},e,{ref:t}));throw Error("<Image /> requires a url or texture")})},65317:(e,t,r)=>{r.d(t,{j:()=>o});var n=r(12115),a=r(95163),i=r(45181);function o(e,t,r){let o=(0,i.C)(e=>e.size),s=(0,i.C)(e=>e.viewport),l="number"==typeof e?e:o.width*s.dpr,c="number"==typeof t?t:o.height*s.dpr,f=("number"==typeof e?r:e)||{},{samples:u=0,depth:v,...d}=f,m=null!=v?v:f.depthBuffer,h=n.useMemo(()=>{let e=new a.nWS(l,c,{minFilter:a.k6q,magFilter:a.k6q,type:a.ix0,...d});return m&&(e.depthTexture=new a.VCu(l,c,a.RQf)),e.samples=u,e},[]);return n.useLayoutEffect(()=>{h.setSize(l,c),u&&(h.samples=u)},[u,h,l,c]),n.useEffect(()=>()=>h.dispose(),[]),h}},69883:(e,t,r)=>{r.d(t,{E:()=>l});var n=r(42065),a=r(12115),i=r(73233),o=r(45181),s=r(29753);let l=a.forwardRef(({sdfGlyphSize:e=64,anchorX:t="center",anchorY:r="middle",font:l,fontSize:c=1,children:f,characters:u,onSync:v,...d},m)=>{let h=(0,o.C)(({invalidate:e})=>e),[p]=a.useState(()=>new i.EY),[g,y]=a.useMemo(()=>{let e=[],t="";return a.Children.forEach(f,r=>{"string"==typeof r||"number"==typeof r?t+=r:e.push(r)}),[e,t]},[f]);return(0,s.DY)(()=>new Promise(e=>(0,i.PY)({font:l,characters:u},e)),["troika-text",l,u]),a.useLayoutEffect(()=>void p.sync(()=>{h(),v&&v(p)})),a.useEffect(()=>()=>p.dispose(),[p]),a.createElement("primitive",(0,n.A)({object:p,ref:m,font:l,text:y,anchorX:t,anchorY:r,fontSize:c,sdfGlyphSize:e},d),g)})},73805:(e,t,r)=>{r.d(t,{$:()=>f});var n=r(42065),a=r(95163),i=r(12115),o=r(45181),s=r(65317);let l=(0,r(33820).b)({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class c extends a.uSd{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new a.Q1f("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=r=>{var n;r.uniforms={...r.uniforms,...this.uniforms},(null!=(n=this.anisotropy)?n:0)>0&&(r.defines.USE_ANISOTROPY=""),t?r.defines.USE_SAMPLER="":r.defines.USE_TRANSMISSION="",r.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in vec3 modelScale ) {
            // Direction of refracted light.
            // n is normalized once when the sample normal is built.
            vec3 refractionVector = refract( - v, n, 1.0 / ior );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 position, const in vec3 modelScale, const in vec3 attenuationCoefficient, const in vec3 F,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelScale );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = transmittedLight.rgb;
            if ( !isinf( attenuationDistance ) ) {
              // Apply Beer's law.
              attenuatedColor *= exp( - attenuationCoefficient * length( transmissionRay ) );
            }
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),r.fragmentShader=r.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        if (material.transmission != 0.0) {
          vec3 pos = vWorldPosition;
          float runningSeed = 0.0;
          vec3 v = normalize( cameraPosition - pos );
          vec3 n = inverseTransformDirection( normal, viewMatrix );
          vec3 transmission = vec3(0.0);
          float randomCoords = rand(runningSeed++);
          float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
          vec3 distortionNormal = vec3(0.0);
          vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;

          vec3 modelScale = vec3(
            length( vec3( modelMatrix[ 0 ].xyz ) ),
            length( vec3( modelMatrix[ 1 ].xyz ) ),
            length( vec3( modelMatrix[ 2 ].xyz ) )
          );

          // Beer's-law coefficient
          vec3 attenuationCoefficient = vec3(0.0);
          if ( !isinf( material.attenuationDistance ) ) {
            attenuationCoefficient = -log( material.attenuationColor ) / material.attenuationDistance;
          }

          if (distortion > 0.0) {
            distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
          }
          for (float i = 0.0; i < ${e}.0; i ++) {
            vec3 sampleNorm;
            if (roughnessFactor > 0.0) {
              sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
            } else {
              // Smooth surfaces skip four hashes, a pow, and a normalization per sample
              sampleNorm = normalize(n + distortionNormal);
            }
            float sampleProgress = (i + randomCoords) / float(${e});
            float sampleThickness = material.thickness + thickness_smear * sampleProgress;
            // Fresnel is identical for RGB; only the refracted IOR changes.
            vec3 F = EnvironmentBRDF( sampleNorm, v, material.specularColor, material.specularF90, material.roughness );
            if (chromaticAberration == 0.0) {
              // With one IOR, a single framebuffer sample supplies all RGB channels
              transmission += getIBLVolumeRefraction(
                sampleNorm, v, material.roughness, material.diffuseColor, pos, modelScale, attenuationCoefficient, F,
                viewMatrix, projectionMatrix, material.ior, sampleThickness, material.attenuationDistance
              ).rgb;
            } else {
              float aberration = chromaticAberration * sampleProgress;
              transmission.r += getIBLVolumeRefraction(
                sampleNorm, v, material.roughness, material.diffuseColor, pos, modelScale, attenuationCoefficient, F,
                viewMatrix, projectionMatrix, material.ior, sampleThickness, material.attenuationDistance
              ).r;
              transmission.g += getIBLVolumeRefraction(
                sampleNorm, v, material.roughness, material.diffuseColor, pos, modelScale, attenuationCoefficient, F,
                viewMatrix, projectionMatrix, material.ior * (1.0 + aberration), sampleThickness, material.attenuationDistance
              ).g;
              transmission.b += getIBLVolumeRefraction(
                sampleNorm, v, material.roughness, material.diffuseColor, pos, modelScale, attenuationCoefficient, F,
                viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * aberration), sampleThickness, material.attenuationDistance
              ).b;
            }
          }
          transmission /= ${e}.0;
          totalDiffuse = mix( totalDiffuse, transmission, material.transmission );
        }
`)},Object.keys(this.uniforms).forEach(e=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t}))}}let f=i.forwardRef(({buffer:e,transmissionSampler:t=!1,backside:r=!1,side:f=a.hB5,transmission:u=1,thickness:v=0,backsideThickness:d=0,backsideEnvMapIntensity:m=1,samples:h=10,resolution:p,backsideResolution:g,background:y,anisotropy:b,anisotropicBlur:x,...w},_)=>{let E,M,k,S;(0,o.e)({MeshTransmissionMaterial:c});let T=i.useRef(null),[R]=i.useState(()=>new l),D=null!=g?g:p,A=(0,s.j)(D,D),C=(0,s.j)(p,p);return(0,o.D)(e=>{let n=T.current;if(n.uniforms.time.value=e.clock.elapsedTime,n.uniforms.buffer.value===C.texture&&!t){var i;(S=null==(i=n.__r3f)||null==(i=i.parent)?void 0:i.object)&&n.visible&&0!==n.uniforms._transmission.value&&(k=e.gl.toneMapping,E=e.scene.background,M=n.envMapIntensity,e.gl.toneMapping=a.y_p,y&&(e.scene.background=y),S.material=R,r&&(e.gl.setRenderTarget(A),e.gl.render(e.scene,e.camera),S.material=n,n.uniforms.buffer.value=A.texture,n.uniforms.thickness.value=d,n.side=a.hsX,f!==a.hsX&&(n.needsUpdate=!0),n.envMapIntensity=m),e.gl.setRenderTarget(C),e.gl.render(e.scene,e.camera),S.material=n,n.uniforms.thickness.value=v,n.side=f,r&&f!==a.hsX&&(n.needsUpdate=!0),n.uniforms.buffer.value=C.texture,n.envMapIntensity=M,e.scene.background=E,e.gl.setRenderTarget(null),e.gl.toneMapping=k)}}),i.useImperativeHandle(_,()=>T.current,[]),i.createElement("meshTransmissionMaterial",(0,n.A)({args:[h,t],ref:T},w,{buffer:e||C.texture,_transmission:u,anisotropicBlur:null!=x?x:b,transmission:t?u:0,thickness:v,side:f}))})},84613:(e,t,r)=>{r.d(t,{A:()=>n});function n(){return function(e){var t,r,n,a,i={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},o={},s={};o.L=1,s[1]="L",Object.keys(i).forEach(function(e,t){o[e]=1<<t+1,s[o[e]]=e}),Object.freeze(o);var l=o.LRI|o.RLI|o.FSI,c=o.L|o.R|o.AL,f=o.B|o.S|o.WS|o.ON|o.FSI|o.LRI|o.RLI|o.PDI,u=o.BN|o.RLE|o.LRE|o.RLO|o.LRO|o.PDF,v=o.S|o.WS|o.B|l|o.PDI|u,d=null;function m(e){return!function(){if(!d){d=new Map;var e=0;for(var t in i)if(i.hasOwnProperty(t))for(var r=i[t],n="",a=void 0,s=!1,l=0,c=0;c<=r.length+1;c+=1){var f=r[c];if(","!==f&&c!==r.length)"+"===f?(s=!0,l=e=l+parseInt(n,36),n=""):n+=f;else{s?a=e+parseInt(n,36):(l=e=l+parseInt(n,36),a=e),s=!1,n="",l=a;for(var u=e;u<a+1;u+=1)d.set(u,o[t])}}}}(),d.get(e.codePointAt(0))||o.L}function h(e,t){var r,n=0,a=new Map,i=t&&new Map;return e.split(",").forEach(function e(o){if(-1!==o.indexOf("+"))for(var s=+o;s--;)e(r);else{r=o;var l=o.split(">"),c=l[0],f=l[1];c=String.fromCodePoint(n+=parseInt(c,36)),f=String.fromCodePoint(n+=parseInt(f,36)),a.set(c,f),t&&i.set(f,c)}}),{map:a,reverseMap:i}}function p(){if(!t){var e=h("14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",!0),a=e.map,i=e.reverseMap;t=a,r=i,n=h("6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye",!1).map}}function g(e){return p(),t.get(e)||null}function y(e){return p(),r.get(e)||null}function b(e){return p(),n.get(e)||null}var x=o.L,w=o.R,_=o.EN,E=o.ES,M=o.ET,k=o.AN,S=o.CS,T=o.B,R=o.S,D=o.ON,A=o.BN,C=o.NSM,I=o.AL,L=o.LRO,B=o.RLO,z=o.LRE,U=o.RLE,F=o.PDF,P=o.LRI,j=o.RLI,O=o.FSI,N=o.PDI;function G(e){if(!a){var t=h("14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",!0),r=t.map;t.reverseMap.forEach(function(e,t){r.set(t,e)}),a=r}return a.get(e)||null}function q(e,t,r,n){var a=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(a-1,null==n?a-1:+n);var i=[];return t.paragraphs.forEach(function(a){var o=Math.max(r,a.start),s=Math.min(n,a.end);if(o<s){for(var l=t.levels.slice(o,s+1),c=s;c>=o&&m(e[c])&v;c--)l[c]=a.level;for(var f=a.level,u=1/0,d=0;d<l.length;d++){var h=l[d];h>f&&(f=h),h<u&&(u=1|h)}for(var p=f;p>=u;p--)for(var g=0;g<l.length;g++)if(l[g]>=p){for(var y=g;g+1<l.length&&l[g+1]>=p;)g++;g>y&&i.push([y+o,g+o])}}}),i}function $(e,t,r,n){for(var a=q(e,t,r,n),i=[],o=0;o<e.length;o++)i[o]=o;return a.forEach(function(e){for(var t=e[0],r=e[1],n=i.slice(t,r+1),a=n.length;a--;)i[r-a]=n[a]}),i}return e.closingToOpeningBracket=y,e.getBidiCharType=m,e.getBidiCharTypeName=function(e){return s[m(e)]},e.getCanonicalBracket=b,e.getEmbeddingLevels=function(e,t){for(var r=new Uint32Array(e.length),n=0;n<e.length;n++)r[n]=m(e[n]);var a=new Map;function i(e,t){var n=r[e];r[e]=t,a.set(n,a.get(n)-1),n&f&&a.set(f,a.get(f)-1),a.set(t,(a.get(t)||0)+1),t&f&&a.set(f,(a.get(f)||0)+1)}for(var o=new Uint8Array(e.length),s=new Map,d=[],h=null,p=0;p<e.length;p++)h||d.push(h={start:p,end:e.length-1,level:"rtl"===t?1:"ltr"===t?0:tA(p,!1)}),r[p]&T&&(h.end=p,h=null);for(var G=U|z|B|L|l|N|F|T,q=function(e){return e+(1&e?1:2)},$=function(e){return e+(1&e?2:1)},W=0;W<d.length;W++){var X=[{_level:(h=d[W]).level,_override:0,_isolate:0}],V=void 0,Y=0,H=0,K=0;a.clear();for(var Q=h.start;Q<=h.end;Q++){var Z=r[Q];if(V=X[X.length-1],a.set(Z,(a.get(Z)||0)+1),Z&f&&a.set(f,(a.get(f)||0)+1),Z&G)if(Z&(U|z)){o[Q]=V._level;var J=(Z===U?$:q)(V._level);!(J<=125)||Y||H?!Y&&H++:X.push({_level:J,_override:0,_isolate:0})}else if(Z&(B|L)){o[Q]=V._level;var ee=(Z===B?$:q)(V._level);!(ee<=125)||Y||H?!Y&&H++:X.push({_level:ee,_override:Z&B?w:x,_isolate:0})}else if(Z&l){Z&O&&(Z=1===tA(Q+1,!0)?j:P),o[Q]=V._level,V._override&&i(Q,V._override);var et=(Z===j?$:q)(V._level);et<=125&&0===Y&&0===H?(K++,X.push({_level:et,_override:0,_isolate:1,_isolInitIndex:Q})):Y++}else if(Z&N){if(Y>0)Y--;else if(K>0){for(H=0;!X[X.length-1]._isolate;)X.pop();var er=X[X.length-1]._isolInitIndex;null!=er&&(s.set(er,Q),s.set(Q,er)),X.pop(),K--}V=X[X.length-1],o[Q]=V._level,V._override&&i(Q,V._override)}else Z&F?(0===Y&&(H>0?H--:!V._isolate&&X.length>1&&(X.pop(),V=X[X.length-1])),o[Q]=V._level):Z&T&&(o[Q]=h.level);else o[Q]=V._level,V._override&&Z!==A&&i(Q,V._override)}for(var en=[],ea=null,ei=h.start;ei<=h.end;ei++){var eo=r[ei];if(!(eo&u)){var es=o[ei],el=eo&l,ec=eo===N;ea&&es===ea._level?(ea._end=ei,ea._endsWithIsolInit=el):en.push(ea={_start:ei,_end:ei,_level:es,_startsWithPDI:ec,_endsWithIsolInit:el})}}for(var ef=[],eu=0;eu<en.length;eu++){var ev=en[eu];if(!ev._startsWithPDI||ev._startsWithPDI&&!s.has(ev._start)){for(var ed=[ea=ev],em=void 0;ea&&ea._endsWithIsolInit&&null!=(em=s.get(ea._end));)for(var eh=eu+1;eh<en.length;eh++)if(en[eh]._start===em){ed.push(ea=en[eh]);break}for(var ep=[],eg=0;eg<ed.length;eg++)for(var ey=ed[eg],eb=ey._start;eb<=ey._end;eb++)ep.push(eb);for(var ex=o[ep[0]],ew=h.level,e_=ep[0]-1;e_>=0;e_--)if(!(r[e_]&u)){ew=o[e_];break}var eE=ep[ep.length-1],eM=o[eE],ek=h.level;if(!(r[eE]&l)){for(var eS=eE+1;eS<=h.end;eS++)if(!(r[eS]&u)){ek=o[eS];break}}ef.push({_seqIndices:ep,_sosType:Math.max(ew,ex)%2?w:x,_eosType:Math.max(ek,eM)%2?w:x})}}for(var eT=0;eT<ef.length;eT++){var eR=ef[eT],eD=eR._seqIndices,eA=eR._sosType,eC=eR._eosType,eI=1&o[eD[0]]?w:x;if(a.get(C))for(var eL=0;eL<eD.length;eL++){var eB=eD[eL];if(r[eB]&C){for(var ez=eA,eU=eL-1;eU>=0;eU--)if(!(r[eD[eU]]&u)){ez=r[eD[eU]];break}i(eB,ez&(l|N)?D:ez)}}if(a.get(_))for(var eF=0;eF<eD.length;eF++){var eP=eD[eF];if(r[eP]&_)for(var ej=eF-1;ej>=-1;ej--){var eO=-1===ej?eA:r[eD[ej]];if(eO&c){eO===I&&i(eP,k);break}}}if(a.get(I))for(var eN=0;eN<eD.length;eN++){var eG=eD[eN];r[eG]&I&&i(eG,w)}if(a.get(E)||a.get(S))for(var eq=1;eq<eD.length-1;eq++){var e$=eD[eq];if(r[e$]&(E|S)){for(var eW=0,eX=0,eV=eq-1;eV>=0&&(eW=r[eD[eV]])&u;eV--);for(var eY=eq+1;eY<eD.length&&(eX=r[eD[eY]])&u;eY++);eW===eX&&(r[e$]===E?eW===_:eW&(_|k))&&i(e$,eW)}}if(a.get(_)){for(var eH=0;eH<eD.length;eH++)if(r[eD[eH]]&_){for(var eK=eH-1;eK>=0&&r[eD[eK]]&(M|u);eK--)i(eD[eK],_);for(eH++;eH<eD.length&&r[eD[eH]]&(M|u|_);eH++)r[eD[eH]]!==_&&i(eD[eH],_)}}if(a.get(M)||a.get(E)||a.get(S))for(var eQ=0;eQ<eD.length;eQ++){var eZ=eD[eQ];if(r[eZ]&(M|E|S)){i(eZ,D);for(var eJ=eQ-1;eJ>=0&&r[eD[eJ]]&u;eJ--)i(eD[eJ],D);for(var e1=eQ+1;e1<eD.length&&r[eD[e1]]&u;e1++)i(eD[e1],D)}}if(a.get(_))for(var e0=0,e2=eA;e0<eD.length;e0++){var e3=eD[e0],e5=r[e3];e5&_?e2===x&&i(e3,x):e5&c&&(e2=e5)}if(a.get(f)){for(var e4=w|_|k,e6=e4|x,e7=[],e8=[],e9=0;e9<eD.length;e9++)if(r[eD[e9]]&f){var te=e[eD[e9]],tt=void 0;if(null!==g(te))if(e8.length<63)e8.push({char:te,seqIndex:e9});else break;else if(null!==(tt=y(te)))for(var tr=e8.length-1;tr>=0;tr--){var tn=e8[tr].char;if(tn===tt||tn===y(b(te))||g(b(tn))===te){e7.push([e8[tr].seqIndex,e9]),e8.length=tr;break}}}e7.sort(function(e,t){return e[0]-t[0]});for(var ta=0;ta<e7.length;ta++){for(var ti=e7[ta],to=ti[0],ts=ti[1],tl=!1,tc=0,tf=to+1;tf<ts;tf++){var tu=eD[tf];if(r[tu]&e6){tl=!0;var tv=r[tu]&e4?w:x;if(tv===eI){tc=tv;break}}}if(tl&&!tc){tc=eA;for(var td=to-1;td>=0;td--){var tm=eD[td];if(r[tm]&e6){var th=r[tm]&e4?w:x;tc=th!==eI?th:eI;break}}}if(tc){if(r[eD[to]]=r[eD[ts]]=tc,tc!==eI){for(var tp=to+1;tp<eD.length;tp++)if(!(r[eD[tp]]&u)){m(e[eD[tp]])&C&&(r[eD[tp]]=tc);break}}if(tc!==eI){for(var tg=ts+1;tg<eD.length;tg++)if(!(r[eD[tg]]&u)){m(e[eD[tg]])&C&&(r[eD[tg]]=tc);break}}}}for(var ty=0;ty<eD.length;ty++)if(r[eD[ty]]&f){for(var tb=ty,tx=ty,tw=eA,t_=ty-1;t_>=0;t_--)if(r[eD[t_]]&u)tb=t_;else{tw=r[eD[t_]]&e4?w:x;break}for(var tE=eC,tM=ty+1;tM<eD.length;tM++)if(r[eD[tM]]&(f|u))tx=tM;else{tE=r[eD[tM]]&e4?w:x;break}for(var tk=tb;tk<=tx;tk++)r[eD[tk]]=tw===tE?tw:eI;ty=tx}}}for(var tS=h.start;tS<=h.end;tS++){var tT=o[tS],tR=r[tS];if(1&tT?tR&(x|_|k)&&o[tS]++:tR&w?o[tS]++:tR&(k|_)&&(o[tS]+=2),tR&u&&(o[tS]=0===tS?h.level:o[tS-1]),tS===h.end||m(e[tS])&(R|T))for(var tD=tS;tD>=0&&m(e[tD])&v;tD--)o[tD]=h.level}}return{levels:o,paragraphs:d};function tA(t,n){for(var a=t;a<e.length;a++){var i=r[a];if(i&(w|I))return 1;if(i&(T|x)||n&&i===N)break;if(i&l){var o=function(t){for(var n=1,a=t+1;a<e.length;a++){var i=r[a];if(i&T)break;if(i&N){if(0==--n)return a}else i&l&&n++}return -1}(a);a=-1===o?e.length:o}}return 0}},e.getMirroredCharacter=G,e.getMirroredCharactersMap=function(e,t,r,n){var a=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(a-1,null==n?a-1:+n);for(var i=new Map,o=r;o<=n;o++)if(1&t[o]){var s=G(e[o]);null!==s&&i.set(o,s)}return i},e.getReorderSegments=q,e.getReorderedIndices=$,e.getReorderedString=function(e,t,r,n){var a=$(e,t,r,n),i=[].concat(e);return a.forEach(function(r,n){i[n]=(1&t.levels[r]?G(e[r]):null)||e[r]}),i.join("")},e.openingToClosingBracket=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},87488:(e,t,r)=>{r.d(t,{Ll:()=>c,OY:()=>d,g6:()=>f});var n=r(42065),a=r(12115),i=r(12669),o=r(45181),s=r(22770);let l=a.createContext(null);function c(){return a.useContext(l)}function f({eps:e=1e-5,enabled:t=!0,infinite:r,horizontal:n,pages:i=1,distance:c=1,damping:f=.25,maxSpeed:u=1/0,prepend:v=!1,style:d={},children:m}){let{get:h,setEvents:p,gl:g,size:y,invalidate:b,events:x}=(0,o.C)(),[w]=a.useState(()=>document.createElement("div")),[_]=a.useState(()=>document.createElement("div")),[E]=a.useState(()=>document.createElement("div")),M=g.domElement.parentNode,k=a.useRef(0),S=a.useMemo(()=>({el:w,eps:e,fill:_,fixed:E,horizontal:n,damping:f,offset:0,delta:0,scroll:k,pages:i,range(e,t,r=0){let n=e-r,a=n+t+2*r;return this.offset<n?0:this.offset>a?1:(this.offset-n)/(a-n)},curve(e,t,r=0){return Math.sin(this.range(e,t,r)*Math.PI)},visible(e,t,r=0){let n=e-r;return this.offset>=n&&this.offset<=n+t+2*r}}),[e,f,n,i]);a.useEffect(()=>{for(let e in w.style.position="absolute",w.style.width="100%",w.style.height="100%",w.style[n?"overflowX":"overflowY"]="auto",w.style[n?"overflowY":"overflowX"]="hidden",w.style.top="0px",w.style.left="0px",d)w.style[e]=d[e];E.style.position="sticky",E.style.top="0px",E.style.left="0px",E.style.width="100%",E.style.height="100%",E.style.overflow="hidden",w.appendChild(E),_.style.height=n?"100%":`${i*c*100}%`,_.style.width=n?`${i*c*100}%`:"100%",_.style.pointerEvents="none",w.appendChild(_),v?M.prepend(w):M.appendChild(w),w[n?"scrollLeft":"scrollTop"]=1;let e=x.connected||g.domElement;requestAnimationFrame(()=>null==x.connect?void 0:x.connect(w));let t=h().events.compute;return p({compute(e,t){let{left:r,top:n}=M.getBoundingClientRect(),a=e.clientX-r,i=e.clientY-n;t.pointer.set(a/t.size.width*2-1,-(2*(i/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),()=>{M.removeChild(w),p({compute:t}),null==x.connect||x.connect(e)}},[i,c,n,w,_,E,M]),a.useEffect(()=>{if(x.connected===w){let e=y[n?"width":"height"],a=w[n?"scrollWidth":"scrollHeight"],i=a-e,o=0,s=!0,l=!0,c=()=>{if(t&&!l&&(b(),k.current=(o=w[n?"scrollLeft":"scrollTop"])/i,r)){if(!s){if(o>=i){let e=1-S.offset;w[n?"scrollLeft":"scrollTop"]=1,k.current=S.offset=-e,s=!0}else if(o<=0){let e=1+S.offset;w[n?"scrollLeft":"scrollTop"]=a,k.current=S.offset=e,s=!0}}s&&setTimeout(()=>s=!1,40)}};w.addEventListener("scroll",c,{passive:!0}),requestAnimationFrame(()=>l=!1);let f=e=>w.scrollLeft+=e.deltaY/2;return n&&w.addEventListener("wheel",f,{passive:!0}),()=>{w.removeEventListener("scroll",c),n&&w.removeEventListener("wheel",f)}}},[w,x,y,r,S,b,n,t]);let T=0;return(0,o.D)((t,r)=>{T=S.offset,s.cz.damp(S,"offset",k.current,f,r,u,void 0,e),s.cz.damp(S,"delta",Math.abs(T-S.offset),f,r,u,void 0,e),S.delta>e&&b()}),a.createElement(l.Provider,{value:S},m)}let u=a.forwardRef(({children:e},t)=>{let r=a.useRef(null);a.useImperativeHandle(t,()=>r.current,[]);let n=c(),{width:i,height:s}=(0,o.C)(e=>e.viewport);return(0,o.D)(()=>{r.current.position.x=n.horizontal?-i*(n.pages-1)*n.offset:0,r.current.position.y=n.horizontal?0:s*(n.pages-1)*n.offset}),a.createElement("group",{ref:r},e)}),v=a.forwardRef(({children:e,style:t,...r},s)=>{let f=c(),u=a.useRef(null);a.useImperativeHandle(s,()=>u.current,[]);let{width:v,height:d}=(0,o.C)(e=>e.size),m=a.useContext(o.q),h=a.useMemo(()=>i.createRoot(f.fixed),[f.fixed]);return(0,o.D)(()=>{f.delta>f.eps&&(u.current.style.transform=`translate3d(${f.horizontal?-v*(f.pages-1)*f.offset:0}px,${f.horizontal?0:-(d*(f.pages-1)*f.offset)}px,0)`)}),h.render(a.createElement("div",(0,n.A)({ref:u,style:{...t,position:"absolute",top:0,left:0,willChange:"transform"}},r),a.createElement(l.Provider,{value:f},a.createElement(o.q.Provider,{value:m},e)))),null}),d=a.forwardRef(({html:e,...t},r)=>a.createElement(e?v:u,(0,n.A)({ref:r},t)))},93979:(e,t,r)=>{r.d(t,{Do:()=>i,Fh:()=>d});var n=r(36060),a=r(95163);let i=/\bvoid\s+main\s*\(\s*\)\s*{/g;function o(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let r=n.ShaderChunk[t];return r?o(r):e})}let s=[];for(let e=0;e<256;e++)s[e]=(e<16?"0":"")+e.toString(16);let l=Object.assign||function(){let e=arguments[0];for(let t=1,r=arguments.length;t<r;t++){let r=arguments[t];if(r)for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},c=Date.now(),f=new WeakMap,u=new Map,v=1e10;function d(e,t){let r=function(e){let t=JSON.stringify(e,h),r=g.get(t);return null==r&&g.set(t,r=++p),r}(t),n=f.get(e);if(n||f.set(e,n=Object.create(null)),n[r])return new n[r];let i=`_onBeforeCompile${r}`,y=function(n,a){e.onBeforeCompile.call(this,n,a);let s=this.customProgramCacheKey()+"|"+n.vertexShader+"|"+n.fragmentShader,f=u[s];if(!f){let e=function(e,{vertexShader:t,fragmentShader:r},n,a){let{vertexDefs:i,vertexMainIntro:s,vertexMainOutro:l,vertexTransform:c,fragmentDefs:f,fragmentMainIntro:u,fragmentMainOutro:v,fragmentColorTransform:d,customRewriter:h,timeUniform:p}=n;if(i=i||"",s=s||"",l=l||"",f=f||"",u=u||"",v=v||"",(c||h)&&(t=o(t)),(d||h)&&(r=o(r=r.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),h){let e=h({vertexShader:t,fragmentShader:r});t=e.vertexShader,r=e.fragmentShader}if(d){let e=[];r=r.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),v=`${d}
${e.join("\n")}
${v}`}if(p){let e=`
uniform float ${p};
`;i=e+i,f=e+f}return c&&(t=`vec3 troika_position_${a};
vec3 troika_normal_${a};
vec2 troika_uv_${a};
${t}
`,i=`${i}
void troikaVertexTransform${a}() {
  vec3 position = troika_position_${a};
  vec3 normal = troika_normal_${a};
  vec2 uv = troika_uv_${a};
  ${c}
  troika_position_${a} = position;
  troika_normal_${a} = normal;
  troika_uv_${a} = uv;
}
`,s=`
troika_position_${a} = vec3(position);
troika_normal_${a} = vec3(normal);
troika_uv_${a} = vec2(uv);
troikaVertexTransform${a}();
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(e,t,r,n)=>/\battribute\s+vec[23]\s+$/.test(n.substr(0,r))?t:`troika_${t}_${a}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${a}`))),{vertexShader:t=m(t,a,i,s,l),fragmentShader:r=m(r,a,f,u,v)}}(this,n,t,r);f=u[s]=e}n.vertexShader=f.vertexShader,n.fragmentShader=f.fragmentShader,l(n.uniforms,this.uniforms),t.timeUniform&&(n.uniforms[t.timeUniform]={get value(){return Date.now()-c}}),this[i]&&this[i](n)},b=function(){return x(t.chained?e:e.clone())},x=function(n){let a=Object.create(n,w);return Object.defineProperty(a,"baseMaterial",{value:e}),Object.defineProperty(a,"id",{value:v++}),a.uuid=function(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0,n=0xffffffff*Math.random()|0;return(s[255&e]+s[e>>8&255]+s[e>>16&255]+s[e>>24&255]+"-"+s[255&t]+s[t>>8&255]+"-"+s[t>>16&15|64]+s[t>>24&255]+"-"+s[63&r|128]+s[r>>8&255]+"-"+s[r>>16&255]+s[r>>24&255]+s[255&n]+s[n>>8&255]+s[n>>16&255]+s[n>>24&255]).toUpperCase()}(),a.uniforms=l({},n.uniforms,t.uniforms),a.defines=l({},n.defines,t.defines),a.defines[`TROIKA_DERIVED_MATERIAL_${r}`]="",a.extensions=l({},n.extensions,t.extensions),a._listeners=void 0,a},w={constructor:{value:b},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:t=>{e.type=t}},isDerivedFrom:{writable:!0,configurable:!0,value:function(e){let t=this.baseMaterial;return e===t||t.isDerivedMaterial&&t.isDerivedFrom(e)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+r}},onBeforeCompile:{get:()=>y,set(e){this[i]=e}},copy:{writable:!0,configurable:!0,value:function(t){return e.copy.call(this,t),e.isShaderMaterial||e.isDerivedMaterial||(l(this.extensions,t.extensions),l(this.defines,t.defines),l(this.uniforms,a.LlO.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return x(new e.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let r=this._depthMaterial;return r||((r=this._depthMaterial=d(e.isDerivedMaterial?e.getDepthMaterial():new a.CSG({depthPacking:a.N5j}),t)).defines.IS_DEPTH_MATERIAL="",r.uniforms=this.uniforms),r}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let r=this._distanceMaterial;return r||((r=this._distanceMaterial=d(e.isDerivedMaterial?e.getDistanceMaterial():new a.aVO,t)).defines.IS_DISTANCE_MATERIAL="",r.uniforms=this.uniforms),r}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:t,_distanceMaterial:r}=this;t&&t.dispose(),r&&r.dispose(),e.dispose.call(this)}}};return n[r]=b,new b}function m(e,t,r,n,a){return(n||a||r)&&(e=e.replace(i,`
${r}
void troikaOrigMain${t}() {`)+`
void main() {
  ${n}
  troikaOrigMain${t}();
  ${a}
}`),e}function h(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let p=0,g=new Map,y=`
uniform vec3 pointA;
uniform vec3 controlA;
uniform vec3 controlB;
uniform vec3 pointB;
uniform float radius;
varying float bezierT;

vec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  float b0 = t2 * t2 * t2;
  float b1 = 3.0 * t * t2 * t2;
  float b2 = 3.0 * t * t * t2;
  float b3 = t * t * t;
  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;
}

vec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  return -3.0 * p1 * t2 * t2 +
    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +
    c2 * (6.0 * t2 * t - 3.0 * t * t) +
    3.0 * p2 * t * t;
}
`,b=`
float t = position.y;
bezierT = t;
vec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);
vec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));

// Make "sideways" always perpendicular to the camera ray; this ensures that any twists
// in the cylinder occur where you won't see them: 
vec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);
if (bezierDir == viewDirection) {
  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));
}
vec3 sideways = normalize(cross(bezierDir, viewDirection));
vec3 upish = normalize(cross(sideways, bezierDir));

// Build a matrix for transforming this disc in the cylinder:
mat4 discTx;
discTx[0].xyz = sideways * radius;
discTx[1].xyz = bezierDir * radius;
discTx[2].xyz = upish * radius;
discTx[3].xyz = bezierCenterPos;
discTx[3][3] = 1.0;

// Apply transform, ignoring original y
position = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;
normal = normalize(mat3(discTx) * normal);
`,x=`
uniform vec3 dashing;
varying float bezierT;
`,w=`
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`,_=null,E=new a._4j({color:0xffffff,side:a.$EB});class M extends a.eaF{static getGeometry(){return _||(_=new a.Ho_(1,1,1,6,64).translate(0,.5,0))}constructor(){super(M.getGeometry(),E),this.pointA=new a.Pq0,this.controlA=new a.Pq0,this.controlB=new a.Pq0,this.pointB=new a.Pq0,this.radius=.01,this.dashArray=new a.I9Y,this.dashOffset=0,this.frustumCulled=!1}get material(){let e=this._derivedMaterial,t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=E.clone());return e&&e.baseMaterial===t||(e=this._derivedMaterial=d(t,{chained:!0,uniforms:{pointA:{value:new a.Pq0},controlA:{value:new a.Pq0},controlB:{value:new a.Pq0},pointB:{value:new a.Pq0},radius:{value:.01},dashing:{value:new a.Pq0}},vertexDefs:y,vertexTransform:b,fragmentDefs:x,fragmentMainIntro:w}),t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),e.dispose()})),e}set material(e){this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}onBeforeRender(){let{uniforms:e}=this.material,{pointA:t,controlA:r,controlB:n,pointB:a,radius:i,dashArray:o,dashOffset:s}=this;e.pointA.value.copy(t),e.controlA.value.copy(r),e.controlB.value.copy(n),e.pointB.value.copy(a),e.radius.value=i,e.dashing.value.set(o.x,o.y,s||0)}raycast(){}}},95889:(e,t,r)=>{function n(){var e=Object.create(null);function t(e,t){var r=void 0;self.troikaDefine=function(e){return r=e};var n=URL.createObjectURL(new Blob(["/** "+e.replace(/\*/g,"")+" **/\n\ntroikaDefine(\n"+t+"\n)"],{type:"application/javascript"}));try{importScripts(n)}catch(e){console.error(e)}return URL.revokeObjectURL(n),delete self.troikaDefine,r}self.addEventListener("message",function(r){var n=r.data,a=n.messageId,i=n.action,o=n.data;try{"registerModule"===i&&function r(n,a){var i=n.id,o=n.name,s=n.dependencies;void 0===s&&(s=[]);var l=n.init;void 0===l&&(l=function(){});var c=n.getTransferables;if(void 0===c&&(c=null),!e[i])try{s=s.map(function(t){return t&&t.isWorkerModule&&(r(t,function(e){if(e instanceof Error)throw e}),t=e[t.id].value),t}),l=t("<"+o+">.init",l),c&&(c=t("<"+o+">.getTransferables",c));var f=null;"function"==typeof l?f=l.apply(void 0,s):console.error("worker module init function failed to rehydrate"),e[i]={id:i,value:f,getTransferables:c},a(f)}catch(e){e&&e.noLog||console.error(e),a(e)}}(o,function(e){e instanceof Error?postMessage({messageId:a,success:!1,error:e.message}):postMessage({messageId:a,success:!0,result:{isCallable:"function"==typeof e}})}),"callModule"===i&&function(t,r){var n,a=t.id,i=t.args;e[a]&&"function"==typeof e[a].value||r(Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var o=(n=e[a]).value.apply(n,i);o&&"function"==typeof o.then?o.then(s,function(e){return r(e instanceof Error?e:Error(""+e))}):s(o)}catch(e){r(e)}function s(t){try{var n=e[a].getTransferables&&e[a].getTransferables(t);n&&Array.isArray(n)&&n.length||(n=void 0),r(t,n)}catch(e){console.error(e),r(e)}}}(o,function(e,t){e instanceof Error?postMessage({messageId:a,success:!1,error:e.message}):postMessage({messageId:a,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:a,success:!1,error:e.stack})}})}r.d(t,{Qw:()=>u,kl:()=>function e(t){if((!t||"function"!=typeof t.init)&&!s)throw Error("requires `options.init` function");var r,n=t.dependencies,o=t.init,l=t.getTransferables,f=t.workerId,u=((r=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return r._getInitResult().then(function(t){if("function"==typeof t)return t.apply(void 0,e);throw Error("Worker module function was called but `init` did not return a callable function")})})._getInitResult=function(){var e=t.dependencies,n=t.init,a=Promise.all(e=Array.isArray(e)?e.map(function(e){return e&&(e=e.onMainThread||e)._getInitResult&&(e=e._getInitResult()),e}):[]).then(function(e){return n.apply(null,e)});return r._getInitResult=function(){return a},a},r);null==f&&(f="#default");var m="workerModule"+ ++i,h=t.name||m,p=null;function g(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!a())return u.apply(void 0,e);if(!p){p=d(f,"registerModule",g.workerModuleData);var r=function(){p=null,c[f].delete(r)};(c[f]||(c[f]=new Set)).add(r)}return p.then(function(t){if(t.isCallable)return d(f,"callModule",{id:m,args:e});throw Error("Worker module function was called but `init` did not return a callable function")})}return n=n&&n.map(function(t){return"function"!=typeof t||t.workerModuleData||(s=!0,t=e({workerId:f,name:"<"+h+"> function dependency: "+t.name,init:"function(){return (\n"+v(t)+"\n)}"}),s=!1),t&&t.workerModuleData&&(t=t.workerModuleData),t}),g.workerModuleData={isWorkerModule:!0,id:m,name:h,dependencies:n,init:v(o),getTransferables:l&&v(l)},g.onMainThread=u,g}}),r(95704);var a=function(){var e=!1;if("undefined"!=typeof window&&void 0!==window.document)try{new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"}))).terminate(),e=!0}catch(e){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+e.message+"]")}return a=function(){return e},e},i=0,o=0,s=!1,l=Object.create(null),c=Object.create(null),f=Object.create(null);function u(e){c[e]&&c[e].forEach(function(e){e()}),l[e]&&(l[e].terminate(),delete l[e])}function v(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function d(e,t,r){return new Promise(function(a,i){var s=++o;f[s]=function(e){e.success?a(e.result):i(Error("Error in worker "+t+" call: "+e.error))},(function(e){var t=l[e];if(!t){var r=v(n);(t=l[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+" **/\n\n;("+r+")()"],{type:"application/javascript"})))).onmessage=function(e){var t=e.data,r=t.messageId,n=f[r];if(!n)throw Error("WorkerModule response with empty or unknown messageId");delete f[r],n(t)}}return t})(e).postMessage({messageId:s,action:t,data:r})})}}}]);