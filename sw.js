// 앱 파일을 폰에 캐시해서 오프라인(헬스장 지하 등)에서도 열리게 하고, 밤 10시 알림을 받습니다.
// 앱을 수정해서 다시 올릴 때는 아래 버전 숫자를 올려주세요.
const CACHE = "recomp-v12";
const STATUS = "recomp-status";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== STATUS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  if (url.origin === location.origin || url.host.endsWith("fonts.googleapis.com") || url.host.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});

// ---- 밤 10시 알림 ----
const pad = n => String(n).padStart(2, "0");
const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
self.addEventListener("push", e => {
  e.waitUntil((async () => {
    let done = false;
    try {
      const r = await (await caches.open(STATUS)).match("./__status");
      if (r) done = (await r.json()).bodyDone === today();
    } catch (_) {}
    let data = {};
    try { data = e.data ? e.data.json() : {}; } catch (_) {}
    if (done) {
      return self.registration.showNotification("오늘 기록 완료", {
        body: "수고했어요. 푹 자는 것도 운동이에요.", icon: "icon-192.png", badge: "icon-192.png", tag: "daily", silent: true
      });
    }
    return self.registration.showNotification(data.title || "오늘 기록하셨나요?", {
      body: data.body || "체중, 단백질, 소모 칼로리를 적고 '오늘 몸 상태 등록 완료'를 눌러주세요.",
      icon: "icon-192.png", badge: "icon-192.png", tag: "daily", requireInteraction: true, data: { url: "./#body" }
    });
  })());
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil((async () => {
    const cs = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of cs) { if ("focus" in c) { await c.navigate(target).catch(() => {}); return c.focus(); } }
    return clients.openWindow(target);
  })());
});
