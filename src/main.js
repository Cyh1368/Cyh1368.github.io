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
    return span.innerHTML.replace(/<br\s*\/?>/gi, "\n").replace(/\s+/g, " ").replace(/ ?\n ?/g, "\n").trim();
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

  var DURATION = 900;
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
        if (c === "\n" || c === " ") out += c;
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
      if (animate && !reduced && from !== lang) morph(pair, from, lang, idx * 35);
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

  /* ---------- cloth background ---------- */

  var canvas = document.getElementById("cloth");
  if (!canvas || reduced) return;
  var ctx = canvas.getContext("2d");
  var CELL = 6;
  var BASE = [0x1c, 0x16, 0x13];
  var W, H, cur, vel, img, px;
  var mx = -1, my = -1, pmx = -1, pmy = -1;
  var awake = false, idleSince = 0;

  function resize() {
    W = Math.ceil(window.innerWidth / CELL) + 2;
    H = Math.ceil(window.innerHeight / CELL) + 2;
    canvas.width = W;
    canvas.height = H;
    cur = new Float32Array(W * H);
    vel = new Float32Array(W * H);
    img = ctx.createImageData(W, H);
    px = new Uint32Array(img.data.buffer);
    draw();
  }

  function stamp(cx, cy, amp) {
    var r = 2.5;
    for (var y = Math.max(1, cy - r * 2); y < Math.min(H - 1, cy + r * 2); y++) {
      for (var x = Math.max(1, cx - r * 2); x < Math.min(W - 1, cx + r * 2); x++) {
        var d2 = ((x - cx) * (x - cx) + (y - cy) * (y - cy)) / (r * r);
        vel[y * W + x] -= amp * Math.exp(-d2);
      }
    }
  }

  function step() {
    var energy = 0;
    for (var y = 1; y < H - 1; y++) {
      for (var x = 1; x < W - 1; x++) {
        var i = y * W + x;
        var avg = (cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) * 0.25;
        vel[i] = (vel[i] + (avg - cur[i]) * 0.9) * 0.88;
      }
    }
    for (var j = 0; j < cur.length; j++) {
      cur[j] += vel[j] * 0.6;
      energy += Math.abs(vel[j]);
    }
    return energy / cur.length;
  }

  function draw() {
    var a = 0xff000000;
    for (var y = 1; y < H - 1; y++) {
      for (var x = 1; x < W - 1; x++) {
        var i = y * W + x;
        // slope along a light direction from the top-left gives fabric-like folds
        var s = (cur[i - 1] - cur[i + 1] + cur[i - W] - cur[i + W]) * 9;
        var r = clamp(BASE[0] + s * 1.0);
        var g = clamp(BASE[1] + s * 0.85);
        var b = clamp(BASE[2] + s * 0.75);
        px[i] = a | (b << 16) | (g << 8) | r;
      }
    }
    // fill the one-cell border with the base color
    for (var k = 0; k < W; k++) { px[k] = px[W + k]; px[(H - 1) * W + k] = px[(H - 2) * W + k]; }
    for (var m = 0; m < H; m++) { px[m * W] = px[m * W + 1]; px[m * W + W - 1] = px[m * W + W - 2]; }
    ctx.putImageData(img, 0, 0);
  }

  function clamp(v) { return v < 0 ? 0 : v > 255 ? 255 : v | 0; }

  function loop(ts) {
    if (mx >= 0 && pmx >= 0) {
      var dx = mx - pmx, dy = my - pmy;
      var speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 0.5) {
        var n = Math.min(8, Math.ceil(speed / (CELL * 2)));
        for (var k = 1; k <= n; k++) {
          var t = k / n;
          stamp(
            Math.round((pmx + dx * t) / CELL) + 1,
            Math.round((pmy + dy * t) / CELL) + 1,
            Math.min(speed * 0.01, 0.7) / n * 2
          );
        }
        idleSince = ts;
      }
    }
    pmx = mx; pmy = my;
    var e = step();
    draw();
    if (e < 0.0004 && ts - idleSince > 500) { awake = false; return; }
    requestAnimationFrame(loop);
  }

  function wake(x, y) {
    mx = x; my = y;
    if (pmx < 0) { pmx = x; pmy = y; }
    if (!awake) { awake = true; idleSince = performance.now(); requestAnimationFrame(loop); }
  }

  window.addEventListener("pointermove", function (e) { wake(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener("pointerleave", function () { mx = pmx = -1; });
  window.addEventListener("resize", resize);
  resize();
})();
