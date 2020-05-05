(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{333:function(t,a,e){"use strict";e.r(a);var s=e(32),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vimにポップアップウィンドウが入りました"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vimにポップアップウィンドウが入りました"}},[t._v("#")]),t._v(" Vimにポップアップウィンドウが入りました")]),t._v(" "),e("p",[t._v("こんにちわ。\n"),e("a",{attrs:{href:"https://gorillavim.connpass.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ゴリラ.vim"),e("OutboundLink")],1),t._v("を運営している"),e("a",{attrs:{href:"https://twitter.com/gorilla0513",target:"_blank",rel:"noopener noreferrer"}},[t._v("ゴリラ"),e("OutboundLink")],1),t._v("です。")]),t._v(" "),e("p",[t._v("Vim 8.1.1391でポップアップウィンドウという機能が入りました。\nこれは名前の通り、ポップアップウィンドウを出すという機能です。")]),t._v(" "),e("p",[t._v("現在も実装が進められていてまだ完成ではないのですが、良い感じになってきたので紹介していこうと思います。")]),t._v(" "),e("h1",{attrs:{id:"どんな感じか？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#どんな感じか？"}},[t._v("#")]),t._v(" どんな感じか？")]),t._v(" "),e("p",[t._v("こんな感じでポップアップウィンドウを出せます。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/66178/e1f307ce-d56a-1fa5-fbc7-11768c32e22e.gif",alt:"popup.gif"}})]),t._v(" "),e("p",[t._v("こちらはゴリラ製翻訳プラグインです。\n"),e("a",{attrs:{href:"https://github.com/skanehira/translate.vim"}},[e("img",{attrs:{src:"https://github-link-card.s3.ap-northeast-1.amazonaws.com/skanehira/translate.vim.png",width:"460px"}})])]),t._v(" "),e("p",[t._v("翻訳結果をポップアップウィンドウに表示し、カーソルを動かしたら自動で閉じる様になっています。\nわざわざバッファを作成して表示しなくて済むのはめちゃくちゃ便利です。")]),t._v(" "),e("h1",{attrs:{id:"ポップアップウィンドウの作り方"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ポップアップウィンドウの作り方"}},[t._v("#")]),t._v(" ポップアップウィンドウの作り方")]),t._v(" "),e("p",[t._v("とっても簡単です。\nこれだけで作れます。")]),t._v(" "),e("div",{staticClass:"language-vim line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-vim"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" winid "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("popup_create")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello gorilla"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("第一引数は文字列、文字列の配列を渡します。\n第二引数はポップアップウィンドウのオプションになります。")]),t._v(" "),e("p",[t._v("ポップアップウィンドウを閉じるには"),e("code",[t._v("popup_clear()")]),t._v("か"),e("code",[t._v("popup_close(winid)")]),t._v("で閉じれます。")]),t._v(" "),e("h2",{attrs:{id:"オプション"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#オプション"}},[t._v("#")]),t._v(" オプション")]),t._v(" "),e("p",[t._v("詳しくはヘルプを引いて頂いたほうがわかりやすいので、ここでは軽く紹介します。")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("オプション")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("設定値")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("説明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("line")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('1, "corsor+1"')]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('ポップアップの位置（横）,"corsor+1"だと現在のカーソルから1セル下になります')])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("col")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('1,"cursor+1"')]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('ポップアップの位置（縦）、"cursor+1"だと現在のカーソルから1セル横になります')])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("border")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("[1,1,1,1]")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("ポップアップをボーダーで囲う、数値はボーダーの太さになります")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("moved")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('"any","word"')]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("カーソルを動かしたときに自動で閉じるときに使用します")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("filter")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("function('filter_func')")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("ポップアップウィンドウが表示されている間にキーを取得するためのコールバック、特定キーが押されたら閉じるといった処理をしたいときに指定します")])])])]),t._v(" "),e("h1",{attrs:{id:"最後に"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#最後に"}},[t._v("#")]),t._v(" 最後に")]),t._v(" "),e("p",[t._v("ポップアップウィンドウは現在も絶賛実装中でまだまだ良くなっていきます。\n今後が楽しみですね。")]),t._v(" "),e("p",[t._v("ちなみに"),e("a",{attrs:{href:"https://github.com/thinca/vim-quickrun",target:"_blank",rel:"noopener noreferrer"}},[t._v("vim-quickrun"),e("OutboundLink")],1),t._v("もポップアップウィンドウ対応していたので興味ある方はアップデートして試してみてください。")])])}),[],!1,null,null,null);a.default=r.exports}}]);