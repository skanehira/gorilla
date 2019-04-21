# Vimのインサートモードでできること

こんにちわ
ゴリラです。

久しぶりの投稿になりました。
今年に入って自分のOSSの活動やらイベント登壇やらで、
あまり記事を書く時間とっていなかったので久しぶりに書きました。

最近、vimのインサートモードでなにげに色々できることを知ったので、
それについて軽くまとめた記事になります。

知らないこと多かったので、自分は結構勉強になりました。
この記事で紹介した内容を大体知っている方は、多分すごいvimmerと思われます。

# [ペースト](https://vim-jp.org/vimdoc-ja/insert.html#i_CTRL-R)
ペーストする時はノーマルモードに戻ってからペーストすることが一般的（と思われる）ですが、
実はyankしたデータはレジスタに入っていて、
そのレジスタの内容をインサートモードでも挿入することができます。

<kbd>Ctrl</kbd> + <kbd>r</kbd>でレジスタ名が挿入するのを待ってくれます。
その状態で挿入したいレジスタ入力するだけでOKです。

![insert-paste.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/fcd22cb8-6811-ac14-6e20-6458172230e7.gif)

ちなみに、自動インデントの場合は、<kbd>Ctrl</kbd> + <kbd>r</kbd> && <kbd>Ctrl</kbd> + <kbd>o</kbd>のあとにレジスタを入力すると自動インデントされないので、困った場合はこちらのオペレーションにしましょう。

# [インデント調整](https://vim-jp.org/vimdoc-ja/insert.html#i_CTRL-T)
<kbd>Ctrl</kbd> + <kbd>t</kbd>でshiftwidth分インデントされます。
<kbd>Ctrl</kbd> + <kbd>d</kbd>でshiftwidth分インデント削除されます。

![indent.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/2f58c1e1-5565-0857-eba3-8b5a4ecdd1b0.gif)

# [補完](https://vim-jp.org/vimdoc-ja/insert.html#ins-completion)
vimは標準でいろんな補完が用意されています。

## ファイル補完
<kbd>Ctrl</kbd> + <kbd>x</kbd> <kbd>Ctrl</kbd> + <kbd>f</kbd>でファイル一覧を選べます。
![file-completion.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/39f5ade7-8e87-af57-ef13-9590574cd828.gif)

## オムニ補完
<kbd>Ctrl</kbd> + <kbd>x</kbd> <kbd>Ctrl</kbd> + <kbd>o</kbd>でオムニ補完します。
![omuni-completion.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/d1e59ae6-71bb-1c7e-a5d7-b6e72928aaa0.gif)

## 単語補完
<kbd>Ctrl</kbd> + <kbd>x</kbd> <kbd>Ctrl</kbd> + <kbd>n</kbd>で現在開いているファイルにある単語一覧を選べます。
![line-completion.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/1ee127fb-a311-00eb-a6d2-316510cc3796.gif)

# 文字挿入・削除
## 一文字削除
<kbd>Ctrl</kbd> + <kbd>h</kbd>で一文字削除します（backspace同様)
![remove-char.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/1e7582d6-5e0b-355d-c614-be3c5bbdd988.gif)

## 一単語削除
<kbd>Ctrl</kbd> + <kbd>w</kbd>で一単語を削除します。
![remove-word.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/16cb4bb6-7a51-9e19-2a5c-27d09ce586a7.gif)

## カーソルより前をすべて削除
<kbd>Ctrl</kbd> + <kbd>u</kbd>で現在のカーソルより前に入力した文字をすべて削除します。
![remove-all.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/f79625d9-a47d-93b3-110f-495997e96776.gif)

## カーソルの一段上の文字をそのまま挿入
<kbd>Ctrl</kbd> + <kbd>y</kbd>で現在のカーソルの一段上の文字をそのまま挿入します。
![insert-up.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/80bc5c0f-c302-d154-e367-ebc317de1888.gif)

## 一度コマンド実行して、インサートモードに戻る
<kbd>Ctrl</kbd> + <kbd>o</kbd>でコマンド（`yy`やら`dd`やら`:xxx`やら）を実行できて、完了後インサートモードに戻る。
![one-command.gif](https://qiita-image-store.s3.amazonaws.com/0/66178/c68379dd-5bc8-eaf4-8fd0-7b4db0c281f2.gif)

# まとめ
全部日本語ドキュメントに書いてあることですが、
gif付きでわかりやすい備忘録として残しておきました。

https://vim-jp.org/vimdoc-ja/insert.html
