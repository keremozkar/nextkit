import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-BatatxyT.js";import{t as n}from"./index-CUbPYQth.js";var r=e(t(),1),i=n(),a=(e,t)=>{let n=t.x-e.x,r=t.y-e.y;return Math.sqrt(n*n+r*r)},o=(e,t,n,r)=>{let i=r-Math.abs(r*e/t);return Math.max(n,i+n)},s=(e,t)=>{let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>{e.apply(void 0,r)},t)}},c=({text:e=`Compressa`,fontFamily:t=`Roboto Flex`,fontUrl:n=`https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap`,width:c=!0,weight:l=!0,italic:u=!0,alpha:d=!1,flex:f=!0,stroke:p=!1,scale:m=!1,textColor:h=`#FFFFFF`,strokeColor:g=`#FF0000`,className:_=``,minFontSize:v=24})=>{let y=(0,r.useRef)(null),b=(0,r.useRef)(null),x=(0,r.useRef)([]),S=(0,r.useRef)({x:0,y:0}),C=(0,r.useRef)({x:0,y:0}),[w,T]=(0,r.useState)(v),[E,D]=(0,r.useState)(1),[O,k]=(0,r.useState)(1),A=e.split(``);(0,r.useEffect)(()=>{let e=e=>{C.current.x=e.clientX,C.current.y=e.clientY},t=e=>{let t=e.touches[0];C.current.x=t.clientX,C.current.y=t.clientY};if(window.addEventListener(`mousemove`,e),window.addEventListener(`touchmove`,t,{passive:!0}),y.current){let{left:e,top:t,width:n,height:r}=y.current.getBoundingClientRect();S.current.x=e+n/2,S.current.y=t+r/2,C.current.x=S.current.x,C.current.y=S.current.y}return()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`touchmove`,t)}},[]);let j=(0,r.useCallback)(()=>{if(!y.current||!b.current)return;let{width:e,height:t}=y.current.getBoundingClientRect(),n=e/(A.length/2);n=Math.max(n,v),T(n),D(1),k(1),requestAnimationFrame(()=>{if(!b.current)return;let e=b.current.getBoundingClientRect();if(m&&e.height>0){let n=t/e.height;D(n),k(n)}})},[A.length,v,m]);(0,r.useEffect)(()=>{let e=s(j,100);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[j]),(0,r.useEffect)(()=>{let e,t=()=>{if(S.current.x+=(C.current.x-S.current.x)/15,S.current.y+=(C.current.y-S.current.y)/15,b.current){let e=b.current.getBoundingClientRect().width/2;x.current.forEach(t=>{if(!t)return;let n=t.getBoundingClientRect(),r={x:n.x+n.width/2,y:n.y+n.height/2},i=a(S.current,r),s=c?Math.floor(o(i,e,5,200)):100,f=l?Math.floor(o(i,e,100,900)):400,p=u?o(i,e,0,1).toFixed(2):0,m=d?o(i,e,0,1).toFixed(2):1,h=`'wght' ${f}, 'wdth' ${s}, 'ital' ${p}`;t.style.fontVariationSettings!==h&&(t.style.fontVariationSettings=h),d&&t.style.opacity!==m&&(t.style.opacity=m)})}e=requestAnimationFrame(t)};return t(),()=>cancelAnimationFrame(e)},[c,l,u,d]);let M=(0,r.useMemo)(()=>(0,i.jsx)(`style`,{children:`
        @import url('${n}');

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${h};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${g};
        }

        .text-pressure-title {
          color: ${h};
        }
      `}),[t,n,h,g]),N=[_,f?`flex`:``,p?`stroke`:``].filter(Boolean).join(` `);return(0,i.jsxs)(`div`,{ref:y,style:{position:`relative`,width:`100%`,height:`100%`,background:`transparent`},children:[M,(0,i.jsx)(`h1`,{ref:b,className:`text-pressure-title ${N}`,style:{fontFamily:t,textTransform:`uppercase`,fontSize:w,lineHeight:O,transform:`scale(1, ${E})`,transformOrigin:`center top`,margin:0,textAlign:`center`,userSelect:`none`,whiteSpace:`nowrap`,fontWeight:100,width:`100%`},children:A.map((e,t)=>(0,i.jsx)(`span`,{ref:e=>{x.current[t]=e},"data-char":e,style:{display:`inline-block`,color:p?void 0:h},children:e},t))})]})};export{c as default};