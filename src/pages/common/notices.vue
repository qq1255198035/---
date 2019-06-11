<template>
      <div id="notices">
            <page-header :title="pageTitle">
                  <div slot="pageMenu">
                        <div class="page-menu-search">
                              <a-input-search style="width: 80%; max-width: 522px;" placeholder="请输入..." size="large" enterButton="搜索" @search="onSearch"/>
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
                        <article-list-content :description="item.description" :updateAt="item.time" />
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
import { mixinsTitle } from "@/utils/mixin.js";
import { ArticleListContent } from '@/components'
import api from "@/api/index";
export default {
      mixins:[mixinsTitle],
      components: {
            ArticleListContent,
      },
      data () {
            return {
                  
                  loading: true,
                  loadingMore: false,
                  data: [],
            }
      },
      methods: {
            
            getList () {
                  this.$http.get(api.IssHomeMsg).then(res => {
                  //console.log('res', res)
                  this.data = res.data
                  this.loading = false
                  //console.log(res)
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
            onSearch (value) {
                  console.log(value)
            },
      },
      mounted () {
            
            this.getList()
      },
      updated () {
            
      },
}
</script>
