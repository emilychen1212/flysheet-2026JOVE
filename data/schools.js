/**
 * 各校資料
 * 物件的 key（例如 mmu）就是網址參數：?school=mmu
 * key 請用小寫英文或數字，不要有空白。
 *
 * 欄位說明：
 *   name          校名（必填，也會自動帶入表單）
 *   hostName      館方名稱，例如「圖書館」「圖書資訊處」
 *   active        true 才會開放；false 時連結會顯示「找不到此學校」
 *   themeColor    主題色（例如 "#7a1f3d"），空白用預設色
 *   logo          學校 logo 路徑（例如 "assets/img/logo-mmu.png"），空白就只顯示飛資得 logo
 *   bannerImage   該校專屬頁首底圖（選填），空白時使用 config.js 的共用底圖 schoolBanner
 *   topics        訂購主題代碼清單，代碼對照見 data/topics.js
 *                 例如 "journal-biology"、"se-basic-biology"、"core-calculus"
 *                 "module:Research" / "module:Education" = 該模組全部主題（Unlimited 客戶用）
 *   topicsPending true → 主題區顯示「待確認」（訂購內容確認後刪除這行）
 *   topicsSummary 主題區上方的一句說明（選填），例如「本校訂購 JoVE Unlimited…」
 *   topicsCollapsed 主題超過 15 個時，各產品自動折疊成下拉選單；
 *                 填 true／false 可強制開啟／關閉折疊（選填）
 *   gifts         禮品 [{ tier, item, qty, pending }]
 *   note          該校專屬說明（選填）
 *
 * pending: true → 顯示黃色「待確認」標籤，確認後刪除這行即可。
 */
const SCHOOLS = {
  mmu: {
    name: "馬偕醫學大學",
    hostName: "圖書館",
    logo: "assets/img/logo-mmu.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["core-biology", "se-clinical-skills", "journal-medicine"],
    topicsPending: true,
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  ndmu: {
    name: "國防醫學大學",
    hostName: "圖書館",
    logo: "assets/img/logo-ndmu.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: [
      "journal-biology",
      "journal-neuroscience",
      "journal-immunology-and-infection",
      "journal-medicine",
      "journal-biochemistry",
      "journal-cancer-research",
      "journal-chemistry",
      "se-basic-biology"
    ],
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  cgust: {
    name: "長庚科技大學",
    hostName: "圖書館",
    logo: "assets/img/logo-cgust.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["se-clinical-skills", "core-biology"],
    topicsPending: true,
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  fju: {
    name: "輔仁大學",
    hostName: "圖書館",
    logo: "assets/img/logo-fju.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["core-calculus"],
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  sinica: {
    name: "中央研究院",
    hostName: "圖書館",
    logo: "assets/img/logo-sinica.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: [
      "journal-biology",
      "journal-bioengineering",
      "journal-neuroscience",
      "journal-immunology-and-infection",
      "journal-medicine",
      "journal-biochemistry",
      "journal-cancer-research",
      "journal-developmental-biology",
      "journal-chemistry",
      "se-basic-biology"
    ],
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  nthu: {
    name: "國立清華大學",
    hostName: "圖書館",
    logo: "assets/img/logo-nthu.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: [
      "se-advanced-biology",
      "se-basic-biology",
      "core-biology",
      "core-cell-biology",
      "core-molecular-biology",
      "core-statistics",
      "lab-biology",
      "journal-biochemistry",
      "journal-biology",
      "journal-developmental-biology",
      "journal-genetics",
      "journal-neuroscience",
      "eoe-biology"
    ],
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  nycu: {
    name: "國立陽明交通大學",
    hostName: "圖書館",
    logo: "assets/img/logo-nycu.png",
    active: true,
    themeColor: "",
    bannerImage: "",
    // Unlimited：Research＋Education 全部主題（"module:模組名稱" = 該模組所有主題）
    topics: ["module:Research", "module:Education"],
    topicsSummary: "本校訂購 JoVE Unlimited：Research 與 Education 全部主題",
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "肆獎", item: "禮品待確認", qty: 5, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  }
};
