import{u as G,a as J,r as g,b as o,o as p,j as w,f as e,e as t,g as c,i as K,t as x,k as y,F as V,l as B,d as S}from"./index.a78e2dbf.js";import{p as M}from"./api.ae6dea3f.js";const Q={class:"home_container"},W={class:"home_userinfoContainer"},$={__name:"home",setup(X){const r=G(),h=J(),v=r.options.routes.find(a=>a.role==h.getUserInfo.value.useType),d=g(""),m=g([]);g(0);function E(a){let n=v.children.find(l=>l.path==a);return n||null}function N(a,n){r.push(a.paneName)}function U(a){if(a){let n=E(a);n&&(m.value.find(l=>l.name==n.path)||m.value.push({title:n.name,name:n.path,route:n.path}),d.value=n.path,r.push(n.path))}}function I(a,n){if(n==="remove"){let l=m.value,u=d.value;u===a&&l.forEach((i,_)=>{if(i.name===a){let f=l[_+1]||l[_-1];f&&(u=f.name)}}),d.value=u,m.value=l.filter(i=>i.name!==a),r.push(u)}}function z(a){M("/user/logout").then(n=>{n.data.result&&(h.logOut(),r.push("/login"))})}return(a,n)=>{const l=o("el-text"),u=o("el-avatar"),i=o("arrow-down"),_=o("el-icon"),f=o("el-button"),T=o("el-dropdown-item"),F=o("el-dropdown-menu"),R=o("el-dropdown"),j=o("el-header"),k=o("document"),C=o("el-menu-item"),q=o("el-menu"),D=o("el-aside"),H=o("router-view"),L=o("el-tab-pane"),O=o("el-tabs"),P=o("el-main"),b=o("el-container");return p(),w("div",Q,[e(b,null,{default:t(()=>[e(j,{class:"top-header"},{default:t(()=>[e(l,{class:"home_title"},{default:t(()=>[c("\u4E1C\u8F6F\u4E91\u533B\u9662HIS\u7CFB\u7EDF")]),_:1}),K("div",W,[e(R,{onCommand:z},{dropdown:t(()=>[e(F,null,{default:t(()=>[e(T,{command:""},{default:t(()=>[c("\u6211\u7684\u8BBE\u7F6E")]),_:1}),e(T,{command:"logout"},{default:t(()=>[c("\u9000\u51FA\u767B\u5F55")]),_:1})]),_:1})]),default:t(()=>[e(f,{type:"primary"},{default:t(()=>[e(u,{size:"small",style:{"margin-right":"10px"},src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}),c(" "+x(y(h).getUserInfo.value.realName),1),e(_,{class:"el-icon--right"},{default:t(()=>[e(i)]),_:1})]),_:1})]),_:1})])]),_:1}),e(b,null,{default:t(()=>[e(D,{width:"200px"},{default:t(()=>[e(q,{"default-active":"2",class:"el-menu-vertical-demo",router:"",onSelect:U,style:{height:"700px"}},{default:t(()=>[e(C,null,{default:t(()=>[e(_,null,{default:t(()=>[e(k)]),_:1}),e(l,{class:"mx-1",size:"large"},{default:t(()=>[c(x(y(v).meta.title),1)]),_:1})]),_:1}),(p(!0),w(V,null,B(y(v).children,(s,A)=>(p(),S(C,{index:s.path,key:s.path},{default:t(()=>[e(_,null,{default:t(()=>[e(k)]),_:1}),c(x(s.name),1)]),_:2},1032,["index"]))),128))]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(P,{class:"main"},{default:t(()=>[e(O,{modelValue:d.value,"onUpdate:modelValue":n[0]||(n[0]=s=>d.value=s),type:"card",editable:"",onEdit:I,onTabClick:N},{default:t(()=>[(p(!0),w(V,null,B(m.value,(s,A)=>(p(),S(L,{align:"center",key:s.name,label:s.title,name:s.name,route:s.route},{default:t(()=>[e(H)]),_:2},1032,["label","name","route"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})])}}};export{$ as default};
