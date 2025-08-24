import{p as c,r as u,o as b,a as C,q as _,c as B,d as a,s as M,v as f,x as V,y as g,z as $,u as h,h as d}from"./index-BtmJLjuX.js";/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,s,r)=>r?r.toUpperCase():s.toLowerCase()),S=t=>{const o=j(t);return o.charAt(0).toUpperCase()+o.slice(1)},T=(...t)=>t.filter((o,s,r)=>!!o&&o.trim()!==""&&r.indexOf(o)===s).join(" ").trim(),v=t=>t==="";/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=({name:t,iconNode:o,absoluteStrokeWidth:s,"absolute-stroke-width":r,strokeWidth:l,"stroke-width":n,size:e=p.width,color:i=p.stroke,...m},{slots:x})=>c("svg",{...p,...m,width:e,height:e,stroke:i,"stroke-width":v(s)||v(r)||s===!0||r===!0?Number(l||n||p["stroke-width"])*24/Number(e):l||n||p["stroke-width"],class:T("lucide",m.class,...t?[`lucide-${w(S(t))}-icon`,`lucide-${w(t)}`]:["lucide-icon"])},[...o.map(k=>c(...k)),...x.default?[x.default()]:[]]);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(t,o)=>(s,{slots:r,attrs:l})=>c(A,{...l,...s,iconNode:o,name:t},r);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=y("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-vue-next v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=y("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),U={id:"form-login",action:"",class:"flex flex-col justify-center text-center mx-auto pt-30 px-4 w-90"},q={class:"form__group w-full mt-4 mb-4 flex flex-wrap"},I={class:"form__group w-full mb-4 flex flex-col"},L={class:"relative"},O=["type"],D={__name:"index",setup(t){const o=_(),s=u(!1),r=u(""),l=u("");return b(()=>{Validator({form:"#form-login",formGroupSelector:".form__group",errorSelector:".form-message",rules:[Validator.isRequired("#username","Bạn chưa nhập tên tài khoản"),Validator.isRequired("#password","Bạn chưa nhập mật khẩu")],resetOnSubmit:!1,onSubmit:async()=>{const n=await C.post("http://127.0.0.1:8000/api/admin/login",{user:r.value,password:l.value});n.data.status?(localStorage.setItem("user_login",n.data.token),FuiToast.success(n.data.message),o.push("/admin/danh-sach-scammer")):FuiToast.error(n.data.message)}})}),(n,e)=>(d(),B("form",U,[e[6]||(e[6]=a("div",{class:"flex items-end justify-center gap-[6px] mt-[40px] mb-4"},[a("img",{src:M,alt:"",class:"h-[40px] lg:h-[50px]"}),a("span",{class:"text-[16px] lg:text-[20px] leading-[16px] lg:leading-[20px] font-bold text-[var(--textColor)]"},"Soi scam")],-1)),a("div",q,[f(a("input",{"onUpdate:modelValue":e[0]||(e[0]=i=>r.value=i),id:"username",type:"text",placeholder:"Nhập tên tài khoản",class:"w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] h-10 outline-none transition-colors duration-150 ease-linear appearance-none"},null,512),[[V,r.value]]),e[4]||(e[4]=a("p",{class:"form-message mt-1 text-[14px] text-[var(--redColor)]"},null,-1))]),a("div",I,[a("div",L,[f(a("input",{"onUpdate:modelValue":e[1]||(e[1]=i=>l.value=i),id:"password",type:s.value?"text":"password",placeholder:"Nhập mật khẩu",class:"w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] pr-9 h-10 outline-none transition-colors duration-150 ease-linear appearance-none"},null,8,O),[[$,l.value]]),s.value?(d(),g(h(E),{key:1,onClick:e[3]||(e[3]=i=>s.value=!1),class:"w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none"})):(d(),g(h(N),{key:0,onClick:e[2]||(e[2]=i=>s.value=!0),class:"w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none"}))]),e[5]||(e[5]=a("p",{class:"form-message mt-1 text-left text-[14px] text-[var(--redColor)]"},null,-1))]),e[7]||(e[7]=a("button",{type:"submit",class:"mt-4 btn"},"Đăng Nhập",-1))]))}};export{D as default};
