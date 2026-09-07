import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,B as i,It as a,K as o,Rt as s,S as c,bn as l,bt as u,dn as d,en as f,fn as p,it as m,mt as h,n as g,o as _,q as v,xn as y,yn as b}from"./three.module-Da49k5ub.js";import{d as x,f as S,o as C,s as w,t as T,u as E}from"./build-Di7SJOIL.js";var D=e(t(),1),O=n(),k={onSpeedUp:()=>{},onSlowDown:()=>{},distortion:`turbulentDistortion`,length:400,roadWidth:10,islandWidth:2,lanesPerRoad:4,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[12,80],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:16777215,brokenLines:16777215,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}},A=({effectOptions:e=k,lightMode:t=!1})=>{let n=(0,D.useRef)(null),A=(0,D.useRef)(null);return(0,D.useEffect)(()=>{if(A.current){A.current.dispose(),A.current=null;let e=n.current;if(e)for(;e.firstChild;)e.removeChild(e.firstChild)}let D={uFreq:{value:new l(3,6,10)},uAmp:{value:new l(30,30,20)}},O={uFreq:{value:new b(5,2)},uAmp:{value:new b(25,15)}},j={uFreq:{value:new b(2,3)},uAmp:{value:new b(35,10)}},M={uFreq:{value:new y(4,8,8,1)},uAmp:{value:new y(25,5,10,10)}},N={uFreq:{value:new b(4,8)},uAmp:{value:new b(10,20)},uPowY:{value:new b(20,2)}},P=e=>Math.sin(e)*.5+.5,F={mountainDistortion:{uniforms:D,getDistortion:`
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,getJS:(e,t)=>{let n=.02,r=D.uFreq.value,i=D.uAmp.value,a=new l(Math.cos(e*Math.PI*r.x+t)*i.x-Math.cos(n*Math.PI*r.x+t)*i.x,P(e*Math.PI*r.y+t)*i.y-P(n*Math.PI*r.y+t)*i.y,P(e*Math.PI*r.z+t)*i.z-P(n*Math.PI*r.z+t)*i.z),o=new l(2,2,2),s=new l(0,0,-5);return a.multiply(o).add(s)}},xyDistortion:{uniforms:O,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:(e,t)=>{let n=.02,r=O.uFreq.value,i=O.uAmp.value,a=new l(Math.cos(e*Math.PI*r.x+t)*i.x-Math.cos(n*Math.PI*r.x+t)*i.x,Math.sin(e*Math.PI*r.y+t+Math.PI/2)*i.y-Math.sin(n*Math.PI*r.y+t+Math.PI/2)*i.y,0),o=new l(2,.4,1),s=new l(0,0,-3);return a.multiply(o).add(s)}},LongRaceDistortion:{uniforms:j,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float camProgress = 0.0125;
            return vec3( 
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:(e,t)=>{let n=.0125,r=j.uFreq.value,i=j.uAmp.value,a=new l(Math.sin(e*Math.PI*r.x+t)*i.x-Math.sin(n*Math.PI*r.x+t)*i.x,Math.sin(e*Math.PI*r.y+t)*i.y-Math.sin(n*Math.PI*r.y+t)*i.y,0),o=new l(1,1,0),s=new l(0,0,-5);return a.multiply(o).add(s)}},turbulentDistortion:{uniforms:M,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,getJS:(e,t)=>{let n=M.uFreq.value,r=M.uAmp.value,i=e=>Math.cos(Math.PI*e*n.x+t)*r.x+Math.cos(Math.PI*e*n.y+t*(n.y/n.x))**2*r.y,a=e=>-P(Math.PI*e*n.z+t)*r.z-P(Math.PI*e*n.w+t/(n.z/n.w))**5*r.w,o=new l(i(e)-i(e+.007),a(e)-a(e+.007),0),s=new l(-2,-5,0),c=new l(0,0,-10);return o.multiply(s).add(c)}},turbulentDistortionStill:{uniforms:M,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r) * uAmp.r +
              pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `},deepDistortionStill:{uniforms:N,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x) * uAmp.x * 2.
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.05),
              0.
            );
          }
        `},deepDistortion:{uniforms:N,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x + uTime) * uAmp.x
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `,getJS:(e,t)=>{let n=N.uFreq.value,r=N.uAmp.value,i=N.uPowY.value,a=e=>Math.sin(e*Math.PI*n.x+t)*r.x,o=e=>(e*i.x)**+i.y+Math.sin(e*Math.PI*n.y+t)*r.y,s=new l(a(e)-a(e+.01),o(e)-o(e+.01),0),c=new l(-2,-4,0),u=new l(0,0,-10);return s.multiply(c).add(u)}}};class I{constructor(e,t={}){this.options=t,this.options.distortion??(this.options.distortion={uniforms:L,getDistortion:R}),this.container=e,this.hasValidSize=!1;let n=Math.max(1,e.offsetWidth),o=Math.max(1,e.offsetHeight);this.renderer=new _({antialias:!1,alpha:!0}),this.renderer.setSize(n,o,!1),this.renderer.setPixelRatio(window.devicePixelRatio),this.composer=new C(this.renderer),e.append(this.renderer.domElement),this.camera=new a(t.fov,n/o,.1,1e4),this.camera.position.z=-5,this.camera.position.y=8,this.camera.position.x=0,this.scene=new r,this.scene.background=null;let s=new i(t.colors.background,t.length*.2,t.length*500);this.scene.fog=s,this.fogUniforms={fogColor:{value:s.color},fogNear:{value:s.near},fogFar:{value:s.far}},this.timer=new d,this.timer.connect(document),this.assets={},this.disposed=!1,this.road=new J(this,t),this.leftCarLights=new H(this,t,t.colors.leftCars,t.movingAwaySpeed,new b(0,1-t.carLightsFade)),this.rightCarLights=new H(this,t,t.colors.rightCars,t.movingCloserSpeed,new b(1,0+t.carLightsFade)),this.leftSticks=new G(this,t),this.fovTarget=t.fov,this.speedUpTarget=0,this.speedUp=0,this.timeOffset=0,this.tick=this.tick.bind(this),this.init=this.init.bind(this),this.setSize=this.setSize.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onContextMenu=this.onContextMenu.bind(this),this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener(`resize`,this.onWindowResize),e.offsetWidth>0&&e.offsetHeight>0&&(this.hasValidSize=!0)}onWindowResize(){let e=this.container.offsetWidth,t=this.container.offsetHeight;if(e<=0||t<=0){this.hasValidSize=!1;return}this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer.setSize(e,t),this.hasValidSize=!0}initPasses(){this.renderPass=new E(this.scene,this.camera),this.bloomPass=new w(this.camera,new T({luminanceThreshold:.2,luminanceSmoothing:0,resolutionScale:1}));let e=new w(this.camera,new x({preset:S.MEDIUM,searchImage:x.searchImageDataURL,areaImage:x.areaImageDataURL}));this.renderPass.renderToScreen=!1,this.bloomPass.renderToScreen=!1,e.renderToScreen=!0,this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(e)}loadAssets(){let e=this.assets;return new Promise(t=>{let n=new h(t),r=new Image,i=new Image;e.smaa={},r.addEventListener(`load`,function(){e.smaa.search=this,n.itemEnd(`smaa-search`)}),i.addEventListener(`load`,function(){e.smaa.area=this,n.itemEnd(`smaa-area`)}),n.itemStart(`smaa-search`),n.itemStart(`smaa-area`),r.src=x.searchImageDataURL,i.src=x.areaImageDataURL})}init(){this.initPasses();let e=this.options;this.road.init(),this.leftCarLights.init(),this.leftCarLights.mesh.position.setX(-e.roadWidth/2-e.islandWidth/2),this.rightCarLights.init(),this.rightCarLights.mesh.position.setX(e.roadWidth/2+e.islandWidth/2),this.leftSticks.init(),this.leftSticks.mesh.position.setX(-(e.roadWidth+e.islandWidth/2)),this.container.addEventListener(`mousedown`,this.onMouseDown),this.container.addEventListener(`mouseup`,this.onMouseUp),this.container.addEventListener(`mouseout`,this.onMouseUp),this.container.addEventListener(`touchstart`,this.onTouchStart,{passive:!0}),this.container.addEventListener(`touchend`,this.onTouchEnd,{passive:!0}),this.container.addEventListener(`touchcancel`,this.onTouchEnd,{passive:!0}),this.container.addEventListener(`contextmenu`,this.onContextMenu),this.tick()}onMouseDown(e){this.options.onSpeedUp&&this.options.onSpeedUp(e),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onMouseUp(e){this.options.onSlowDown&&this.options.onSlowDown(e),this.fovTarget=this.options.fov,this.speedUpTarget=0}onTouchStart(e){this.options.onSpeedUp&&this.options.onSpeedUp(e),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onTouchEnd(e){this.options.onSlowDown&&this.options.onSlowDown(e),this.fovTarget=this.options.fov,this.speedUpTarget=0}onContextMenu(e){e.preventDefault()}update(e){let t=Math.exp(-(-60*Math.log2(.9))*e);this.speedUp+=V(this.speedUp,this.speedUpTarget,t,1e-5),this.timeOffset+=this.speedUp*e;let n=this.timer.getElapsed()+this.timeOffset;this.rightCarLights.update(n),this.leftCarLights.update(n),this.leftSticks.update(n),this.road.update(n);let r=!1,i=V(this.camera.fov,this.fovTarget,t);if(i!==0&&(this.camera.fov+=i*e*6,r=!0),this.options.distortion.getJS){let e=this.options.distortion.getJS(.025,n);this.camera.lookAt(new l(this.camera.position.x+e.x,this.camera.position.y+e.y,this.camera.position.z+e.z)),r=!0}r&&this.camera.updateProjectionMatrix()}render(e){this.composer.render(e)}dispose(){this.disposed=!0,this.timer.dispose(),this.scene&&(this.scene.traverse(e=>{let t=e;t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()))}),this.scene.clear()),this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)),this.composer&&this.composer.dispose(),window.removeEventListener(`resize`,this.onWindowResize),this.container&&(this.container.removeEventListener(`mousedown`,this.onMouseDown),this.container.removeEventListener(`mouseup`,this.onMouseUp),this.container.removeEventListener(`mouseout`,this.onMouseUp),this.container.removeEventListener(`touchstart`,this.onTouchStart),this.container.removeEventListener(`touchend`,this.onTouchEnd),this.container.removeEventListener(`touchcancel`,this.onTouchEnd),this.container.removeEventListener(`contextmenu`,this.onContextMenu))}setSize(e,t,n){if(e<=0||t<=0){this.hasValidSize=!1;return}this.composer.setSize(e,t,n),this.hasValidSize=!0}tick(){if(!this.disposed){if(!this.hasValidSize){let e=this.container.offsetWidth,t=this.container.offsetHeight;if(e>0&&t>0)this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer.setSize(e,t),this.hasValidSize=!0,this.timer.reset();else{requestAnimationFrame(this.tick);return}}if(ne(this.renderer,this.setSize)){let e=this.renderer.domElement;this.hasValidSize&&(this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix())}if(this.hasValidSize){this.timer.update();let e=this.timer.getDelta();this.render(e),this.update(e)}requestAnimationFrame(this.tick)}}}let L={uDistortionX:{value:new b(80,3)},uDistortionY:{value:new b(-40,2.5)}},R=`
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        progress = clamp(progress, 0., 1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
          xAmp * nsin(progress * PI * xFreq - PI / 2.),
          yAmp * nsin(progress * PI * yFreq - PI / 2.),
          0.
        );
      }
    `,z=e=>Array.isArray(e)?Math.random()*(e[1]-e[0])+e[0]:Math.random()*e,B=e=>Array.isArray(e)?e[Math.floor(Math.random()*e.length)]:e;function V(e,t,n=.1,r=.001){let i=(t-e)*n;return Math.abs(i)<r&&(i=t-e),i}class H{constructor(e,t,n,r,i){this.webgl=e,this.options=t,this.colors=n,this.speed=r,this.fade=i}init(){let e=this.options,t=new m(new l(0,0,0),new l(0,0,-1)),n=new p(t,40,1,8,!1),r=new v().copy(n);r.instanceCount=e.lightPairsPerRoadWay*2;let i=e.roadWidth/e.lanesPerRoad,a=[],s=[],d=[],h=this.colors;h=Array.isArray(h)?h.map(e=>new c(e)):new c(h);for(let t=0;t<e.lightPairsPerRoadWay;t++){let n=z(e.carLightsRadius),r=z(e.carLightsLength),o=z(this.speed),c=t%e.lanesPerRoad*i-e.roadWidth/2+i/2,l=z(e.carWidthPercentage)*i,u=z(e.carShiftX)*i;c+=u;let f=z(e.carFloorSeparation)+n*1.3,p=-z(e.length);a.push(c-l/2),a.push(f),a.push(p),a.push(c+l/2),a.push(f),a.push(p),s.push(n),s.push(r),s.push(o),s.push(n),s.push(r),s.push(o);let m=B(h);d.push(m.r),d.push(m.g),d.push(m.b),d.push(m.r),d.push(m.g),d.push(m.b)}r.setAttribute(`aOffset`,new o(new Float32Array(a),3,!1)),r.setAttribute(`aMetrics`,new o(new Float32Array(s),3,!1)),r.setAttribute(`aColor`,new o(new Float32Array(d),3,!1));let g=new f({fragmentShader:U,vertexShader:W,transparent:!0,uniforms:Object.assign({uTime:{value:0},uTravelLength:{value:e.length},uFade:{value:this.fade}},this.webgl.fogUniforms,e.distortion.uniforms)});g.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace(`#include <getDistortion_vertex>`,e.distortion.getDistortion)};let _=new u(r,g);_.frustumCulled=!1,this.webgl.scene.add(_),this.mesh=_}update(e){this.mesh.material.uniforms.uTime.value=e}}let U=`
      #define USE_FOG;
      ${g.fog_pars_fragment}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${g.fog_fragment}
      }
    `,W=`
      #define USE_FOG;
      ${g.fog_pars_vertex}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${g.fog_vertex}
      }
    `;class G{constructor(e,t){this.webgl=e,this.options=t}init(){let e=this.options,t=new s(1,1),n=new v().copy(t),r=e.totalSideLightSticks;n.instanceCount=r;let i=e.length/(r-1),a=[],l=[],d=[],p=e.colors.sticks;p=Array.isArray(p)?p.map(e=>new c(e)):new c(p);for(let t=0;t<r;t++){let n=z(e.lightStickWidth),r=z(e.lightStickHeight);a.push((t-1)*i*2+i*Math.random());let o=B(p);l.push(o.r),l.push(o.g),l.push(o.b),d.push(n),d.push(r)}n.setAttribute(`aOffset`,new o(new Float32Array(a),1,!1)),n.setAttribute(`aColor`,new o(new Float32Array(l),3,!1)),n.setAttribute(`aMetrics`,new o(new Float32Array(d),2,!1));let m=new f({fragmentShader:q,vertexShader:K,side:2,uniforms:Object.assign({uTravelLength:{value:e.length},uTime:{value:0}},this.webgl.fogUniforms,e.distortion.uniforms)});m.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace(`#include <getDistortion_vertex>`,e.distortion.getDistortion)};let h=new u(n,m);h.frustumCulled=!1,this.webgl.scene.add(h),this.mesh=h}update(e){this.mesh.material.uniforms.uTime.value=e}}let K=`
      #define USE_FOG;
      ${g.fog_pars_vertex}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                     0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                0, 		0,				0,	1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;

        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

        transformed.z += - uTravelLength + time;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${g.fog_vertex}
      }
    `,q=`
      #define USE_FOG;
      ${g.fog_pars_fragment}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${g.fog_fragment}
      }
    `;class J{constructor(e,t){this.webgl=e,this.options=t,this.uTime={value:0}}createPlane(e,t,n){let r=this.options,i=new s(n?r.roadWidth:r.islandWidth,r.length,20,100),a={uTravelLength:{value:r.length},uColor:{value:new c(n?r.colors.roadColor:r.colors.islandColor)},uTime:this.uTime};n&&(a=Object.assign(a,{uLanes:{value:r.lanesPerRoad},uBrokenLinesColor:{value:new c(r.colors.brokenLines)},uShoulderLinesColor:{value:new c(r.colors.shoulderLines)},uShoulderLinesWidthPercentage:{value:r.shoulderLinesWidthPercentage},uBrokenLinesLengthPercentage:{value:r.brokenLinesLengthPercentage},uBrokenLinesWidthPercentage:{value:r.brokenLinesWidthPercentage}}));let o=new f({fragmentShader:n?ee:X,vertexShader:te,side:2,uniforms:Object.assign(a,this.webgl.fogUniforms,r.distortion.uniforms)});o.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <getDistortion_vertex>`,r.distortion.getDistortion)};let l=new u(i,o);return l.rotation.x=-Math.PI/2,l.position.z=-r.length/2,l.position.x+=(this.options.islandWidth/2+r.roadWidth/2)*e,this.webgl.scene.add(l),l}init(){this.leftRoadWay=this.createPlane(-1,this.options.roadWidth,!0),this.rightRoadWay=this.createPlane(1,this.options.roadWidth,!0),this.island=this.createPlane(0,this.options.islandWidth,!1)}update(e){this.uTime.value=e}}let Y=`
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${g.fog_pars_fragment}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${g.fog_fragment}
      }
    `,X=Y.replace(`#include <roadMarkings_fragment>`,``).replace(`#include <roadMarkings_vars>`,``),ee=Y.replace(`#include <roadMarkings_fragment>`,`
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

      brokenLines = mix(brokenLines, sideLines, uv.x);
    `).replace(`#include <roadMarkings_vars>`,`
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
      highp float random(vec2 co) {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt = dot(co.xy, vec2(a, b));
        highp float sn = mod(dt, 3.14);
        return fract(sin(sn) * c);
      }
    `),te=`
      #define USE_FOG;
      uniform float uTime;
      ${g.fog_pars_vertex}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${g.fog_vertex}
      }
    `;function ne(e,t){let n=e.domElement,r=n.clientWidth,i=n.clientHeight;if(r<=0||i<=0)return!1;let a=n.width!==r||n.height!==i;return a&&t(r,i,!1),a}let Z=n.current;if(!Z)return;let Q={...k,...e,colors:{...k.colors,...e.colors,...t?{roadColor:16777215,islandColor:16316410,background:16777215,shoulderLines:8141549,brokenLines:12616956}:{}}};Q.distortion=F[Q.distortion];let $=new I(Z,Q);return A.current=$,$.loadAssets().then($.init),()=>{A.current&&=(A.current.dispose(),null)}},[e,t]),(0,O.jsx)(`div`,{id:`lights`,ref:n})};export{A as default};