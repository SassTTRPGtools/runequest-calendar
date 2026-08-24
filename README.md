# 符文巡旅線上日曆工具

這是可部署至 GitHub Pages 的靜態網站版本，包含日曆、聖日資料、露娜月相與 Google 試算表 CSV 戰役時間線。

## 部署到 GitHub Pages

1. 在 GitHub 建立新的 repository，例如 `runequest-calendar`。
2. 解壓縮本專案，將資料夾內的所有檔案上傳至 repository 的 `main` 分支。
3. 開啟 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
5. 前往 **Actions** 頁面等待 `Deploy GitHub Pages` 完成。
6. GitHub 會提供網站網址，通常為 `https://帳號.github.io/runequest-calendar/`。

之後每次推送到 `main`，網站都會自動重新建置與發布。

## 本機檢視

需先安裝 Node.js 22，然後執行：

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

建置結果會輸出至 `dist` 資料夾。
