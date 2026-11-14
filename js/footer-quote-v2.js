(() => {
  "use strict";

  const API_URLS = [
    "https://worlds.center/api/hitokoto",
    "https://blog.noah0932.top/api/hitokoto",
    "https://v1.hitokoto.cn/?c=i&encode=json",
  ];
  let controller = null;
  let typingTimer = null;
  let requestId = 0;

  const stop = () => {
    requestId += 1;
    controller?.abort();
    controller = null;
    if (typingTimer) {
      window.clearInterval(typingTimer);
      typingTimer = null;
    }
  };

  const ensureHomeTarget = () => {
    const siteInfo = document.getElementById("site-info");
    if (!siteInfo || document.getElementById("subtitle")) return;
    const subtitle = document.createElement("div");
    subtitle.id = "site-subtitle";
    const text = document.createElement("span");
    text.id = "subtitle";
    subtitle.appendChild(text);
    siteInfo.appendChild(subtitle);
  };

  const getTargets = () => {
    ensureHomeTarget();
    return [
      document.getElementById("subtitle"),
      document.getElementById("footer-type-tips"),
    ].filter(Boolean);
  };

  const type = (targets, content, id) => {
    let cursor = 0;
    targets.forEach(target => { target.textContent = ""; });
    typingTimer = window.setInterval(() => {
      if (id !== requestId) return;
      const current = content.slice(0, cursor += 1);
      targets.forEach(target => { target.textContent = current; });
      if (cursor >= content.length) {
        window.clearInterval(typingTimer);
        typingTimer = null;
      }
    }, 55);
  };

  const requestJsonp = signal => new Promise((resolve, reject) => {
    const callbackName = `__noahHitokoto_${Date.now()}`;
    const script = document.createElement("script");
    let settled = false;
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
      signal.removeEventListener("abort", abort);
      window.clearTimeout(timeout);
    };
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback(value);
    };
    const abort = () => finish(reject, new DOMException("Request aborted", "AbortError"));
    const timeout = window.setTimeout(() => finish(reject, new Error("Hitokoto JSONP timeout")), 8000);

    window[callbackName] = payload => {
      try {
        finish(resolve, typeof payload === "string" ? JSON.parse(payload) : payload);
      } catch (error) {
        finish(reject, error);
      }
    };
    script.async = true;
    script.onerror = () => finish(reject, new Error("Hitokoto JSONP failed"));
    script.src = `https://v1.hitokoto.cn/?c=i&encode=json&callback=${callbackName}`;
    signal.addEventListener("abort", abort, { once: true });
    document.head.appendChild(script);
  });

  const load = async () => {
    const targets = getTargets();
    if (!targets.length) return;

    stop();
    const id = requestId;
    const nextController = new AbortController();
    controller = nextController;
    targets.forEach(target => { target.textContent = "正在获取名言…"; });
    const timeout = window.setTimeout(() => nextController.abort(), 8000);

    try {
      let data;
      try {
        data = await requestJsonp(nextController.signal);
      } catch (jsonpError) {
        let lastError = jsonpError;
        for (const url of API_URLS) {
          const response = await fetch(url, {
            signal: nextController.signal,
            cache: "no-store",
          });
          if (!response.ok) {
            lastError = new Error(`Hitokoto HTTP ${response.status}`);
            if (response.status === 404) continue;
            throw lastError;
          }
          data = await response.json();
          break;
        }
        if (!data) throw lastError || new Error("Hitokoto API unavailable");
      }
      const content = [data.hitokoto, data.from ? `—— ${data.from}` : ""]
        .filter(Boolean)
        .join(" ");
      if (!content || id !== requestId) return;
      type(targets, content, id);
    } catch (error) {
      if (id === requestId && error.name !== "AbortError") {
        console.warn("Footer quote could not be loaded.", error);
        if (id === requestId) targets.forEach(target => { target.textContent = "暂时无法获取名言"; });
      } else if (id === requestId && error.name === "AbortError") {
        targets.forEach(target => { target.textContent = "暂时无法获取名言"; });
      }
    } finally {
      window.clearTimeout(timeout);
      if (controller === nextController) controller = null;
    }
  };

  const schedule = () => window.setTimeout(load, 120);

  window.footerQuote = { load, stop };
  document.addEventListener("pjax:send", stop);
  document.addEventListener("pjax:complete", schedule);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule, { once: true });
  } else {
    schedule();
  }
})();
