webpackJsonp([0],{"/Npr":function(t,r,e){"use strict";e.d(r,"a",function(){return i});var n=e("1Zxj"),i=function(){function t(t){this.api=t}return t.prototype.setCero=function(t){return t<10?"0"+t:t},t.prototype.getAllSalida=function(){return this.api.get("/Usuarios/getUserLastCheck",!0)},t.prototype.addCheck=function(t){return this.api.post("/Usuarios/setNewCheck",{id:t},!0)},t.prototype.aumentarContador=function(t){var r="/ChecklistSalidas/"+t.id;return this.api.patch(r,t,!0)},t.ctorParameters=function(){return[{type:n.a}]},t}()}});