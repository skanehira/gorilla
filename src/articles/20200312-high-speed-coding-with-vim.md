# Vimで高速コーディングする方法
こんにちわ、ゴリラです。

Vimといえば高速でコーディングできるという印象を持っている方が多いのではないでしょうか？
今日は、Postfix Code Completion という手法をつかって早くコーディングする方法紹介します。

この方法を使えば次のgifのように、さくっとJSONを返すHTTPサーバーを立てられます。

![sonictemplate-vim-sample.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/69080d5a-bef8-c0d3-c1cc-99efb061bbe5.gif)

## Postfix Code Completionとは
後置補完という補完手法です。
例えば、`(a == b)`に対して`if`を使いたい場合は`(a == b).if`と入力して展開すると`if (a == b) {  }`というふうに補完してくれます。

後ろのコード`if`が前のコード`(a == b)`に作用するという考え方です。
これを積極的に使用していくとより高速にコーディングできるようになります。

僕の場合は、割と後置補完だけではなくスニペットのように使っています。

## VimでPostfix Code Completionを使う方法
Vimでは[sonictemplate.vim](https://github.com/mattn/sonictemplate-vim)というプラグインがサポートしています。
デフォルトではPostfixのパターンファイルが用意されています。`<C-y><C-b>`でパターンを展開できます。
もちろん自分でパターンファイルを用意することもできます。

まず、自前のテンプレートディレクトリを設定します。僕の場合は`~/.vim/sonictemplate` しています。

```vim
let g:sonictemplate_vim_template_dir = expand('~/.vim/sonictemplate')
```

次に、言語のディレクトリを作成します。ディレクトリ名はファイルタイプ名と同じにする必要があります。
`js`なら`javascript`というディレクトリを作成します。本記事ではGo言語のテンプレートを作っていきます。

```sh
$ mkdir ~/.vim/sonictemplate/go
```

次に、Postfixのパターンファイルを作ります。こちらもファイル名はファイルタイプと同じです。

```sh
$ vim ~/.vim/sonictemplate/go/go.stpl
```

この`go.stpl`にパターンを追記していきます。

## パターンの記述方法
次のように、1行目にパターンを2行目以降に展開後のコードを記述します。2行目以降はタブが必要です。

```stpl
\(\S\+\)\.var$
	var {{$1}} = {{_cursor_}}
```

複数のパターンは空白行で区切られています。

```stpl
\(\S\+\)\.var$
	var {{$1}} = {{_cursor_}}

\(\S\+\)\.iferr$
	if {{$1}} != nil {
		return {{$1}}
	}
	{{_cursor_}}
```

パターンは正規表現を使用する事ができます。そして展開したコードでは`{{}}`で囲ったプラグイン独自の構文を使用できます。
上記の例では`{{$1}}`は後方参照（`\(\S\+\)`の部分）しています。`{{_cursor_}}`は展開後カーソルの位置を指定しています。
`{{}}`を使った構文は他にもあります。ヘルプを参照してください。

## パターンの例
ぼくが使っているパターンをいくつか紹介します。

### dbを開く
- パターン

```stpl
db.open\.\(".*"\)\.\(".*"\)$
	db, err := sql.Open({{$1}}, {{$2}})
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	{{_cursor_}}
```

- コード

```go
// 展開前
db.open."sqlite3"."test.db"

// 展開後
db, err := sql.Open("sqlite3", "test.db")
if err != nil {
	log.Fatal(err)
}
defer db.Close()
```

### クエリを発行
- パターン

```stpl
db\.query\.\(.*\)$
	rows, err := db.Query({{$1}})
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	{{_cursor_}}
```

- コード

```go
// 展開前
db.query."select * from todos"

// 展開後
rows, err := db.Query("select * from todos")
if err != nil {
	log.Fatal(err)
}
defer rows.Close()
```

### JSONのエンコード
```stpl
json\.encode\.\(\S\+\)\.\(\S\+\)$
	if err := json.NewEncoder({{$1}}).Encode({{$2}}); err != nil {
		{{_cursor_}}
	}
```

```go
// 展開前
json.encode.writer.&gorilla

// 展開後
if err := json.NewEncoder(writer).Encode(&gorilla); err != nil {
	
}
```

### JSONのデコード
- パターン

```stpl
json\.decode\.\(\S\+\)\.\(\S\+\)$
	if err := json.NewDecoder({{$1}}).Decode({{$2}}); err != nil {
		{{_cursor_}}
	}
```

- コード

```go
// 展開前
json.decode.reader.&gorilla

// 展開後
if err := json.NewDecoder(reader).Decode(&gorilla); err != nil {
	
}
```

### append
- パターン

```stpl
\(\S\+\)\.append\.\(\S\+\)$
	{{$1}} = append({{$1}}, {{$2}})
	{{_cursor_}}
```

- コード

```go
// 展開前
gorillas.append.gorilla

// 展開後
gorillas = append(gorillas, gorilla)
```

### HTTPサーバー

- パターン

```stpl
http\.server\.\(\S\+\)$
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		{{_cursor_}}
	})
	log.Println("start http server :{{$1}}")
	log.Fatal(http.ListenAndServe(":{{$1}}", nil))
```

- コード

```go
// 展開前
http.server.8080

// 展開後
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	
})
log.Println("start http server :8080")
log.Fatal(http.ListenAndServe(":8080", nil))
```

#### main
- パターン

```stpl
^main$
	package main
	
	func main() {
		{{_cursor_}}
	}
```

- コード

```go
// 展開前
main

// 展開後
package main

func main() {
	
}
```

## 最後に
いかがですか？
この記事を見て少しでも早くコーディングできるようになったら嬉しいです。

では良いコーディングライフを〜

