import{f as E,p as O}from"./api.ae6dea3f.js";import{r as s,m as ae,b as f,c as te,o as u,j as g,f as a,e as t,F as V,i as F,l as b,g as _,w as oe,d as c,E as x}from"./index.a78e2dbf.js";const ue=F("div",{style:{"margin-top":"40px"}},null,-1),ne=F("div",{style:{"margin-top":"20px"}},null,-1),de={class:"dialog-footer"},re={class:"dialog-footer"},me={__name:"Fmeditem",setup(pe){const q=s(!1),D=s({}),U=s([]),w=s([]),$=s([]),T=s(""),I=s(""),M=s(""),B=s(""),L=s(10),W=[10,20,30,50],N=s(!1),k=s(!1),o=s({id:"",itemCode:"",itemName:"",format:"",price:"",expClassID:"",expName:"",deptID:"",deptName:"",mnemonicCode:"",creationDate:"",lastUpdateDate:"",recordType:"",recordTypeName:""}),j=s({userName:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],realName:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:"blur"}]});ae(async()=>{i(1),H(),A(15,100,U),G()});async function A(d,l,n){let m=`/constantitem/page?ctype=${d}&count=${l}&pn=1`;const p=await E(m,null);p.result?n.value=p.data.records:p.errMsg=="\u672A\u767B\u5F55"&&router.push("/login")}async function G(){const l=await E("/expenseclass/page?count=1000&pn=1",null);l.result?$.value=l.data.records:l.errMsg=="\u672A\u767B\u5F55"&&router.push("/login")}async function H(){const l=await E("/department/page?&count=200&pn=1",null);l.result?w.value=l.data.records:l.errMsg=="\u672A\u767B\u5F55"&&router.push("/login")}async function i(d){q.value=!0;let l=`/fmeditem/page?count=${L.value}&pn=${d}`;T!=""&&(l+=`&keyword=${T.value}`),I!=""&&(l+=`&ctype=${I.value}`),M!=""&&(l+=`&dept=${M.value}`),B!=""&&(l+=`&expClassId=${B.value}`);const n=await E(l,null);n.result?(D.value=n.data,q.value=!1):n.errMsg=="\u672A\u767B\u5F55"&&router.push("/login")}function J(d){i(d)}function P(d){k.value=!0,o.value=d}function z(){o.value={id:"",userName:"",realName:"",useType:"",useTypeName:"",docTitleID:"",docTitle:"",isScheduling:"",deptID:"",dept:"",registLeID:"",registLe:""}}function Q(){console.log(o.value.deptType),O("/fmeditem/update",o.value).then(d=>{d.data.result?(k.value=!1,i(D.value.current),x.alert("\u4FEE\u6539\u6210\u529F","\u63D0\u793A",{})):(result.errMsg=="\u672A\u767B\u5F55"&&router.push("/login"),x.alert(d.data.errMsg,"\u63D0\u793A",{}))})}function X(){O("/fmeditem/add",o.value).then(d=>{d.data.result?(N.value=!1,x.alert("\u65B0\u589E\u6210\u529F","\u63D0\u793A",{})):(result.errMsg=="\u672A\u767B\u5F55"&&router.push("/login"),x.alert(d.data.errMsg,"\u63D0\u793A",{}))})}function Y(d){x.confirm("\u786E\u8BA4\u662F\u5426\u5220\u9664?","Warning",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then(()=>{var l=new FormData;l.append("id",d),O("/fmeditem/del",l).then(n=>{n.data.result?(i(D.value.current),x.alert("\u5220\u9664\u6210\u529F","\u63D0\u793A",{})):(result.errMsg=="\u672A\u767B\u5F55"&&router.push("/login"),x.alert(n.data.errMsg,"\u63D0\u793A",{}))})})}return(d,l)=>{const n=f("el-option"),m=f("el-select"),p=f("el-col"),v=f("el-input"),C=f("el-button"),S=f("el-row"),y=f("el-table-column"),Z=f("el-table"),h=f("el-pagination"),r=f("el-form-item"),K=f("el-form"),R=f("el-dialog"),ee=te("loading");return u(),g(V,null,[a(S,null,{default:t(()=>[a(p,{span:3,style:{"padding-right":"20px"}},{default:t(()=>[a(m,{modelValue:I.value,"onUpdate:modelValue":l[0]||(l[0]=e=>I.value=e),class:"m-2",filterable:"",clearable:"",onClear:l[1]||(l[1]=e=>i(1)),placeholder:"\u79D1\u76EE\u7C7B\u578B",onChange:l[2]||(l[2]=e=>i(1))},{default:t(()=>[(u(!0),g(V,null,b(U.value,e=>(u(),c(n,{key:e.id,label:e.constantCode+e.constantName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(p,{span:3,style:{"padding-right":"20px"}},{default:t(()=>[a(m,{modelValue:M.value,"onUpdate:modelValue":l[3]||(l[3]=e=>M.value=e),class:"m-2",filterable:"",clearable:"",onClear:l[4]||(l[4]=e=>i(1)),placeholder:"\u6267\u884C\u79D1\u5BA4",onChange:l[5]||(l[5]=e=>i(1))},{default:t(()=>[(u(!0),g(V,null,b(w.value,e=>(u(),c(n,{key:e.id,label:e.deptCode+e.deptName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(p,{span:3,style:{"padding-right":"20px"}},{default:t(()=>[a(m,{modelValue:B.value,"onUpdate:modelValue":l[6]||(l[6]=e=>B.value=e),class:"m-2",filterable:"",clearable:"",onClear:l[7]||(l[7]=e=>i(1)),placeholder:"\u8D39\u7528\u79D1\u76EE",onChange:l[8]||(l[8]=e=>i(1))},{default:t(()=>[(u(!0),g(V,null,b($.value,e=>(u(),c(n,{key:e.id,label:e.expCode+e.expName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(p,{span:5,style:{"padding-right":"20px"}},{default:t(()=>[a(v,{modelValue:T.value,"onUpdate:modelValue":l[9]||(l[9]=e=>T.value=e),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165\u8D39\u7528\u7F16\u7801\u6216\u540D\u79F0",class:"w-100 m-2"},null,8,["modelValue"])]),_:1}),a(p,{span:3},{default:t(()=>[a(C,{type:"primary",onClick:l[10]||(l[10]=e=>i(1))},{default:t(()=>[_("\u67E5\u8BE2")]),_:1})]),_:1}),a(p,{span:3}),a(p,{span:4},{default:t(()=>[a(C,{type:"danger",onClick:l[11]||(l[11]=e=>N.value=!0)},{default:t(()=>[_("\u65B0\u589E\u975E\u836F\u54C1\u6536\u8D39\u9879\u76EE")]),_:1})]),_:1})]),_:1}),ue,a(S,{class:"m-2"},{default:t(()=>[a(p,{span:24},{default:t(()=>[oe((u(),c(Z,{data:D.value.records,style:{width:"100%"}},{default:t(()=>[a(y,{fixed:"",prop:"id",label:"\u5E8F\u53F7",width:"80",align:"center"}),a(y,{prop:"itemCode",label:"\u9879\u76EE\u7F16\u7801",align:"center"}),a(y,{prop:"itemName",label:"\u9879\u76EE\u540D\u79F0",align:"center"}),a(y,{prop:"format",label:"\u89C4\u683C",align:"center"}),a(y,{prop:"price",label:"\u5355\u4EF7",align:"center"}),a(y,{prop:"deptName",label:"\u6267\u884C\u79D1\u5BA4",align:"center"}),a(y,{prop:"mnemonicCode",label:"\u52A9\u8BB0\u7801",align:"center"}),a(y,{prop:"recordTypeName",label:"\u9879\u76EE\u7C7B\u578B",align:"center"}),a(y,{fixed:"right",label:"Operations",align:"center"},{default:t(e=>[a(C,{link:"",type:"primary",onClick:le=>P(e.row)},{default:t(()=>[_("\u7F16\u8F91")]),_:2},1032,["onClick"]),a(C,{link:"",type:"danger",onClick:le=>Y(e.row.id)},{default:t(()=>[_("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[ee,q.value]])]),_:1})]),_:1}),ne,a(S,null,{default:t(()=>[a(p,{span:20},{default:t(()=>[a(h,{background:"",layout:"prev, pager, next",total:D.value.total,"page-count":D.value.pages,onCurrentChange:J},null,8,["total","page-count"])]),_:1}),a(p,{span:4},{default:t(()=>[a(m,{modelValue:L.value,"onUpdate:modelValue":l[12]||(l[12]=e=>L.value=e),class:"m-2",placeholder:"\u6BCF\u9875\u884C\u6570",onChange:l[13]||(l[13]=e=>i(1))},{default:t(()=>[(u(),g(V,null,b(W,e=>a(n,{key:e,label:e,value:e},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}),a(R,{modelValue:k.value,"onUpdate:modelValue":l[23]||(l[23]=e=>k.value=e),title:"\u7F16\u8F91",onClose:z},{footer:t(()=>[F("span",de,[a(C,{onClick:l[22]||(l[22]=e=>k.value=!1)},{default:t(()=>[_("\u53D6\u6D88")]),_:1}),a(C,{type:"primary",onClick:Q},{default:t(()=>[_(" \u4FDD\u5B58 ")]),_:1})])]),default:t(()=>[a(K,{model:o.value,rules:j.value,"label-width":"100px"},{default:t(()=>[a(r,{label:"\u7F16\u53F7",prop:"id"},{default:t(()=>[a(v,{modelValue:o.value.id,"onUpdate:modelValue":l[14]||(l[14]=e=>o.value.id=e),readonly:"",autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u7C7B\u578B",prop:"recordType"},{default:t(()=>[a(m,{modelValue:o.value.recordType,"onUpdate:modelValue":l[15]||(l[15]=e=>o.value.recordType=e),class:"m-2",placeholder:"\u9879\u76EE\u7C7B\u578B"},{default:t(()=>[(u(!0),g(V,null,b(U.value,e=>(u(),c(n,{key:e.id,label:e.constantCode+e.constantName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u6267\u884C\u79D1\u5BA4",prop:"deptID"},{default:t(()=>[a(m,{modelValue:o.value.deptID,"onUpdate:modelValue":l[16]||(l[16]=e=>o.value.deptID=e),filterable:"",class:"m-2",placeholder:"\u6267\u884C\u79D1\u5BA4"},{default:t(()=>[(u(!0),g(V,null,b(w.value,e=>(u(),c(n,{key:e.id,label:e.deptCode+e.deptName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u8D39\u7528\u79D1\u76EE",prop:"docTitleID"},{default:t(()=>[a(m,{modelValue:o.value.expClassID,"onUpdate:modelValue":l[17]||(l[17]=e=>o.value.expClassID=e),class:"m-2",filterable:"",placeholder:"\u8D39\u7528\u79D1\u76EE"},{default:t(()=>[(u(!0),g(V,null,b($.value,e=>(u(),c(n,{key:e.id,label:e.expCode+e.expName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u7F16\u7801",prop:"itemCode"},{default:t(()=>[a(v,{modelValue:o.value.itemCode,"onUpdate:modelValue":l[18]||(l[18]=e=>o.value.itemCode=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u540D\u79F0",prop:"itemName"},{default:t(()=>[a(v,{modelValue:o.value.itemName,"onUpdate:modelValue":l[19]||(l[19]=e=>o.value.itemName=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u89C4\u683C",prop:"format"},{default:t(()=>[a(v,{modelValue:o.value.format,"onUpdate:modelValue":l[20]||(l[20]=e=>o.value.format=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u5355\u4EF7",prop:"price"},{default:t(()=>[a(v,{modelValue:o.value.price,"onUpdate:modelValue":l[21]||(l[21]=e=>o.value.price=e),autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"]),a(R,{modelValue:N.value,"onUpdate:modelValue":l[33]||(l[33]=e=>N.value=e),title:"\u65B0\u589E",onClose:z},{footer:t(()=>[F("span",re,[a(C,{onClick:l[32]||(l[32]=e=>N.value=!1)},{default:t(()=>[_("\u53D6\u6D88")]),_:1}),a(C,{type:"primary",onClick:X},{default:t(()=>[_(" \u65B0\u589E ")]),_:1})])]),default:t(()=>[a(K,{model:o.value,rules:j.value,"label-width":"100px"},{default:t(()=>[a(r,{label:"\u7F16\u53F7",prop:"id"},{default:t(()=>[a(v,{modelValue:o.value.id,"onUpdate:modelValue":l[24]||(l[24]=e=>o.value.id=e),readonly:"",autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u7C7B\u578B",prop:"recordType"},{default:t(()=>[a(m,{modelValue:o.value.recordType,"onUpdate:modelValue":l[25]||(l[25]=e=>o.value.recordType=e),class:"m-2",placeholder:"\u9879\u76EE\u7C7B\u578B"},{default:t(()=>[(u(!0),g(V,null,b(U.value,e=>(u(),c(n,{key:e.id,label:e.constantCode+e.constantName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u6267\u884C\u79D1\u5BA4",prop:"deptID"},{default:t(()=>[a(m,{modelValue:o.value.deptID,"onUpdate:modelValue":l[26]||(l[26]=e=>o.value.deptID=e),filterable:"",class:"m-2",placeholder:"\u6267\u884C\u79D1\u5BA4"},{default:t(()=>[(u(!0),g(V,null,b(w.value,e=>(u(),c(n,{key:e.id,label:e.deptCode+e.deptName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u8D39\u7528\u79D1\u76EE",prop:"docTitleID"},{default:t(()=>[a(m,{modelValue:o.value.expClassID,"onUpdate:modelValue":l[27]||(l[27]=e=>o.value.expClassID=e),class:"m-2",filterable:"",placeholder:"\u8D39\u7528\u79D1\u76EE"},{default:t(()=>[(u(!0),g(V,null,b($.value,e=>(u(),c(n,{key:e.id,label:e.expCode+e.expName,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u7F16\u7801",prop:"itemCode"},{default:t(()=>[a(v,{modelValue:o.value.itemCode,"onUpdate:modelValue":l[28]||(l[28]=e=>o.value.itemCode=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u9879\u76EE\u540D\u79F0",prop:"itemName"},{default:t(()=>[a(v,{modelValue:o.value.itemName,"onUpdate:modelValue":l[29]||(l[29]=e=>o.value.itemName=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u89C4\u683C",prop:"format"},{default:t(()=>[a(v,{modelValue:o.value.format,"onUpdate:modelValue":l[30]||(l[30]=e=>o.value.format=e),autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(r,{label:"\u5355\u4EF7",prop:"price"},{default:t(()=>[a(v,{modelValue:o.value.price,"onUpdate:modelValue":l[31]||(l[31]=e=>o.value.price=e),autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])],64)}}};export{me as default};
