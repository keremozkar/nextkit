import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{$t as r,Cn as i,D as a,Kt as o,Rt as s,S as c,U as ee,_ as l,b as u,bt as d,h as te,m as ne,o as re,ot as ie,qt as f,st as p,x as ae,xn as m,yn as h,z as g}from"./three.module-Da49k5ub.js";var _=e(t(),1),v=n();function y({mouseForce:e=20,cursorSize:t=100,isViscous:n=!1,viscous:y=30,iterationsViscous:b=32,iterationsPoisson:x=32,dt:S=.014,BFECC:C=!0,resolution:w=.5,isBounce:T=!1,colors:E=[`#5227FF`,`#FF9FFC`,`#B497CF`],style:D={},className:O=``,autoDemo:k=!0,autoSpeed:A=.5,autoIntensity:j=2.2,takeoverDuration:M=.25,autoResumeDelay:N=1e3,autoRampDuration:P=.6,backgroundColor:F=`#FFFFFF`,lightMode:I=!1}){let L=(0,_.useRef)(null),R=(0,_.useRef)(null),z=(0,_.useRef)(null),B=(0,_.useRef)(null),V=(0,_.useRef)(null),H=(0,_.useRef)(!0),U=(0,_.useRef)(null);return(0,_.useEffect)(()=>{if(!L.current)return;function _(e){let t;t=Array.isArray(e)&&e.length>0?e.length===1?[e[0],e[0]]:e:[`#ffffff`,`#ffffff`];let n=t.length,r=new Uint8Array(n*4);for(let e=0;e<n;e++){let n=new c(t[e]);r[e*4+0]=Math.round(n.r*255),r[e*4+1]=Math.round(n.g*255),r[e*4+2]=Math.round(n.b*255),r[e*4+3]=255}let i=new a(r,n,1,o);return i.magFilter=p,i.minFilter=p,i.wrapS=u,i.wrapT=u,i.generateMipmaps=!1,i.needsUpdate=!0,i}let v=_(E),D=new c(F),O=I?new m(D.r,D.g,D.b,1):new m(0,0,0,0);class W{constructor(){this.width=0,this.height=0,this.aspect=1,this.pixelRatio=1,this.isMobile=!1,this.breakpoint=768,this.fboWidth=null,this.fboHeight=null,this.time=0,this.delta=0,this.container=null,this.renderer=null,this.clock=null}init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new re({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new c(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.width=`100%`,this.renderer.domElement.style.height=`100%`,this.renderer.domElement.style.display=`block`,this.clock=new ae,this.clock.start()}resize(){if(!this.container)return;let e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.delta=this.clock.getDelta(),this.time+=this.delta}}let G=new W;class oe{constructor(){this.mouseMoved=!1,this.coords=new h,this.coords_old=new h,this.diff=new h,this.timer=null,this.container=null,this.docTarget=null,this.listenerTarget=null,this.isHoverInside=!1,this.hasUserControl=!1,this.isAutoActive=!1,this.autoIntensity=2,this.takeoverActive=!1,this.takeoverStartTime=0,this.takeoverDuration=.25,this.takeoverFrom=new h,this.takeoverTo=new h,this.onInteract=null,this._onMouseMove=this.onDocumentMouseMove.bind(this),this._onTouchStart=this.onDocumentTouchStart.bind(this),this._onTouchMove=this.onDocumentTouchMove.bind(this),this._onTouchEnd=this.onTouchEnd.bind(this),this._onDocumentLeave=this.onDocumentLeave.bind(this)}init(e){this.container=e,this.docTarget=e.ownerDocument||null;let t=this.docTarget&&this.docTarget.defaultView||(typeof window<`u`?window:null);t&&(this.listenerTarget=t,this.listenerTarget.addEventListener(`mousemove`,this._onMouseMove),this.listenerTarget.addEventListener(`touchstart`,this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener(`touchmove`,this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener(`touchend`,this._onTouchEnd),this.docTarget&&this.docTarget.addEventListener(`mouseleave`,this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener(`mousemove`,this._onMouseMove),this.listenerTarget.removeEventListener(`touchstart`,this._onTouchStart),this.listenerTarget.removeEventListener(`touchmove`,this._onTouchMove),this.listenerTarget.removeEventListener(`touchend`,this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener(`mouseleave`,this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;let n=this.container.getBoundingClientRect();return n.width===0||n.height===0?!1:e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);let n=this.container.getBoundingClientRect();if(n.width===0||n.height===0)return;let r=(e-n.left)/n.width,i=(t-n.top)/n.height;this.coords.set(r*2-1,-(i*2-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;let t=this.container.getBoundingClientRect();if(t.width===0||t.height===0)return;let n=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(n*2-1,-(r*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(e.touches.length!==1)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(e.touches.length!==1)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){let e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{let t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}let K=new oe;class se{constructor(e,t,n){this.mouse=e,this.manager=t,this.enabled=n.enabled,this.speed=n.speed,this.resumeDelay=n.resumeDelay||3e3,this.rampDurationMs=(n.rampDuration||0)*1e3,this.active=!1,this.current=new h(0,0),this.target=new h,this.lastTime=performance.now(),this.activationTime=0,this.margin=.2,this._tmpDir=new h,this.pickNewTarget()}pickNewTarget(){let e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;let e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let t=(e-this.lastTime)/1e3;this.lastTime=e,t>.2&&(t=.016);let n=this._tmpDir.subVectors(this.target,this.current),r=n.length();if(r<.01){this.pickNewTarget();return}n.normalize();let i=1;if(this.rampDurationMs>0){let t=Math.min(1,(e-this.activationTime)/this.rampDurationMs);i=t*t*(3-2*t)}let a=this.speed*t*i,o=Math.min(a,r);this.current.addScaledVector(n,o),this.mouse.setNormalized(this.current.x,this.current.y)}}let q=`
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`,J=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`;class Y{constructor(e){this.props=e||{},this.uniforms=this.props.material?.uniforms,this.scene=null,this.camera=null,this.material=null,this.geometry=null,this.plane=null}init(){this.scene=new r,this.camera=new l,this.uniforms&&(this.material=new f(this.props.material),this.geometry=new s(2,2),this.plane=new d(this.geometry,this.material),this.scene.add(this.plane))}update(){G.renderer.setRenderTarget(this.props.output||null),G.renderer.render(this.scene,this.camera),G.renderer.setRenderTarget(null)}}class ce extends Y{constructor(e){super({material:{vertexShader:q,fragmentShader:J,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){let e=new te,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute(`position`,new ne(t,3));let n=new f({vertexShader:`
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`,fragmentShader:J,uniforms:this.uniforms});this.line=new ie(e,n),this.scene.add(this.line)}update({dt:e,isBounce:t,BFECC:n}){this.uniforms.dt.value=e,this.line.visible=t,this.uniforms.isBFECC.value=n,super.update()}}class le extends Y{constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();let t=new s(1,1),n=new f({vertexShader:`
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`,fragmentShader:`
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`,blending:2,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new h(0,0)},center:{value:new h(0,0)},scale:{value:new h(e.cursor_size,e.cursor_size)}}});this.mouse=new d(t,n),this.scene.add(this.mouse)}update(e){let t=K.diff.x/2*e.mouse_force,n=K.diff.y/2*e.mouse_force,r=e.cursor_size*e.cellScale.x,i=e.cursor_size*e.cellScale.y,a=Math.min(Math.max(K.coords.x,-1+r+e.cellScale.x*2),1-r-e.cellScale.x*2),o=Math.min(Math.max(K.coords.y,-1+i+e.cellScale.y*2),1-i-e.cellScale.y*2),s=this.mouse.material.uniforms;s.force.value.set(t,n),s.center.value.set(a,o),s.scale.value.set(e.cursor_size,e.cursor_size),super.update()}}class ue extends Y{constructor(e){super({material:{vertexShader:q,fragmentShader:`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
}
`,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({viscous:e,iterations:t,dt:n}){let r,i;this.uniforms.v.value=e;for(let e=0;e<t;e++)e%2==0?(r=this.props.output0,i=this.props.output1):(r=this.props.output1,i=this.props.output0),this.uniforms.velocity_new.value=r.texture,this.props.output=i,this.uniforms.dt.value=n,super.update();return i}}class de extends Y{constructor(e){super({material:{vertexShader:q,fragmentShader:`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e}){this.uniforms.velocity.value=e.texture,super.update()}}class fe extends Y{constructor(e){super({material:{vertexShader:q,fragmentShader:`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({iterations:e}){let t,n;for(let r=0;r<e;r++)r%2==0?(t=this.props.output0,n=this.props.output1):(t=this.props.output1,n=this.props.output0),this.uniforms.pressure.value=t.texture,this.props.output=n,super.update();return n}}class pe extends Y{constructor(e){super({material:{vertexShader:q,fragmentShader:`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e,pressure:t}){this.uniforms.velocity.value=e.texture,this.uniforms.pressure.value=t.texture,super.update()}}class me{constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null},this.fboSize=new h,this.cellScale=new h,this.boundarySpace=new h,this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?ee:g}createAllFBO(){let e={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:p,magFilter:p,wrapS:u,wrapT:u};for(let t in this.fbos)this.fbos[t]=new i(this.fboSize.x,this.fboSize.y,e)}createShaderPass(){this.advection=new ce({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new le({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new ue({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new de({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new fe({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new pe({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){let e=Math.max(1,Math.round(this.options.resolution*G.width)),t=Math.max(1,Math.round(this.options.resolution*G.height)),n=1/e,r=1/t;this.cellScale.set(n,r),this.fboSize.set(e,t)}resize(){this.calcSize();for(let e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});let t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class he{constructor(){this.init()}init(){this.simulation=new me,this.scene=new r,this.camera=new l,this.output=new d(new s(2,2),new f({vertexShader:q,fragmentShader:`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    uniform bool lightMode;
    varying vec2 uv;
    void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    float peak = max(c.r, max(c.g, c.b));
    vec3 chroma = clamp(c / max(peak, 0.0001), 0.0, 1.0);
    chroma = pow(chroma, vec3(1.25));
    vec3 ink = lightMode ? chroma : c;
    vec3 outRGB = mix(bgColor.rgb, ink, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
}
`,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new h},palette:{value:v},bgColor:{value:O},lightMode:{value:I}}})),this.scene.add(this.output)}addScene(e){this.scene.add(e)}resize(){this.simulation.resize()}render(){G.renderer.setRenderTarget(null),G.renderer.render(this.scene,this.camera)}update(){this.simulation.update(),this.render()}}class ge{constructor(e){this.props=e,G.init(e.$wrapper),K.init(e.$wrapper),K.autoIntensity=e.autoIntensity,K.takeoverDuration=e.takeoverDuration,this.lastUserInteraction=performance.now(),K.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new se(K,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),this._loop=this.loop.bind(this),this._resize=this.resize.bind(this),window.addEventListener(`resize`,this._resize),this._onVisibility=()=>{document.hidden?this.pause():H.current&&this.start()},document.addEventListener(`visibilitychange`,this._onVisibility),this.running=!1}init(){this.props.$wrapper.prepend(G.renderer.domElement),this.output=new he}resize(){G.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),K.update(),G.update(),this.output.update()}loop(){this.running&&(this.render(),B.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,B.current&&=(cancelAnimationFrame(B.current),null)}dispose(){try{if(window.removeEventListener(`resize`,this._resize),document.removeEventListener(`visibilitychange`,this._onVisibility),K.dispose(),G.renderer){let e=G.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),G.renderer.dispose(),G.renderer.forceContextLoss()}}catch{}}}let X=L.current;X.style.position=X.style.position||`relative`,X.style.overflow=X.style.overflow||`hidden`;let Z=new ge({$wrapper:X,autoDemo:k,autoSpeed:A,autoIntensity:j,takeoverDuration:M,autoResumeDelay:N,autoRampDuration:P});R.current=Z,(()=>{if(!R.current)return;let r=R.current.output?.simulation;if(!r)return;let i=r.options.resolution;Object.assign(r.options,{mouse_force:e,cursor_size:t,isViscous:n,viscous:y,iterations_viscous:b,iterations_poisson:x,dt:S,BFECC:C,resolution:w,isBounce:T}),w!==i&&r.resize()})(),Z.start();let Q=new IntersectionObserver(e=>{let t=e[0],n=t.isIntersecting&&t.intersectionRatio>0;H.current=n,R.current&&(n&&!document.hidden?R.current.start():R.current.pause())},{threshold:[0,.01,.1]});Q.observe(X),V.current=Q;let $=new ResizeObserver(()=>{R.current&&(U.current&&cancelAnimationFrame(U.current),U.current=requestAnimationFrame(()=>{R.current&&R.current.resize()}))});return $.observe(X),z.current=$,()=>{if(B.current&&cancelAnimationFrame(B.current),z.current)try{z.current.disconnect()}catch{}if(V.current)try{V.current.disconnect()}catch{}R.current&&R.current.dispose(),R.current=null}},[C,t,S,T,n,x,b,e,w,y,E,k,A,j,M,N,P,F,I]),(0,_.useEffect)(()=>{let r=R.current;if(!r)return;let i=r.output?.simulation;if(!i)return;let a=i.options.resolution;Object.assign(i.options,{mouse_force:e,cursor_size:t,isViscous:n,viscous:y,iterations_viscous:b,iterations_poisson:x,dt:S,BFECC:C,resolution:w,isBounce:T}),r.autoDriver&&(r.autoDriver.enabled=k,r.autoDriver.speed=A,r.autoDriver.resumeDelay=N,r.autoDriver.rampDurationMs=P*1e3,r.autoDriver.mouse&&(r.autoDriver.mouse.autoIntensity=j,r.autoDriver.mouse.takeoverDuration=M)),w!==a&&i.resize()},[e,t,n,y,b,x,S,C,w,T,k,A,j,M,N,P]),(0,v.jsx)(`div`,{ref:L,className:`liquid-ether-container ${O||``}`,style:D})}export{y as default};