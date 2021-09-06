# 前端

## 基本資訊
* View Engine: Pug
* Server Side Rendering
* Library:
  * Bootstrap 5
  * Sweetalert 2

前端主要透過 pug 來進行渲染，而一些不常變動的頁面，以及用戶端 JS、CSS、圖片等檔案將會放置於 `public` 資料夾。

## 模版頁面配置
所有的頁面都是先由 `layout.pug` 為範本延伸，可透過預先保留好的`heads`、`content`、`scripts` 區塊為各頁面彈性增加內容。

* `heads`: 對應 `<head>` 標籤
* `content`: 對應 `<body>` 標籤
* `scripts`: 對應到 `<body>` 末端的區塊，可增加 `<script>`
