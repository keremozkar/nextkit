import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";var r=e(t(),1),i=n();function a({SIM_RESOLUTION:e=128,DYE_RESOLUTION:t=1440,CAPTURE_RESOLUTION:n=512,DENSITY_DISSIPATION:a=3.5,VELOCITY_DISSIPATION:o=2,PRESSURE:s=.1,PRESSURE_ITERATIONS:c=20,CURL:l=3,SPLAT_RADIUS:u=.2,SPLAT_FORCE:ee=6e3,SHADING:te=!0,COLOR_UPDATE_SPEED:ne=10,BACK_COLOR:re={r:.5,g:0,b:0},TRANSPARENT:ie=!0,RAINBOW_MODE:ae=!0,COLOR:oe=`#ff0000`}){let d=(0,r.useRef)(null),f=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let r=d.current;if(!r)return;let i=!0;function se(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}let p={SIM_RESOLUTION:e,DYE_RESOLUTION:t,CAPTURE_RESOLUTION:n,DENSITY_DISSIPATION:a,VELOCITY_DISSIPATION:o,PRESSURE:s,PRESSURE_ITERATIONS:c,CURL:l,SPLAT_RADIUS:u,SPLAT_FORCE:ee,SHADING:te,COLOR_UPDATE_SPEED:ne,PAUSED:!1,BACK_COLOR:re,TRANSPARENT:ie,RAINBOW_MODE:ae,COLOR:oe},m=[new se],{gl:h,ext:g}=ce(r);g.supportLinearFiltering||(p.DYE_RESOLUTION=256,p.SHADING=!1);function ce(e){let t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext(`webgl2`,t),r=!!n;r||(n=e.getContext(`webgl`,t)||e.getContext(`experimental-webgl`,t));let i,a;r?(n.getExtension(`EXT_color_buffer_float`),a=n.getExtension(`OES_texture_float_linear`)):(i=n.getExtension(`OES_texture_half_float`),a=n.getExtension(`OES_texture_half_float_linear`)),n.clearColor(0,0,0,1);let o=r?n.HALF_FLOAT:i&&i.HALF_FLOAT_OES,s,c,l;return r?(s=_(n,n.RGBA16F,n.RGBA,o),c=_(n,n.RG16F,n.RG,o),l=_(n,n.R16F,n.RED,o)):(s=_(n,n.RGBA,n.RGBA,o),c=_(n,n.RGBA,n.RGBA,o),l=_(n,n.RGBA,n.RGBA,o)),{gl:n,ext:{formatRGBA:s,formatRG:c,formatR:l,halfFloatTexType:o,supportLinearFiltering:a}}}function _(e,t,n,r){if(!le(e,t,n,r))switch(t){case e.R16F:return _(e,e.RG16F,e.RG,r);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,r);default:return null}return{internalFormat:t,format:n}}function le(e,t,n,r){let i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,n,r,null);let a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE}class ue{constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let t=0;for(let n=0;n<e.length;n++)t+=ze(e[n]);let n=this.programs[t];if(n==null){let r=x(h.FRAGMENT_SHADER,this.fragmentShaderSource,e);n=y(this.vertexShader,r),this.programs[t]=n}n!==this.activeProgram&&(this.uniforms=b(n),this.activeProgram=n)}bind(){h.useProgram(this.activeProgram)}}class v{constructor(e,t){this.uniforms={},this.program=y(e,t),this.uniforms=b(this.program)}bind(){h.useProgram(this.program)}}function y(e,t){let n=h.createProgram();return h.attachShader(n,e),h.attachShader(n,t),h.linkProgram(n),h.getProgramParameter(n,h.LINK_STATUS)||console.trace(h.getProgramInfoLog(n)),n}function b(e){let t=[],n=h.getProgramParameter(e,h.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let n=h.getActiveUniform(e,r).name;t[n]=h.getUniformLocation(e,n)}return t}function x(e,t,n){t=de(t,n);let r=h.createShader(e);return h.shaderSource(r,t),h.compileShader(r),h.getShaderParameter(r,h.COMPILE_STATUS)||console.trace(h.getShaderInfoLog(r)),r}function de(e,t){if(!t)return e;let n=``;return t.forEach(e=>{n+=`#define `+e+`
`}),n+e}let S=x(h.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),fe=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),pe=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `),me=x(h.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),he=x(h.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,g.supportLinearFiltering?null:[`MANUAL_FILTERING`]),ge=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),_e=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),ve=x(h.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),ye=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),be=x(h.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),C=(h.bindBuffer(h.ARRAY_BUFFER,h.createBuffer()),h.bufferData(h.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),h.STATIC_DRAW),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,h.createBuffer()),h.bufferData(h.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),h.STATIC_DRAW),h.vertexAttribPointer(0,2,h.FLOAT,!1,0,0),h.enableVertexAttribArray(0),(e,t=!1)=>{e==null?(h.viewport(0,0,h.drawingBufferWidth,h.drawingBufferHeight),h.bindFramebuffer(h.FRAMEBUFFER,null)):(h.viewport(0,0,e.width,e.height),h.bindFramebuffer(h.FRAMEBUFFER,e.fbo)),t&&(h.clearColor(0,0,0,1),h.clear(h.COLOR_BUFFER_BIT)),h.drawElements(h.TRIANGLES,6,h.UNSIGNED_SHORT,0)}),w,T,E,D,O,k=new v(S,fe),A=new v(S,pe),j=new v(S,me),M=new v(S,he),N=new v(S,ge),P=new v(S,_e),F=new v(S,ve),I=new v(S,ye),L=new v(S,be),R=new ue(S,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `);function z(){let e=X(p.SIM_RESOLUTION),t=X(p.DYE_RESOLUTION),n=g.halfFloatTexType,r=g.formatRGBA,i=g.formatRG,a=g.formatR,o=g.supportLinearFiltering?h.LINEAR:h.NEAREST;h.disable(h.BLEND),w=w?H(w,t.width,t.height,r.internalFormat,r.format,n,o):V(t.width,t.height,r.internalFormat,r.format,n,o),T=T?H(T,e.width,e.height,i.internalFormat,i.format,n,o):V(e.width,e.height,i.internalFormat,i.format,n,o),E=B(e.width,e.height,a.internalFormat,a.format,n,h.NEAREST),D=B(e.width,e.height,a.internalFormat,a.format,n,h.NEAREST),O=V(e.width,e.height,a.internalFormat,a.format,n,h.NEAREST)}function B(e,t,n,r,i,a){h.activeTexture(h.TEXTURE0);let o=h.createTexture();h.bindTexture(h.TEXTURE_2D,o),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,a),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,a),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),h.texImage2D(h.TEXTURE_2D,0,n,e,t,0,r,i,null);let s=h.createFramebuffer();return h.bindFramebuffer(h.FRAMEBUFFER,s),h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,o,0),h.viewport(0,0,e,t),h.clear(h.COLOR_BUFFER_BIT),{texture:o,fbo:s,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach(e){return h.activeTexture(h.TEXTURE0+e),h.bindTexture(h.TEXTURE_2D,o),e}}}function V(e,t,n,r,i,a){let o=B(e,t,n,r,i,a),s=B(e,t,n,r,i,a);return{width:e,height:t,texelSizeX:o.texelSizeX,texelSizeY:o.texelSizeY,get read(){return o},set read(e){o=e},get write(){return s},set write(e){s=e},swap(){let e=o;o=s,s=e}}}function xe(e,t,n,r,i,a,o){let s=B(t,n,r,i,a,o);return k.bind(),h.uniform1i(k.uniforms.uTexture,e.attach(0)),C(s),s}function H(e,t,n,r,i,a,o){return e.width===t&&e.height===n?e:(e.read=xe(e.read,t,n,r,i,a,o),e.write=B(t,n,r,i,a,o),e.width=t,e.height=n,e.texelSizeX=1/t,e.texelSizeY=1/n,e)}function Se(){let e=[];p.SHADING&&e.push(`SHADING`),R.setKeywords(e)}Se(),z();let U=Date.now(),W=0;function G(){if(!i)return;let e=Ce();we()&&z(),Te(e),Ee(),De(e),Oe(null),f.current=requestAnimationFrame(G)}function Ce(){let e=Date.now(),t=(e-U)/1e3;return t=Math.min(t,.016666),U=e,t}function we(){let e=Z(r.clientWidth),t=Z(r.clientHeight);return r.width!==e||r.height!==t?(r.width=e,r.height=t,!0):!1}function Te(e){W+=e*p.COLOR_UPDATE_SPEED,W>=1&&(W=Re(W,0,1),m.forEach(e=>{e.color=Y()}))}function Ee(){m.forEach(e=>{e.moved&&(e.moved=!1,Ae(e))})}function De(e){h.disable(h.BLEND),P.bind(),h.uniform2f(P.uniforms.texelSize,T.texelSizeX,T.texelSizeY),h.uniform1i(P.uniforms.uVelocity,T.read.attach(0)),C(D),F.bind(),h.uniform2f(F.uniforms.texelSize,T.texelSizeX,T.texelSizeY),h.uniform1i(F.uniforms.uVelocity,T.read.attach(0)),h.uniform1i(F.uniforms.uCurl,D.attach(1)),h.uniform1f(F.uniforms.curl,p.CURL),h.uniform1f(F.uniforms.dt,e),C(T.write),T.swap(),N.bind(),h.uniform2f(N.uniforms.texelSize,T.texelSizeX,T.texelSizeY),h.uniform1i(N.uniforms.uVelocity,T.read.attach(0)),C(E),A.bind(),h.uniform1i(A.uniforms.uTexture,O.read.attach(0)),h.uniform1f(A.uniforms.value,p.PRESSURE),C(O.write),O.swap(),I.bind(),h.uniform2f(I.uniforms.texelSize,T.texelSizeX,T.texelSizeY),h.uniform1i(I.uniforms.uDivergence,E.attach(0));for(let e=0;e<p.PRESSURE_ITERATIONS;e++)h.uniform1i(I.uniforms.uPressure,O.read.attach(1)),C(O.write),O.swap();L.bind(),h.uniform2f(L.uniforms.texelSize,T.texelSizeX,T.texelSizeY),h.uniform1i(L.uniforms.uPressure,O.read.attach(0)),h.uniform1i(L.uniforms.uVelocity,T.read.attach(1)),C(T.write),T.swap(),M.bind(),h.uniform2f(M.uniforms.texelSize,T.texelSizeX,T.texelSizeY),g.supportLinearFiltering||h.uniform2f(M.uniforms.dyeTexelSize,T.texelSizeX,T.texelSizeY);let t=T.read.attach(0);h.uniform1i(M.uniforms.uVelocity,t),h.uniform1i(M.uniforms.uSource,t),h.uniform1f(M.uniforms.dt,e),h.uniform1f(M.uniforms.dissipation,p.VELOCITY_DISSIPATION),C(T.write),T.swap(),g.supportLinearFiltering||h.uniform2f(M.uniforms.dyeTexelSize,w.texelSizeX,w.texelSizeY),h.uniform1i(M.uniforms.uVelocity,T.read.attach(0)),h.uniform1i(M.uniforms.uSource,w.read.attach(1)),h.uniform1f(M.uniforms.dissipation,p.DENSITY_DISSIPATION),C(w.write),w.swap()}function Oe(e){h.blendFunc(h.ONE,h.ONE_MINUS_SRC_ALPHA),h.enable(h.BLEND),ke(e)}function ke(e){let t=e==null?h.drawingBufferWidth:e.width,n=e==null?h.drawingBufferHeight:e.height;R.bind(),p.SHADING&&h.uniform2f(R.uniforms.texelSize,1/t,1/n),h.uniform1i(R.uniforms.uTexture,w.read.attach(0)),C(e)}function Ae(e){let t=e.deltaX*p.SPLAT_FORCE,n=e.deltaY*p.SPLAT_FORCE;K(e.texcoordX,e.texcoordY,t,n,e.color)}function je(e){let t=Y();t.r*=10,t.g*=10,t.b*=10;let n=10*(Math.random()-.5),r=30*(Math.random()-.5);K(e.texcoordX,e.texcoordY,n,r,t)}function K(e,t,n,i,a){j.bind(),h.uniform1i(j.uniforms.uTarget,T.read.attach(0)),h.uniform1f(j.uniforms.aspectRatio,r.width/r.height),h.uniform2f(j.uniforms.point,e,t),h.uniform3f(j.uniforms.color,n,i,0),h.uniform1f(j.uniforms.radius,Me(p.SPLAT_RADIUS/100)),C(T.write),T.swap(),h.uniform1i(j.uniforms.uTarget,w.read.attach(0)),h.uniform3f(j.uniforms.color,a.r,a.g,a.b),C(w.write),w.swap()}function Me(e){let t=r.width/r.height;return t>1&&(e*=t),e}function q(e,t,n,i){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=n/r.width,e.texcoordY=1-i/r.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Y()}function J(e,t,n,i){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/r.width,e.texcoordY=1-n/r.height,e.deltaX=Pe(e.texcoordX-e.prevTexcoordX),e.deltaY=Fe(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function Ne(e){e.down=!1}function Pe(e){let t=r.width/r.height;return t<1&&(e*=t),e}function Fe(e){let t=r.width/r.height;return t>1&&(e/=t),e}function Ie(e){let t=e.replace(`#`,``);t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);let n=parseInt(t.slice(0,2),16)/255,r=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255;return{r:n*.15,g:r*.15,b:i*.15}}function Y(){if(!p.RAINBOW_MODE)return Ie(p.COLOR);let e=Le(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function Le(e,t,n){let r,i,a,o,s,c,l,u;switch(o=Math.floor(e*6),s=e*6-o,c=n*(1-t),l=n*(1-s*t),u=n*(1-(1-s)*t),o%6){case 0:r=n,i=u,a=c;break;case 1:r=l,i=n,a=c;break;case 2:r=c,i=n,a=u;break;case 3:r=c,i=l,a=n;break;case 4:r=u,i=c,a=n;break;case 5:r=n,i=c,a=l}return{r,g:i,b:a}}function Re(e,t,n){let r=n-t;return r===0?t:(e-t)%r+t}function X(e){let t=h.drawingBufferWidth/h.drawingBufferHeight;t<1&&(t=1/t);let n=Math.round(e),r=Math.round(e*t);return h.drawingBufferWidth>h.drawingBufferHeight?{width:r,height:n}:{width:n,height:r}}function Z(e){let t=window.devicePixelRatio||1;return Math.floor(e*t)}function ze(e){if(e.length===0)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}function Q(e){let t=m[0];q(t,-1,Z(e.clientX),Z(e.clientY)),je(t)}let Be=!1;function Ve(e){let t=m[0],n=Z(e.clientX),r=Z(e.clientY);Be?J(t,n,r,t.color):(J(t,n,r,Y()),Be=!0)}function He(e){let t=e.targetTouches,n=m[0];for(let e=0;e<t.length;e++){let r=Z(t[e].clientX),i=Z(t[e].clientY);q(n,t[e].identifier,r,i)}}function Ue(e){let t=e.targetTouches,n=m[0];for(let e=0;e<t.length;e++)J(n,Z(t[e].clientX),Z(t[e].clientY),n.color)}function $(e){let t=e.changedTouches,n=m[0];for(let e=0;e<t.length;e++)Ne(n)}return window.addEventListener(`mousedown`,Q),window.addEventListener(`mousemove`,Ve),window.addEventListener(`touchstart`,He),window.addEventListener(`touchmove`,Ue,!1),window.addEventListener(`touchend`,$),G(),()=>{i=!1,f.current&&=(cancelAnimationFrame(f.current),null),window.removeEventListener(`mousedown`,Q),window.removeEventListener(`mousemove`,Ve),window.removeEventListener(`touchstart`,He),window.removeEventListener(`touchmove`,Ue),window.removeEventListener(`touchend`,$)}},[]),(0,i.jsx)(`div`,{style:{position:`fixed`,top:0,left:0,zIndex:50,pointerEvents:`none`,width:`100%`,height:`100%`},children:(0,i.jsx)(`canvas`,{ref:d,id:`fluid`,style:{width:`100vw`,height:`100vh`,display:`block`}})})}export{a as default};