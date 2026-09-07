import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-GmgWIQ1N.js";var r=e(t(),1),i=n(),a=({children:e,width:t=200,height:n=80,borderRadius:a=20,borderWidth:o=.07,brightness:s=50,opacity:c=.93,blur:l=11,displace:u=0,backgroundOpacity:d=0,saturation:f=1,distortionScale:p=-180,redOffset:m=0,greenOffset:h=10,blueOffset:g=20,xChannel:_=`R`,yChannel:v=`G`,mixBlendMode:y=`difference`,className:b=``,style:x={}})=>{let S=(0,r.useId)().replace(/:/g,`-`),C=`glass-filter-${S}`,w=`red-grad-${S}`,T=`blue-grad-${S}`,[E,D]=(0,r.useState)(!1),O=(0,r.useRef)(null),k=(0,r.useRef)(null),A=(0,r.useRef)(null),j=(0,r.useRef)(null),M=(0,r.useRef)(null),N=(0,r.useRef)(null),P=()=>{let e=O.current?.getBoundingClientRect(),t=e?.width||400,n=e?.height||200,r=o*.5*Math.min(t,n),i=`
      <svg viewBox="0 0 ${t} ${n}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${w}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${T}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${t}" height="${n}" fill="black"></rect>
        <rect x="0" y="0" width="${t}" height="${n}" rx="${a}" fill="url(#${w})" />
        <rect x="0" y="0" width="${t}" height="${n}" rx="${a}" fill="url(#${T})" style="mix-blend-mode: ${y}" />
        <rect x="${r}" y="${r}" width="${t-r*2}" height="${n-r*2}" rx="${a}" fill="hsl(0 0% ${s}% / ${c})" style="filter:blur(${l}px)" />
      </svg>
    `;return`data:image/svg+xml,${encodeURIComponent(i)}`},F=()=>{k.current?.setAttribute(`href`,P())};(0,r.useEffect)(()=>{F(),[{ref:A,offset:m},{ref:j,offset:h},{ref:M,offset:g}].forEach(({ref:e,offset:t})=>{e.current&&(e.current.setAttribute(`scale`,(p+t).toString()),e.current.setAttribute(`xChannelSelector`,_),e.current.setAttribute(`yChannelSelector`,v))}),N.current?.setAttribute(`stdDeviation`,u.toString())},[t,n,a,o,s,c,l,u,p,m,h,g,_,v,y]),(0,r.useEffect)(()=>{if(!O.current)return;let e=new ResizeObserver(()=>{setTimeout(F,0)});return e.observe(O.current),()=>{e.disconnect()}},[]),(0,r.useEffect)(()=>{setTimeout(F,0)},[t,n]),(0,r.useEffect)(()=>{D(I())},[]);let I=()=>{if(typeof window>`u`||typeof document>`u`)return!1;let e=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent),t=/Firefox/.test(navigator.userAgent);if(e||t)return!1;let n=document.createElement(`div`);return n.style.backdropFilter=`url(#${C})`,n.style.backdropFilter!==``},L={...x,width:typeof t==`number`?`${t}px`:t,height:typeof n==`number`?`${n}px`:n,borderRadius:`${a}px`,"--glass-frost":d,"--glass-saturation":f,"--filter-id":`url(#${C})`};return(0,i.jsxs)(`div`,{ref:O,className:`glass-surface ${E?`glass-surface--svg`:`glass-surface--fallback`} ${b}`,style:L,children:[(0,i.jsx)(`svg`,{className:`glass-surface__filter`,xmlns:`http://www.w3.org/2000/svg`,children:(0,i.jsx)(`defs`,{children:(0,i.jsxs)(`filter`,{id:C,colorInterpolationFilters:`sRGB`,x:`0%`,y:`0%`,width:`100%`,height:`100%`,children:[(0,i.jsx)(`feImage`,{ref:k,x:`0`,y:`0`,width:`100%`,height:`100%`,preserveAspectRatio:`none`,result:`map`}),(0,i.jsx)(`feDisplacementMap`,{ref:A,in:`SourceGraphic`,in2:`map`,id:`redchannel`,result:`dispRed`}),(0,i.jsx)(`feColorMatrix`,{in:`dispRed`,type:`matrix`,values:`1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0`,result:`red`}),(0,i.jsx)(`feDisplacementMap`,{ref:j,in:`SourceGraphic`,in2:`map`,id:`greenchannel`,result:`dispGreen`}),(0,i.jsx)(`feColorMatrix`,{in:`dispGreen`,type:`matrix`,values:`0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0`,result:`green`}),(0,i.jsx)(`feDisplacementMap`,{ref:M,in:`SourceGraphic`,in2:`map`,id:`bluechannel`,result:`dispBlue`}),(0,i.jsx)(`feColorMatrix`,{in:`dispBlue`,type:`matrix`,values:`0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0`,result:`blue`}),(0,i.jsx)(`feBlend`,{in:`red`,in2:`green`,mode:`screen`,result:`rg`}),(0,i.jsx)(`feBlend`,{in:`rg`,in2:`blue`,mode:`screen`,result:`output`}),(0,i.jsx)(`feGaussianBlur`,{ref:N,in:`output`,stdDeviation:`0.7`})]})})}),(0,i.jsx)(`div`,{className:`glass-surface__content`,children:e})]})};export{a as default};