const CACHE='pensiero-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.open(CACHE).then(async c=>{
  const hit=await c.match(e.request);
  if(hit) return hit;
  try{const res=await fetch(e.request); c.put(e.request,res.clone()); return res;}
  catch(err){return hit;}
 }));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close();
 e.waitUntil(clients.matchAll({type:'window'}).then(cs=>{
  for(const c of cs){if('focus' in c)return c.focus();}
  return clients.openWindow('./index.html');
 }));
});