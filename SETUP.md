# Sonae デモ起動手順

## ステップ1：Homebrewをインストール

ターミナル（Terminal.app）を開いて以下をコピペして実行：

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

途中でパスワードを聞かれたらMacのログインパスワードを入力。
インストール完了後、ターミナルに表示される「Next steps」の指示に従ってPATHを設定してください。

---

## ステップ2：Node.jsをインストール

```
brew install node
```

確認：
```
node -v
```
`v20.x.x` のように表示されればOK。

---

## ステップ3：アプリを起動

```
cd /Users/toru/Desktop/work/登山/sonae
npm install
npm run dev
```

`npm install` は少し時間がかかります（1〜2分）。

---

## ステップ4：ブラウザで確認

ターミナルに `Ready on http://localhost:3000` と表示されたら、
ブラウザで **http://localhost:3000** を開いてください。

---

## 止め方

ターミナルで `Ctrl + C` を押すと停止します。
