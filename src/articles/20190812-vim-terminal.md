---
title: Vimのターミナルの真の力お見せしますよ
date: 2019-08-12
---

# Vimのターミナルの真の力お見せしますよ

## はじめに
みなさん、こんにちわ

個人ブログにVimの記事しかない[ゴリラ](https://twitter.com/gorilla0513)です。
そして今回、またしてもVimです。

Vimの高度な編集を行うことができる上、ターミナルを操作することもできてしまいます。
エディタでありながら端末でもある、夢の様なエディタです。

そんなVimのターミナル機能について触れている記事をあまり見かけたことがないので、
今回はVimのターミナルの便利な使い方についていくつか紹介していきます。

## 端末の起動
`:term`でターミナルを起動できます。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/891c526f-47f4-1f82-dba1-eb56a5d7bffe.png)

デフォルトでは画面上部にターミナルウィンドウを表示します。
分割方向を変えたい場合は次のようにします。

| コマンド   | 説明                                     |
|------------|------------------------------------------|
| :vert term | 垂直分割して開く                         |
| :bo term   | 水平分割して画面最下部にウィンドウを開く |
| :top term  | 水平分割して画面最上部にウィンドウを開く |

他にもいくつかコマンドがありますので、`:h vert`でヘルプを引いてそのあたりを参照してください。

## ターミナルでの操作
ターミナルでは入力したキーはそのまま端末に送られます。
ウィンドウのフォーカスの移動などに関しては特別な操作が必要です。
最低限の操作は次になります。`CTRL-W`がプレフィックスキーになっています。

| キーマップ     | 説明                               |
|----------------|------------------------------------|
| CTRL-W w       | 次のウィンドウにフォーカスを当てる |
| CTRL-W N       | ターミナルノーマルモードに移行     |
| CTRL-W .       | 端末にCTRL-Wを送る                 |
| CTRL-W :       | コマンドラインモードに移行         |
| CTRL-W " {reg} | レジスタの中身を貼り付ける         |

## 端末の内容をヤンク
Vimのターミナルウィンドウで`CTRL-W N`を押下するとターミナルの出力を一時的に保留します。
この状態をターミナルノーマルモードと言います。このモードは普通のウィンドウと同様カーソル移動、ヤンク、検索を行うことができます。

ただ、`i`や`A`などのコマンドは挿入モードではなく、通常のターミナルモードに戻るようになっています。

![vim-terminal-yank.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/b91812b1-6d5e-dd2d-8109-226af23b59f2.gif)

ターミナルノーマルモードを使用することで、`less`や`tail`コマンドの出力、また作業ログを簡単にメモに残すことができます。

## 外部コマンドとの連携
Vimでは`:!echo gorilla`というように`:!`を使用することで外部コマンドを実行することができます。しかし、それだとコマンドの実行が完了するまでVimを操作できないです。とてもツライ。

そこでターミナルを使えば非同期で外部コマンドを実行することができます。
コマンドを実行している間にVimの操作がブロックされないのはとても大きいですね。
では、いくつか例を紹介します。

### git log
`:vert term ++close git log`でGitのログを確認することができます。
単にターミナル上で動いているので、いつも通り`q`で`git log`を終了できます。
この例だと`++close`というオプションをわたしていますが、これは外部コマンドが終了するとウィンドウを自動で閉じるオプションです。

![vim-terminal-git-log.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/fcfaaba5-53b8-9414-cca5-f8fea634481a.gif)

### git blame
`:term ++close git blame %`でファイルの変更履歴を確認することができます。
`%`は現在開いているファイル名になります。

![vim-terminal-git.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/22b3faab-16bc-e035-8d74-066cf13e0639.gif)

### インタラクティブにgitを操作
gitコマンドの実行方法を紹介しましたが、gitをインタラクティブに操作できる[lazygit](https://github.com/jesseduffield/lazygit)というTUIツールがあります。
こちらも同様に`:vert term ++close lazygit`で実行できます。
こちらのツールはとても便利なので、ぜひ試してみてください。

![vim-terminal-lazygit.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/a79a7356-ce1d-3d07-427f-44ce78526547.gif)

### REPLを使う
コーディング中に言語の細かい動きやちょっとしたサンプルコードの実行をしたいときがあります。
REPL[^1]を使用することで、インタラクティブにコードを実行する事ができます。
有名ところだと、`PHP -a`や`node`などがあります。

ぼくは普段Goを書いたりするので、[gore](https://github.com/motemen/gore)を使っています。
goreの場合、`:vert term ++close gore`で起動できます。

![vim-terminal-repl.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/f23a0021-2b72-16e1-313a-f1d963b1bde7.gif)

[^1]:Read-Eval-Print Loopの略、入力・評価・出力のループのこと。

### コンテナを管理
コンテナ技術がインフラを支える様になった昨今、開発も環境もコンテナを使用することが増えていきました。
コーディング中にコンテナを操作したいことがあります。

そこで、ぼくが作った[docui](https://github.com/skanehira/docui)というTUIツールを使用することでターミナル上でインタラクティブにコンテナやイメージなどを管理することができます。
lazygitと同様`:vert term ++close docui`でコンテナを操作しつつコーディングできます。

![vim-terminal-docui.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/6f0ce6d8-34d6-3a77-0fc0-a1ff56b5a5aa.gif)

ちなみに、コンテナを操作するだけなら[docker.vim](https://github.com/skanehira/docker.vim)というプラグインがあります。
こちらはターミナルを使わずにVimのインターフェイスのみで操作できるようになっています。
興味ある方はぜひ使ってみてください。

### スターウォーズ
コーディング中にスターウォーズを見たくなるときがあります。
そんなときは[go-starwars](https://github.com/skanehira/go-starwars)を導入して、`:term ++close go-starwars -s 20`を実行してコーディングしながら見ます。

![vim-terminal-starwars.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/14038dad-0b31-603b-9731-97f2b90d202e.gif)

### tmuxの代わりに使う
[tmux](https://github.com/tmux/tmux/wiki)を使うことで、画面を分割したり、ターミナルソフトを終了してもセッションを復帰することで状態を復元できます。
Vimはセッションと言う機能があり、ターミナルと組み合わせることでtmuxと近いことができます。

こちらについては先日に[Vimをtmuxの代わりに使う](https://gorilla.netlify.com/articles/20190803-vim-tmux.html)という記事を書いたので、そちらを参照してください。

## 補足
本記事で紹介した内容は[技術書典7](https://techbookfest.org/event/tbf07)で出す予定の「Vimが好きになる本」の一部です。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/3ddaf388-8cb9-6ad7-39e5-6ffc66c6da6b.png)

本書はVim初心者から中級者向けにVimの基本機能から便利なコマンドについて解説しています。
現在執筆中のため、一部の目次を紹介します。無料版も有料版もオンラインと会場で配布する予定です。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/9fb8ea31-c5b8-d348-73e8-b15dc5eb4a04.png)
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/c3542225-0302-ea2d-7197-532dd315e0e3.png)

## まとめ
Vimのターミナルは便利です。
そのままターミナルを使うのも良いですが、外部コマンドと連携するのもまた便利です。
つまりVim最高！
