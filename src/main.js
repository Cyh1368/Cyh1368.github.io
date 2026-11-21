(function () {
  var root = document.documentElement;
  var langs = { en: "en", zh: "zh-Hant" };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrow = window.matchMedia("(max-width: 640px)");
  var menu = window.matchMedia("(max-width: 820px)");

  /* ---------- text morph ---------- */

  // Each translatable element holds an en span and a zh span. Read both texts
  // once (<br> becomes "\n"), then animate whichever span becomes visible.
  var pairs = [];
  function collectPairs() {
    pairs = [];
    document.querySelectorAll('span[lang="en"]').forEach(function (en) {
      var zh = en.nextElementSibling;
      while (zh && zh.getAttribute("lang") !== "zh") zh = zh.nextElementSibling;
      if (!zh) return;
      pairs.push({
        el: { en: en, zh: zh },
        text: { en: read(en), zh: read(zh) },
      });
    });
  }
  collectPairs();

  function read(span) {
    var tmp = document.createElement("div");
    tmp.innerHTML = span.innerHTML.replace(/<br\s*\/?>/gi, "\u0000");
    // [ \t\r\n] instead of \s so non-breaking spaces survive
    return tmp.textContent.replace(/[ \t\r\n]+/g, " ").replace(/ ?\u0000 ?/g, "\n").trim();
  }

  function render(span, str) {
    var html = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\n/g, "<br>");
    // The homepage tagline is three phrases joined by ．. On a phone, keep each
    // phrase intact and break only between them. Desktop still fits on one line.
    if (narrow.matches && span.getAttribute("lang") === "zh" && html.indexOf("．") !== -1) {
      html = html.split("．").map(function (part, i, parts) {
        var dot = i < parts.length - 1 ? "．" : "";
        return '<span class="keep">' + part + dot + "</span>";
      }).join("");
    }
    span.innerHTML = html;
  }

  // Keep phrases together unless a non-breaking run is wider than the screen.
  function softenNbsp() {
    if (!narrow.matches) return;
    var limit = document.documentElement.clientWidth - 8;
    document.querySelectorAll("span[lang]").forEach(function (span) {
      if (span.classList.contains("morphing")) return;
      if (span.getBoundingClientRect().right <= limit) return;
      if (!/&nbsp;|\u00a0/.test(span.innerHTML)) return;
      span.innerHTML = span.innerHTML.replace(/&nbsp;|\u00a0/g, " ");
    });
  }

  var POOL = {
    en: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    zh: "的一是不了人我在有他這中大來上國個到說們為子和你地出道也時年得就那要下以生會自著去之過家學對可她裡後小麼心多天而能好都然沒日於起還發成事只作當想看文無開手十用主行方又如前所本見經頭面公同三已老從動兩長知民樣現分將外但身些與高意進把法此實回二理美點月明爾故",
  };

  function pick(lang) {
    var p = POOL[lang];
    return p.charAt((Math.random() * p.length) | 0);
  }

  var DURATION = 450;
  var running = new Map();

  function morph(pair, from, to, delay) {
    var span = pair.el[to];
    var oldStr = pair.text[from];
    var newStr = pair.text[to];
    var n = newStr.length;
    var start = [];
    var end = [];
    for (var i = 0; i < n; i++) {
      var s = (i / Math.max(n, 1)) * 0.45 + Math.random() * 0.15;
      start.push(s);
      end.push(Math.min(1, s + 0.25 + Math.random() * 0.25));
    }
    var t0 = null;
    span.classList.add("morphing");
    running.set(span, true);

    function frame(ts) {
      if (t0 === null) t0 = ts + delay;
      var p = Math.max(0, (ts - t0) / DURATION);
      if (p >= 1) {
        render(span, newStr);
        span.classList.remove("morphing");
        running.delete(span);
        softenNbsp();
        return;
      }
      var out = "";
      for (var i = 0; i < n; i++) {
        var c = newStr.charAt(i);
        if (c === "\n" || c === " " || c === "\u00a0") out += c;
        else if (p < start[i]) out += oldStr.charAt(i) || "";
        else if (p < end[i]) out += pick(to);
        else out += c;
      }
      render(span, out);
      requestAnimationFrame(frame);
    }
    render(span, oldStr.slice(0, n));
    requestAnimationFrame(frame);
  }

  function setLang(lang, animate) {
    if (!langs[lang]) lang = "en";
    var from = root.dataset.lang || "en";
    root.dataset.lang = lang;
    root.lang = langs[lang];
    var essay = document.querySelector(".essay-shell");
    var pageTitle = essay
      ? ((lang === "zh" ? essay.getAttribute("data-title-zh") : essay.getAttribute("data-title-en")) + " | ")
      : document.querySelector(".research-shell")
      ? (lang === "zh" ? "研究 | " : "Research | ")
      : document.querySelector(".writings-shell")
        ? (lang === "zh" ? "寫作 | " : "Writings | ")
      : document.querySelector(".contacts-shell")
        ? (lang === "zh" ? "聯絡 | " : "Contacts | ") : "";
    document.title = pageTitle + (lang === "zh" ? "何承祐" : "Cheng-You Ho");
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}

    pairs.forEach(function (pair, idx) {
      render(pair.el[lang], pair.text[lang]);
      if (animate && !reduced && from !== lang) morph(pair, from, lang, idx * 17);
    });
    softenNbsp();
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (!saved) saved = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  setLang(saved, false);
  narrow.addEventListener("change", function () {
    setLang(root.dataset.lang || "en", false);
  });

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.setLang !== root.dataset.lang) setLang(b.dataset.setLang, true);
    });
  });

  /* Phones use a disclosure for the same links. Close it once the choice is made. */
  var siteNav = document.querySelector(".site-nav");
  var navToggle = document.querySelector(".nav-check");
  if (siteNav && navToggle) {
    function closeNav() {
      navToggle.checked = false;
      navToggle.setAttribute("aria-expanded", "false");
    }
    function syncNav() {
      navToggle.tabIndex = menu.matches ? 0 : -1;
      if (!menu.matches) closeNav();
    }
    navToggle.addEventListener("change", function () {
      navToggle.setAttribute("aria-expanded", navToggle.checked ? "true" : "false");
    });
    document.addEventListener("click", function (event) {
      if (navToggle.checked && !siteNav.contains(event.target)) closeNav();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
    menu.addEventListener("change", syncNav);
    syncNav();
  }
  /* Reveal abstracts from the top, keeping the citation anchored in place. */
  function setupAbstracts() {
    document.querySelectorAll(".research-work").forEach(function (work) {
      var summary = work.querySelector("summary");
      var animation = null;
      var expanded = work.open;

      summary.addEventListener("click", function (event) {
        // A citation link still opens the paper instead of toggling the abstract.
        if (event.target.closest("a") || reduced || !work.animate) return;
        event.preventDefault();
        expanded = !expanded;

        var startHeight = work.getBoundingClientRect().height;
        if (animation) {
          animation.cancel();
          animation = null;
        }
        work.open = true;
        work.style.height = "auto";
        var endHeight = expanded
          ? work.getBoundingClientRect().height
          : summary.getBoundingClientRect().height;
        work.dataset.expanded = String(expanded);
        work.style.overflow = "hidden";
        work.style.height = startHeight + "px";

        animation = work.animate(
          [{ height: startHeight + "px" }, { height: endHeight + "px" }],
          { duration: 440, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)", fill: "forwards" }
        );
        animation.onfinish = function () {
          work.open = expanded;
          work.style.height = "";
          work.style.overflow = "";
          delete work.dataset.expanded;
          animation.cancel();
          animation = null;
        };
      });
    });
  }
  setupAbstracts();

  /* Keep the shared header in place while local pages morph into each other. */
  var navigating = false;
  var pageCache = new Map();
  var bundledPages = window.SITE_PAGES || {};
  var filePreview = window.location.protocol === "file:";
  var activePage = pageKey(new URL(window.location.href));
  var pendingNavigation = null;

  function pageKey(url) {
    return url.pathname.split("/").pop() || "index.html";
  }

  function routeURL() {
    var url = new URL(window.location.href);
    if (filePreview) {
      var route = url.hash.slice(1);
      var name = route === "home" ? "index.html" : route + ".html";
      if (bundledPages[name]) return new URL("./" + name, url);
    }
    return url;
  }

  function visibleTextNodes(element) {
    var nodes = [];
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (node.textContent.trim() && node.parentElement.getClientRects().length) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  function scramblePage(element, previousText) {
    var nodes = visibleTextNodes(element);
    var originals = nodes.map(function (node) { return node.textContent; });
    var duration = 520;
    var start = performance.now();
    element.setAttribute("aria-busy", "true");
    return new Promise(function (resolve) {
      function frame(now) {
        var progress = Math.min(1, (now - start) / duration);
        nodes.forEach(function (node, index) {
          var text = originals[index];
          node.textContent = Array.from(text).map(function (character, i, chars) {
            if (/\s/.test(character) || progress === 1) return character;
            var threshold = 0.2 + (i / Math.max(1, chars.length)) * 0.55;
            if (progress > threshold) return character;
            if (progress < 0.12 && previousText[index]) {
              return Array.from(previousText[index])[i] || pick(root.dataset.lang);
            }
            return pick(/[\u3400-\u9fff]/.test(character) ? "zh" : "en");
          }).join("");
        });
        if (progress < 1) requestAnimationFrame(frame);
        else {
          element.removeAttribute("aria-busy");
          resolve();
        }
      }
      frame(start);
    });
  }

  async function navigate(url, addHistory) {
    if (navigating) {
      pendingNavigation = { url: url, addHistory: addHistory };
      return;
    }
    navigating = true;
    try {
      var key = pageKey(url);
      var html = bundledPages[key] || pageCache.get(url.pathname);
      if (!html) {
        var response = await fetch(url.href);
        if (!response.ok) throw new Error("Page unavailable");
        html = await response.text();
        pageCache.set(url.pathname, html);
      }
      var next = new DOMParser().parseFromString(html, "text/html");
      var nextMain = next.querySelector("main");
      if (!nextMain) throw new Error("Missing page content");
      var current = document.querySelector("main");
      var previousText = visibleTextNodes(current).map(function (node) { return node.textContent; });
      var morphDone = Promise.resolve();
      function swap() {
        current.replaceWith(nextMain);
        document.querySelectorAll(".site-links a[data-page]").forEach(function (link) {
          if (pageKey(new URL(link.href)) === key) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
        collectPairs();
        setLang(root.dataset.lang, false);
        setupAbstracts();
        window.scrollTo({ top: 0, behavior: "instant" });
        activePage = key;
        if (addHistory) {
          // File URLs cannot reliably rewrite paths with pushState. Keep local
          // previews on the same file and store the selected page in its hash.
          var destination = filePreview
            ? "#" + (key === "index.html" ? "home" : key.replace(/\.html$/, ""))
            : url.href;
          history.pushState(null, "", destination);
        }
        if (!reduced) morphDone = scramblePage(nextMain, previousText);
      }
      if (!reduced && document.startViewTransition) {
        var transition = document.startViewTransition(swap);
        await transition.finished;
      } else {
        // Cross-fade on browsers without the View Transition API.
        if (!reduced && current.animate) {
          await current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: "forwards" }).finished;
        }
        swap();
        if (!reduced && nextMain.animate) {
          await nextMain.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260 }).finished;
        }
      }
      await morphDone;
      nextMain.setAttribute("tabindex", "-1");
      nextMain.focus({ preventScroll: true });
    } catch (error) {
      window.location.assign(url.href);
    } finally {
      navigating = false;
      if (pendingNavigation) {
        var pending = pendingNavigation;
        pendingNavigation = null;
        if (pageKey(pending.url) !== activePage) navigate(pending.url, pending.addHistory);
      }
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-page]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute("download")) return;
    var url = new URL(link.href);
    if (url.origin !== window.location.origin) return;
    event.preventDefault();
    if (pageKey(url) !== activePage) navigate(url, true);
  });

  window.addEventListener("popstate", function () {
    var url = routeURL();
    if (pageKey(url) !== activePage) navigate(url, false);
  });

  // A local preview refreshed at #contacts should still display Contacts.
  var initialRoute = routeURL();
  if (pageKey(initialRoute) !== activePage) navigate(initialRoute, false);

})();
