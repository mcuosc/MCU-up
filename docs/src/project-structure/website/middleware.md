# 中介軟體

中介軟體(middleware)主要是一些在不同端口底下重複運行的方法和函式，將他們包裝成中介軟體以減少程式碼重複的撰寫，並維持每個函式及方法的整潔以維持可讀性，以下是本專案中所實作的中介軟體介紹：

## auth_middleware.js

用於驗證是否登入

## course_middleware.js

檢查課程是否存在

## preRenderMiddleware.js

預先處理登入狀況