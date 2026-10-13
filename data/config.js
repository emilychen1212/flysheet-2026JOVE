/**
 * 活動共用設定（所有學校共用）
 * 修改後存檔、重新整理網頁即可看到效果。
 * 標示「待確認」的內容請在上線前替換。
 */
const CONFIG = {
  campaignName: "JoVE 挑戰 2026",            // 暫定，之後可改
  tagline: "用影片解鎖實驗室：完成任務，挑戰好禮！", // 一句話標語（暫定）

  // 活動期間：日期未定時保留 "??"，網頁會顯示「日期確認中」
  period: { start: "2026/10/28（三）", end: "2026/12/18（五）" },

  // 學校頁的頁首共用底圖（各校可在 schools.js 用 bannerImage 個別覆寫）
  schoolBanner: "assets/img/banner.jpg",

  // 主頁面是否列出所有學校入口按鈕（預設 false：只提示透過館方公告連結參加）
  showSchoolList: false,

  // Google 表單預填設定（取得方式見 README）
  // baseUrl 範例："https://docs.google.com/forms/d/e/XXXXXXXX/viewform"
  // schoolEntryId 範例："entry.123456789"
  // baseUrl 空白時，按鈕會顯示「表單準備中」並停用
  // schoolEntryId 空白時，按鈕可用但不會自動帶入校名
  // embed: true 會把表單直接嵌在頁面中（下方保留「開新視窗填寫」備用按鈕）
  //   ⚠️ 含「檔案上傳」題的表單必須登入 Google，嵌入時多數手機會顯示空白，建議維持 false
  studentForm: {
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdwxEtJLxvzq3hX94T3xJE9TQYayVdUIMKO6lPjxUx--dDPwQ/viewform",
    schoolEntryId: "entry.967330370",   // 「學校名稱」題
    embed: false
  },
  teacherForm: { baseUrl: "", schoolEntryId: "", embed: false },

  statementUrl: "",   // 活動聲明（個資與抽獎規則）連結；空白時顯示「準備中」
  announcement: "",   // 得獎公告方式，例如「12/25 於飛資得官網及各校圖書館公告」

  // 抽獎方式說明
  drawMethod: "活動結束後，由主辦單位以公開隨機方式抽出得獎者（待確認）",

  // 老師挑戰說明
  teacherService: {
    description: "由出版社提供備課協助或客製化服務，例如依課程主題整理 JoVE 影片清單、協助將影片嵌入教學平台等。（待確認）",
    quota: "名額有限，額滿為止（每校名額待確認）"
  },

  // 學生任務（所有學校共用）— 先放 3 則佔位任務
  studentTasks: [
    {
      title: "任務一：潛入影片資料庫",
      description: "登入 JoVE，搜尋一個與你課程相關的實驗或技術，觀看一支完整影片。（待確認）",
      feature: "搜尋與影片播放"
    },
    {
      title: "任務二：拆解實驗步驟",
      description: "在影片頁面中使用章節跳轉功能，找出關鍵步驟並記下時間點。（待確認）",
      feature: "章節導覽"
    },
    {
      title: "任務三：建立你的研究資料夾",
      description: "建立個人帳號，將影片加入收藏或播放清單，完成後回到本頁填答。（待確認）",
      feature: "收藏／播放清單"
    }
  ],

  // 常見問題（佔位文字）
  faq: [
    { q: "誰可以參加這個活動？", a: "參與學校的在學學生與教職員皆可參加，詳細資格以各校公告為準。（待確認）" },
    { q: "需要自己付費使用 JoVE 嗎？", a: "不需要。請在校園網路或透過圖書館遠端連線服務使用，即可觀看貴校訂購的內容。（待確認）" },
    { q: "可以重複填答增加中獎機會嗎？", a: "每人限填答一次，重複填答以第一次為準。（待確認）" },
    { q: "得獎名單何時公布？", a: "活動結束後統一公告，公告管道請見各校活動頁。（待確認）" },
    { q: "活動有問題要找誰？", a: "請洽貴校圖書館，或聯絡主辦單位飛資得醫學資訊。（待確認）" }
  ],

  // 主辦單位（頁首「{校名} × 主辦單位」使用；頁尾文字在 index.html）
  organizer: "飛資得醫學資訊股份有限公司",

  // 活動注意事項（所有學校共用，顯示在「活動資訊」下方）
  notices: [
    "參加本活動者必須以真實姓名與有效的電子信箱註冊進行。請務必完整填寫各欄位，資料缺漏者將取消參加資格。",
    "得獎名單公佈後，以 Line 或 Email 通知中獎者，通知後一個月內無回覆者視同放棄得獎資格。必要時，主辦單位得請得獎者出示所屬單位的證明（如學生證、教師證、工作證等）以確認身份。",
    "主辦單位保有本活動更改測驗日期、變更獎項及中獎資格者審核之最終權利，並得以其它等值獎品替代本活動原公佈獎項品項之權利。",
    "參加活動者視同認可並接受本活動辦法之各項規定。"
  ],

  // 正式網址（給 tools/list-links.js 產生連結用，最後不要加斜線）
  siteUrl: "https://emilychen1212.github.io/flysheet-2026JOVE"
};
