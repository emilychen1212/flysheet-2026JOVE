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

  function periodText() {
    var p = CONFIG.period || {};
    var start = fmtDate(p.start), end = fmtDate(p.end);
    if (start && end) return start + " – " + end;
    if (start) return start + " 起（結束日確認中）";
    return "2026 年 11 月初起（日期確認中）";
  }

  function bind(key, value) {
    document.querySelectorAll('[data-bind="' + key + '"]').forEach(function (n) {
      n.textContent = value;
    });
  }

  // Google 表單預填網址；缺任何設定就回傳空字串
  function formUrl(form, schoolName) {
    if (!form || !form.baseUrl || !form.schoolEntryId) return "";
    var base = safeUrl(form.baseUrl);
    if (!base) return "";
    var entry = String(form.schoolEntryId).trim();
    if (!/^entry\./.test(entry)) entry = "entry." + entry;
    var sep = base.indexOf("?") === -1 ? "?" : "&";
    return base + sep + "usp=pp_url&" + encodeURIComponent(entry) + "=" + encodeURIComponent(schoolName);
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

  function renderHome(notFound) {
    document.getElementById("view-home").hidden = false;
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

  function renderSchool(key, s) {
    document.getElementById("view-school").hidden = false;
    document.body.classList.add("is-school");
    document.title = s.name + " × 飛資得｜" + CONFIG.campaignName;
    $("#topbar-title").textContent = s.name + " × 飛資得";

    if (s.themeColor && /^#[0-9a-f]{3,8}$/i.test(s.themeColor)) {
      document.documentElement.style.setProperty("--brand", s.themeColor);
    }
    var banner = safeUrl(s.bannerImage);
    if (banner) {
      var hero = $("#school-hero");
      hero.classList.add("has-banner");
      hero.style.backgroundImage =
        "linear-gradient(rgba(6,30,46,.55), rgba(6,30,46,.75)), url(\"" + banner.replace(/"/g, "") + "\")";
    }

    bind("schoolName", s.name);

    if (s.note) {
      var note = $("#school-note");
      note.textContent = s.note;
      note.hidden = false;
    }

    // 訂購主題
    var topics = $("#topics");
    (s.topics || []).forEach(function (t) {
      var url = safeUrl(t.url);
      var card = el(url ? "a" : "div", "topic");
      if (url) { card.href = url; card.target = "_blank"; card.rel = "noopener"; }
      card.appendChild(el("span", "topic-name", t.name));
      if (t.pending) card.appendChild(pendingTag());
      if (url) card.appendChild(el("span", "topic-arrow", "→"));
      topics.appendChild(card);
    });
    if (!topics.children.length) topics.appendChild(el("p", "muted", "主題確認中"));

    // 學生任務
    var tasks = $("#tasks");
    (CONFIG.studentTasks || []).forEach(function (t, i) {
      var li = el("li", "task");
      li.appendChild(el("span", "task-no", String(i + 1).padStart(2, "0")));
      var body = el("div", "task-body");
      body.appendChild(el("h3", null, t.title));
      body.appendChild(el("p", null, t.description));
      if (t.feature) body.appendChild(el("span", "chip", "使用功能：" + t.feature));
      li.appendChild(body);
      tasks.appendChild(li);
    });

    setupFormButton($("#btn-student"), formUrl(CONFIG.studentForm, s.name));
    setupFormButton($("#btn-teacher"), formUrl(CONFIG.teacherForm, s.name));

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
      card.appendChild(item);
      card.appendChild(el("span", "gift-qty", g.qty != null ? g.qty + " 名" : ""));
      gifts.appendChild(card);
    });
    if (!gifts.children.length) gifts.appendChild(el("p", "muted", "禮品確認中"));

    bind("drawMethod", CONFIG.drawMethod || "確認中");
    bind("announcement", CONFIG.announcement || "公告方式確認中");

    var st = $("#statement");
    var stUrl = safeUrl(CONFIG.statementUrl);
    if (stUrl) {
      var a = el("a", null, "查看活動聲明（個資與抽獎規則）");
      a.href = stUrl; a.target = "_blank"; a.rel = "noopener";
      st.appendChild(a);
    } else {
      st.textContent = "活動聲明準備中";
    }

    var host = s.hostName ? s.name + s.hostName : s.name;
    $("#footer-org").textContent = "主辦／協辦：" + host + " × " + CONFIG.organizer;
  }

  function init() {
    bind("campaignName", CONFIG.campaignName);
    bind("tagline", CONFIG.tagline || "");
    bind("period", periodText());

    var params = new URLSearchParams(location.search);
    var raw = params.get("school");
    if (raw === null || raw.trim() === "") return renderHome(false);

    var key = raw.trim().toLowerCase();
    var school = Object.prototype.hasOwnProperty.call(SCHOOLS, key) ? SCHOOLS[key] : null;
    if (school && school.active) return renderSchool(key, school);
    renderHome(true);
  }

  init();
})();
