(function () {
  var root = document.documentElement;
  var langs = { en: "en", zh: "zh-Hant" };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- text morph ---------- */

  // Each translatable element holds an en span and a zh span. Read both texts
  // once (<br> becomes "\n"), then animate whichever span becomes visible.
  var pairs = [];
  document.querySelectorAll('span[lang="en"]').forEach(function (en) {
    var zh = en.nextElementSibling;
    while (zh && zh.getAttribute("lang") !== "zh") zh = zh.nextElementSibling;
    if (!zh) return;
    pairs.push({
      el: { en: en, zh: zh },
      text: { en: read(en), zh: read(zh) },
    });
  });

  function read(span) {
    var tmp = document.createElement("div");
    tmp.innerHTML = span.innerHTML.replace(/<br\s*\/?>/gi, "\u0000");
    // [ \t\r\n] instead of \s so non-breaking spaces survive
    return tmp.textContent.replace(/[ \t\r\n]+/g, " ").replace(/ ?\u0000 ?/g, "\n").trim();
  }

  function render(span, str) {
    span.innerHTML = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\n/g, "<br>");
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
    document.title = lang === "zh" ? "何承祐" : "Cheng-You Ho";
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}

    pairs.forEach(function (pair, idx) {
      render(pair.el[lang], pair.text[lang]);
      if (animate && !reduced && from !== lang) morph(pair, from, lang, idx * 17);
    });
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (!saved) saved = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  setLang(saved, false);

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.setLang !== root.dataset.lang) setLang(b.dataset.setLang, true);
    });
  });
})();
