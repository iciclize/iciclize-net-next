---
slug: "alarm"
date: "2020-11"
title: "目力防犯ブザー"
description: "100円ショップの防犯ブザーを改造して好きな音を出せるようにする初めての電子工作プロジェクトです。"
imagename: "work-alarm.jpg"
keywords: [ "AVR", "ATtiny85" ]
---

100円ショップの防犯ブザーを改造して好きな音を出せるようにするプロジェクトです。

Lチカより進んだものとしては初めての電子工作です。

<div style="position: relative; padding-bottom: 60%; margin-bottom: 1.5rem;"><iframe allowfullscreen="allowfullscreen" allow="autoplay" src="https://embed.nicovideo.jp/watch/sm37778066?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1" style="position: absolute; width: 100%; height: 100%; border: none;"></iframe></div>

「目力防犯ブザーを作ってネットで810円で売りたい」と言って丸2年間以上温めていたプロジェクトで、この度ようやくその夢が叶いました。

ただ音を出すだけの作品といえばそうなのですが、防犯ブザー内の限られた空間、マイコンの限られた計算資源、EEPROMの限られた保存領域という制約に結構苦戦しました。

ChaN氏の実装を参考に、ADPCMという方式で圧縮した音声をデコードして再生するようになっています。ADPCMを使うと非圧縮のWAVに比べて2倍のデータを保存できて経済的です。実装も複雑でないのであまり計算資源を必要としません。

製作コストが高すぎたので810円ではなく1145円の設定で、メ○カリで3回販売してみましたが、どの回も出品から半日くらいで買い手が付きました。やったぜ。

![Three original alarms are sold soon](work-alarm-mexcari.png)

製作方法をまとめた記事を書くつもりです。2020-11-27現在は Part1 のみ書かれている状態ですが、いずれ続きを書くつもりです。

また、DIPではなく表面実装のパッケージを使えるようにする、材料をAliexpressで調達するなど、コストダウンできないかと画策・実験しているところです。

[続く]
