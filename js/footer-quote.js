(() => {
  "use strict";

  const API_URL = "https://v1.hitokoto.cn/?encode=json";
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

  const getTarget = () => document.getElementById("footer-type-tips");

  const type = (target, content, id) => {
    let cursor = 0;
    target.textContent = "";
    typingTimer = window.setInterval(() => {
      if (id !== requestId) return;
      target.textContent = content.slice(0, cursor += 1);
      if (cursor >= content.length) {
        window.clearInterval(typingTimer);
        typingTimer = null;
      }
    }, 55);
  };

  const load = async () => {
    const target = getTarget();
    if (!target) return;

    stop();
    const id = requestId;
    const nextController = new AbortController();
    controller = nextController;
    target.textContent = "正在获取名言…";
    const timeout = window.setTimeout(() => nextController.abort(), 8000);

    try {
      const response = await fetch(API_URL, {
        signal: nextController.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`Hitokoto HTTP ${response.status}`);
      const data = await response.json();
      const content = [data.hitokoto, data.from ? `—— ${data.from}` : ""]
        .filter(Boolean)
        .join(" ");
      if (!content || id !== requestId) return;
      type(target, content, id);
    } catch (error) {
      if (id === requestId && error.name !== "AbortError") {
        console.warn("Footer quote could not be loaded.", error);
        if (id === requestId) target.textContent = "暂时无法获取名言";
      } else if (id === requestId && error.name === "AbortError") {
        target.textContent = "暂时无法获取名言";
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
