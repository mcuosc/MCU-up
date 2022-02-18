# 網站

網站以 Node.js 的 Express 框架為基礎，搭配了 MVC 架構進行實作。

![](https://i.imgur.com/VBu6rSC.jpg)

**app.js**: 網站的進入點
* router: 總機，負責將請求依路徑導向至對應的 controller。
* controller: 實作網站控制邏輯的地方，負責操作 model，並且按照需求把資料交給 view 或是其他操作（比如重導向）。
* model: 模型通常是存取資料庫裡面的特定資料，並且將其回傳。
* view: 繪製前端頁面，目前主要採用伺服器端渲染。

其中還會有一些 middleware (為本專案中 services 資料夾裡的函式及方法)，或是靜態頁面的相關檔案，由於較少使用到，所以不細述。
