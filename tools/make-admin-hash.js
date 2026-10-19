#!/usr/bin/env node
/**
 * 產生內部總覽頁（/forflysheet/）的帳密雜湊值
 *
 * 用法：
 *   node tools/make-admin-hash.js 帳號 密碼
 *
 * 把印出的雜湊值貼到 forflysheet/index.html 的 ADMIN_HASH，存檔後推上 GitHub 即完成更換密碼。
 * 網站只存雜湊值，不存密碼原文；帳號不分大小寫。
 */
const crypto = require("crypto");

const [account, password] = process.argv.slice(2);
if (!account || !password) {
  console.log("用法：node tools/make-admin-hash.js 帳號 密碼");
  process.exit(1);
}

const SALT = "flysheet-jove-2026";
const ITERATIONS = 150000;
const hash = crypto
  .pbkdf2Sync(account.trim().toLowerCase() + "|" + password, SALT, ITERATIONS, 32, "sha256")
  .toString("hex");
console.log(hash);
