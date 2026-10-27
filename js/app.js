/* JoVE 挑戰活動網站：依 ?school= 參數切換主頁面／學校頁 */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function pendingTag() {
    return el("span", "pending", "待確認");
  }

  // 只允許 http(s) 與站內相對路徑，避免 javascript: 之類的連結
  function safeUrl(url) {
    if (!url) return "";
    url = String(url).trim();
    if (/^https?:\/\//i.test(url)) return url;
    if (/^[\w\-./]+$/.test(url) && url.indexOf("..") === -1) return url;
    return "";
  }

  function fmtDate(s) {
    if (!s || s.indexOf("?") !== -1) return null;
    return s;
  }

  function periodText(p) {
    p = p || CONFIG.period || {};
    var start = fmtDate(p.start), end = fmtDate(p.end);
    if (start && end) return start + " - " + end;
    if (start) return start + " 起（結束日確認中）";
    return "2026 年 11 月初起（日期確認中）";
  }

  function bind(key, value) {
    document.querySelectorAll('[data-bind="' + key + '"]').forEach(function (n) {
      n.textContent = value;
    });
  }

  // Google 表單網址：有 entry ID 就預填校名；embedded 為 true 時產生嵌入用網址
  function formUrl(form, schoolName, embedded) {
    if (!form || !form.baseUrl) return "";
    var base = safeUrl(form.baseUrl);
    if (!base) return "";
    var params = [];
    if (embedded) params.push("embedded=true");
    var entry = String(form.schoolEntryId || "").trim();
    if (entry) {
      if (!/^entry\./.test(entry)) entry = "entry." + entry;
      params.push("usp=pp_url", encodeURIComponent(entry) + "=" + encodeURIComponent(schoolName));
    }
    if (!params.length) return base;
    return base + (base.indexOf("?") === -1 ? "?" : "&") + params.join("&");
  }

  // 產生外連按鈕；網址空白時顯示「即將開放」並停用
  function linkButton(cls, label, url, track) {
    var a = el("a", cls, label);
    var u = safeUrl(url);
    if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; }
    else { a.classList.add("is-disabled"); a.setAttribute("aria-disabled", "true"); a.textContent = label.replace(/ →$/, "") + "（即將開放）"; }
    if (track) a.dataset.track = track;
    return a;
  }

    function setupFormButton(btn, url) {
    if (url) {
      btn.href = url;
      return;
    }
    btn.removeAttribute("href");
    btn.removeAttribute("target");
    btn.classList.add("is-disabled");
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = "表單準備中";
  }

  // 嵌入表單；按鈕保留為「開新視窗填寫」備用
  function setupForm(form, schoolName, embedBox, btn, title) {
    var url = formUrl(form, schoolName, false);
    setupFormButton(btn, url);
    if (!url || !form.embed) return;
    var iframe = document.createElement("iframe");
    iframe.src = formUrl(form, schoolName, true);
    iframe.title = title;
    iframe.loading = "lazy";
    embedBox.appendChild(iframe);
    embedBox.hidden = false;
    btn.textContent = "表單顯示不完整？點此開新視窗填寫";
    btn.classList.remove("btn-lg");
  }

  // LINE 內建瀏覽器無法登入 Google，提示改用外部瀏覽器
  function setupLineNotice() {
    if (!/\bLine\//i.test(navigator.userAgent)) return;
    var params = new URLSearchParams(location.search);
    params.set("openExternalBrowser", "1");
    $("#line-open").href = location.pathname + "?" + params.toString();
    document.getElementById("line-notice").hidden = false;
  }

  function renderFaq() {
    var box = $("#faq");
    (CONFIG.faq || []).forEach(function (item) {
      var d = el("details", "faq-item");
      d.appendChild(el("summary", null, item.q));
      d.appendChild(el("p", null, item.a));
      box.appendChild(d);
    });
  }

  function activeSchools() {
    return Object.keys(SCHOOLS).filter(function (k) { return SCHOOLS[k].active; });
  }

  // 套用頁首底圖（淺色底圖＋深色文字）
  function applyBanner(hero, src) {
    var banner = safeUrl(src);
    if (!hero || !banner) return;
    hero.classList.add("has-banner");
    hero.style.backgroundImage = "url(\"" + banner.replace(/"/g, "") + "\")";
  }

  function renderHome(notFound) {
    document.body.dataset.page = notFound ? "not_found" : "home";
    document.getElementById("view-home").hidden = false;
    applyBanner(document.getElementById("home-hero"), CONFIG.schoolBanner);
    if (notFound) document.getElementById("not-found").hidden = false;

    if (CONFIG.showSchoolList) {
      var list = $("#school-list");
      var keys = activeSchools();
      if (keys.length) {
        $("#entry-hint").textContent = "選擇你的學校，進入專屬活動頁：";
        keys.forEach(function (k) {
          var a = el("a", "btn btn-outline", SCHOOLS[k].name);
          a.href = "?school=" + encodeURIComponent(k);
          list.appendChild(a);
        });
        list.hidden = false;
      }
    }
    renderFaq();
  }

  // 主題數超過這個數量時，各產品改成折疊選單（可用 schools.js 的 topicsCollapsed 覆寫）
  var COLLAPSE_THRESHOLD = 15;

  // 展開主題代碼："module:Research" 代表該模組全部主題；依 topics.js 的順序排列並去重
  function resolveTopics(codes) {
    var wanted = {};
    (codes || []).forEach(function (code) {
      var m = /^module:(.+)$/i.exec(code);
      if (m) {
        var found = false;
        Object.keys(TOPICS).forEach(function (k) {
          if (TOPICS[k].module.toLowerCase() === m[1].toLowerCase()) { wanted[k] = true; found = true; }
        });
        if (!found) console.warn("schools.js 模組不存在：" + code);
      } else if (TOPICS[code]) {
        wanted[code] = true;
      } else {
        console.warn("schools.js 主題代碼不存在：" + code + "（請對照 data/topics.js）");
      }
    });
    return Object.keys(TOPICS).filter(function (k) { return wanted[k]; }).map(function (k) { return TOPICS[k]; });
  }

  function topicCard(t) {
    var url = safeUrl(t.url);
    var card = el(url ? "a" : "div", "topic");
    if (url) { card.href = url; card.target = "_blank"; card.rel = "noopener"; }
    card.appendChild(el("span", "topic-name", t.title));
    if (url) card.appendChild(el("span", "topic-arrow", "→"));
    card.dataset.topic = t.product + " - " + t.title;
    return card;
  }

  // 訂購主題：依產品分組，每張卡片連到 JoVE 對應頁面；主題多時每個產品折疊成下拉選單
  function renderTopics(s) {
    var box = $("#topics");
    var topics = resolveTopics(s.topics);
    var groups = [], byProduct = {};
    topics.forEach(function (t) {
      if (!byProduct[t.product]) { byProduct[t.product] = []; groups.push(t.product); }
      byProduct[t.product].push(t);
    });
    var collapse = typeof s.topicsCollapsed === "boolean" ? s.topicsCollapsed : topics.length > COLLAPSE_THRESHOLD;

    if (s.topicsSummary) box.appendChild(el("p", "topic-summary", s.topicsSummary));

    groups.forEach(function (product) {
      var list = el("div", "topics");
      byProduct[product].forEach(function (t) { list.appendChild(topicCard(t)); });

      if (collapse) {
        var d = el("details", "topic-group topic-dropdown");
        d.dataset.product = product;
        var sum = el("summary", "topic-dropdown-head");
        sum.appendChild(el("span", "topic-dropdown-name", "JoVE " + product));
        sum.appendChild(el("span", "topic-count", byProduct[product].length + " 個主題"));
        if (s.topicsPending) sum.appendChild(pendingTag());
        d.appendChild(sum);
        d.appendChild(list);
        box.appendChild(d);
      } else {
        var group = el("div", "topic-group topic-box");
        var head = el("h3", "topic-group-title");
        head.appendChild(el("span", "topic-dropdown-name", "JoVE " + product));
        head.appendChild(el("span", "topic-count", byProduct[product].length + " 個主題"));
        if (s.topicsPending) head.appendChild(pendingTag());
        group.appendChild(head);
        group.appendChild(list);
        box.appendChild(group);
      }
    });
    if (collapse && groups.length) box.classList.add("is-collapsed");
    if (!groups.length) box.appendChild(el("p", "muted", "主題確認中"));
  }

  function renderSchool(key, s) {
    document.getElementById("view-school").hidden = false;
    document.body.classList.add("is-school");
    document.body.dataset.page = "school";
    document.body.dataset.school = key;
    document.title = s.name + " × 飛資得｜" + CONFIG.campaignName;
    $("#topbar-title").textContent = s.name + " × " + CONFIG.organizer;

    if (s.themeColor && /^#[0-9a-f]{3,8}$/i.test(s.themeColor)) {
      document.documentElement.style.setProperty("--brand", s.themeColor);
    }
    // 頁首底圖：學校自訂 bannerImage 優先，否則用 config 的共用底圖
    applyBanner($("#school-hero"), s.bannerImage || CONFIG.schoolBanner);

    var logo = safeUrl(s.logo);
    var chip = $("#school-logo");
    if (logo && chip) {
      var img = document.createElement("img");
      img.src = logo;
      img.alt = s.name;
      chip.appendChild(img);
      chip.hidden = false;
      if ($("#logo-x")) $("#logo-x").hidden = false;
    }

    bind("schoolName", s.name);
    if (s.period) bind("period", periodText(s.period));   // 該校自訂活動期間（例如清大延後開始）

    if (s.note) {
      var note = $("#school-note");
      note.textContent = s.note;
      note.hidden = false;
    }

    renderTopics(s);

    // 學生任務
    var tasks = $("#tasks");
    var hints = $("#student-hints");
    if (hints) {
      (CONFIG.studentHints || []).forEach(function (h) {
        if (h.bonusOnly && !s.bonus) return;
        hints.appendChild(el("li", null, "📎 " + h.text));
      });
      if (!hints.children.length) hints.hidden = true;
    }
    (CONFIG.studentTasks || []).forEach(function (t, i) {
      var li = el("li", "task");
      li.appendChild(el("span", "task-no", String(i + 1).padStart(2, "0")));
      var body = el("div", "task-body");
      body.appendChild(el("h3", null, t.title));
      if (t.feature) body.appendChild(el("span", "chip", "使用功能：" + t.feature));
      body.appendChild(el("p", "task-scene", t.scene || t.description || ""));
      if (CONFIG.studentTaskNote) body.appendChild(el("p", "task-note", "⚠️ " + CONFIG.studentTaskNote));
      if (t.submit) {
        var sub = el("p", "task-submit");
        sub.appendChild(el("strong", null, "📝 回報內容："));
        sub.appendChild(document.createTextNode(t.submit));
        body.appendChild(sub);
      }
      li.appendChild(body);
      tasks.appendChild(li);
    });

    setupForm(CONFIG.studentForm, s.name, $("#embed-student"), $("#btn-student"), "學生挑戰填答表單");
    if (!$("#btn-student").classList.contains("is-disabled")) $("#btn-student").classList.add("btn-glow");
    setupForm(CONFIG.teacherForm, s.name, $("#embed-teacher"), $("#btn-teacher"), "老師服務申請表單");

    // 老師挑戰：服務流程步驟
    var flow = $("#teacher-steps");
    if (flow) {
      (CONFIG.teacherSteps || []).forEach(function (st, i) {
        var li = el("li", "flow-step");
        li.appendChild(el("span", "flow-no", "STEP " + (i + 1)));
        li.appendChild(el("h4", null, st.title));
        li.appendChild(el("p", null, st.text));
        flow.appendChild(li);
      });
      if (!flow.children.length) { flow.hidden = true; if ($(".flow-title")) $(".flow-title").hidden = true; }
    }

    // 加碼挑戰（只在 bonus: true 的學校顯示）
    var bc = CONFIG.bonusChallenge || {};
    if (s.bonus && $("#bonus")) {
      var jump = $(".hero-actions");
      if (jump && !jump.querySelector('a[href="#bonus"]')) {
        var jb = el("a", "btn btn-bonus-jump", "加碼挑戰 ↓");
        jb.href = "#bonus";
        jump.appendChild(jb);
      }
      $("#bonus-title").textContent = bc.title || "加碼挑戰";
      $("#bonus-text").textContent = bc.text || "";
      var bBtn = $("#btn-bonus");
      bBtn.textContent = bc.button || "我要參加";
      var bUrl = safeUrl(s.bonusUrl || bc.url);
      if (bUrl) bBtn.href = bUrl;
      else {
        bBtn.removeAttribute("target");
        bBtn.classList.add("is-disabled");
        bBtn.setAttribute("aria-disabled", "true");
        bBtn.textContent = "即將開放";
      }
      // 多個題目按鈕＋作答指引（例如陽交大）
      if (s.bonusLinks && s.bonusLinks.length) {
        var acts = $("#bonus-actions");
        acts.innerHTML = "";
        s.bonusLinks.forEach(function (b) { acts.appendChild(linkButton("btn bonus-btn", b.label + " →", b.url, "bonus_quiz_" + b.label)); });
      }
      // 作答指引：放在「加碼挑戰」標題旁
      if (s.bonusGuide && $("#bonus-guide")) {
        $("#bonus-guide").appendChild(linkButton("btn btn-sm resource-btn", "📖 " + s.bonusGuide.label, s.bonusGuide.url, "bonus_guide"));
        $("#bonus-guide").hidden = false;
      }
      $("#bonus").hidden = false;
    }

    // 頁首提醒：學校自訂 heroNote（例如陽交大）優先，否則用共用預設（建立帳號教學影片）
    var note = s.heroNote || CONFIG.defaultHeroNote;
    var hiddenResource = s.heroNote ? null : (note && note.hides);
    if (note && $("#hero-note")) {
      $("#hero-note-text").textContent = note.text || "";
      var hb = $("#hero-note-btn");
      hb.textContent = note.button || "查看說明";
      if (note.track) hb.dataset.track = note.track;
      var hUrl = safeUrl(note.url);
      if (hUrl) hb.href = hUrl; else hb.hidden = true;
      $("#hero-note").hidden = false;
    }

    // 學習資源按鈕：已訂購主題說明下方＋學生挑戰標題旁（學校可用 manualUrl 換專屬手冊）
    function resourceButton(r, track) {
      var url = (r.id === "manual" && s.manualUrl) ? s.manualUrl : r.url;
      return linkButton("btn btn-sm resource-btn", (r.icon ? r.icon + " " : "") + r.label, url, track);
    }
    var res = $("#resources");
    if (res && CONFIG.resources && CONFIG.resources.length) {
      res.appendChild(el("span", "resource-label", "還不熟悉 JoVE？"));
      CONFIG.resources.forEach(function (r) {
        if (hiddenResource && r.id === hiddenResource) return;   // 已顯示在頁首，不重複
        res.appendChild(resourceButton(r, r.track || "resource"));
      });
      res.hidden = false;
    }
    var sres = $("#student-resources");
    if (sres && CONFIG.resources && CONFIG.resources.length) {
      CONFIG.resources.forEach(function (r) { sres.appendChild(resourceButton(r, "student_" + (r.track || "resource"))); });
      sres.hidden = false;
    }

    var ts = CONFIG.teacherService || {};
    bind("teacherDesc", ts.description || "服務內容確認中");
    bind("teacherQuota", ts.quota || "名額有限");

    // 禮品
    var gifts = $("#gifts");
    (s.gifts || []).forEach(function (g) {
      var card = el("div", "gift");
      card.appendChild(el("span", "gift-tier", g.tier));
      var item = el("span", "gift-item", g.item);
      if (g.pending) item.appendChild(pendingTag());
      if (g.teacher) item.appendChild(el("span", "teacher-tag", "老師挑戰限定"));
      card.appendChild(item);
      card.appendChild(el("span", "gift-qty", g.qty != null ? g.qty + " " + (g.unit || "名") : ""));
      if (!gifts.children.length) card.classList.add("gift-top");
      gifts.appendChild(card);
    });
    if (!gifts.children.length) gifts.appendChild(el("p", "muted", "禮品確認中"));

    bind("drawMethod", CONFIG.drawMethod || "確認中");
    bind("announcement", CONFIG.announcement || "公告方式確認中");

    var notices = $("#notices");
    if (notices) {
      (CONFIG.notices || []).forEach(function (n) { notices.appendChild(el("li", null, n)); });
      if (!notices.children.length) notices.closest("section").hidden = true;
    }
  }

  // 捲動淡入：區塊捲進畫面時淡入。使用者設定「減少動態效果」時不啟用；
  // 每秒再檢查一次位置當作保險，確保已在畫面內的內容一定看得到
  function setupReveal() {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var pending = Array.prototype.slice.call(document.querySelectorAll(
      "main > div:not([hidden]) .section .section-title, main > div:not([hidden]) .section .container > :not(.section-title), .task"
    ));
    pending.forEach(function (t) {
      t.classList.add("reveal");
      if (t.classList.contains("task")) t.style.transitionDelay = (Array.prototype.indexOf.call(t.parentNode.children, t) * 0.12) + "s";
    });

    var ticking = false;
    function check() {
      ticking = false;
      var limit = window.innerHeight * 0.92;
      pending = pending.filter(function (t) {
        if (t.getBoundingClientRect().top < limit) { t.classList.add("is-visible"); return false; }
        return true;
      });
      if (!pending.length) stop();
    }
    function onScroll() {
      if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(check); }
    }
    function stop() {
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", function () { setTimeout(check, 50); });
    var timer = setInterval(check, 1000);   // 保險：就算捲動事件沒觸發，畫面內的區塊也會出現
    check();
  }

  function init() {
    bind("campaignName", CONFIG.campaignName);
    bind("tagline", CONFIG.tagline || "");
    bind("period", periodText());
    setupLineNotice();

    var params = new URLSearchParams(location.search);
    var raw = params.get("school");
    if (raw === null || raw.trim() === "") return renderHome(false);

    var key = raw.trim().toLowerCase();
    var school = Object.prototype.hasOwnProperty.call(SCHOOLS, key) ? SCHOOLS[key] : null;
    if (school && school.active) return renderSchool(key, school);
    renderHome(true);
  }

  init();
  setupReveal();
})();
