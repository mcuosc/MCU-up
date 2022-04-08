# 爬蟲

使用爬蟲來抓取學校網頁裡的所有課程，此爬蟲分為兩個階段，分別為爬學校課程資訊與存進資料庫

## 使用函式庫
* HTTP: requests
* 格式整理: BeautifulSoup
* 操作資料庫: pymongo

## 爬取學校課程

由 requests 函式庫中的函式來抓取整個網頁，並使用 BeautifulSoup 函式庫來自動整理所抓取的資料格式。

分為兩次抓取:

1. 爬取學校內的進階搜尋格式，製作符合學校post格式結構。
2. 以學期為單位，使用 requests 函式庫中的`requests.post()`來發送post使學校回傳課程資料，並爬取其課程資料整理。

## 寫入資料庫

使用 pymongo 的函式庫，連結MongoDB把爬下來並整理完後的資料寫入。


## 資料庫格式
詳細說明可至[資料庫格式](./website/schema.md)查看。
```js
{
  制別: String,
  科目: {},
  班級: String,
  開班_選課人數: String,
  任課教師: {},
  上課日期_節次: [],
  年級: String,
  學校: {},
  選別: String,
  學分: String,
  類別: String,
  畢業班: String,
  學期數: String,
  說明: String,
}
```
