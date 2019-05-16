---
title: 翻訳プラグイン作りました
date: 2019-05-12
---

# Vimの翻訳プラグイン作りました

こんにちわ。
[ゴリラ.vim](https://gorillavim.connpass.com/)を運営しているゴリラです。

みなさんはプラグイン使っていますか？
ぼくはプラグイン使っていますが、全然作ったことがないので初めて実用的なものを作りました。

普段OSSのソースを読んだり、作ったOSSのREADMEを英語で書いたりするのですが、
英語力がないため都度ブラウザを開いてGoogle翻訳を使ってはVimに戻る日々でした。

画面の切り替えは時間ロスなのでVim上で翻訳できるプラグインを作りました。

このプラグインがあればVimは翻訳エディタへと生まれ変わります。
どうぞお試して下さい。

<a href="https://github.com/skanehira/translate.vim"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/skanehira/translate.vim.png" width="460px"></a>

## 機能
状況に応じて、次のことができます。

1. 動的に翻訳する
2. 選択した範囲を翻訳する
3. 現在行翻訳する

どれも多分よく使うと思います。
設定項目は次になります。

```vim
" 翻訳元言語
let g:translate_source = "en"
" 翻訳先言語
let g:translate_target = "ja"
" 翻訳結果ウィンドウのサイズ
let g:translate_winsize = 10
```

### 動的に翻訳する
![](https://i.imgur.com/ezLCrSG.gif)

`:AutoTranslateModeToggle`で動的に翻訳するモードに切り替えます。
再度実行するとモードがOFFにになります。
自動翻訳モードになると、バッファ上の文字が全て翻訳されます。

翻訳の契機は`<CR>`になっていて、改行するとその行を翻訳します。

`:AutoTranslateModeToggle!`では、翻訳元と翻訳先の言語が入れ替わった状態でモードを切り替ります。

ぼくは自動翻訳READMEを書く時に日本語が変になっていないかを確認するときに使います。
控えめに言って、便利です。

### 選択した範囲を翻訳する
![](https://i.imgur.com/maB2QXI.gif)

ビジュアルモードで選択した状態で`:Translate`で翻訳できます。
こちらはソースのコメントを読む時などに便利です。

ちなみに、`:Translate!`で翻訳元と翻訳先の言語がに入れ替わります。
控えめに言って、便利です。

## 仕組み

### 翻訳API
一番大事な翻訳処理ですが、
GAS[^1]の[LanguageApp](https://developers.google.com/apps-script/reference/language/language-app)クラスを使用しています。

GASではプロジェクトをウェブアプリとして公開することができます。
HTTPリクエストは`doPost(e)`、`doGet(e)`を用意することで受け取りことが可能です。

HTTPリクエストJSONを取得し、それをもとにLanguageAppクラスで翻訳してその結果を返却します。
こうすることで簡易の翻訳APIを作ることができます。

ちなみに、次が翻訳APIの処理になります。

```js
function doPost(e) {
  var p = JSON.parse(e.postData.getDataAsString());
  if (p.text == "") {
    return ContentService.createTextOutput("text is empty");
  }
  if (p.source == "") {
    return ContentService.createTextOutput("source is empty");
  }
  if (p.target == "") {
    return ContentService.createTextOutput("target is empty");
  }
  
  var translatedText = LanguageApp.translate(p.text, p.source, p.target);
  return ContentService.createTextOutput(translatedText);
}
```

ちなみに、プラグインが使用しているAPIのEndpointは次になります。
```bash
https://script.google.com/macros/s/AKfycbywwDmlmQrNPYoxL90NCZYjoEzuzRcnRuUmFCPzEqG7VdWBAhU/exec
```

次のようにcurlコマンドでJSONをPOSTすれば翻訳結果が返ってきます。
[gjo](https://github.com/skanehira/gjo)はゴリラ製OSSの一つで`key=value`形式で引数を渡すことで簡単にJSON文字列を生成できます。

```bash
$ curl -L https://script.google.com/macros/s/AKfycbywwDmlmQrNPYoxL90NCZYjoEzuzRcnRuUmFCPzEqG7VdWBAhU/exec -d $(gjo text="my name is gorilla" source=en target=ja)
私の名前はゴリラです⏎
```

[^1]: Google Apps Script

### 翻訳CLI
翻訳APIがあればそれに本文と翻訳する言語のオプションを渡すだけです。
もともとVim scriptのみでHTTP通信を行い、翻訳するつもりでしましたが、
Goの勉強もしたいためCLIを作りそれをVimで呼び出す仕組みにしました。

CLIに関してはGoの標準パッケージ`net/http`を使用して、
引数で渡したオプションと本文をJSONに変換し翻訳APIをコールしています。

```go
type post struct {
	Text   string `json:"text"`
	Source string `json:"source"`
	Target string `json:"target"`
}

// translate language
func translate(text, source, target string) (string, error) {
	postData, err := json.Marshal(post{text, source, target})
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest(http.MethodPost, *endpoint, bytes.NewBuffer([]byte(postData)))

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
```

### Vimプラグイン
Vimのプラグインは`autoload`と`plugin`ディレクトリがあります。
それぞれの違いは次になります。

|ディレクトリ|説明                                                    |
|------------|--------------------------------------------------------|
|autoload    |使用するときに初めて読み込まれるスクリプトファイルを置く|
|plugin      |Vim起動時に読み込まれるスクリプトファイルを置く         |

基本的に読み込みに時間がかかるスクリプトは`autoload`に置きますが、今回はとくに重たい処理をするわけではないので`plugin`ディレクトリのみで物足ります。

プラグインのメイン処理についてざっくり紹介していきます。

#### CLI実行コマンド生成
まずCLIの実行コマンドを生成します。
`ban`は`!`のことを指していて`!`のときは翻訳元・先の設定を逆転させています。

`let source_ = get(g:, "translate_source", "en")`ではグローバルスコープの設定値がなければ、デフォルト値をを取得するようにしています。
`target`の処理も同様になります。

```vim
" create gtran command with text and bang
function! s:create_cmd(text, bang) abort
    if a:text == ""
        return
    endif

    let source_ = get(g:, "translate_source", "en")
    let target = get(g:, "translate_target", "ja")

    let cmd = ["gtran", "-text=".a:text, "-source=".source_, "-target=".target]
    if a:bang == '!'
        let cmd = ["gtran", "-text=".a:text, "-source=".target, "-target=".source_]
    endif
    return cmd
endfunction
```

#### コマンド実行
`job_start`で外部コマンドを非同期で実行します。
Vimでは外部コマンドを実行する方法として、`system()`と`systemlist()`がありますが、
これらは実行が完了するまでVimを操作できないので、翻訳を待ちながらその間に作業をしたいため`job_start()`にしました。

`job_start`ではオプションを指定することができます。

`callback`で指定したcallback関数ではコマンド実行結果の出力を取得します。
callback関数では出力の行数分呼ばれるので、`s:result`変数に結果を格納していきます。

`exit_cb`で指定したcallback関数ではコマンド実行完了後に呼び出されるので、
`s:result`に格納した結果出力をバッファに出力する処理を実装しています。

```vim
" translate
function! translate#translate(bang, line1, line2, ...) abort
    let ln = "\n"
    if &ff == "dos"
        let ln = "\r\n"
    endif

    let s:result = []
    let start = a:line1
    let end = a:line2

    if s:current_mode == s:real_time_mode
        let start = 1
        let end = getpos("$")[1]
        let cmd = s:create_cmd(s:getline(start, end, ln, a:000), s:bang)
    else
        let cmd = s:create_cmd(s:getline(start, end, ln, a:000), a:bang)
    endif

    echo "Translating..."
    let job = job_start(cmd, {
                \"callback": function("s:tran_out_cb"),
                \"exit_cb": function("s:tran_exit_cb"),
                \})
endfunction

" get command result
function! s:tran_out_cb(ch, msg) abort
    call add(s:result, a:msg)
endfunction

" set command result to translate window buffer
function! s:tran_exit_cb(job, status) abort
    call s:create_tran_window()
    call setline(1, s:result)
    call s:focus_window(bufnr(s:currentw))
    echo ""
endfunction
```

ざっくりですがプラグインが動く仕組みについて紹介しました。
もっと知りたい方はぜひソースを読んでみてください。
大したことしていないので読みやすいと思います。

### 既知の問題点
[lexima.vim](https://github.com/cohama/lexima.vim)では`<CR>`のマッピングがあるので、
leximaが入っていると自動翻訳が動かなくなります。

この問題を修正する予定です。

### 今後について
現在プラグインはVimのみ対応しているのでNeoVimでも動くようにしたいと考えています。
また、NeoVimで実装されたフロートウィンドウを使用して翻訳結果をポップアップウィンドウとして表示させ方がより便利かなと思っています。

## 最後に
Vimを始めたてのころにセッション管理のプラグインを作ったことがありましたが、正直よくわかりませんでした。
はじめてちゃんとプラグインを作って、まだまだ知らないことがたくさんあるなぁと実感しました。

ただ、Vim scriptはbashと似ていて個人的にそんなにとっつきにくい印象はなく楽しかったです。

このきっかけに今後もプラグインをコツコツ作っていこうと思えました。

次のプラグインは`電車乗り換え乗案内.vim`を作ります。
乞うご期待！
