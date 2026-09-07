(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7330],{7117:(t,e,i)=>{"use strict";i.d(e,{Q:()=>o});let n={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function r(t){4===t.length&&(t=t[0]+t[1]+t[1]+t[2]+t[2]+t[3]+t[3]);let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e||console.warn(`Unable to convert hex string ${t} to rgb values`),[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255]}function s(t){if(void 0===t)return[0,0,0];if(3==arguments.length)return arguments;if(!isNaN(t)){var e;return[((e=parseInt(e=t))>>16&255)/255,(e>>8&255)/255,(255&e)/255]}return"#"===t[0]?r(t):n[t.toLowerCase()]?r(n[t.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0])}class o extends Array{constructor(t){if(Array.isArray(t))return super(...t);return super(...s(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(t){this[0]=t}set g(t){this[1]=t}set b(t){this[2]=t}set(t){return Array.isArray(t)?this.copy(t):this.copy(s(...arguments))}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this}}},43142:()=>{},69423:(t,e,i)=>{"use strict";function n(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function r(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function s(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function o(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)}function a(t,e){return t[0]*e[1]-t[1]*e[0]}i.d(e,{Z:()=>u});class u extends Array{constructor(t=0,e=t){return super(t,e),this}get x(){return this[0]}get y(){return this[1]}set x(t){this[0]=t}set y(t){this[1]=t}set(t,e=t){return t.length?this.copy(t):(this[0]=t,this[1]=e,this)}copy(t){return this[0]=t[0],this[1]=t[1],this}add(t,e){return e?n(this,t,e):n(this,this,t),this}sub(t,e){return e?r(this,t,e):r(this,this,t),this}multiply(t){if(t.length)this[0]=this[0]*t[0],this[1]=this[1]*t[1];else s(this,this,t);return this}divide(t){if(t.length)this[0]=this[0]/t[0],this[1]=this[1]/t[1];else s(this,this,1/t);return this}inverse(t=this){return this[0]=1/t[0],this[1]=1/t[1],this}len(){return o(this)}distance(t){var e,i;return t?Math.sqrt((e=t[0]-this[0])*e+(i=t[1]-this[1])*i):o(this)}squaredLen(){return this.squaredDistance()}squaredDistance(t){var e,i,n,r;return t?(e=t[0]-this[0])*e+(i=t[1]-this[1])*i:(n=this[0])*n+(r=this[1])*r}negate(t=this){return this[0]=-t[0],this[1]=-t[1],this}cross(t,e){return e?a(t,e):a(this,t)}scale(t){return s(this,this,t),this}normalize(){var t,e,i;return(i=(t=this[0])*t+(e=this[1])*e)>0&&(i=1/Math.sqrt(i)),this[0]=this[0]*i,this[1]=this[1]*i,this}dot(t){return this[0]*t[0]+this[1]*t[1]}equals(t){return this[0]===t[0]&&this[1]===t[1]}applyMatrix3(t){var e,i;return e=this[0],i=this[1],this[0]=t[0]*e+t[3]*i+t[6],this[1]=t[1]*e+t[4]*i+t[7],this}applyMatrix4(t){let e,i;return e=this[0],i=this[1],this[0]=t[0]*e+t[4]*i+t[12],this[1]=t[1]*e+t[5]*i+t[13],this}lerp(t,e){var i,n;return i=this[0],n=this[1],this[0]=i+e*(t[0]-i),this[1]=n+e*(t[1]-n),this}smoothLerp(t,e,i){return!function(t,e,i,n,r){let s=Math.exp(-n*r),o=e[0],a=e[1];t[0]=i[0]+(o-i[0])*s,t[1]=i[1]+(a-i[1])*s}(this,this,t,e,i),this}clone(){return new u(this[0],this[1])}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t}}},97330:(t,e,i)=>{"use strict";i.r(e),i.d(e,{default:()=>y});var n=i(95155),r=i(12115),s=i(15621),o=i(70393),a=i(30514),u=i(3422),h=i(66194),l=i(73477),c=i(69423),v=i(7117);let p=new a.e;class f{constructor(t,{points:e,vertex:i=d,fragment:n=m,uniforms:r={},attributes:s={}}){this.gl=t,this.points=e,this.count=e.length,this.position=new Float32Array(3*this.count*2),this.prev=new Float32Array(3*this.count*2),this.next=new Float32Array(3*this.count*2);let o=new Float32Array(2*this.count),a=new Float32Array(2*this.count*2),p=new Uint16Array((this.count-1)*6);for(let t=0;t<this.count;t++){o.set([-1,1],2*t);let e=t/(this.count-1);if(a.set([0,e,1,e],4*t),t===this.count-1)continue;let i=2*t;p.set([i+0,i+1,i+2],(i+0)*3),p.set([i+2,i+1,i+3],(i+1)*3)}let f=this.geometry=new u.V(t,Object.assign(s,{position:{size:3,data:this.position},prev:{size:3,data:this.prev},next:{size:3,data:this.next},side:{size:1,data:o},uv:{size:2,data:a},index:{size:1,data:p}}));this.updateGeometry(),r.uResolution||(this.resolution=r.uResolution={value:new c.Z}),r.uDPR||(this.dpr=r.uDPR={value:1}),r.uThickness||(this.thickness=r.uThickness={value:1}),r.uColor||(this.color=r.uColor={value:new v.Q("#000")}),r.uMiter||(this.miter=r.uMiter={value:1}),this.resize();let y=this.program=new h.B(t,{vertex:i,fragment:n,uniforms:r});this.mesh=new l.e(t,{geometry:f,program:y})}updateGeometry(){this.points.forEach((t,e)=>{t.toArray(this.position,3*e*2),t.toArray(this.position,3*e*2+3),e?(t.toArray(this.next,(e-1)*6),t.toArray(this.next,(e-1)*6+3)):(p.copy(t).sub(this.points[e+1]).add(t),p.toArray(this.prev,3*e*2),p.toArray(this.prev,3*e*2+3)),e===this.points.length-1?(p.copy(t).sub(this.points[e-1]).add(t),p.toArray(this.next,3*e*2),p.toArray(this.next,3*e*2+3)):(t.toArray(this.prev,(e+1)*6),t.toArray(this.prev,(e+1)*6+3))}),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.prev.needsUpdate=!0,this.geometry.attributes.next.needsUpdate=!0}resize(){this.resolution&&this.resolution.value.set(this.gl.canvas.width,this.gl.canvas.height),this.dpr&&(this.dpr.value=this.gl.renderer.dpr)}}let d=`
    precision highp float;

    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;
    uniform float uMiter;

    varying vec2 vUv;

    vec4 getPosition() {
        mat4 mvp = projectionMatrix * modelViewMatrix;
        vec4 current = mvp * vec4(position, 1);
        vec4 nextPos = mvp * vec4(next, 1);
        vec4 prevPos = mvp * vec4(prev, 1);

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);    
        vec2 currentScreen = current.xy / current.w * aspect;
        vec2 nextScreen = nextPos.xy / nextPos.w * aspect;
        vec2 prevScreen = prevPos.xy / prevPos.w * aspect;
    
        vec2 dir1 = normalize(currentScreen - prevScreen);
        vec2 dir2 = normalize(nextScreen - currentScreen);
        vec2 dir = normalize(dir1 + dir2);
    
        vec2 normal = vec2(-dir.y, dir.x);
        normal /= mix(1.0, max(0.3, dot(normal, vec2(-dir1.y, dir1.x))), uMiter);
        normal /= aspect;

        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
    
        return current;
    }

    void main() {
        vUv = uv;
        gl_Position = getPosition();
    }
`,m=`
    precision highp float;

    uniform vec3 uColor;
    
    varying vec2 vUv;

    void main() {
        gl_FragColor.rgb = uColor;
        gl_FragColor.a = 1.0;
    }
`;i(43142);let y=t=>{let{colors:e=["#FC8EAC"],baseSpring:i=.03,baseFriction:u=.9,baseThickness:h=30,offsetFactor:l=.05,maxAge:c=500,pointCount:p=50,speedMultiplier:d=.6,enableFade:m=!1,enableShaderEffect:y=!1,effectAmplitude:g=2,backgroundColor:x=[0,0,0,0]}=t,w=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,n=w.current;if(!n)return;let r=new s.A({dpr:window.devicePixelRatio||2,alpha:!0}),b=r.gl;Array.isArray(x)&&4===x.length?b.clearColor(x[0],x[1],x[2],x[3]):b.clearColor(0,0,0,0),b.canvas.style.position="absolute",b.canvas.style.top="0",b.canvas.style.left="0",b.canvas.style.width="100%",b.canvas.style.height="100%",n.appendChild(b.canvas);let A=new o.d,E=[];function R(){let t=n.clientWidth,e=n.clientHeight;r.setSize(t,e),E.forEach(t=>t.polyline.resize())}window.addEventListener("resize",R);let C=(e.length-1)/2;e.forEach((t,e)=>{let n=i+(Math.random()-.5)*.05,r=u+(Math.random()-.5)*.05,s=h+(Math.random()-.5)*3,o=new a.e((e-C)*l+(Math.random()-.5)*.01,(Math.random()-.5)*.1,0),c={spring:n,friction:r,mouseVelocity:new a.e,mouseOffset:o},d=[];for(let t=0;t<p;t++)d.push(new a.e);c.points=d,c.polyline=new f(b,{points:d,vertex:"\n      precision highp float;\n      \n      attribute vec3 position;\n      attribute vec3 next;\n      attribute vec3 prev;\n      attribute vec2 uv;\n      attribute float side;\n      \n      uniform vec2 uResolution;\n      uniform float uDPR;\n      uniform float uThickness;\n      uniform float uTime;\n      uniform float uEnableShaderEffect;\n      uniform float uEffectAmplitude;\n      \n      varying vec2 vUV;\n      \n      vec4 getPosition() {\n          vec4 current = vec4(position, 1.0);\n          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);\n          vec2 nextScreen = next.xy * aspect;\n          vec2 prevScreen = prev.xy * aspect;\n          vec2 tangent = normalize(nextScreen - prevScreen);\n          vec2 normal = vec2(-tangent.y, tangent.x);\n          normal /= aspect;\n          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));\n          float dist = length(nextScreen - prevScreen);\n          normal *= smoothstep(0.0, 0.02, dist);\n          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);\n          float pixelWidth = current.w * pixelWidthRatio;\n          normal *= pixelWidth * uThickness;\n          current.xy -= normal * side;\n          if(uEnableShaderEffect > 0.5) {\n            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;\n          }\n          return current;\n      }\n      \n      void main() {\n          vUV = uv;\n          gl_Position = getPosition();\n      }\n    ",fragment:"\n      precision highp float;\n      uniform vec3 uColor;\n      uniform float uOpacity;\n      uniform float uEnableFade;\n      varying vec2 vUV;\n      void main() {\n          float fadeFactor = 1.0;\n          if(uEnableFade > 0.5) {\n              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);\n          }\n          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);\n      }\n    ",uniforms:{uColor:{value:new v.Q(t)},uThickness:{value:s},uOpacity:{value:1},uTime:{value:0},uEnableShaderEffect:{value:+!!y},uEffectAmplitude:{value:g},uEnableFade:{value:+!!m}}}),c.polyline.mesh.setParent(A),E.push(c)}),R();let M=new a.e;function P(t){let e,i,r=n.getBoundingClientRect();t.changedTouches&&t.changedTouches.length?(e=t.changedTouches[0].clientX-r.left,i=t.changedTouches[0].clientY-r.top):(e=t.clientX-r.left,i=t.clientY-r.top);let s=n.clientWidth,o=n.clientHeight;M.set(e/s*2-1,-(i/o*2)+1,0)}n.addEventListener("mousemove",P),n.addEventListener("touchstart",P),n.addEventListener("touchmove",P);let F=new a.e,z=performance.now();return!function e(){t=requestAnimationFrame(e);let i=performance.now(),n=i-z;z=i,E.forEach(t=>{F.copy(M).add(t.mouseOffset).sub(t.points[0]).multiply(t.spring),t.mouseVelocity.add(F).multiply(t.friction),t.points[0].add(t.mouseVelocity);for(let e=1;e<t.points.length;e++)if(isFinite(c)&&c>0){let i=Math.min(1,n*d/(c/(t.points.length-1)));t.points[e].lerp(t.points[e-1],i)}else t.points[e].lerp(t.points[e-1],.9);t.polyline.mesh.program.uniforms.uTime&&(t.polyline.mesh.program.uniforms.uTime.value=.001*i),t.polyline.updateGeometry()}),r.render({scene:A})}(),()=>{window.removeEventListener("resize",R),n.removeEventListener("mousemove",P),n.removeEventListener("touchstart",P),n.removeEventListener("touchmove",P),cancelAnimationFrame(t),b.canvas&&b.canvas.parentNode===n&&n.removeChild(b.canvas)}},[e,i,u,h,l,c,p,d,m,y,g,x]),(0,n.jsx)("div",{ref:w,className:"ribbons-container"})}}}]);