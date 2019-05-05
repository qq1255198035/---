<template>
      <div id="tzxx">
            <page-header :title="pageTitle"></page-header>
            <div class="tzxx-content">
                  <div class="left">
                        <a-form layout="vertical">
                              <a-form-item
                                    label="标题："
                                    :label-col="{ span: 3 }"
                                    :wrapper-col="{ span: 24 }"
                              >
                                    <a-input placeholder="请输入标题"/>
                              </a-form-item>
                              <a-form-item
                                    label="发送至："
                                    :label-col="{ span: 3 }"
                                    :wrapper-col="{ span: 24}"
                              >
                                    <a-select placeholder="请选择">
                                    <a-select-option value="male">
                                          male
                                    </a-select-option>
                                    <a-select-option value="female">
                                          female
                                    </a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item
                                    label="标题："
                                    :label-col="{ span: 3 }"
                                    :wrapper-col="{ span: 24 }"
                              >
                                    <a-textarea placeholder="" :rows="8" />
                              </a-form-item>
                              <a-button type="primary" block>发 送</a-button>
                        </a-form>
                  </div>
                  <div class="right">
                        <a-card :bordered="false">
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
      </div>
</template>
<style lang="less" scoped>
#tzxx{
      margin: -24px -24px 0px;
      .tzxx-content{
            display: flex;
            justify-content: space-between;
            margin: 30px 20px;
            .left{
                  width: 30%;
                  background-color: #fff;
                  padding: 20px;
            }
            .right{
                  width: 68%;
                  background-color: #fff;
            }
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
      data(){
            return{
                  pageTitle: null,
                  loading: true,
                  loadingMore: false,
                  data: [],
            }
      },
      methods:{
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
}
</script>
