MCU-up
===
此專案為[MCU-up-beta](https://github.com/mcuosc/MCU-up-beta) 的穩定版本，如需使用請參考 [LICENSE](https://github.com/mcuosc/MCU-up/blob/main/LICENSE)


## 事前準備

使用此專案前所需安裝的工具：
1. [Nodejs](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com)

建議工具：
1. [RoBo3T](https://robomongo.org/)：看 mongoDB 的 GUI 程式

建立流程
---

1. clone本專案
2. 新增 `.env` 檔案
3. 新增 `whitelist.json` 和 `class_ids_names.json` 檔案於 `data` 資料夾中
4. 執行 `npm install`，有特別要額外安裝的 module:body-parser 跟 nodemon(nodemon需要下npm install -g nodemon)
5. 如要執行本專案在小黑下 node app.js 或 nodemon app.js(預設port端3000)

* 爬蟲已移出本專案，如有需要請至 [course-crawler](https://github.com/andy010629/course-crawler) 查看

## SCREENSHOT
![](img/1.JPG)
![](img/2.JPG)
![](img/3.JPG)
