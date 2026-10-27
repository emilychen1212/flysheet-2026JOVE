/* Google Analytics 4：匿名瀏覽統計（評估 ID 在 data/config.js 的 ga4Id）
 *
 * 自動記錄（GA4 內建）：網頁瀏覽、停留／互動時間、來源、外連點擊（連到 JoVE、Google 表單）
 * 本檔額外記錄的事件（每個事件都帶 school 參數，可依學校篩選）：
 *   scroll_depth     捲動深度             percent: 25 / 50 / 75 / 100
 *   section_view     區塊被看到           section: topics / student / teacher / info / notice / faq …
 *   topic_click      點擊訂購主題         topic: "Journal - Biology"
 *   topic_menu_open  展開主題下拉選單     product: "Core"
 *   cta_click        點擊按鈕             button: student_form / teacher_form / jump_student / jump_teacher /
 *                                                 sticky_student / sticky_teacher / school_entry / line_open / bonus_quiz
 *   faq_open         展開常見問題         question: 問題文字
 * 重點行動另外送獨立事件（方便在 GA「管理 → 重要事件」標記，cta_click 照送）：
 *   student_form_open  點「馬上填答」開學生表單
 *   teacher_form_open  點「申請服務」開老師表單
 *   bonus_quiz_open    點加碼挑戰 Quiz 按鈕     quiz: 商管領域 / 分子生醫領域 …
 *   guide_open         點使用手冊／教學影片／註冊說明／作答指引   guide: resource_manual …
 * 不送出任何姓名、Email 或表單內容。
 */
(function () {
  "use strict";

  var id = (typeof CONFIG !== "undefined" && CONFIG.ga4Id) || "";
  if (!/^G-[A-Z0-9]+$/.test(id)) return;

  var host = location.hostname;
  var isLocal = location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "";
  var debug = /[?&]ga_debug=1\b/.test(location.search);
  if (isLocal && !debug) return;   // 本機預覽不污染正式數據

  var body = document.body;
  var school = body.dataset.school || "(none)";
  var pageType = body.dataset.page || "home";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  gtag("js", new Date());
  gtag("config", id, { school: school, page_type: pageType, debug_mode: debug || undefined });

  function track(name, params) {
    params = params || {};
    params.school = school;
    gtag("event", name, params);
  }

  // ===== 捲動深度與區塊曝光 =====
  var marks = [25, 50, 75, 100], sent = {};
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > div:not([hidden]) section"))
    .map(function (sec) {
      var key = sec.id || (sec.querySelector(".kicker") || {}).textContent || "";
      key = String(key).trim().toLowerCase().replace(/\s+mission$/, "").replace(/\s+/g, "_");
      if (sec.classList.contains("hero")) key = "hero";
      return { el: sec, key: key };
    })
    .filter(function (x) { return x.key && x.key !== "hero"; });

  var ticking = false;
  function measure() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
    marks.forEach(function (m) {
      if (pct >= m && !sent["d" + m]) { sent["d" + m] = true; track("scroll_depth", { percent: m }); }
    });
    var vh = window.innerHeight;
    sections = sections.filter(function (x) {
      var r = x.el.getBoundingClientRect();
      var visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (visible >= Math.min(r.height, vh) * 0.4) { track("section_view", { section: x.key }); return false; }
      return true;
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(measure); }
  }, { passive: true });
  setTimeout(measure, 1500);

  // 重點行動：cta_click 之外再送一個獨立事件名稱
  function keyAction(button) {
    if (button === "student_form") return track("student_form_open");
    if (button === "teacher_form") return track("teacher_form_open");
    if (button === "bonus_quiz" || button.indexOf("bonus_quiz_") === 0)
      return track("bonus_quiz_open", { quiz: button.replace(/^bonus_quiz_?/, "") || "default" });
    if (/^(student_)?resource|^hero_signup_video$|^account_guide$|^bonus_guide$/.test(button))
      return track("guide_open", { guide: button });
  }
  function ctaClick(button) {
    track("cta_click", { button: button });
    keyAction(button);
  }

  // ===== 點擊 =====
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a, summary") : null;
    if (!a) return;

    if (a.dataset.topic) return track("topic_click", { topic: a.dataset.topic });
    if (a.dataset.track) {
      if (a.classList.contains("is-disabled")) return;
      return ctaClick(a.dataset.track);
    }

    var button = null;
    if (a.id === "btn-student") button = "student_form";
    else if (a.id === "btn-teacher") button = "teacher_form";
    else if (a.id === "line-open") button = "line_open";
    else if (a.id === "btn-bonus") button = "bonus_quiz";
    else if (a.closest(".hero-actions")) button = "jump_" + (a.getAttribute("href") || "").replace("#", "");
    else if (a.closest(".sticky-cta")) button = "sticky_" + (a.getAttribute("href") || "").replace("#", "");
    else if (a.closest("#school-list")) button = "school_entry";
    if (button) {
      if (a.classList.contains("is-disabled")) return;
      return ctaClick(button);
    }

    if (a.tagName === "SUMMARY") {
      var d = a.parentNode;
      if (d.open) return;   // 只記錄「展開」
      if (d.dataset.product) return track("topic_menu_open", { product: d.dataset.product });
      if (d.classList.contains("faq-item")) return track("faq_open", { question: a.textContent.slice(0, 90) });
    }
  });
})();
