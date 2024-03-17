# CAT-PLANET - 貓咪樂活專賣店

## 專案說明

以貓咪寵物用品為主題，結合玩具、美容、飲食、床窩用品的電商網站，滿足貓咪的一切需求。

Demo Website：https://ling-jun-hao.github.io/cat-planet/#/

## 設計理念

* **名稱由來：** 喜歡貓咪的人都是一家人，同在一個星球上
* **主要風格：** 咖啡色搭配灰色系
* **色系搭配：** #6c5c53、#aaa、#6c5c53

## 使用技術

* 使用 Vue 2 和 Vue Cli 架設開發。
* 引入 Vue Router 與 Vue Axios 等套件。
* 使用 Bootstrap 5 & SCSS 建構響應式版型。
* 加入 ESLint standard 規範管理程式品質。
* 透過 Pinia 進行狀態管理，負責跨元件參數操作。

## 使用套件

* Vue Router 管控路由。
* Vue Axios 串接 37 支 API。
* Vee-Validate 表單驗證。
* Vue-loading-overlay 動畫加載頁面。
* swiper 輪播功能。
* AOS 動畫效果。
* Bootstrap Icons。

## 前台簡介

* 首頁
* 產品列表：產品分類、分頁功能
* 產品詳情
* 購物車：新增、刪除、修改功能
* 結帳：建立訂單

## 後台簡介

* 產品管理：新增、修改、刪除、圖片上傳功能
* 訂單管理：新增、修改、刪除功能
* 優惠券管理：新增、修改、刪除功能

## 安裝方式

```bash=
npm install
```

## 啟動方式

Start the development server on http://localhost:3000:

```bash=
npm run dev
```

## 打包方式

```bash=
npm run build
```

## 使用版本

* nodejs - v18.19.1
* npm - 10.2.4
