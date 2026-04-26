# Draw Tarot 開発メモ

## 目的

GitHub Pagesなどで静的ホストできる、タロットカードを引くWebアプリ。

## 現状

- 構成は `index.html`、`style.css`、`script.js`、`images/`、`test/static.test.js`。
- 大アルカナ22枚と裏面画像は `images/` に配置済み。
- 画像はファイル側で縦向きに正規化済み。
- カットは「カードを任意の位置で上下に入れ替える」動作。
- スマホでは1画面に収め、引いたカードをできるだけ大きく表示する方針。

## テスト

```sh
npm test
```

確認内容:

- 画像23枚の存在
- 画像が縦長
- 画像orientationが正規化済み
- HTMLのCSS/JS参照
- CSSの主要レイアウト指定
- JS構文

## 注意

- `npm test` 時にNode v16由来のnpm警告が出ることがあるが、現状テストは通る。
- 画像処理にはローカルの ImageMagick `magick` を使っている。

## コミット方針

- コミット前に必ず `git diff HEAD` を確認する。
- diffから変更内容を要約してコミットメッセージを決める。
- 可能ならコミット前に `npm test` を実行する。
- push前に `git status --short` で意図しない変更がないか確認する。
