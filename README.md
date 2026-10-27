# JoVE 挑戰 2026｜活動網站

飛資得醫學資訊 JoVE 跨校推廣活動入口。純 HTML／CSS／JavaScript，不需要建置，直接部署在 GitHub Pages。

- 主頁面：`https://emilychen1212.github.io/flysheet-2026JOVE/`
- 學校專屬頁：`https://emilychen1212.github.io/flysheet-2026JOVE/?school=mmu`

網站本身不收任何資料，填答與申請都連到 Google 表單；沒有追蹤碼，也不使用 localStorage。

## 檔案結構

```
index.html          頁面骨架（主頁面＋學校頁，由 JS 切換）
css/style.css       樣式（手機優先）
js/app.js           頁面邏輯（一般不需要改）
data/config.js      活動共用設定：期間、表單、學生任務、FAQ…
data/schools.js     各校資料
data/topics.js      JoVE 全主題清單（由 Excel 自動產生）
assets/og-image.png LINE 分享預覽圖（1200×630）
assets/img/         網頁用的 banner 與 logo（已壓縮）
assets/logos/       Logo 原始檔（只留在本機，不上傳）
tools/list-links.js 列出所有學校連結的小腳本（只在本機執行）
tools/build-topics.py 從 Excel 產生 data/topics.js
```

> **平常只需要改 `data/config.js` 和 `data/schools.js` 這兩個檔案。**

---

## 一、新增或修改學校

打開 `data/schools.js`，複製一整段學校資料，貼在最後一間學校後面（前一段的結尾 `}` 後面要加逗號）：

```js
  kmu: {                       // ← 網址代碼：?school=kmu（小寫英文／數字）
    name: "高雄醫學大學",       // 校名，會自動帶入表單
    hostName: "圖書館",         // 館方名稱，頁尾顯示「高雄醫學大學圖書館 × 飛資得醫學資訊」
    active: true,               // false = 暫停，連結會顯示「找不到此學校」
    themeColor: "#7a1f3d",      // 主題色，留空 "" 用預設深藍
    bannerImage: "",            // 例如 "assets/banners/kmu.jpg"，留空用預設漸層
    topics: ["core-biology", "journal-medicine"],   // 主題代碼，對照 data/topics.js
    gifts: [
      { tier: "頭獎", item: "AirPods", qty: 1 },
      { tier: "參與獎", item: "超商禮券 100 元", qty: 20 }
    ],
    note: ""                    // 該校專屬說明，留空就不顯示
  }
```

**訂購主題怎麼填**

`topics` 只要填主題代碼，網站會自動帶出名稱、依產品分組，並連到 JoVE 對應頁面。代碼規則是「產品代碼-Title」：

| 產品 | 代碼開頭 | 範例 |
| --- | --- | --- |
| Journal | `journal-` | `journal-immunology-and-infection` |
| Encyclopedia of Experiments | `eoe-` | `eoe-microbiology` |
| Science Education | `se-` | `se-basic-biology` |
| Core | `core-` | `core-calculus` |
| Lab Manual | `lab-` | `lab-biology` |
| Business | `business-` | `business-finance` |

完整清單在 `data/topics.js`。代碼打錯時，該主題不會顯示（瀏覽器的開發者工具 Console 會出現提示）。

**JoVE 主題清單或網址有更新時**，更新 Excel 後執行以下指令重新產生 `data/topics.js`（需要 `pip3 install openpyxl`）：

```bash
python3 tools/build-topics.py "/Users/飛資得醫學/01_產品相關資料/2026JoVE全主題_含網址.xlsx"
```

**注意事項**

- 文字一律用英文雙引號 `"` 包起來，每個欄位後面加逗號。
- 資料後面寫 `pending: true` 時，畫面上會出現黃色「待確認」標籤；確認後把這行刪掉即可。
- 改完後存檔，用本機預覽確認沒問題再上傳。如果整頁變空白，通常是少了逗號或引號。

## 二、取得 Google 表單的預填網址與 entry ID

1. 在 Google 表單新增一題「學校名稱」（簡答題）。
2. 右上角「⋮」→ **取得預先填入的連結**。
3. 在「學校名稱」欄位隨便填 `TEST`，按 **取得連結** → **複製連結**。
4. 複製到的網址長這樣：
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/viewform?usp=pp_url&entry.123456789=TEST
   ```
5. 拆成兩段，填進 `data/config.js`：
   ```js
   studentForm: {
     baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/viewform",  // ? 之前
     schoolEntryId: "entry.123456789"                                       // = 之前
   },
   ```
6. 老師表單（`teacherForm`）用同樣的方式設定。

只要任一欄是空的，按鈕會顯示「表單準備中」並停用，不會產生壞掉的連結。

> 小提醒：「學校名稱」欄位建議改成**選擇題**也可以，但選項文字要和 `schools.js` 的 `name` 完全一致，預填才會生效。

## 三、本機預覽

方法 A（最簡單）：直接雙擊 `index.html` 用瀏覽器開啟。網址後面手動加上 `?school=mmu` 就能看學校頁。

方法 B（較接近正式環境）：在這個資料夾開終端機執行

```bash
python3 -m http.server 8000
```

然後在瀏覽器開啟 `http://localhost:8000/?school=mmu`。

