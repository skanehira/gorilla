# Vimのセッション機能を使う
みなさん、vimに[セッション機能](https://vim-jp.org/vimdoc-ja/usr_21.html#21.4)があるのはご存知でしょうか？
便利そうなので使ってみようと思っていますが、せっかくなのでVim scriptの勉強も兼ねてコマンド作ってみました。

fzf.vimを使うとこんな感じになります。
![image.png](https://qiita-image-store.s3.amazonaws.com/0/66178/21a1dc7b-44cc-0e9c-c88d-03d74abf9cbc.png)

以下のコードをvimrcに貼ればそのまま使えるとおもいます。

## [2018-12-22] 追記
プラグイン化しました。
また、記事中のソース若干変更は入っています。
https://github.com/skanehira/vsession

## セッションファイル保存先
`~/.vim/sessions/`配下にセッションファイルを保存します。
ディレクトリがなければ作るようにしています。

```vim
" session path
let s:session_path = expand('~/.vim/sessions')

if !isdirectory(s:session_path)
    call mkdir(s:session_path, "p")
endif
```

## セッションの保存
`:SaveSession test1.vim`という感じで、セッションファイル名を指定して保存します。
同じファイル名を指定すると上書きされるのでご注意。

```vim
" save session
command! -nargs=1 SaveSession call s:saveSession(<f-args>)
function! s:saveSession(file)
    execute 'silent mksession!' s:session_path . '/' . a:file
endfunction
```

## セッションの復元
`:LoadSession ~/.vim/sessions/test1.vim`という感じで、セッションファイルのパスを指定して読み込みます。

```vim
" load session
command! -nargs=1 LoadSession call s:loadSession(<f-args>)
function! s:loadSession(file)
    execute 'silent source' a:file
endfunction
```

fzf.vim版はこちらです。

```vim
command! FloadSession call fzf#run({
\  'source': split(glob(s:session_path . "/*"), "\n"),
\  'sink':    function('s:loadSession'),
\  'options': '-m -x +s',
\  'down':    '40%'})
```

## セッションの削除
`:DeleteSession ~/.vim/sessions/test1.vim`という感じで、削除します。

```vim
" delete session
command! -nargs=1 DeleteSession call s:deleteSession(<f-args>)
function! s:deleteSession(file)
    call delete(expand(a:file))
endfunction
```

fzf.vim版はこちらです。

```vim
command! FdeleteSession call fzf#run({
\  'source': split(glob(s:session_path . "/*"), "\n"),
\  'sink':    function('s:deleteSession'),
\  'options': '-m -x +s',
\  'down':    '40%'})
```

## キーマッピング
こんな感じでマッピングしたら楽です。

```vim
nnoremap <Leader>se :SaveSession 
nnoremap <Leader>lse :FloadSession<CR>
```

## 参考記事
https://thinca.hatenablog.com/entry/20100201/1265009821
https://qiita.com/shinshin86/items/6e6cbdb77cb59b87d21f
http://nanasi.jp/articles/code/io/file-path.html

## 最後に
初めてVim script書いたので、おかしなところがありましたら教えて頂けると助かります。
ちなみに、vimのセッションプラグインはありました。

使ってないのですが、良さげなので興味ある方はどうぞー

https://github.com/Shougo/unite-session
https://github.com/xolox/vim-session
