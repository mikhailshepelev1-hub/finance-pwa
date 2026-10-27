const C='fin-v4',F=['./','index.html','supabase.js','config.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(F.map(f=>c.add(f)))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
// Кешируются только GET-запросы к файлам этого же сайта. Запросы к Supabase и любые чужие домены не перехватываются.
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
e.respondWith(fetch(r).then(x=>{if(x.ok&&x.type==='basic'){const c=x.clone();caches.open(C).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r).then(x=>x||caches.match('index.html'))))});
