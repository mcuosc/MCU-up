# 環境設置

## 前置準備
在開始之前，得先安裝下列套件：
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com)
* 可選安裝
  - 檢視 MongoDB 的 GUI：[RoBo3T](https://robomongo.org/)
  - Python 虛擬環境: [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
  - [nodemon](https://www.npmjs.com/package/nodemon)
      - 透過npm安裝 `npm install -g nodemon`

接下來將以 linux shell 示範，windows 請採用 powershell 或其他相容終端機。

## 複製專案至本機
```shell=
git clone https://github.com/mcuosc/MCU-up.git
cd MCU-up
```

## 爬蟲(資料庫建立)
如有需要請至 [MCU-up-DBbackup](https://github.com/andy010629/course-crawler) 查看

## 專案初始化
在 clone 下來的資料夾：
```shell
cp .env.example .env
sed -i 's/secret\=/secret="test"/g' .env
echo "[]" > data/whitelist.json
```

## 環境設定完成
此時應可以正常啟動網站：
```sh
npm run
```
在 http://localhost:3000 上可以看到 MCU-up 即表示設定成功！
