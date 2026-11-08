var C='vc-v2',F=['/','/index.html','https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(u).catch(function(){})}))}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.hostname==='cdnjs.cloudflare.com'||(u.origin===location.origin&&(r.mode==='navigate'||u.pathname==='/index.html'))){
    e.respondWith(caches.match(u.origin===location.origin?'/index.html':r).then(function(c){
      var n=fetch(r).then(function(x){var y=x.clone();caches.open(C).then(function(cc){cc.put(u.origin===location.origin?'/index.html':r,y)});return x}).catch(function(){return c});
      return c||n;
    }));
  }
});
