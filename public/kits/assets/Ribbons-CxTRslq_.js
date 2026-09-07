import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";import{a as r,i,n as a,o,s,t as c}from"./Mesh-D48iXpEj.js";import{t as l}from"./Color-xVu7ktDx.js";import{t as u}from"./Vec2-BaQWhCpd.js";var d=new s,f=class{constructor(e,{points:t,vertex:n=p,fragment:i=m,uniforms:a={},attributes:s={}}){this.gl=e,this.points=t,this.count=t.length,this.position=new Float32Array(this.count*3*2),this.prev=new Float32Array(this.count*3*2),this.next=new Float32Array(this.count*3*2);let d=new Float32Array(this.count*1*2),f=new Float32Array(this.count*2*2),h=new Uint16Array((this.count-1)*3*2);for(let e=0;e<this.count;e++){d.set([-1,1],e*2);let t=e/(this.count-1);if(f.set([0,t,1,t],e*4),e===this.count-1)continue;let n=e*2;h.set([n+0,n+1,n+2],(n+0)*3),h.set([n+2,n+1,n+3],(n+1)*3)}let g=this.geometry=new o(e,Object.assign(s,{position:{size:3,data:this.position},prev:{size:3,data:this.prev},next:{size:3,data:this.next},side:{size:1,data:d},uv:{size:2,data:f},index:{size:1,data:h}}));this.updateGeometry(),a.uResolution||(this.resolution=a.uResolution={value:new u}),a.uDPR||(this.dpr=a.uDPR={value:1}),a.uThickness||(this.thickness=a.uThickness={value:1}),a.uColor||(this.color=a.uColor={value:new l(`#000`)}),a.uMiter||(this.miter=a.uMiter={value:1}),this.resize();let _=this.program=new r(e,{vertex:n,fragment:i,uniforms:a});this.mesh=new c(e,{geometry:g,program:_})}updateGeometry(){this.points.forEach((e,t)=>{e.toArray(this.position,t*3*2),e.toArray(this.position,t*3*2+3),t?(e.toArray(this.next,(t-1)*3*2),e.toArray(this.next,(t-1)*3*2+3)):(d.copy(e).sub(this.points[t+1]).add(e),d.toArray(this.prev,t*3*2),d.toArray(this.prev,t*3*2+3)),t===this.points.length-1?(d.copy(e).sub(this.points[t-1]).add(e),d.toArray(this.next,t*3*2),d.toArray(this.next,t*3*2+3)):(e.toArray(this.prev,(t+1)*3*2),e.toArray(this.prev,(t+1)*3*2+3))}),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.prev.needsUpdate=!0,this.geometry.attributes.next.needsUpdate=!0}resize(){this.resolution&&this.resolution.value.set(this.gl.canvas.width,this.gl.canvas.height),this.dpr&&(this.dpr.value=this.gl.renderer.dpr)}},p=`
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
`,h=e(t(),1),g=n(),_=({colors:e=[`#FC8EAC`],baseSpring:t=.03,baseFriction:n=.9,baseThickness:r=30,offsetFactor:o=.05,maxAge:c=500,pointCount:u=50,speedMultiplier:d=.6,enableFade:p=!1,enableShaderEffect:m=!1,effectAmplitude:_=2,backgroundColor:v=[0,0,0,0]})=>{let y=(0,h.useRef)(null);return(0,h.useEffect)(()=>{let h=y.current;if(!h)return;let g=new i({dpr:window.devicePixelRatio||2,alpha:!0}),b=g.gl;Array.isArray(v)&&v.length===4?b.clearColor(v[0],v[1],v[2],v[3]):b.clearColor(0,0,0,0),b.canvas.style.position=`absolute`,b.canvas.style.top=`0`,b.canvas.style.left=`0`,b.canvas.style.width=`100%`,b.canvas.style.height=`100%`,h.appendChild(b.canvas);let x=new a,S=[];function C(){let e=h.clientWidth,t=h.clientHeight;g.setSize(e,t),S.forEach(e=>e.polyline.resize())}window.addEventListener(`resize`,C);let w=(e.length-1)/2;e.forEach((e,i)=>{let a=t+(Math.random()-.5)*.05,c=n+(Math.random()-.5)*.05,d=r+(Math.random()-.5)*3,h=new s((i-w)*o+(Math.random()-.5)*.01,(Math.random()-.5)*.1,0),g={spring:a,friction:c,mouseVelocity:new s,mouseOffset:h},v=u,y=[];for(let e=0;e<v;e++)y.push(new s);g.points=y,g.polyline=new f(b,{points:y,vertex:`
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `,fragment:`
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `,uniforms:{uColor:{value:new l(e)},uThickness:{value:d},uOpacity:{value:1},uTime:{value:0},uEnableShaderEffect:{value:+!!m},uEffectAmplitude:{value:_},uEnableFade:{value:+!!p}}}),g.polyline.mesh.setParent(x),S.push(g)}),C();let T=new s;function E(e){let t,n,r=h.getBoundingClientRect();e.changedTouches&&e.changedTouches.length?(t=e.changedTouches[0].clientX-r.left,n=e.changedTouches[0].clientY-r.top):(t=e.clientX-r.left,n=e.clientY-r.top);let i=h.clientWidth,a=h.clientHeight;T.set(t/i*2-1,n/a*-2+1,0)}h.addEventListener(`mousemove`,E),h.addEventListener(`touchstart`,E),h.addEventListener(`touchmove`,E);let D=new s,O,k=performance.now();function A(){O=requestAnimationFrame(A);let e=performance.now(),t=e-k;k=e,S.forEach(n=>{D.copy(T).add(n.mouseOffset).sub(n.points[0]).multiply(n.spring),n.mouseVelocity.add(D).multiply(n.friction),n.points[0].add(n.mouseVelocity);for(let e=1;e<n.points.length;e++)if(isFinite(c)&&c>0){let r=c/(n.points.length-1),i=Math.min(1,t*d/r);n.points[e].lerp(n.points[e-1],i)}else n.points[e].lerp(n.points[e-1],.9);n.polyline.mesh.program.uniforms.uTime&&(n.polyline.mesh.program.uniforms.uTime.value=e*.001),n.polyline.updateGeometry()}),g.render({scene:x})}return A(),()=>{window.removeEventListener(`resize`,C),h.removeEventListener(`mousemove`,E),h.removeEventListener(`touchstart`,E),h.removeEventListener(`touchmove`,E),cancelAnimationFrame(O),b.canvas&&b.canvas.parentNode===h&&h.removeChild(b.canvas)}},[e,t,n,r,o,c,u,d,p,m,_,v]),(0,g.jsx)(`div`,{ref:y,className:`ribbons-container`})};export{_ as default};