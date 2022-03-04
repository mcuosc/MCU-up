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
git clone https://github.com/mcuosc/MCU-up-beta.git
cd MCU-up-beta
git checkout dev
```

## 安裝相關函式庫(已被移出本專案)

### 爬蟲(已被移出本專案)
這裡主要分成兩大安裝方式: 直接安裝與透過虛擬環境安裝。

由於 python 本身預設是共用所有套件，為了避免產生相容性問題，所以通常會建立一個虛擬的乾淨環境，來進行安裝。

#### 直接安裝
```sh
pip install -r requirements.txt
```

#### 透過虛擬環境安裝
在此介紹兩個主流的虛擬環境，與其建立安裝方式。

##### venv 版本(推薦)
venv 是 Python 官方內建的虛擬環境工具，可透過它方便地建立並使用虛擬環境。

由於預設虛擬環境會建立在目前所在的資料夾，所以請先找個適合的位置，再打開終端機操作。

建立與啟動環境:
```sh
#透過 venv 建立名為 mcu-up 的虛擬環境
python -m venv mcu-up

#啟動虛擬環境
./mcu-up/bin/activate
```

接著就可以切換回原本專案資料夾進行套件安裝:
```sh
pip install -r requirements.txt
```

##### miniconda 版本
```sh
#依序輸入以下指令:
conda create --name mcu-up
conda init {終端環境}   #(如果有多個teminal環境才需要輸入指定 輸入完重開teminal)
conda activate
pip install -r requirements.txt


#--------------- 指令參考 -----------------
#conda 基本指令
conda create --name {環境名稱} python=3.7  #建立環境
conda activate {環境名稱}   #啟動環境
conda deactivate {環境名稱}  #關閉環境

#pip 基本指令
pip install {套件名稱}     #安裝套件
pip install -r requirements.txt    #安裝txt中的所有套件
#-----------------------------------------
```

### 網站
```sh
npm install
```

## 專案初始化
在 clone 下來的資料夾：
```shell
python main.py
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
