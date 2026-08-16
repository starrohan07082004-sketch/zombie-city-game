var C="zombie-city-v9";
self.addEventListener("install",function(e){self.skipWaiting();});
self.addEventListener("activate",function(e){
e.waitUntil(caches.keys().then(function(n){
return Promise.all(n.map(function(x){return caches.delete(x)}));
}).then(function(){return self.clients.claim()}));
});
self.addEventListener("fetch",function(e){
if(e.request.mode==="navigate"){
e.respondWith(fetch(e.request).catch(function(){return caches.match("./index.html")}));
return;
}
var u=e.request.url||"";
if(u.indexOf(".glb")>-1||u.indexOf(".png")>-1||u.indexOf(".jpg")>-1||u.indexOf(".ico")>-1){
e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}));
return;
}
e.respondWith(caches.match(e.request).then(function(c){
return c||fetch(e.request).then(function(r){
if(r.status===200&&e.request.method==="GET"){
var cl=r.clone();
caches.open(C).then(function(ca){ca.put(e.request,cl).catch(function(){});});
}
return r;
}).catch(function(){return caches.match(e.request);});
}));
});