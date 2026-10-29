/**
 * 各校資料
 * 物件的 key（例如 mmu）就是網址參數：?school=mmu
 * key 請用小寫英文或數字，不要有空白。
 *
 * 欄位說明：
 *   name          校名（必填，也會自動帶入表單）
 *   hostName      館方名稱，例如「圖書館」「圖書資訊處」
 *   active        true 才會開放；false 時連結會顯示「找不到此學校」
 *   period        該校自訂活動期間 { start, end }（選填，空白用 config.js 的共用期間）
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
 *   gifts         禮品 [{ tier, item, qty, unit, pending, teacher }]；unit 預設「名」；teacher: true 顯示「老師挑戰限定」標籤
 *   bonus         true → 在學生挑戰與老師挑戰之間顯示「加碼挑戰」（JoVE Quiz）區塊（選填）
 *   bonusLinks    加碼挑戰的多個題目按鈕 [{ label, url }]（選填，取代單一「我要參加」按鈕）
 *   bonusGuide    加碼挑戰的作答指引按鈕 { label, url }（選填，url 空白顯示「即將開放」）
 *   heroNote      頁首按鈕下方的提醒＋按鈕 { text, button, url }（選填）
 *   manualUrl     該校專屬 JoVE 使用手冊連結（選填，空白用 config.js 的共用手冊）
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
    gifts: [
      { tier: "首獎", item: "Apple 禮品卡 $500", qty: 1 },
      { tier: "貳獎", item: "全家禮品卡 $100", qty: 10 },
      { tier: "參獎", item: "超商飲料兌換券 $50", qty: 10 },
      { tier: "特別獎", item: "JoVE 學習好物組（JoVE 杯子＋筆記本＋帆布袋）", qty: 1 },
      { tier: "老師獎", item: "星巴克飲料兌換券", qty: 10, teacher: true }
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
      { tier: "首獎", item: "樂扣樂扣綿綿奶蓋不鏽鋼吸管隨行杯", qty: 1 },
      { tier: "二獎", item: "iwalk 行動電源（Type-C 頭）", qty: 1 },
      { tier: "三獎", item: "超商禮品卡 $100", qty: 5 },
      { tier: "參加獎", item: "JoVE 贈品（杯子／帆布袋／筆記本 三件組）", qty: 2 },
      { tier: "老師獎", item: "星巴克禮券", qty: 10, teacher: true }
    ],
    bonus: true,          // 顯示「加碼挑戰」區塊
    bonusLinks: [
      { label: "開始作答", url: "https://www.jove.com/quiz/invite/45810668-1df9-4a19-b343-c9fc9cb38f3c" }
    ],
    bonusGuide: { label: "JoVE Quiz 學生作答流程指引", url: "https://drive.google.com/file/d/1tf02KHcMmllFWePbN8OxjxlrBnS5xLXt/view" },
    // 專屬使用手冊（取代共用手冊）
    manualUrl: "https://drive.google.com/file/d/1Ar7iOMqOdpiaiyRL-doCNc7I_C3vtWgY/view",
    // 頁首提醒（banner 按鈕下方）
    heroNote: {
      text: "參加活動請記得先申請個人帳號",
      button: "如何註冊 NDMU 個人帳號",
      url: "https://drive.google.com/file/d/1_ttqUevk4rwFNXXrFxqZJ8YwYzdMSdk7/view"
    },
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
    topics: ["core-calculus", "journal-cancer-research"],
    gifts: [
      { tier: "首獎", item: "超商禮品卡 $100", qty: 5, unit: "份" },
      { tier: "貳獎", item: "7-11 飲料兌換券", qty: 5, unit: "份" },
      { tier: "老師獎", item: "超商禮品卡 $100", qty: 10, unit: "份", teacher: true }
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
    period: { start: "2026/11/2（一）", end: "2026/12/18（五）" },   // 清大延後開始
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
      { tier: "首獎", item: "Apple 禮品卡 $500", qty: 3 },
      { tier: "貳獎", item: "超商禮品卡 $100", qty: 15 },
      { tier: "參獎", item: "JoVE 學習好物組（JoVE 杯子＋筆記本＋帆布袋）", qty: 1 },
      { tier: "老師獎", item: "星巴克飲料兌換券", qty: 10, teacher: true }
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
      { tier: "首獎", item: "Apple 禮品卡 $500", qty: 3 },
      { tier: "貳獎", item: "超商禮品卡 $100", qty: 20 },
      { tier: "參獎", item: "JoVE 學習好物組（JoVE 杯子＋筆記本＋帆布袋）", qty: 2 },
      { tier: "老師獎", item: "星巴克飲料兌換券", qty: 10, teacher: true }
    ],
    bonus: true,          // 顯示「加碼挑戰」區塊
    bonusLinks: [
      { label: "商管領域", url: "https://www.jove.com/quiz/invite/ef9e85a0-5641-40a6-a9b5-7887ca102755" },
      { label: "理化領域", url: "https://www.jove.com/quiz/invite/1d0ae1f5-1be3-4ab8-b27f-62bfc3e1125b" },
      { label: "生醫領域", url: "https://www.jove.com/quiz/invite/7e006a3d-53c0-4533-8425-f7f6657ed313" }
    ],
    bonusGuide: { label: "JoVE Quiz 學生作答流程指引", url: "https://drive.google.com/file/d/1tf02KHcMmllFWePbN8OxjxlrBnS5xLXt/view" },
    // 專屬使用手冊（取代共用手冊）
    manualUrl: "https://drive.google.com/file/d/12OGvvlVbMbmMf8SBYYsqr5Am0hPN8NF8/view",
    // 頁首提醒（banner 按鈕下方）
    heroNote: {
      text: "參加活動請記得先申請個人帳號",
      button: "如何註冊 NYCU 個人帳號",
      url: "https://drive.google.com/file/d/1U6Eho2ExWo4iog4e6zrv1UuxYLakyaf1/view"
    },
    note: ""
  }
};
