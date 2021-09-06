# 後端

## 基本資訊
* Database: MongoDB
* Authentication: passport.js

後端主要著重在資料的傳遞處理上，舉凡課程查詢、評論顯示、使用者驗證都在這裡完成。

目前以 controller 來區分，主要分為「課程與評論相關」及「使用者驗證相關」兩大類。

## 課程與評論
採用 mongoose.js 來作為溝通資料庫的方式，實作列出課程、課程查詢、課程評分查詢與修改的功能。

## 驗證機制
採用 passport.js 來管理使用者的登入狀態，透過 Google OAuth 2.0 取得學校 Gmail 來驗證是否為銘傳學生。

## 資料庫
採用 MongoDB 儲存爬蟲所抓取的課程資料、評論相關資料、暫存使用者登入狀態。
