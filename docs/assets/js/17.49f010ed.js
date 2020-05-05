(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{334:function(s,t,a){"use strict";a.r(t);var n=a(32),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"vimのセッション管理プラグイン"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vimのセッション管理プラグイン"}},[s._v("#")]),s._v(" Vimのセッション管理プラグイン")]),s._v(" "),a("p",[s._v("こんにちは。\n"),a("a",{attrs:{href:"https://gorillavim.connpass.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("ゴリラ.vim"),a("OutboundLink")],1),s._v("を運営しているゴリラです。")]),s._v(" "),a("p",[s._v("Vimを始めたての頃に"),a("a",{attrs:{href:"https://gorilla.netlify.com/articles/20181215-vim-session.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("こちらの記事"),a("OutboundLink")],1),s._v("で"),a("a",{attrs:{href:"https://github.com/skanehira/vsession",target:"_blank",rel:"noopener noreferrer"}},[s._v("セッション管理プラグイン"),a("OutboundLink")],1),s._v("を作りましたが、最近Vimにポップアップウィンドウが入ったのでその機能を使ってアップデートしてみました。")]),s._v(" "),a("h2",{attrs:{id:"セッションとは"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#セッションとは"}},[s._v("#")]),s._v(" セッションとは")]),s._v(" "),a("p",[s._v("Vimの日本語マニュアルより引用")]),s._v(" "),a("blockquote",[a("p",[s._v("セッションとは、全てのウィンドウのビューとグローバルな設定のことである。セッ\nションを保存しておいて、あとからそれを復元することで、各ウィンドウのレイアウト\nを元に戻すことができる。")])]),s._v(" "),a("p",[s._v("つまりセッションを保存すれば開いているファイル、ウィンドウのサイズ、vimrcの設定などがそのまま復元"),a("a",{attrs:{href:"%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%81%AF%E7%8A%B6%E6%85%8B%E3%82%92%E4%BF%9D%E5%AD%98%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84"}},[s._v("^1")]),s._v("できます。かなり強力な機能です。")]),s._v(" "),a("h2",{attrs:{id:"セッションの基本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#セッションの基本"}},[s._v("#")]),s._v(" セッションの基本")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("セッションの保存"),a("br"),s._v(" "),a("code",[s._v(":mksession {filename}")])])]),s._v(" "),a("li",[a("p",[s._v("セッションの復元"),a("br"),s._v(" "),a("code",[s._v(":s {filename}")]),s._v(" or "),a("code",[s._v("vim -S {filename}")])])])]),s._v(" "),a("p",[s._v("これだけです、とても簡単です。")]),s._v(" "),a("h2",{attrs:{id:"セッション管理プラグイン"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#セッション管理プラグイン"}},[s._v("#")]),s._v(" セッション管理プラグイン")]),s._v(" "),a("p",[s._v("vsessionの使い方はREADMEを読んで頂ければと思います。\n今回は保存したセッションを読み込むときにポップアップウィンドウで選べるようにしました。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://github.com/skanehira/vsession/blob/master/screenshots/vsession.gif?raw=true",alt:""}})]),s._v(" "),a("p",[s._v("仕組みとしては簡単で、vsessionはデフォルト"),a("code",[s._v("~/.vim/sessions")]),s._v("配下にセッションファイルを保存する様になっています。\nディレクトリ配下のファイル一覧を"),a("code",[s._v("readdir")]),s._v(" 組み込み関数で取得してそれをポップアップウィンドウに渡します。")]),s._v(" "),a("div",{staticClass:"language-vim line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-vim"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('" [')]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'blog'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'docker.vim'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("l")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("sessions "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("readdir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("g"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("session_path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("ポップアップウィンドウを作成に関しては簡易ではあるが"),a("a",{attrs:{href:"https://gorilla.netlify.com/articles/20190605-vim-popup-window.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("こちらの記事"),a("OutboundLink")],1),s._v("を書いたので軽く読んでおくと理解しやすいかもしれないです。\n"),a("code",[s._v("filter")]),s._v("オプションに"),a("code",[s._v("popup_filter_menu")]),s._v("コールバックを指定するとメニュー選択画面を作成できます。では選択したアイテムをどう特定するかというと"),a("code",[s._v("callback")]),s._v("オプションを使います。\nこちらはウィンドウが閉じられたときに呼ばれるコールバックを指定します。"),a("code",[s._v("popup_filter_menu")]),s._v("を使用した場合、コールバック関数の第2引数に選択したメニューのインデックス(1番目か2番目か...)が渡ってくるのでそれを利用します。")]),s._v(" "),a("div",{staticClass:"language-vim line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-vim"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"banana"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"apple"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"gorilla"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('" popup_filter_menuではxで画面を閉じ、idxが-1で渡ってくるので')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('" -1の場合は何もしない')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" idx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" abort\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("idx "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=#")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("endif")]),s._v("\n    echo s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("idx"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("endfunction")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('" popup_filter_menuを使用する場合')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('" enter でウィンドウを閉じ選択したメニューのインデックスとウィンドウIDをcallbackで指定した関数にわたす')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("call")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("popup_create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            \\ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"filter"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"popup_filter_menu"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            \\ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"callback"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s:cb"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            \\ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'borderchars'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'-'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'|'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'-'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'|'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'+'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            \\ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])]),a("p",[s._v("基本なロジックは上記通りで、選択したファイルを取得し"),a("code",[s._v("source")]),s._v("で読み込むことでセッションを復元しています。")]),s._v(" "),a("h2",{attrs:{id:"最後に"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最後に"}},[s._v("#")]),s._v(" 最後に")]),s._v(" "),a("p",[s._v("セッションは便利ですね。ぜひプラグイン使ってみてください。\nポップアップウィンドウを駆使すれば"),a("code",[s._v("filter")]),s._v("と"),a("code",[s._v("callback")]),s._v("でカレントディレクトリのファイルをポップアップウィンドウで表示し選択して開くこともできます。\n興味ある方はぜひチャレンジしてみてください。")])])}),[],!1,null,null,null);t.default=e.exports}}]);