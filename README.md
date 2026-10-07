# JoVE 挑戰 2026｜活動網站

飛資得醫學資訊 JoVE 跨校推廣活動入口。純 HTML／CSS／JavaScript，不需要建置，直接部署在 GitHub Pages。

- 主頁面：`https://emilychen1212.github.io/flysheet-2026JOVE/`
- 學校專屬頁：`https://emilychen1212.github.io/flysheet-2026JOVE/?school=mmc`

網站本身不收任何資料，填答與申請都連到 Google 表單；沒有追蹤碼，也不使用 localStorage。

## 檔案結構

```
index.html          頁面骨架（主頁面＋學校頁，由 JS 切換）
css/style.css       樣式（手機優先）
js/app.js           頁面邏輯（一般不需要改）
data/config.js      活動共用設定：期間、表單、學生任務、FAQ…
data/schools.js     各校資料
assets/og-image.png LINE 分享預覽圖（1200×630）
assets/logos/       Logo 素材放這裡
tools/list-links.js 列出所有學校連結的小腳本（只在本機執行）
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
    topics: [
      { name: "JoVE Core：生物學", url: "https://www.jove.com/..." }
    ],
    gifts: [
      { tier: "頭獎", item: "AirPods", qty: 1 },
      { tier: "參與獎", item: "超商禮券 100 元", qty: 20 }
    ],
    note: ""                    // 該校專屬說明，留空就不顯示
  }
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

方法 A（最簡單）：直接雙擊 `index.html` 用瀏覽器開啟。網址後面手動加上 `?school=mmc` 就能看學校頁。

方法 B（較接近正式環境）：在這個資料夾開終端機執行

```bash
python3 -m http.server 8000
```

然後在瀏覽器開啟 `http://localhost:8000/?school=mmc`。

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

推送後等 1–2 分鐘生效。手機若看到舊內容，關掉分頁重開或下拉重新整理即可。

## 六、其他設定

| 想改的東西 | 位置 |
| --- | --- |
| 活動名稱、標語、期間 | `config.js` → `campaignName`、`tagline`、`period` |
| 主頁面是否列出學校按鈕 | `config.js` → `showSchoolList`（預設 `false`） |
| 學生任務 | `config.js` → `studentTasks` |
| FAQ | `config.js` → `faq` |
| 抽獎方式、公告管道、活動聲明 | `config.js` → `drawMethod`、`announcement`、`statementUrl` |
| 老師服務說明與名額 | `config.js` → `teacherService` |
| LINE 分享預覽的標題／描述 | `index.html` 開頭的 `og:` 那幾行 |
| LINE 分享預覽圖 | 替換 `assets/og-image.png`（1200×630） |
| Logo | 把 `index.html` 中的 `<div class="logo-slot">` 換成 `<img src="assets/logos/xxx.svg" alt="…" height="32">` |

**關於 LINE 預覽**：LINE 抓預覽時不會執行 JavaScript，所以所有學校的連結都會顯示同一組預覽標題和圖片。更換預覽圖後，LINE 可能會快取舊圖數天，可以到 [LINE Page Poker](https://poker.line.naver.jp/) 清除快取。

**關於搜尋引擎**：網站已加上 `noindex` 和 `robots.txt`，可以降低被收錄的機會，但無法完全保證。
