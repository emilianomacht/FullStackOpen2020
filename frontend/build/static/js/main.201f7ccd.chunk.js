(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(2),l=(t(19),t(3)),i=t.n(l),m="/api/persons",s=function(){return i.a.get(m)},f=function(e){return i.a.post(m,e)},d=function(e,n){return i.a.put("".concat(m,"/").concat(e),n)},b=function(e){return i.a.delete("".concat(m,"/").concat(e))},h=function(e){var n=e.handleFilter,t=e.filter;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n,value:t}))},p=function(e){var n=e.addPerson,t=e.handleNewName,a=e.newName,c=e.handleNewNumber,u=e.newNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,value:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:c,value:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.persons,t=e.filter,a=e.deletePerson;return n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," "," ",r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))}))},v=function(e){var n=e.message,t=e.isSuccesful;return null===n?null:r.a.createElement("div",{className:"notification ".concat(t?"succesful":"error")},n)},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),i=l[0],m=l[1],w=Object(a.useState)(""),N=Object(o.a)(w,2),j=N[0],O=N[1],g=Object(a.useState)(""),S=Object(o.a)(g,2),k=S[0],C=S[1],P=Object(a.useState)(null),y=Object(o.a)(P,2),F=y[0],A=y[1],D=Object(a.useState)(!0),J=Object(o.a)(D,2),L=J[0],x=J[1];Object(a.useEffect)((function(){s().then((function(e){c(e.data)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook - Full"),r.a.createElement(h,{handleFilter:function(e){C(e.target.value)},filter:k}),r.a.createElement("h3",null,"Add new person"),r.a.createElement(v,{message:F,isSuccesful:L}),r.a.createElement(p,{addPerson:function(e){e.preventDefault(),t.some((function(e){return e.name===i}))?window.confirm("".concat(i," is already on phonebook. Replace old number with new one?"))&&function(){var e=t.find((function(e){return e.name===i}));d(e.id,{name:i,number:j}).then(c(t.map((function(n){return n.id===e.id?{name:i,number:j}:n})))).catch((function(){A("".concat(e.name," has been removed from server. Please reload the page.")),x(!1)}))}():f({name:i,number:j}).then((function(e){c(t.concat(e.data)),m(""),O(""),A("Added ".concat(e.data.name)),x(!0),setTimeout((function(){A(null)}),5e3)}))},handleNewName:function(e){m(e.target.value)},newName:i,handleNewNumber:function(e){O(e.target.value)},newNumber:j}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(E,{persons:t,filter:k,deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&b(e.id).then(c(t.filter((function(n){return n.id!==e.id}))))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.201f7ccd.chunk.js.map