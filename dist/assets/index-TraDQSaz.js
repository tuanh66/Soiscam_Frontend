import{A as x,r as c,o as C,a as f,i as B,c as _,b as s,B as S,e as g,v as $,C as h,D as M,u as v,F as j,j as m}from"./index-Di_iQ_7P.js";/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,a,r)=>r?r.toUpperCase():a.toLowerCase()),I=t=>{const o=A(t);return o.charAt(0).toUpperCase()+o.slice(1)},T=(...t)=>t.filter((o,a,r)=>!!o&&o.trim()!==""&&r.indexOf(o)===a).join(" ").trim(),k=t=>t==="";/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=({name:t,iconNode:o,absoluteStrokeWidth:a,"absolute-stroke-width":r,strokeWidth:n,"stroke-width":u,size:i=d.width,color:p=d.stroke,...e},{slots:l})=>x("svg",{...d,...e,width:i,height:i,stroke:p,"stroke-width":k(a)||k(r)||a===!0||r===!0?Number(n||u||d["stroke-width"])*24/Number(i):n||u||d["stroke-width"],class:T("lucide",e.class,...t?[`lucide-${w(I(t))}-icon`,`lucide-${w(t)}`]:["lucide-icon"])},[...o.map(b=>x(...b)),...l.default?[l.default()]:[]]);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(t,o)=>(a,{slots:r,attrs:n})=>x(V,{...n,...a,iconNode:o,name:t},r);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=y("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=y("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),L={id:"form-login",action:"",class:"flex flex-col justify-center text-center mx-auto pt-30 px-4 w-90"},N={class:"form__group w-full mt-4 mb-4 flex flex-wrap"},U={class:"form__group w-full mb-4 flex flex-col"},D={class:"relative"},O=["type"],q={__name:"index",setup(t){const o=B(),a="http://127.0.0.1:8000/api/admin/login",r="http://127.0.0.1:8000/api/admin/check-token",n=c(!1),u=c(""),i=c("");return C(async()=>{const p=localStorage.getItem("token");if(p)try{if((await f.get(r,{headers:{Authorization:"Bearer "+p}})).data.status){o.push("/admin/danh-sach-scammer");return}else localStorage.removeItem("token")}catch{localStorage.removeItem("token")}Validator({form:"#form-login",formGroupSelector:".form__group",errorSelector:".form-message",rules:[Validator.isRequired("#username","Bạn chưa nhập tên tài khoản"),Validator.isRequired("#password","Bạn chưa nhập mật khẩu")],resetOnSubmit:!1,onSubmit:async()=>{const e=await f.post(a,{user:u.value,password:i.value});e.data.status?(localStorage.setItem("token",e.data.token),FuiToast.success(e.data.message),o.push("/admin/danh-sach-scammer")):FuiToast.error(e.data.message)}})}),(p,e)=>(m(),_(j,null,[e[8]||(e[8]=s("div",{id:"fui-toast"},null,-1)),s("form",L,[e[6]||(e[6]=s("div",{class:"flex items-end justify-center gap-[6px] mt-[40px] mb-4"},[s("img",{src:S,alt:"",class:"h-[40px] lg:h-[50px]"}),s("span",{class:"text-[16px] lg:text-[20px] leading-[16px] lg:leading-[20px] font-bold text-[var(--textColor)]"},"Soi scam")],-1)),s("div",N,[g(s("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>u.value=l),id:"username",type:"text",placeholder:"Nhập tên tài khoản",class:"w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] h-10 outline-none transition-colors duration-150 ease-linear appearance-none"},null,512),[[$,u.value]]),e[4]||(e[4]=s("p",{class:"form-message mt-1 text-[14px] text-[var(--redColor)]"},null,-1))]),s("div",U,[s("div",D,[g(s("input",{"onUpdate:modelValue":e[1]||(e[1]=l=>i.value=l),id:"password",type:n.value?"text":"password",placeholder:"Nhập mật khẩu",class:"w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] pr-9 h-10 outline-none transition-colors duration-150 ease-linear appearance-none"},null,8,O),[[M,i.value]]),n.value?(m(),h(v(E),{key:1,onClick:e[3]||(e[3]=l=>n.value=!1),class:"w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none"})):(m(),h(v(F),{key:0,onClick:e[2]||(e[2]=l=>n.value=!0),class:"w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none"}))]),e[5]||(e[5]=s("p",{class:"form-message mt-1 text-left text-[14px] text-[var(--redColor)]"},null,-1))]),e[7]||(e[7]=s("button",{type:"submit",class:"mt-4 btn"},"Đăng Nhập",-1))])],64))}};export{q as default};
