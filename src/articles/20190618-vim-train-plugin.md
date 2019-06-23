---
title: Vimで電車乗り換えルート検索
date: 2019-06-18
---

# Vimで電車乗り換えルート検索

こんにちは
[ゴリラ.vim](https://gorillavim.connpass.com/)を運営しているゴリラです。

Vimでコーディング中に帰りの電車時間を知りたくなる時があるので、プラグイン作りました。
このプラグインを入れればブラウザを開くことなく乗り換えルートを検索できます。便利です。

<a href="https://github.com/skanehira/train.vim"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/skanehira/train.vim.png"></a>
## 何ができる？
Yahoo乗り換え案内
![](https://i.imgur.com/RToqGvd.gif)

電車遅延情報
![](https://i.imgur.com/6VzcgDM.gif)

## 導入
https://github.com/skanehira/train.vim
READMEを参照して下さい。

## 使い方
- 乗り換え
`:TrainSearchRoute 出発駅 到着駅`

- 電車遅延情報
`:TrainLateInfo`

## 仕組み
[vital.vim](https://github.com/vim-jp/vital.vim)というvimのライブラリの`Web.HTML`を使用してYahoo乗り換え案内のHTMLのパースをしています。

```vim
let l:url = 'https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=' .. l:from .. '&tlatlon=&togid=&to=' .. l:to .. '&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&kw=' .. l:to
let l:response = s:HTML.parseURL(l:url)

" 以降パース処理
for ul in l:response.findAll('ul')
    for li in ul.findAll('li')
        let dl = li.find('dl')
        if !empty(dl)
            let dd = dl.find('dd')
            if !empty(dd)
                let ul = dd.find('ul')
...
```

電車遅延情報はAPIがあるので、`Web.HTTP`を使用してJSONを取得し、vim組み込み関数の`json_decode()`でJSONをオブジェクトに変換してテーブルデータを作成しています。

```vim
let l:response = s:HTTP.get("https://rti-giken.jp/fhc/api/train_tetsudo/delay.json")

if l:response.status != 200
    echohl ErrorMsg
    echo 'status:' .. l:response.status 'response:' .. l:response.content
    echohl None
    return
endif

let l:table = s:TABLE.new({
            \ 'columns': [{}, {}, {}],
            \ 'header': ['路線名', '鉄道', '更新時間']
            \ })

let l:content = json_decode(l:response.content)
...
```

vim scriptだけでHTTP通信を行うことはできないので、Webパッケージでは`curl` or `wget` or `python` に依存しています。
大抵の環境はcurl使えると思うので、問題ないかと思います。

vital.vimはプラグインを作っていく上でかなり便利なライブラリです。自分も今回始めて使ってみました、割とすんなり使えました。
プラグインを作っていて使ったことが無い方はぜひ一度使ってみてください。便利すぎてやばいです。

## 最後に
Vimは良いぞ！

