---
title: 天気情報プラグイン
date: 2019-06-23
---

# 天気情報プラグイン
こんにちは
[ゴリラ.vim](https://gorillavim.connpass.com/)を運営しているゴリラです。

Vimでコーディング中に天気を知りたくなるときがあるので、天気情報プラグインを作りました。

<a href="https://github.com/skanehira/weather.vim"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/skanehira/weather.vim.png"></a>

## 何ができるの？
地域の天気情報（今日、明日）を表示する。

![](https://github.com/skanehira/weather.vim/blob/master/screenshots/weather.gif?raw=true)

## 使い方
1. `:Weather` コマンドを実行して天気情報を知りたい地域名もしくは市名を入力する。
2. 対象地域が見つかればウィンドウに表示されるので`j` or `k` で選択して `Enter` で確定できる。キャンセルしたいときは `x` でウィンドウを閉じる。
3. 日にちを選択して確定すると天気情報が表示される。

## 仕組み
本プラグインは以前作った[乗換案内プラグイン](https://github.com/skanehira/train.vim)と同じ様にHTMLをパースして、分析しています。
HTTP通信とパースに関しては[vital.vim](https://github.com/vim-jp/vital.vim)の`Web.HTML`モジュールを使用しています。このモジュールは裏では`curl` or `wget` or `python` が動いています。

プラグインの処理を大きく分けて３ステップがあります。
1. 地域一覧を検索して地域名とURLを取得する
2. 選択した地域のURLから天気情報を実際表示している画面のDOMを取得する
3. 日付を選択した後に、選択肢に応じてDOMをパースして画面を表示する

では、それぞれソースをベースに説明します。

### 地域一覧を取得
まず`Weather` コマンドで呼ぶ関数を用意します。
`input()` 関数を用意するとコマンドラインで入力した値が`l:location` に代入されます。
`weather#get_city()` で地域一覧情報を取得します。

ポップアップウィンドウの選択インターフェイスは`filter` オプションに 標準提供されている`popup_filter_menu` を使うといい感じになります。

```vim
function! weather#weather() abort
    let l:location = input("地域名:")
    redraw!
    echo ""

    let l:url = "https://weather.yahoo.co.jp/weather/search/?p=" . l:location
    let l:city_list = weather#get_city(l:url)
    if len(l:city_list) ==# 0
        echo "地域が見つかりません"
        return
    endif

    let l:list = []
    for city in l:city_list
        call add(l:list, city.name)
    endfor

    call popup_clear()
    call popup_menu(l:list, {
                \ "filter": "popup_filter_menu",
                \ "callback" : function("weather#choise_city", [l:city_list]),
                \ "borderchars": ['-','|','-','|','+','+','+','+'],
                \ "title": "地域の選択",
                \ })
endfunction
```

続いて、地域情報一覧を取得します。
コメントに書いてあるとおりDOMを整形して、表示に使用する地域名とURLを返す関数を用意します。

```vim
" 地域毎名と天気情報URLを取得する
" [
"   {'name': '埼玉県さいたま市大宮区', 'url': 'https://weather.yahoo.co.jp/weather/11/4310/11103.html'},
"   {'name': '埼玉県さいたま市浦和区', 'url': 'https://weather.yahoo.co.jp/weather/11/4310/11107.html'},
"   ...
" ]
function! weather#get_city(url) abort
    " 例外が発生することがあるので、例外処理を行う
    try
        let l:response =  s:HTML.parseURL(a:url)
    catch "/.*/"
        echo v:exception
        return []
    endtry

    let l:record = []

    " DOM全体から`table` タグの要素を取得する
    for item in l:response.findAll("table")
        if has_key(item.attr, "class")
            " `yjw_table3` というクラスがあればテーブル内のデータを取得する
            if item.attr.class ==# "yjw_table3"
                for td in item.findAll("td")
                    if type(td) !=# type({}) && len(td.child) ==# 0
                        continue
                    endif
                    let child = td.child[0]
                    if type(child) !=# type({})
                        continue
                    endif
                    " テーブル内のデータを１行ずつdictionaryを作って配列に追加する
                    call add(l:record, {"name": child.value(), "url": "https:" . child.attr.href})
                endfor
            endif
        endif
        break
    endfor
    return l:record
endfunction
```

やっていることはシンプルですね。
`HTML` モジュールを使用するとDOMのオブジェクトを取得でき、`findAll()` で要素を取得できます。`value()` で要素内の文字データを取得できます。 `child` は小要素になります。

このような感じで割と力技ですが、スクレイピングはこんな感じかなぁと思ったりします。

### 日付を選択して天気情報のDOMから情報を取得する
続いて、取得してデータをポップアップウィンドウで表示させる処理が必要なので、次のように書きました。

```vim
function! weather#choise_city(city_list, id, idx) abort
    if a:idx ==# -1
        return
    endif

    let l:city = a:city_list[a:idx-1]

    call popup_menu(["今日","明日"],{
                \ "filter": "popup_filter_menu",
                \ "callback": function("s:choise_day", [l:city]),
                \ 'borderchars': ['-','|','-','|','+','+','+','+'],
                \ "title": "日付の選択"
                \ })

endfunction
```

`callback` で指定する関数はポップアップウィンドウが閉じられたときに実行される関数です。名前のとおりですね。

`s:choise_day` の処理は下になります。第1引数は`weather#choise_city` で渡した `[l:city]` になります。`id` はポップアップウィンドウのIDで、`idx` は選択したメニューの順番(1から)になります。

```vim
function! s:choise_day(city, id, idx) abort
    if a:idx ==# -1
        return
    endif 

    try
        let l:dom = s:HTML.parseURL(a:city.url)
    catch "/.*/"
        echo v:exception
        return
    endtry

    let l:data = s:get_weather(l:dom, a:idx)
    if empty(l:data)
        echo "データがありません" 
        return
    endif

    let l:title = l:data.title
    let l:rows = l:data.rows

    let l:table = s:T.new({
                \ "columns" : [{},{},{},{},{},{},{},{},{}],
                \ "header": l:rows[0], 
                \ })

    call l:table.rows(l:rows[1:])

    call popup_create(l:table.stringify(), {
                \ "title": l:title,
                \ "moved": "any",
                \ })
endfunction
```

### 日付を選択した後に、選択肢に応じてDOMをパースして画面を表示する
日にちを選択すると `s:shoise_day` が呼ばれ選択した地域の天気情報を `s:get_weather` でDOMを整形したデータを取得します。
こちらも同様にテーブルのデータを取得して整形して返しています。

```vim
" DOMから今日の天気情報を取得
" {
"     title: '今日の天気 - 6月22日(土)',
"     rows: [
"         [時刻,0時,3時,6時,9時,12時,15時,18時,21時],
"         [天気,曇り,曇り,雨,雨,曇り,晴れ,曇り曇り], 
"         [気温（C）,24,23,23,24,27,28,26,24],
"         [湿度（％）,77,80,83,78,58,53,66,72],
"         [降水量（mm）,0,0,6,0,3,0,0,0]
"     ]
" }
function! s:get_weather(dom, day_kind) abort
    let l:day = "yjw_pinpoint_today" 
    if a:day_kind ==# 2
        let l:day = "yjw_pinpoint_tomorrow" 
    endif

    for l:item in a:dom.findAll("div")
        if has_key(l:item.attr, "id")
            if l:item.attr.id ==# l:day
                " title
                let l:h3 = item.find("h3")
                if type(l:h3) !=# type({}) && len(l:h3.child) ==# 0
                    return {}
                endif
                let l:h3 = l:h3.child

                let l:title = trim(l:h3[0], "\n") . l:h3[1].value()

                " table data
                let l:table = item.findAll("tr")
                let l:rows = []
                for l:row in l:table
                    let l:columns = []
                    for l:column in l:row.findAll("td")
                        call add(l:columns, l:column.value()) 
                    endfor
                    call add(l:rows, l:columns)
                endfor

                return {"title": l:title, "rows": l:rows}
            endif
        endif
    endfor
endfunction
```

## 最後に
vital.vimはとっても便利です。テーブルのを作成する時もvital.vimを使用していますがこれもとっても便利です。
そしてポップアップウィンドウもとっても便利です。5/25に入ってからどんどん機能が完成していっていい感じになってきています。

興味ある方はぜひポップアップウィンドウも触ってみてください〜
