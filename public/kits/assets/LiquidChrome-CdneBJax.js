import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{a as r,i,t as a}from"./Mesh-D48iXpEj.js";import{t as o}from"./Triangle-qjVMgwr4.js";var s=e(t(),1),c=n(),l=({baseColor:e=[.1,.1,.1],speed:t=.2,amplitude:n=.3,frequencyX:l=3,frequencyY:u=3,interactive:d=!0,...f})=>{let p=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(!p.current)return;let s=p.current,c=new i({antialias:!0}),f=c.gl;f.clearColor(1,1,1,1);let m=new o(f),h=new r(f,{vertex:`
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,fragment:`
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `,uniforms:{uTime:{value:0},uResolution:{value:new Float32Array([f.canvas.width,f.canvas.height,f.canvas.width/f.canvas.height])},uBaseColor:{value:new Float32Array(e)},uAmplitude:{value:n},uFrequencyX:{value:l},uFrequencyY:{value:u},uMouse:{value:new Float32Array([0,0])}}}),g=new a(f,{geometry:m,program:h});function _(){c.setSize(s.offsetWidth*1,s.offsetHeight*1);let e=h.uniforms.uResolution.value;e[0]=f.canvas.width,e[1]=f.canvas.height,e[2]=f.canvas.width/f.canvas.height}window.addEventListener(`resize`,_),_();function v(e){let t=s.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height,i=h.uniforms.uMouse.value;i[0]=n,i[1]=r}function y(e){if(e.touches.length>0){let t=e.touches[0],n=s.getBoundingClientRect(),r=(t.clientX-n.left)/n.width,i=1-(t.clientY-n.top)/n.height,a=h.uniforms.uMouse.value;a[0]=r,a[1]=i}}d&&(s.addEventListener(`mousemove`,v),s.addEventListener(`touchmove`,y));let b;function x(e){b=requestAnimationFrame(x),h.uniforms.uTime.value=e*.001*t,c.render({scene:g})}return b=requestAnimationFrame(x),s.appendChild(f.canvas),()=>{cancelAnimationFrame(b),window.removeEventListener(`resize`,_),d&&(s.removeEventListener(`mousemove`,v),s.removeEventListener(`touchmove`,y)),f.canvas.parentElement&&f.canvas.parentElement.removeChild(f.canvas),f.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,l,u,d]),(0,c.jsx)(`div`,{ref:p,className:`liquidChrome-container`,...f})};export{l as LiquidChrome,l as default};