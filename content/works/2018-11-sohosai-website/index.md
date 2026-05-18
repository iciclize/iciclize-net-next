---
slug: "sohosai-website"
date: "2018-11"
title: "学園祭Webサイト制作"
description: "学園祭Webサイトのデザインや制作の指揮などをしていました。インタラクティブ地図付きの企画検索機能も実装されていました。Nuxt.js製。"
imagename: "work-ishitan.jpg"
keywords: [ "Vue.js" ]
---

## なにこれ・なにしたの

2018年度の筑波大学学園祭「雙峰祭」のWebサイト制作に携わりました。

制作メンバーは10+人で、私は主にWebデザインとサイトの内容を考え、制作の指揮をしました。

他には、SVGインタラクティブ実装のために、部屋ごとマークアップされたSVGマップの設計とその制作の指揮や、新入生にWebやGitのレクチャーを行ったりしていました。

## デザインの実物スクリーンショット

レガシーな2カラムにちょっとモダンなグラデーションを用いて、可愛い感じのデザインに挑戦しました。

今思うと垢抜けない感じあってなんじゃこりゃって感じなんですけど…

### トップページ

<div style="max-width: 360px;">

![Sohosai website mobile top page](./work-ishitan-screen-mobile.jpg)

</div>

![Sohosai website pc top page](./work-ishitan-screen-pc.jpg)

### 各種情報ページ

![Sohosai website access page](./work-ishitan-access.png)

### キーワード・カテゴリと絞り込み条件による検索のページ

![Sohosai website search page](./work-ishitan-search.png)

### 企画詳細・インタラクティブ地図ページ

<div style="max-width: 360px;">

![Sohosai website map](./work-ishitan-map.jpg)

</div>

部屋の場所まで表示できるようになっています。

## コンテンツの設計

利用者が知りたい、日程、企画一覧、アクセス方法について素早く確実に情報が得られるように内容を考えました。

![Sohosai website contents design 1](./work-ishitan-contents-0.jpg)

![Sohosai website contents design 2](./work-ishitan-contents-1.jpg)

## 地図の話

このWebサイトは、キーワード・カテゴリによる企画検索機能に加え、企画の実施場所をインタラクティブに確認できるSVG地図を実装しています。

インタラクティブ地図を実装するために、屋外テント設置場所のほか、企画で使われるほとんどの建物を一部屋一部屋SVGにマッピングする必要があったため、メンバーを動員してマッピングを行いました。

地図UIならびに現在地の表示などはメンバーの一人に開発を任せました。現在地の表示を頼んだ覚えはなかったのに、GIMPか何かを使ってGPS座標をSVGマップ座標に変換する変換行列を割り出して現在地表示を行っていてびっくりしました。

## あんまり携わってない場所の技術について

フレームワークにNuxt.jsを使っています。私はNuxt.jsを使ったことがなかったのですが、ほかのメンバーがリードしてくれたので、多少理解しました。

企画検索バックエンドは学園祭の企画登録システム(雙峰祭オンラインシステム, 通称SOS)が提供するGraphQLサーバーで、情報の取得(Apollo)および表示はメンバーの一人にお願いしました。

## ちょっと反省

掲載情報について他の部署との連携があんまりうまくいってなかったので政治力も大事だなあと思いました(小並感)
