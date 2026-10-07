#!/usr/bin/env node
/**
 * 列出所有學校的專屬活動連結（只在本機執行，不會出現在網站上）
 *
 * 用法：
 *   node tools/list-links.js          列出 active: true 的學校
 *   node tools/list-links.js --all    連同未啟用的學校一起列出
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
for (const f of ["data/config.js", "data/schools.js"]) {
  // const 宣告不會掛到 context 上，所以最後把變數明確 export 出來
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
}
const { CONFIG, SCHOOLS } = vm.runInContext("({ CONFIG, SCHOOLS })", ctx);

const showAll = process.argv.includes("--all");
const base = (CONFIG.siteUrl || "").replace(/\/+$/, "");

console.log(`\n${CONFIG.campaignName}｜學校專屬連結\n`);
let count = 0;
for (const [key, s] of Object.entries(SCHOOLS)) {
  if (!s.active && !showAll) continue;
  const flag = s.active ? "" : "（未啟用）";
  console.log(`${s.name}${flag}`);
  console.log(`  ${base}/?school=${key}\n`);
  count++;
}
console.log(`共 ${count} 間學校`);
