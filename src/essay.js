(function () {
  var root = document.querySelector("[data-essay]");
  if (!root) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var works = JSON.parse(document.getElementById("essay-works").textContent);
  var frame = root.querySelector("[data-frame]");
  var stack = root.querySelector("[data-stack]");
  var constellation = root.querySelector("[data-constellation]");
  var caption = root.querySelector("[data-caption]");
  var credit = root.querySelector("[data-credit]");
  var pin = root.querySelector("[data-pin]");
  var beats = Array.prototype.slice.call(root.querySelectorAll("[data-beat]"));
  var washes = Array.prototype.slice.call(document.querySelectorAll("[data-wash]"));
  var washSlot = 0;
  var current = null;
  var lang = document.documentElement.dataset.lang || "en";

  // Where the floor-plan dot sits on the hand-drawn sketch.
  var pins = {
    arp: [50.2, 57.6],
    masson: [73.6, 47.2],
    cezanne: [50.2, 39.4],
    matisse: [33.2, 35.2],
    picasso: [26.4, 51.4],
  };

  // Exhibition order around the room, then the same five works by date.
  var ring = {
    arp: ["40%", "64%", "24%"],
    masson: ["68%", "36%", "26%"],
    cezanne: ["36%", "14%", "28%"],
    matisse: ["6%", "6%", "22%"],
    picasso: ["10%", "56%", "22%"],
  };
  var lineOrder = ["cezanne", "matisse", "picasso", "masson", "arp"];

  Object.keys(works).forEach(function (id) {
    var img = document.createElement("img");
    img.className = "stage-img";
    img.dataset.work = id;
    img.alt = works[id].alt;
    img.addEventListener("load", function () {
      if (img.classList.contains("is-on") && current) place(img, current);
    });
    img.src = works[id].src;
    stack.appendChild(img);
  });

  if (constellation) {
    Object.keys(works).forEach(function (id) {
      if (!works[id].year) return;
      var figure = document.createElement("figure");
      figure.dataset.work = id;
      if (id === "matisse") figure.classList.add("cap-above");
      var img = document.createElement("img");
      img.src = works[id].src;
      img.alt = "";
      var cap = document.createElement("figcaption");
      cap.innerHTML = works[id].name + '<span class="year">' + works[id].year + "</span>";
      figure.appendChild(img);
      figure.appendChild(cap);
      constellation.appendChild(figure);
    });
  }

  function place(img, beat) {
    var fw = frame.clientWidth;
    var fh = frame.clientHeight;
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    if (!fw || !fh || !iw || !ih) return;
    var scale = Number(beat.dataset.scale) || 1;
    var fit = Math.min(fw / iw, fh / ih);
    var dw = iw * fit;
    var dh = ih * fit;
    var baseLeft = (fw - dw) / 2;
    var baseTop = (fh - dh) / 2;
    var ox = (Number(beat.dataset.x) / 100) * dw;
    var oy = (Number(beat.dataset.y) / 100) * dh;
    img.style.width = dw + "px";
    img.style.height = dh + "px";
    img.style.left = baseLeft + "px";
    img.style.top = baseTop + "px";
    img.style.transformOrigin = "0 0";
    // Origin stays at the corner so the zoom interpolates instead of orbiting.
    var tx = fw / 2 - baseLeft - ox * scale;
    var ty = fh / 2 - baseTop - oy * scale;
    // A detail at the edge cannot sit in the middle without opening a black
    // gap. If the enlargement already covers the frame, slide it back until
    // the painting fills that side and the detail stays as central as it can.
    var left = baseLeft + tx;
    var top = baseTop + ty;
    var sw = dw * scale;
    var sh = dh * scale;
    // data-fit="contain" keeps the detail centered and allows a margin.
    // Everything else slides until the painting covers the frame.
    if (beat.dataset.fit !== "contain") {
      if (sw >= fw) left = Math.min(0, Math.max(fw - sw, left));
      if (sh >= fh) top = Math.min(0, Math.max(fh - sh, top));
    }
    tx = left - baseLeft;
    ty = top - baseTop;
    img.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    var blur = reduced ? 0 : Number(beat.dataset.blur) || 0;
    var sat = beat.dataset.sat || "1";
    img.style.setProperty("--blur", blur + "px");
    img.style.setProperty("--sat", sat);
  }

  function showWash(src) {
    var incoming = washes[washSlot % 2];
    var outgoing = washes[(washSlot + 1) % 2];
    if (!incoming) return;
    if (incoming.style.backgroundImage === 'url("' + src + '")' && incoming.classList.contains("is-on")) return;
    incoming.style.backgroundImage = 'url("' + src + '")';
    incoming.classList.add("is-on");
    if (outgoing) outgoing.classList.remove("is-on");
    washSlot += 1;
  }

  function arrange(layout) {
    if (!constellation) return;
    var on = layout === "ring" || layout === "line";
    constellation.classList.toggle("is-on", on);
    constellation.classList.toggle("is-line", layout === "line");
    stack.style.opacity = on ? "0" : "";
    if (!on) return;
    var figures = constellation.querySelectorAll("figure");
    figures.forEach(function (figure) {
      var id = figure.dataset.work;
      var spot = layout === "ring" ? ring[id] : null;
      if (layout === "line") {
        var index = lineOrder.indexOf(id);
        var left = 2 + index * 19.4;
        figure.style.left = left + "%";
        figure.style.top = "50%";
        figure.style.width = "17.5%";
        figure.style.transform = "translateY(-50%)";
      } else if (spot) {
        figure.style.left = spot[0];
        figure.style.top = spot[1];
        figure.style.width = spot[2];
        figure.style.transform = "";
      }
    });
  }

  function apply(beat) {
    if (!beat || beat === current) return;
    var work = beat.dataset.work;
    var same = current && current.dataset.work === work && !beat.dataset.layout && !(current && current.dataset.layout);
    var img = stack.querySelector('[data-work="' + work + '"]');
    if (img && !same) img.classList.add("no-move");
    stack.querySelectorAll(".stage-img").forEach(function (node) {
      var active = node.dataset.work === work && !beat.dataset.layout;
      node.classList.toggle("is-on", active);
      if (active) place(node, beat);
    });
    if (img && !same) {
      void img.offsetWidth;
      img.classList.remove("no-move");
    }
    arrange(beat.dataset.layout || "");
    if (works[work]) showWash(works[work].src);
    if (pin) {
      var spot = pins[beat.dataset.pin];
      pin.classList.toggle("is-on", !!spot);
      if (spot) {
        pin.style.left = spot[0] + "%";
        pin.style.top = spot[1] + "%";
      }
    }
    beats.forEach(function (node) { node.classList.toggle("is-active", node === beat); });
    current = beat;
    writeCaption();
  }

  function writeCaption() {
    if (!current) return;
    var text = current.getAttribute(lang === "zh" ? "data-zh" : "data-en") || "";
    caption.textContent = text;
    var work = works[current.dataset.work];
    if (work && work.credit && work.href) {
      credit.hidden = false;
      credit.textContent = "· " + work.credit;
      credit.href = work.href;
    } else if (credit) {
      credit.hidden = true;
    }
  }

  function closest() {
    var stageBox = root.querySelector("[data-stage]");
    var focus = window.innerWidth <= 860
      ? stageBox.getBoundingClientRect().bottom + 12
      : window.innerHeight * 0.36;
    var best = beats[0];
    beats.forEach(function (beat) {
      if (beat.getBoundingClientRect().top <= focus) best = beat;
    });
    return best;
  }

  var scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      if (!root.isConnected) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      apply(closest());
    });
  }

  new MutationObserver(function () {
    lang = document.documentElement.dataset.lang || "en";
    writeCaption();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    if (!current || current.dataset.layout) return;
    var img = stack.querySelector(".stage-img.is-on");
    if (!img) return;
    img.classList.add("no-move");
    place(img, current);
    void img.offsetWidth;
    img.classList.remove("no-move");
  });
  apply(closest());
})();
