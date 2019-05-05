<template>
      <div id="notices">
            <page-header :title="pageTitle">
                  <div slot="pageMenu">
                        <div class="page-menu-search">
                              <a-input-search style="width: 80%; max-width: 522px;" placeholder="请输入..." size="large" enterButton="搜索"/>
                        </div>
                  </div>
            </page-header>
            <div class="content">
                  <a-card style="margin-top: 24px;" :bordered="false">
                        <a-list
                        size="large"
                        rowKey="id"
                        :loading="loading"
                        itemLayout="vertical"
                        :dataSource="data"
                        >
                        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
                        
                        <a-list-item-meta>
                              <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
                        </a-list-item-meta>
                        <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
                        </a-list-item>
                        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
                        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
                        </div>
                        </a-list>
                  </a-card>
            </div>
      </div>
</template>
<style lang="less" scoped>
#notices{
      .page-menu-search{
            display: flex;
            justify-content: center;
            padding: 0 0 50px;
      }
}

</style>
<script>
import PageHeader from '@/components/PageHeader' 
import { ArticleListContent } from '@/components'
export default {
      components: {
            'page-header': PageHeader,
            ArticleListContent,
            
      },
      data () {
            return {
                  pageTitle: null,
                  loading: true,
                  loadingMore: false,
                  data: [],
            }
      },
      methods: {
            getPageMeta () {
                  // eslint-disable-next-line
                  this.pageTitle = this.$route.meta.title
            },
            getList () {
                  this.$http.get('/list/article').then(res => {
                  //console.log('res', res)
                  this.data = res.result
                  this.loading = false
                  })
            },
            loadMore () {
                  this.loadingMore = true
                  this.$http.get('/list/article').then(res => {
                  this.data = this.data.concat(res.result)
                  }).finally(() => {
                  this.loadingMore = false
                  })
            },
      },
      mounted () {
            this.getPageMeta();
            this.getList()
      },
      updated () {
            this.getPageMeta()
      },
}
</script>
