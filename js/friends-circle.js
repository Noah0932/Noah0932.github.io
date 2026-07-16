(() => {
  "use strict";

  if (window.friendsCircle) {
    window.friendsCircle.init();
    return;
  }

  const FRIENDS_DATA_PATH = "/api/friends-posts.json";
  const FALLBACK_AVATAR = "/assets/images/181f27c2864d-bitbug_favicon.ico";
  const CACHE_TTL = 5 * 60 * 1000;

  let activeRequest = null;
  let requestVersion = 0;
  let cachedPosts = null;
  let cachedAt = 0;

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const formatDate = value => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "日期未知";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  };

  const createLoading = () => {
    const loading = createElement("div", "friends-circle-loading");
    loading.append(
      createElement("p", "", "正在加载朋友圈..."),
      createElement("div", "loading-spinner")
    );
    return loading;
  };

  const createMessage = (message, isError = false) => {
    const wrapper = createElement("div", isError ? "friends-circle-error" : "friends-circle-empty");
    wrapper.appendChild(createElement("p", "", message));
    return wrapper;
  };

  const createPostCard = post => {
    const card = createElement("article", "friend-post-card");
    const author = createElement("div", "author-info");
    const avatar = createElement("img", "author-avatar");
    avatar.src = post.avatar || FALLBACK_AVATAR;
    avatar.alt = `${post.author || "友链作者"}的头像`;
    avatar.addEventListener("error", () => {
      if (avatar.src.endsWith(FALLBACK_AVATAR)) return;
      avatar.src = FALLBACK_AVATAR;
    }, { once: true });
    author.append(avatar, createElement("span", "author-name", post.author || "未知作者"));

    const content = createElement("div", "post-content");
    const title = createElement("a", "post-title", post.title);
    title.href = post.link;
    title.target = "_blank";
    title.rel = "noopener noreferrer";
    content.append(title, createElement("p", "post-summary", post.summary ? `${post.summary}...` : "暂无摘要"));

    const meta = createElement("div", "post-meta");
    meta.appendChild(createElement("span", "post-date", formatDate(post.pubDate)));
    card.append(author, content, meta);
    return card;
  };

  const renderPosts = (container, posts) => {
    if (posts.length === 0) {
      container.replaceChildren(createMessage("未能加载到朋友们的动态。"));
    } else {
      container.replaceChildren(...posts.map(createPostCard));
    }
    container.dataset.friendsCircleReady = "true";
  };

  const loadPosts = async signal => {
    const response = await fetch(FRIENDS_DATA_PATH, { signal, cache: "no-cache" });
    if (!response.ok) throw new Error(`加载朋友圈数据失败：HTTP ${response.status}`);
    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("朋友圈数据格式错误");
    return posts.filter(post => post && post.link && post.title);
  };

  const abort = () => {
    requestVersion += 1;
    activeRequest?.abort();
    activeRequest = null;
  };

  const init = async () => {
    const container = document.getElementById("friends-circle-container");
    if (!container || container.dataset.friendsCircleReady === "true") return;

    if (cachedPosts && Date.now() - cachedAt < CACHE_TTL) {
      renderPosts(container, cachedPosts);
      return;
    }

    abort();
    const currentVersion = requestVersion;
    const controller = new AbortController();
    activeRequest = controller;
    container.replaceChildren(createLoading());

    try {
      const posts = await loadPosts(controller.signal);
      if (currentVersion !== requestVersion || document.getElementById("friends-circle-container") !== container) return;
      cachedPosts = posts;
      cachedAt = Date.now();
      renderPosts(container, posts);
    } catch (error) {
      if (error.name === "AbortError" || currentVersion !== requestVersion) return;
      console.error("Error building friends circle:", error);
      container.replaceChildren(createMessage("加载朋友圈失败，请稍后重试。", true));
    } finally {
      if (activeRequest === controller) activeRequest = null;
    }
  };

  window.friendsCircle = { init, abort };
  document.addEventListener("pjax:send", abort);
  document.addEventListener("pjax:complete", init);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
