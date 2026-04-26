# Draw Tarot

問いをひとつ心に置いて、タロットカードを1枚引く小さなWebアプリです。

大アルカナ22枚からカードをシャッフルし、選んだ位置のカードを表示します。
カードごとに、絵柄の読み解き、ポジティブ/ネガティブなキーワード、生命の樹での位置づけを添えています。

占いというより、思考の角度を少し変えるための道具です。
結論を外注するのではなく、自分の中の別の声を呼び出すためにどうぞ。

## Screenshot

<!--
あとで画面スクリーンショットをここに配置します。
例:
![Draw Tarot の画面](docs/screenshot.png)
-->

## 使い方

`index.html` をブラウザで開くだけで使えます。
サーバーもアカウント登録も不要です。水晶玉も不要です。

## 特徴

- 大アルカナ22枚から1枚をドロー
- 任意の位置でカードを選択
- シャッフルとドローの簡単な演出
- カード画像と解説を表示
- GitHub Pagesなどでそのまま公開できる静的構成

## 開発

```sh
npm test
```

## 画像とクレジット

カード画像は、Wikimedia Commons の
[Vectorized Tarot by Immanuelle](https://commons.wikimedia.org/wiki/Category:Vectorized_Tarot_by_Immanuelle)
に掲載されているパブリックドメインの Rider-Waite-Smith タロット図柄をもとにしています。

各カードページの Media Viewer から、カードスキャン画像のオリジナルサイズをダウンロードして使用しています。
例:
[RWS Tarot 17 Star.svg](https://commons.wikimedia.org/wiki/File:RWS_Tarot_17_Star.svg)

Wikimedia Commons 上の表記例:

> By Pamela Colman Smith - http://muzendo.jp/blog/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=114011116

画像はパブリックドメインです。各画像の詳細な来歴や表記は、Wikimedia Commonsの各ファイルページを参照してください。

## ライセンス

このリポジトリのコードは [MIT License](LICENSE) で公開しています。
画像は上記の通りパブリックドメインです。
