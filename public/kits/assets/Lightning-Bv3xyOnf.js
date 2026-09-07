import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";var r=e(t(),1),i=n(),a=({hue:e=230,xOffset:t=0,speed:n=1,intensity:a=1,size:o=1})=>{let s=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let r=s.current;if(!r)return;let i=()=>{r.width=r.clientWidth,r.height=r.clientHeight};i(),window.addEventListener(`resize`,i);let c=r.getContext(`webgl`,{alpha:!0,premultipliedAlpha:!1});if(!c){console.error(`WebGL not supported`);return}let l=(e,t)=>{let n=c.createShader(t);return n?(c.shaderSource(n,e),c.compileShader(n),c.getShaderParameter(n,c.COMPILE_STATUS)?n:(console.error(`Shader compile error:`,c.getShaderInfoLog(n)),c.deleteShader(n),null)):null},u=l(`
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,c.VERTEX_SHADER),d=l(`
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
          fragColor = vec4(col, a);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `,c.FRAGMENT_SHADER);if(!u||!d)return;let f=c.createProgram();if(!f)return;if(c.attachShader(f,u),c.attachShader(f,d),c.linkProgram(f),!c.getProgramParameter(f,c.LINK_STATUS)){console.error(`Program linking error:`,c.getProgramInfoLog(f));return}c.useProgram(f);let p=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),m=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,m),c.bufferData(c.ARRAY_BUFFER,p,c.STATIC_DRAW);let h=c.getAttribLocation(f,`aPosition`);c.enableVertexAttribArray(h),c.vertexAttribPointer(h,2,c.FLOAT,!1,0,0);let g=c.getUniformLocation(f,`iResolution`),_=c.getUniformLocation(f,`iTime`),v=c.getUniformLocation(f,`uHue`),y=c.getUniformLocation(f,`uXOffset`),b=c.getUniformLocation(f,`uSpeed`),x=c.getUniformLocation(f,`uIntensity`),S=c.getUniformLocation(f,`uSize`),C,w=performance.now(),T=()=>{i(),c.viewport(0,0,r.width,r.height),c.uniform2f(g,r.width,r.height);let s=performance.now();c.uniform1f(_,(s-w)/1e3),c.uniform1f(v,e),c.uniform1f(y,t),c.uniform1f(b,n),c.uniform1f(x,a),c.uniform1f(S,o),c.drawArrays(c.TRIANGLES,0,6),C=requestAnimationFrame(T)};return C=requestAnimationFrame(T),()=>{cancelAnimationFrame(C),window.removeEventListener(`resize`,i)}},[e,t,n,a,o]),(0,i.jsx)(`canvas`,{ref:s,className:`lightning-container`})};export{a as default};