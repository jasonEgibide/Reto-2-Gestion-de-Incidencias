import{e as m,r as u,c as i,a as r,b as n,v as l,j as c,F as f,k as g,w as b,o as d,t as v}from"./index-DPFSl6X1.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={name:"Register",data(){return{roles:[]}},created(){m.get("http://127.0.0.1:8000/api/roles").then(t=>{this.roles=t.data}).catch(t=>{console.error(t)})},setup(){const t=u({name:"",username:"",email:"",password:"",id_rol:""});return{data:t,submit:async()=>{try{console.log(t);const a=sessionStorage.getItem("token");if(!a)throw new Error("No token found");await m.post("http://127.0.0.1:8000/api/auth/register",{name:t.name,username:t.username,email:t.email,password:t.password,id_rol:t.id_rol},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}}),alert("Registration successful")}catch(a){a.response?(console.error("Error data:",a.response.data),console.error("Error status:",a.response.status),console.error("Error headers:",a.response.headers)):console.error("Error message:",a.message)}}}}},x={class:"form-floating"},_={class:"form-floating"},h={class:"form-floating"},k={class:"form-floating"},E={class:"form-floating"},U=["value"];function V(t,e,a,s,p,S){return d(),i("form",{onSubmit:e[5]||(e[5]=b((...o)=>s.submit&&s.submit(...o),["prevent"]))},[e[7]||(e[7]=r("h1",{class:"h3 mb-3 fw-normal"},"Please register",-1)),r("div",x,[n(r("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>s.data.name=o),type:"text",class:"form-control",placeholder:"Nombre"},null,512),[[l,s.data.name]])]),r("div",_,[n(r("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>s.data.username=o),type:"text",class:"form-control",placeholder:"Nombre de Usuario"},null,512),[[l,s.data.username]])]),r("div",h,[n(r("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>s.data.email=o),type:"email",class:"form-control",placeholder:"Email"},null,512),[[l,s.data.email]])]),r("div",k,[n(r("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>s.data.password=o),type:"password",class:"form-control",placeholder:"Contraseña"},null,512),[[l,s.data.password]])]),r("div",E,[n(r("select",{"onUpdate:modelValue":e[4]||(e[4]=o=>s.data.id_rol=o),class:"form-control"},[e[6]||(e[6]=r("option",{disabled:"",value:""},"Seleccione un rol",-1)),(d(!0),i(f,null,g(p.roles,o=>(d(),i("option",{key:o.id,value:o.id},v(o.nombre),9,U))),128))],512),[[c,s.data.id_rol]])]),e[8]||(e[8]=r("button",{class:"btn btn-primary w-100 py-2",type:"submit"},"Register",-1)),e[9]||(e[9]=r("p",{class:"mt-5 mb-3 text-body-secondary"},"© 2017-2024",-1))],32)}const R=w(y,[["render",V],["__scopeId","data-v-83ce2e60"]]);export{R as default};
