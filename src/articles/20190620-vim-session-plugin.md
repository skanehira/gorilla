---
title: Vimのセッション管理プラグイン
date: 2019-06-20
---

# Vimのセッション管理プラグイン
こんにちは。
[ゴリラ.vim](https://gorillavim.connpass.com/)を運営しているゴリラです。

Vimを始めたての頃に[こちらの記事](https://gorilla.netlify.com/articles/20181215-vim-session.html)で[セッション管理プラグイン](https://github.com/skanehira/vsession)を作りましたが、最近Vimにポップアップウィンドウが入ったのでその機能を使ってアップデートしてみました。

## セッションとは
Vimの日本語マニュアルより引用
>セッションとは、全てのウィンドウのビューとグローバルな設定のことである。セッ
>ションを保存しておいて、あとからそれを復元することで、各ウィンドウのレイアウト
>を元に戻すことができる。

つまりセッションを保存すれば開いているファイル、ウィンドウのサイズ、vimrcの設定などがそのまま復元[^1]できます。かなり強力な機能です。

[^1]: ターミナルは状態を保存できない

## セッションの基本
- セッションの保存  
`:mksession {filename}`

- セッションの復元  
`:s {filename}` or `vim -S {filename}`

これだけです、とても簡単です。

## セッション管理プラグイン
vsessionの使い方はREADMEを読んで頂ければと思います。
今回は保存したセッションを読み込むときにポップアップウィンドウで選べるようにしました。

![](https://github.com/skanehira/vsession/blob/master/screenshots/vsession.gif?raw=true)

仕組みとしては簡単で、vsessionはデフォルト`~/.vim/sessions`配下にセッションファイルを保存する様になっています。
ディレクトリ配下のファイル一覧を`readdir` 組み込み関数で取得してそれをポップアップウィンドウに渡します。

```vim
" ['blog', 'docker.vim']
let l:sessions = readdir(g:session_path)
```

ポップアップウィンドウを作成に関しては簡易ではあるが[こちらの記事](https://gorilla.netlify.com/articles/20190605-vim-popup-window.html)を書いたので軽く読んでおくと理解しやすいかもしれないです。
`filter`オプションに`popup_filter_menu`コールバックを指定するとメニュー選択画面を作成できます。では選択したアイテムをどう特定するかというと`callback`オプションを使います。
こちらはウィンドウが閉じられたときに呼ばれるコールバックを指定します。`popup_filter_menu`を使用した場合、コールバック関数の第2引数に選択したメニューのインデックス(1番目か2番目か...)が渡ってくるのでそれを利用します。

```vim
let s:result = ["banana", "apple", "gorilla"]

" popup_filter_menuではxで画面を閉じ、idxが-1で渡ってくるので
" -1の場合は何もしない
function! s:cb(id, idx) abort
    if a:idx !=# -1
        return
    endif
    echo s:result[a:idx-1]
endfunction

" popup_filter_menuを使用する場合
" enter でウィンドウを閉じ選択したメニューのインデックスとウィンドウIDをcallbackで指定した関数にわたす
call popup_create(s:result, {
            \ "filter": "popup_filter_menu",
            \ "callback": function("s:cb"),
            \ 'borderchars': ['-','|','-','|','+','+','+','+'],
            \ })
```

基本なロジックは上記通りで、選択したファイルを取得し`source`で読み込むことでセッションを復元しています。

## 最後に
セッションは便利ですね。ぜひプラグイン使ってみてください。
ポップアップウィンドウを駆使すれば`filter`と`callback`でカレントディレクトリのファイルをポップアップウィンドウで表示し選択して開くこともできます。
興味ある方はぜひチャレンジしてみてください。
