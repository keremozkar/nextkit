import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";import{t as r}from"./gsap-CvDoa17S.js";var i=e(t(),1),a=n(),o=12,s=300,c=`132, 0, 255`,l=768,u=[{color:`#120F17`,title:`Analytics`,description:`Track user behavior`,label:`Insights`},{color:`#120F17`,title:`Dashboard`,description:`Centralized data view`,label:`Overview`},{color:`#120F17`,title:`Collaboration`,description:`Work together seamlessly`,label:`Teamwork`},{color:`#120F17`,title:`Automation`,description:`Streamline workflows`,label:`Efficiency`},{color:`#120F17`,title:`Integration`,description:`Connect favorite tools`,label:`Connectivity`},{color:`#120F17`,title:`Security`,description:`Enterprise-grade protection`,label:`Protection`}],d=(e,t,n=c)=>{let r=document.createElement(`div`);return r.className=`particle`,r.style.cssText=`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${n}, 1);
    box-shadow: 0 0 6px rgba(${n}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${e}px;
    top: ${t}px;
  `,r},f=e=>({proximity:e*.5,fadeDistance:e*.75}),p=(e,t,n,r,i)=>{let a=e.getBoundingClientRect(),o=(t-a.left)/a.width*100,s=(n-a.top)/a.height*100;e.style.setProperty(`--glow-x`,`${o}%`),e.style.setProperty(`--glow-y`,`${s}%`),e.style.setProperty(`--glow-intensity`,r.toString()),e.style.setProperty(`--glow-radius`,`${i}px`)},m=({children:e,className:t=``,disableAnimations:n=!1,style:s,particleCount:l=o,glowColor:u=c,enableTilt:f=!0,clickEffect:p=!1,enableMagnetism:m=!1})=>{let h=(0,i.useRef)(null),g=(0,i.useRef)([]),_=(0,i.useRef)([]),v=(0,i.useRef)(!1),y=(0,i.useRef)([]),b=(0,i.useRef)(!1),x=(0,i.useRef)(null),S=(0,i.useCallback)(()=>{if(b.current||!h.current)return;let{width:e,height:t}=h.current.getBoundingClientRect();y.current=Array.from({length:l},()=>d(Math.random()*e,Math.random()*t,u)),b.current=!0},[l,u]),C=(0,i.useCallback)(()=>{_.current.forEach(clearTimeout),_.current=[],x.current?.kill(),g.current.forEach(e=>{r.to(e,{scale:0,opacity:0,duration:.3,ease:`back.in(1.7)`,onComplete:()=>{e.parentNode?.removeChild(e)}})}),g.current=[]},[]),w=(0,i.useCallback)(()=>{h.current&&v.current&&(b.current||S(),y.current.forEach((e,t)=>{let n=setTimeout(()=>{if(!v.current||!h.current)return;let t=e.cloneNode(!0);h.current.appendChild(t),g.current.push(t),r.fromTo(t,{scale:0,opacity:0},{scale:1,opacity:1,duration:.3,ease:`back.out(1.7)`}),r.to(t,{x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,rotation:Math.random()*360,duration:2+Math.random()*2,ease:`none`,repeat:-1,yoyo:!0}),r.to(t,{opacity:.3,duration:1.5,ease:`power2.inOut`,repeat:-1,yoyo:!0})},t*100);_.current.push(n)}))},[S]);return(0,i.useEffect)(()=>{if(n||!h.current)return;let e=h.current,t=()=>{v.current=!0,w(),f&&r.to(e,{rotateX:5,rotateY:5,duration:.3,ease:`power2.out`,transformPerspective:1e3})},i=()=>{v.current=!1,C(),f&&r.to(e,{rotateX:0,rotateY:0,duration:.3,ease:`power2.out`}),m&&r.to(e,{x:0,y:0,duration:.3,ease:`power2.out`})},a=t=>{if(!f&&!m)return;let n=e.getBoundingClientRect(),i=t.clientX-n.left,a=t.clientY-n.top,o=n.width/2,s=n.height/2;if(f){let t=(a-s)/s*-10,n=(i-o)/o*10;r.to(e,{rotateX:t,rotateY:n,duration:.1,ease:`power2.out`,transformPerspective:1e3})}if(m){let t=(i-o)*.05,n=(a-s)*.05;x.current=r.to(e,{x:t,y:n,duration:.3,ease:`power2.out`})}},o=t=>{if(!p)return;let n=e.getBoundingClientRect(),i=t.clientX-n.left,a=t.clientY-n.top,o=Math.max(Math.hypot(i,a),Math.hypot(i-n.width,a),Math.hypot(i,a-n.height),Math.hypot(i-n.width,a-n.height)),s=document.createElement(`div`);s.style.cssText=`
        position: absolute;
        width: ${o*2}px;
        height: ${o*2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${u}, 0.4) 0%, rgba(${u}, 0.2) 30%, transparent 70%);
        left: ${i-o}px;
        top: ${a-o}px;
        pointer-events: none;
        z-index: 1000;
      `,e.appendChild(s),r.fromTo(s,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:`power2.out`,onComplete:()=>s.remove()})};return e.addEventListener(`mouseenter`,t),e.addEventListener(`mouseleave`,i),e.addEventListener(`mousemove`,a),e.addEventListener(`click`,o),()=>{v.current=!1,e.removeEventListener(`mouseenter`,t),e.removeEventListener(`mouseleave`,i),e.removeEventListener(`mousemove`,a),e.removeEventListener(`click`,o),C()}},[w,C,n,f,m,p,u]),(0,a.jsx)(`div`,{ref:h,className:`${t} particle-container`,style:{...s,position:`relative`,overflow:`hidden`},children:e})},h=({gridRef:e,disableAnimations:t=!1,enabled:n=!0,spotlightRadius:a=s,glowColor:o=c})=>{let l=(0,i.useRef)(null),u=(0,i.useRef)(!1);return(0,i.useEffect)(()=>{if(t||!e?.current||!n)return;let i=document.createElement(`div`);i.className=`global-spotlight`,i.style.cssText=`
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${o}, 0.15) 0%,
        rgba(${o}, 0.08) 15%,
        rgba(${o}, 0.04) 25%,
        rgba(${o}, 0.02) 40%,
        rgba(${o}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `,document.body.appendChild(i),l.current=i;let s=t=>{if(!l.current||!e.current)return;let n=e.current.closest(`.bento-section`)?.getBoundingClientRect(),i=n&&t.clientX>=n.left&&t.clientX<=n.right&&t.clientY>=n.top&&t.clientY<=n.bottom;u.current=i||!1;let o=e.current.querySelectorAll(`.magic-bento-card`);if(!i){r.to(l.current,{opacity:0,duration:.3,ease:`power2.out`}),o.forEach(e=>{e.style.setProperty(`--glow-intensity`,`0`)});return}let{proximity:s,fadeDistance:c}=f(a),d=1/0;o.forEach(e=>{let n=e,r=n.getBoundingClientRect(),i=r.left+r.width/2,o=r.top+r.height/2,l=Math.hypot(t.clientX-i,t.clientY-o)-Math.max(r.width,r.height)/2,u=Math.max(0,l);d=Math.min(d,u);let f=0;u<=s?f=1:u<=c&&(f=(c-u)/(c-s)),p(n,t.clientX,t.clientY,f,a)}),r.to(l.current,{left:t.clientX,top:t.clientY,duration:.1,ease:`power2.out`});let m=d<=s?.8:d<=c?(c-d)/(c-s)*.8:0;r.to(l.current,{opacity:m,duration:m>0?.2:.5,ease:`power2.out`})},c=()=>{u.current=!1,e.current?.querySelectorAll(`.magic-bento-card`).forEach(e=>{e.style.setProperty(`--glow-intensity`,`0`)}),l.current&&r.to(l.current,{opacity:0,duration:.3,ease:`power2.out`})};return document.addEventListener(`mousemove`,s),document.addEventListener(`mouseleave`,c),()=>{document.removeEventListener(`mousemove`,s),document.removeEventListener(`mouseleave`,c),l.current?.parentNode?.removeChild(l.current)}},[e,t,n,a,o]),null},g=({children:e,gridRef:t})=>(0,a.jsx)(`div`,{className:`card-grid bento-section`,ref:t,children:e}),_=()=>{let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=()=>t(window.innerWidth<=l);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),e},v=({textAutoHide:e=!0,enableStars:t=!0,enableSpotlight:n=!0,enableBorderGlow:l=!0,disableAnimations:d=!1,spotlightRadius:f=s,particleCount:p=o,enableTilt:v=!1,glowColor:y=c,clickEffect:b=!0,enableMagnetism:x=!0})=>{let S=(0,i.useRef)(null),C=_(),w=d||C;return(0,a.jsxs)(a.Fragment,{children:[n&&(0,a.jsx)(h,{gridRef:S,disableAnimations:w,enabled:n,spotlightRadius:f,glowColor:y}),(0,a.jsx)(g,{gridRef:S,children:u.map((n,i)=>{let o={className:`magic-bento-card ${e?`magic-bento-card--text-autohide`:``} ${l?`magic-bento-card--border-glow`:``}`,style:{backgroundColor:n.color,"--glow-color":y}};return t?(0,a.jsxs)(m,{...o,disableAnimations:w,particleCount:p,glowColor:y,enableTilt:v,clickEffect:b,enableMagnetism:x,children:[(0,a.jsx)(`div`,{className:`magic-bento-card__header`,children:(0,a.jsx)(`div`,{className:`magic-bento-card__label`,children:n.label})}),(0,a.jsxs)(`div`,{className:`magic-bento-card__content`,children:[(0,a.jsx)(`h2`,{className:`magic-bento-card__title`,children:n.title}),(0,a.jsx)(`p`,{className:`magic-bento-card__description`,children:n.description})]})]},i):(0,a.jsxs)(`div`,{...o,ref:e=>{e&&(e.addEventListener(`mousemove`,t=>{if(w)return;let n=e.getBoundingClientRect(),i=t.clientX-n.left,a=t.clientY-n.top,o=n.width/2,s=n.height/2;if(v){let t=(a-s)/s*-10,n=(i-o)/o*10;r.to(e,{rotateX:t,rotateY:n,duration:.1,ease:`power2.out`,transformPerspective:1e3})}if(x){let t=(i-o)*.05,n=(a-s)*.05;r.to(e,{x:t,y:n,duration:.3,ease:`power2.out`})}}),e.addEventListener(`mouseleave`,()=>{w||(v&&r.to(e,{rotateX:0,rotateY:0,duration:.3,ease:`power2.out`}),x&&r.to(e,{x:0,y:0,duration:.3,ease:`power2.out`}))}),e.addEventListener(`click`,t=>{if(!b||w)return;let n=e.getBoundingClientRect(),i=t.clientX-n.left,a=t.clientY-n.top,o=Math.max(Math.hypot(i,a),Math.hypot(i-n.width,a),Math.hypot(i,a-n.height),Math.hypot(i-n.width,a-n.height)),s=document.createElement(`div`);s.style.cssText=`
                    position: absolute;
                    width: ${o*2}px;
                    height: ${o*2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${y}, 0.4) 0%, rgba(${y}, 0.2) 30%, transparent 70%);
                    left: ${i-o}px;
                    top: ${a-o}px;
                    pointer-events: none;
                    z-index: 1000;
                  `,e.appendChild(s),r.fromTo(s,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:`power2.out`,onComplete:()=>s.remove()})}))},children:[(0,a.jsx)(`div`,{className:`magic-bento-card__header`,children:(0,a.jsx)(`div`,{className:`magic-bento-card__label`,children:n.label})}),(0,a.jsxs)(`div`,{className:`magic-bento-card__content`,children:[(0,a.jsx)(`h2`,{className:`magic-bento-card__title`,children:n.title}),(0,a.jsx)(`p`,{className:`magic-bento-card__description`,children:n.description})]})]},i)})})]})};export{v as default};