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

  // 頁首共用底圖：主頁面與所有學校頁（各校可在 schools.js 用 bannerImage 個別覆寫）
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
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScubWbFBk_iT981LT5hXsEdrfvA1EEPvt-QBtbyqEbO7U-pfA/viewform",
    schoolEntryId: "entry.1161382229",   // 「學校名稱」題
    embed: false
  },
  teacherForm: {
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf7S05kEEa9TIjZX7aMq5J_5uCvhSJRJ-xQNd96zvibgrY15A/viewform",
    schoolEntryId: "entry.1091917578",   // 「學校名稱」題
    embed: false
  },

  // Google Analytics 4 評估 ID（空白 = 不追蹤）。本機預覽時不會送出資料，網址加上 ?ga_debug=1 才會送（並進入 DebugView）
  ga4Id: "G-QNTSLB585S",

  statementUrl: "",   // 活動聲明（個資與抽獎規則）連結；空白時顯示「準備中」
  announcement: "預計將於 12/24 後，陸續以信箱或電話聯繫中獎者，告知後續領獎事宜",

  // 抽獎方式說明
  drawMethod: "活動結束後，預計於 12/23 由飛資得醫學以隨機方式抽出得獎者",

  // 老師挑戰說明
  // 學習資源按鈕（所有學校共用，顯示在「已訂購主題」下方）
  resources: [
    { icon: "📘", label: "JoVE 使用手冊", url: "https://drive.google.com/file/d/12OGvvlVbMbmMf8SBYYsqr5Am0hPN8NF8/view", track: "resource_manual" },
    { icon: "▶️", label: "建立帳號教學影片", url: "https://youtu.be/5XrQib7s_ZM?si=W6RJ7R8IkGCHFFOw", track: "resource_signup_video", id: "signup_video" }
  ],

  // 頁首提醒（banner 按鈕下方，所有學校預設顯示；學校可在 schools.js 用 heroNote 換成自己的說明，例如陽交大）
  //   hides：使用預設提醒時，從上方 resources 隱藏重複的按鈕
  defaultHeroNote: {
    text: "參加活動請記得先申請個人帳號",
    button: "▶️ 建立帳號教學影片",
    url: "https://youtu.be/5XrQib7s_ZM?si=W6RJ7R8IkGCHFFOw",
    track: "hero_signup_video",
    hides: "signup_video"
  },

  // 老師挑戰：申請後的服務流程（顯示為步驟卡片）
  teacherSteps: [
    { title: "填寫申請表單", text: "填寫基本資料與授課課程資訊，送出申請表單。" },
    { title: "專員與您聯繫", text: "JoVE 出版社服務專員將以 Email 或電話與您聯繫，進一步了解課程與教學需求。" },
    { title: "討論備課服務", text: "一起規劃最適合您課程的服務內容，例如整理課程主題影片清單、協助將影片嵌入教學平台等。" },
    { title: "完成服務・領取好禮", text: "確認完成教學資源服務後，即可領取老師挑戰限定好禮！" }
  ],

  // 加碼挑戰（只在 schools.js 設定 bonus: true 的學校顯示）
  //   url 空白時按鈕顯示「即將開放」並停用；學校可用 bonusUrl 個別指定連結，
  //   或用 bonusLinks（多個題目按鈕）＋ bonusGuide（作答指引按鈕）
  bonusChallenge: {
    title: "加碼挑戰",
    text: "意猶未盡嗎？完成 JoVE Quiz 加碼挑戰，抽獎機會再 +1！",
    button: "我要參加",
    url: ""
  },

  teacherService: {
    description: "由出版社提供備課協助或客製化服務，例如依課程主題整理 JoVE 影片清單、協助將影片嵌入教學平台等。",
    quota: "名額有限，額滿為止"
  },

  // 學生任務（所有學校共用）
  //   title 任務名稱｜scene 情境（讓學生想像自己在學習上怎麼用 JoVE）｜submit 要回報的內容｜feature 用到的功能
  studentTasks: [
    {
      title: "任務一：請 AI 學伴幫你備戰",
      scene: "下週就要進實驗室，或是考試快到了？選一個主題進入，打開「Ask JoVE AI」，告訴它你正在準備什麼，請它推薦一支最能幫上忙的影片。",
      submit: "貼上這支影片的連結，並寫下影片中對你最有幫助的片段（例如哪個步驟或時間點）。",
      feature: "Ask JoVE AI"
    },
    {
      title: "任務二：順著好奇心延伸學習",
      scene: "看完影片別急著離開！往下滑到「Explore More Videos」，挑一支吸引你的延伸影片看看，好的學習常常從下一個問題開始。",
      submit: "寫下這支延伸影片的 2 個關鍵字。",
      feature: "Explore More Videos"
    },
    {
      title: "任務三：打造你的專屬學習片單",
      scene: "把任意 3 支影片加入同一個播放清單，變成你考前複習、實驗前預習時隨時打開就能看的個人片單。",
      submit: "截圖你的播放清單，上傳到表單。",
      feature: "播放清單（Playlist）"
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
    "參加本活動者必須以真實姓名與有效的電子信箱進行填寫。請完整填寫必填欄位，資料缺漏者將取消參加資格。",
    "得獎名單公佈後，將以 Email 或電話通知中獎者，通知後一個月內無回覆者，視同放棄得獎資格。必要時，主辦單位得請得獎者出示所屬單位的證明（如學生證、教師證、工作證等）以確認身份。",
    "主辦單位保有本活動更改活動日期、變更獎項及中獎資格者審核之最終權利，並得以其它等值獎品替代本活動原公佈獎項品項之權利。",
    "本活動所蒐集之個人資料，將用於活動聯繫、抽獎與獎品寄送，以及主辦單位提供 JoVE 相關學習資源與活動資訊；資料將妥善保管，不會提供給活動以外之第三方。如欲停止接收資訊或刪除個人資料，請與主辦單位聯繫。",
    "參加活動者視同認可並接受本活動辦法之各項規定。"
  ],

  // 正式網址（給 tools/list-links.js 產生連結用，最後不要加斜線）
  siteUrl: "https://emilychen1212.github.io/flysheet-2026JOVE"
};