## 四、列出所有學校的專屬連結

```bash
node tools/list-links.js
```

加上 `--all` 會連同 `active: false` 的學校一起列出。連結網址來自 `config.js` 的 `siteUrl`。

> 這支腳本只在本機執行，不會變成網站頁面。不過 repo 是公開的，任何人都能看到 `schools.js` 的內容，請不要在資料檔裡放內部資訊（例如報價、聯絡人電話）。

## 五、部署到 GitHub Pages

第一次設定（只需一次）：

1. 到 GitHub repo `flysheet-2026JOVE` → **Settings** → **Pages**。
2. **Source** 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 **Save**。
3. 等 1–2 分鐘，網址會是 `https://emilychen1212.github.io/flysheet-2026JOVE/`。

之後每次更新：

```bash
git add .
git commit -m "更新學校資料"
git push
```

推送後等 1–2 分鐘生效。

> 修改 CSS 或 JS 後，請把 `index.html` 裡所有 `?v=日期` 改成新的日期，避免使用者的瀏覽器繼續用快取的舊檔案。手機若看到舊內容，關掉分頁重開或下拉重新整理即可。

## 六、其他設定

| 想改的東西 | 位置 |
| --- | --- |
| 活動名稱、標語、期間 | `config.js` → `campaignName`、`tagline`、`period` |
| 主頁面是否列出學校按鈕 | `config.js` → `showSchoolList`（預設 `false`） |
| 學生任務 | `config.js` → `studentTasks` |
| FAQ | `config.js` → `faq` |
| 抽獎方式、公告管道 | `config.js` → `drawMethod`、`announcement` |
| 老師服務說明與名額 | `config.js` → `teacherService` |
| LINE 分享預覽的標題／描述 | `index.html` 開頭的 `og:` 那幾行 |
| LINE 分享預覽圖 | 替換 `assets/og-image.png`（1200×630） |
| 學校頁頁首底圖（所有學校共用） | `config.js` → `schoolBanner`；個別學校可用 `schools.js` 的 `bannerImage` 覆寫 |
| Logo | 原始檔放 `assets/logos/`（不會上傳），網頁用版本在 `assets/img/logo-代碼.png`，由 `schools.js` 的 `logo` 指定 |

**關於 LINE 預覽**：LINE 抓預覽時不會執行 JavaScript，所以所有學校的連結都會顯示同一組預覽標題和圖片。更換預覽圖後，LINE 可能會快取舊圖數天，可以到 [LINE Page Poker](https://poker.line.naver.jp/) 清除快取。

**關於搜尋引擎**：網站已加上 `noindex` 和 `robots.txt`，可以降低被收錄的機會，但無法完全保證。

## 七、數據追蹤（Google Analytics 4）

- 評估 ID 設定在 `data/config.js` 的 `ga4Id`（清空即停止追蹤），程式在 `js/analytics.js`。
- 本機預覽不會送出資料；網址加上 `?ga_debug=1` 才會送出，並出現在 GA4 的「DebugView」。
- 每個事件都帶 `school`（學校代碼）參數。

| 事件 | 意義 | 參數 |
| --- | --- | --- |
| `page_view`（內建） | 瀏覽頁面 | `school`、`page_type` |
| `scroll_depth` | 捲動到 25／50／75／100% | `percent` |
| `section_view` | 區塊被看到 | `section`（topics／student／teacher／info／notice…） |
| `topic_click` | 點擊訂購主題 | `topic`（例如 Journal - Biology） |
| `topic_menu_open` | 展開主題下拉選單 | `product` |
| `cta_click` | 點擊按鈕 | `button`（student_form／teacher_form／jump_student／sticky_teacher…） |
| `faq_open` | 展開常見問題 | `question` |

GA4 後台需建立「自訂維度」（管理 → 資料顯示 → 自訂定義），報表才能依這些參數篩選：
`school`、`topic`、`button`、`section`、`product`、`percent`、`page_type`（範圍皆選「事件」）。

## 八、內部總覽頁（/forflysheet/）

網址：`https://emilychen1212.github.io/flysheet-2026JOVE/forflysheet/`

- 一頁列出所有學校的連結（一般／LINE 版，可一鍵複製）、訂購主題、禮品與表單狀態。
- 需登入才會顯示；登入後同一台裝置的瀏覽器 30 天內免再登入（到期或更換密碼後需重新登入），按「登出」立即失效。
- **更換帳密**：執行 `node tools/make-admin-hash.js 新帳號 新密碼`，把印出的雜湊值貼到 `forflysheet/index.html` 的 `ADMIN_HASH`，推上 GitHub。
- ⚠️ 這是靜態網站上的「簡易門鎖」：網站只存雜湊值、不存密碼原文，但 repo 是公開的，懂技術的人仍可直接讀取 `data/schools.js` 等資料檔。請勿在資料檔放內部機密（報價、聯絡人電話等），也不要沿用其他系統的密碼。
