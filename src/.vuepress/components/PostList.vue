<template>
    <div>
        <div v-for="post in posts">
            <h2><a v-bind:href="post.path">{{post.title}}</a></h2>
            <p>{{post.frontmatter.description}}</p>
            <a v-bind:href="post.path">続きを読む</a>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        posts() {
            return this.$site.pages
                // blogディレクトリ以下を投稿記事一覧表示の対象とする
                .filter(post => post.path.startsWith('/articles/'))
                // dateに設定した日付の降順にソートする
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
        }
    }
}
</script>
