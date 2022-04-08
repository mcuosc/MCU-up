# 後端

## 基本資訊
* Database: MongoDB
* Authentication: passport.js

後端主要著重在資料的傳遞處理上，舉凡課程查詢、評論顯示、使用者驗證都在這裡完成。

目前以 controller 來區分，主要分為「課程與評論相關」及「使用者驗證相關」兩大類。

以下是所實作的功能及對應的 route 、 controller 、 models 及 middleware ：

## 課程與評論
採用 mongoose.js 來作為溝通資料庫的方式，實作列出課程、課程查詢、課程評分查詢與修改的功能。以下是所使用的 controller 和 models：

### route 
* course.js

### controller
* courses_controller.js

### models
* deleteComment_model.js
* getComment_model.js
* getCourses_model.js
* getCoursesList_model.js
* getRating_model.js
* postComment_model.js
* updateComment_model.js

## 驗證機制
採用 passport.js 來管理使用者的登入狀態，透過 Google OAuth 2.0 取得學校 Gmail 來驗證是否為銘傳學生。以下適用於驗證的 controller 及 middleware ：

### route
* auth.js

### controller
* auth_controller.js

### middleware：
* auth_middleware.js

## 資料庫
採用 MongoDB 儲存爬蟲所抓取的課程資料、評論相關資料、暫存使用者登入狀態。並用以下的 schema model 裡的格式儲存資料進入資料庫，關於詳細的說明可至[資料庫格式](./schema.md)查看。

### schema
* course_model.js
* rating_model.js
* user_model.js