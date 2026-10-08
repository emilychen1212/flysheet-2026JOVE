/**
 * 各校資料
 * 物件的 key（例如 mmc）就是網址參數：?school=mmc
 * key 請用小寫英文或數字，不要有空白。
 *
 * 欄位說明：
 *   name          校名（必填，也會自動帶入表單）
 *   hostName      館方名稱，例如「圖書館」「圖書資訊處」
 *   active        true 才會開放；false 時連結會顯示「找不到此學校」
 *   themeColor    主題色（例如 "#7a1f3d"），空白用預設色
 *   bannerImage   banner 圖路徑（例如 "assets/banners/mmc.jpg"），空白用預設漸層
 *   topics        訂購主題代碼清單，代碼對照見 data/topics.js
 *                 例如 "journal-biology"、"se-basic-biology"、"core-calculus"
 *   topicsPending true → 主題區顯示「待確認」（訂購內容確認後刪除這行）
 *   gifts         禮品 [{ tier, item, qty, pending }]
 *   note          該校專屬說明（選填）
 *
 * pending: true → 顯示黃色「待確認」標籤，確認後刪除這行即可。
 */
const SCHOOLS = {
  mmc: {
    name: "馬偕醫學大學",
    hostName: "圖書館",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["core-biology", "se-clinical-skills", "journal-medicine"],
    topicsPending: true,
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 3, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  ndmc: {
    name: "國防醫學院",
    hostName: "圖書館",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["core-anatomy-and-physiology", "se-basic-biology"],
    topicsPending: true,
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 15, pending: true }
    ],
    note: ""
  },

  cgust: {
    name: "長庚科技大學",
    hostName: "圖書館",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["se-clinical-skills", "core-biology"],
    topicsPending: true,
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "貳獎", item: "禮品待確認", qty: 2, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 20, pending: true }
    ],
    note: ""
  },

  fju: {
    name: "輔仁大學",
    hostName: "圖書館",
    active: true,
    themeColor: "",
    bannerImage: "",
    topics: ["core-calculus"],
    gifts: [
      { tier: "頭獎", item: "禮品待確認", qty: 1, pending: true },
      { tier: "參與獎", item: "禮品待確認", qty: 10, pending: true }
    ],
    note: ""
  },

  sinica: {
    name: "中央研究院",
    hostName: "圖書館",
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
      { tier: "參與獎", item: "禮品待確認", qty: 10, pending: true }
    ],
    note: ""
  }
};
