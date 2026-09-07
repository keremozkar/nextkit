(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6965],{62593:(e,t,r)=>{"use strict";r.d(t,{F:()=>l,o:()=>s});var i=r(95163);class s{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}let n=new i.qUd(-1,1,1,-1,0,1);class a extends i.LoY{constructor(){super(),this.setAttribute("position",new i.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new i.qtW([0,2,0,0,2,0],2))}}let o=new a;class l{constructor(e){this._mesh=new i.eaF(o,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,n)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}},64494:()=>{},86965:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var i=r(95155),s=r(12115),n=r(95163),a=r(36060);let o={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var l=r(62593);class u extends l.o{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof n.BKk?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=n.LlO.clone(e.uniforms),this.material=new n.BKk({name:void 0!==e.name?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new l.F(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class h extends l.o{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let i,s,n=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0),this.inverse?(i=0,s=1):(i=1,s=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,i,0xffffffff),a.buffers.stencil.setClear(s),a.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,0xffffffff),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class c extends l.o{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class f{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),void 0===t){let r=e.getSize(new n.I9Y);this._width=r.width,this._height=r.height,(t=new n.nWS(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:n.ix0})).texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new u(o),this.copyPass.material.blending=n.XIg,this.timer=new n.M4G}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),void 0===e&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),r=!1;for(let t=0,i=this.passes.length;t<i;t++){let i=this.passes[t];if(!1!==i.enabled){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),i.needsSwap){if(r){let t=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==h&&(i instanceof h?r=!0:i instanceof c&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new n.I9Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class m extends l.o{constructor(e,t,r=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new n.Q1f}render(e,t,r){let i,s,n=e.autoClear;e.autoClear=!1,null!==this.overrideMaterial&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),null!==this.clearAlpha&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),!0==this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),!0===this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),null!==this.clearColor&&e.setClearColor(this._oldClearColor),null!==this.clearAlpha&&e.setClearAlpha(i),null!==this.overrideMaterial&&(this.scene.overrideMaterial=s),e.autoClear=n}}let d={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new n.Q1f(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class v extends l.o{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=void 0!==e?new n.I9Y(e.x,e.y):new n.I9Y(256,256),this.clearColor=new n.Q1f(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new n.nWS(s,a,{type:n.ix0}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new n.nWS(s,a,{type:n.ix0});t.texture.name="UnrealBloomPass.h"+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let r=new n.nWS(s,a,{type:n.ix0});r.texture.name="UnrealBloomPass.v"+e,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),s=Math.round(s/2),a=Math.round(a/2)}this.highPassUniforms=n.LlO.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new n.BKk({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];let u=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(u[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new n.I9Y(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new n.Pq0(1,1,1),new n.Pq0(1,1,1),new n.Pq0(1,1,1),new n.Pq0(1,1,1),new n.Pq0(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=n.LlO.clone(o.uniforms),this.blendMaterial=new n.BKk({uniforms:this.copyUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,premultipliedAlpha:!0,blending:n.EZo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new n.Q1f,this._oldClearAlpha=1,this._basic=new n.V9B,this._fsQuad=new l.F(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(r,i);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(r,i),this.renderTargetsVertical[e].setSize(r,i),this.separableBlurMaterials[e].uniforms.invSize.value=new n.I9Y(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2)}render(e,t,r,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let t=0;t<this.nMips;t++)this._fsQuad.material=this.separableBlurMaterials[t],this.separableBlurMaterials[t].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[t].uniforms.direction.value=v.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[t]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[t].uniforms.colorTexture.value=this.renderTargetsHorizontal[t].texture,this.separableBlurMaterials[t].uniforms.direction.value=v.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[t]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[t];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(r),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){let t=[],r=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(r*r))/r);return new n.BKk({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new n.I9Y(.5,.5)},direction:{value:new n.I9Y(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new n.BKk({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}v.BlurDirectionX=new n.I9Y(1,0),v.BlurDirectionY=new n.I9Y(0,1),r(64494);let p=e=>{let{className:t,style:r,trailLength:o=50,inertia:l=.5,grainIntensity:h=.05,bloomStrength:c=.1,bloomRadius:d=1,bloomThreshold:p=.025,brightness:g=1,color:x="#B497CF",mixBlendMode:b="screen",edgeIntensity:T=0,maxDevicePixelRatio:M=.5,targetPixels:w,fadeDelayMs:C,fadeDurationMs:_,zIndex:S=10}=e,y=(0,s.useRef)(null),R=(0,s.useRef)(null),B=(0,s.useRef)(null),P=(0,s.useRef)(null),E=(0,s.useRef)(null),D=(0,s.useRef)(null),U=(0,s.useRef)([]),A=(0,s.useRef)(0),F=(0,s.useRef)(null),L=(0,s.useRef)(null),z=(0,s.useRef)(new n.I9Y(.5,.5)),I=(0,s.useRef)(new n.I9Y(0,0)),k=(0,s.useRef)(1),Q=(0,s.useRef)("undefined"!=typeof performance?performance.now():Date.now()),O=(0,s.useRef)(!1),Y=(0,s.useRef)(!1),q=(0,s.useRef)(!1),V=(0,s.useMemo)(()=>"ontouchstart"in window||navigator.maxTouchPoints>0,[]),H=null!=w?w:V?9e5:13e5,N=null!=C?C:V?500:1e3,W=null!=_?_:V?1e3:1500,K=(0,s.useMemo)(()=>({uniforms:{tDiffuse:{value:null},iTime:{value:0},intensity:{value:h}},vertexShader:"\n        varying vec2 vUv;\n        void main(){\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",fragmentShader:"\n        uniform sampler2D tDiffuse;\n        uniform float iTime;\n        uniform float intensity;\n        varying vec2 vUv;\n\n        float hash1(float n){ return fract(sin(n)*43758.5453); }\n\n        void main(){\n          vec4 color = texture2D(tDiffuse, vUv);\n          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;\n          color.rgb += n * intensity * color.rgb;\n          gl_FragColor = color;\n        }\n      "}),[h]),j=(0,s.useMemo)(()=>new u({uniforms:{tDiffuse:{value:null}},vertexShader:"\n          varying vec2 vUv;\n          void main(){\n            vUv = uv;\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n          }\n        ",fragmentShader:"\n          uniform sampler2D tDiffuse;\n          varying vec2 vUv;\n          void main(){\n            vec4 c = texture2D(tDiffuse, vUv);\n            float coverage = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);\n            vec3 straight = coverage > 1e-5 ? c.rgb / coverage : vec3(0.0);\n            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), coverage);\n          }\n        "}),[]);(0,s.useEffect)(()=>{let e=y.current,t=null==e?void 0:e.parentElement;if(!e||!t)return;let r=!0,i=t.style.position;i&&"static"!==i||(t.style.position="relative");let s=new a.WebGLRenderer({antialias:!V,alpha:!0,depth:!1,stencil:!1,powerPreference:V?"low-power":"high-performance",premultipliedAlpha:!1,preserveDrawingBuffer:!1});s.setClearColor(0,0),R.current=s,s.domElement.style.pointerEvents="none",b?s.domElement.style.mixBlendMode=String(b):s.domElement.style.removeProperty("mix-blend-mode"),e.appendChild(s.domElement);let h=new n.Z58,w=new n.qUd(-1,1,1,-1,0,1),C=new n.bdM(2,2),_=Math.max(1,Math.floor(o));U.current=Array.from({length:_},()=>new n.I9Y(.5,.5)),A.current=0;let S=new n.Q1f(x),X=new n.BKk({defines:{MAX_TRAIL_LENGTH:_},uniforms:{iTime:{value:0},iResolution:{value:new n.Pq0(1,1,1)},iMouse:{value:new n.I9Y(.5,.5)},iPrevMouse:{value:U.current.map(e=>e.clone())},iOpacity:{value:1},iScale:{value:1},iBaseColor:{value:new n.Pq0(S.r,S.g,S.b)},iBrightness:{value:g},iEdgeIntensity:{value:T}},vertexShader:"\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = vec4(position, 1.0);\n    }\n  ",fragmentShader:"\n    uniform float iTime;\n    uniform vec3  iResolution;\n    uniform vec2  iMouse;\n    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];\n    uniform float iOpacity;\n    uniform float iScale;\n    uniform vec3  iBaseColor;\n    uniform float iBrightness;\n    uniform float iEdgeIntensity;\n    varying vec2  vUv;\n\n    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }\n    float noise(vec2 p){\n      vec2 i = floor(p), f = fract(p);\n      f *= f * (3. - 2. * f);\n      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),\n                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);\n    }\n    float fbm(vec2 p){\n      float v = 0.0;\n      float a = 0.5;\n      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\n      for(int i=0;i<5;i++){\n        v += a * noise(p);\n        p = m * p * 2.0;\n        a *= 0.5;\n      }\n      return v;\n    }\n    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }\n    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }\n\n    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {\n      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));\n      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));\n\n      float smoke = fbm(p * iScale + r * 0.8);\n      float radius = 0.5 + 0.3 * (1.0 / iScale);\n      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));\n      float alpha = pow(smoke, 2.5) * distFactor;\n\n      vec3 c1 = tint1(iBaseColor);\n      vec3 c2 = tint2(iBaseColor);\n      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);\n\n      return vec4(color * alpha * intensity, alpha * intensity);\n    }\n\n    void main() {\n      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\n      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\n\n      vec3 colorAcc = vec3(0.0);\n      float alphaAcc = 0.0;\n\n      vec4 b = blob(uv, mouse, 1.0, iOpacity);\n      colorAcc += b.rgb;\n      alphaAcc += b.a;\n\n      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {\n        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\n        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);\n        t = pow(t, 2.0);\n        if (t > 0.01) {\n          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);\n          colorAcc += bt.rgb;\n          alphaAcc += bt.a;\n        }\n      }\n\n      colorAcc *= iBrightness;\n\n      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;\n      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));\n      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);\n      float k = clamp(iEdgeIntensity, 0.0, 1.0);\n      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);\n\n      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);\n      gl_FragColor = vec4(colorAcc, outAlpha);\n    }\n  ",transparent:!0,depthTest:!1,depthWrite:!1});P.current=X;let G=new n.eaF(C,X);h.add(G);let Z=new f(s);B.current=Z;let J=new m(h,w);Z.addPass(J);let $=new v(new n.I9Y(1,1),c,d,p);E.current=$,Z.addPass($);let ee=new u(K);D.current=ee,Z.addPass(ee),Z.addPass(j);let et=()=>{var t;if(!r)return;let i=e.getBoundingClientRect(),n=Math.floor(i.width),a=Math.floor(i.height);if(n<=0||a<=0){q.current=!1;return}let o=Math.min(window.devicePixelRatio||1,M),l=n*a*o*o,u=o*(l<=H?1:Math.max(.5,Math.min(1,Math.sqrt(H/Math.max(1,l)))));s.setPixelRatio(u),s.setSize(n,a,!1),null==(t=Z.setPixelRatio)||t.call(Z,u),Z.setSize(n,a);let h=Math.max(1,Math.floor(n*u)),c=Math.max(1,Math.floor(a*u));X.uniforms.iResolution.value.set(h,c,1),X.uniforms.iScale.value=function(e){let t=e.getBoundingClientRect();return Math.max(.5,Math.min(2,Math.min(Math.max(1,t.width),Math.max(1,t.height))/600))}(e),$.setSize(h,c),q.current=!0};et();let er=new ResizeObserver(()=>{r&&et()});L.current=er,er.observe(t),er.observe(e);let ei="undefined"!=typeof performance?performance.now():Date.now(),es=()=>{var e,t;if(!r)return;if(!q.current){F.current=requestAnimationFrame(es);return}let i=performance.now(),s=(i-ei)/1e3,n=P.current,a=B.current;if(O.current)I.current.set(z.current.x-n.uniforms.iMouse.value.x,z.current.y-n.uniforms.iMouse.value.y),n.uniforms.iMouse.value.copy(z.current),k.current=1;else{I.current.multiplyScalar(l),I.current.lengthSq()>1e-6&&n.uniforms.iMouse.value.add(I.current);let e=i-Q.current;e>N&&(k.current=Math.max(0,1-Math.min(1,(e-N)/W)))}let o=U.current.length;A.current=(A.current+1)%o,U.current[A.current].copy(n.uniforms.iMouse.value);let u=n.uniforms.iPrevMouse.value;for(let e=0;e<o;e++){let t=(A.current-e+o)%o;u[e].copy(U.current[t])}if(n.uniforms.iOpacity.value=k.current,n.uniforms.iTime.value=s,(null==(t=D.current)||null==(e=t.uniforms)?void 0:e.iTime)&&(D.current.uniforms.iTime.value=s),a.render(),!O.current&&k.current<=.001){Y.current=!1,F.current=null;return}F.current=requestAnimationFrame(es)},en=()=>{Y.current||(Y.current=!0,F.current=requestAnimationFrame(es))},ea=e=>{let r=t.getBoundingClientRect(),i=n.cj9.clamp((e.clientX-r.left)/Math.max(1,r.width),0,1),s=n.cj9.clamp(1-(e.clientY-r.top)/Math.max(1,r.height),0,1);z.current.set(i,s),O.current=!0,Q.current=performance.now(),en()},eo=()=>{O.current=!0,en()},el=()=>{O.current=!1,Q.current=performance.now(),en()};return t.addEventListener("pointermove",ea,{passive:!0}),t.addEventListener("pointerenter",eo,{passive:!0}),t.addEventListener("pointerleave",el,{passive:!0}),en(),()=>{var e;r=!1,q.current=!1,F.current&&cancelAnimationFrame(F.current),Y.current=!1,F.current=null,t.removeEventListener("pointermove",ea),t.removeEventListener("pointerenter",eo),t.removeEventListener("pointerleave",el),null==(e=L.current)||e.disconnect(),h.clear(),C.dispose(),X.dispose(),P.current=null,Z.dispose(),B.current=null,s.dispose(),s.forceContextLoss(),R.current=null,s.domElement&&s.domElement.parentElement&&s.domElement.parentElement.removeChild(s.domElement),i&&"static"!==i||(t.style.position=i)}},[o,l,h,c,d,p,H,N,W,V,x,g,b,T]),(0,s.useEffect)(()=>{if(P.current){let e=new n.Q1f(x);P.current.uniforms.iBaseColor.value.set(e.r,e.g,e.b)}},[x]),(0,s.useEffect)(()=>{P.current&&(P.current.uniforms.iBrightness.value=g)},[g]),(0,s.useEffect)(()=>{P.current&&(P.current.uniforms.iEdgeIntensity.value=T)},[T]),(0,s.useEffect)(()=>{var e,t;(null==(t=D.current)||null==(e=t.uniforms)?void 0:e.intensity)&&(D.current.uniforms.intensity.value=h)},[h]),(0,s.useEffect)(()=>{var e;let t=null==(e=R.current)?void 0:e.domElement;t&&(b?t.style.mixBlendMode=String(b):t.style.removeProperty("mix-blend-mode"))},[b]);let X=(0,s.useMemo)(()=>({zIndex:S,...r}),[S,r]);return(0,i.jsx)("div",{ref:y,className:"ghost-cursor ".concat(null!=t?t:""),style:X})}}}]);