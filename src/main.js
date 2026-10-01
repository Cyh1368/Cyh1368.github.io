(function () {
  var root = document.documentElement;
  var langs = { en: "en", zh: "zh-Hant" };

  function setLang(lang) {
    if (!langs[lang]) lang = "en";
    root.dataset.lang = lang;
    root.lang = langs[lang];
    document.title = lang === "zh" ? "何承祐" : "Cheng-You Ho";
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (!saved) saved = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  setLang(saved);

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.setLang); });
  });
})();
