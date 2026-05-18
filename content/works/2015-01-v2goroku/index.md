---
slug: "v2-goroku"
date: "2015-01"
title: "V2語録/V2 Online"
description: "主に語録再生ができるAndroid/Webアプリ。高校のクラスの文化祭で上映した映画を語録という形で封印したもので、初めて作ったAndroid/Node.jsアプリ。"
imagename: "work-V2.jpg"
keywords: [ "Android" ]
---

## なにこれ

文化祭でクラスの企画として上映した自主制作映画「V2 Yankees」をAndroid・Webアプリ化したものです。

映画のあらましを見たり、登場人物のセリフを再生したりできます。

初めて作ったAndroidアプリとWebアプリ(Node.js)でした。

## デモ映像(Android版)

<div style="position: relative; width: 100%; height: 0; padding-bottom: 62.5%; overflow: hidden; margin-bottom: 50px;" >
  <iframe src="https://www.youtube.com/embed/5hWpM3Yfd_4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"></iframe>
</div>

## 制作の動機と経緯

~~ボタン連打で語録を垂れ流せるアプリを作って教室中語録まみれにするのをどうしてもやりたい一心で作りました。~~

クラスの文化祭企画として作った自主制作映画は、意味不明なセリフやガバガバ演技に客が上映中に寝てしまうほどの映画でした(実話)。しかし私は、みんなで放課後や夏休みに集まって制作した映画の思い出を風化させたくないと思い、この映画をAndroidアプリに封印することにしました。

### Android版の制作

Androidアプリの制作を2015年、高1の12月に開始しました。

この時までAndroidアプリを作った経験は一切無かったので、タブによる画面遷移を実現するのですら土日2日間で丸々20時間費やすなど、想像以上に手間取りました。

冬休みをまたいで2016年の1月にとうとうAndroidアプリが完成しました。

しかし、いざアプリをクラス(学級)で公開するも、クラス内でのAndroidシェアが低くあまり多くの人に使ってもらうことができませんでした。

### 急遽Webアプリに移植

iOSの人にも使ってもらえるアプリを作ろうにも、当時はMacを持っていなかったのでiOSアプリの開発などできず(仮にMacを持っていても内輪アプリのリリースは厳しい)、ブラウザ上で動くWebアプリに移植しようと決めました。

既に冬休みが終わっていたので、クラス替えまでもうあまり時間がありません。

Webアプリを作り終える前にクラスが解散してしまったら、クラスの自主制作映画をアプリにする意味が薄れてしまいます。

### 初サーバーサイド/初Node.js

とはいっても、サーバーサイドプログラミングが必要なWebアプリを作った経験など無かったので、急いでNode.jsに入門しました。Node.jsを選んだのは、一番書き慣れていたのがjavascriptだったからです。

当時のNode.jsのバージョンは0.4くらいで、初心者向けのドキュメントやサイトが今ほどありませんでした。

サーバーサイドの勝手も分からなくて詰まりかけましたが、クラス解散まで時間がなかったので、すぐに『Node.jsの教科書』を買って1か月間必死こいて、2月にWeb版を完成させたのでした。
