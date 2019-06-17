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
                                    <a-input placeholder="请输入标题" v-model="title"/>
                              </a-form-item>
                              <a-form-item
                                    label="发送至："
                                    :label-col="{ span: 3 }"
                                    :wrapper-col="{ span: 24}"
                              >
                                    <a-select
                                          showSearch
                                          placeholder="Select a person"
                                          optionFilterProp="children"
                                          @change="handleChange"
                                          :filterOption="filterOption"
                                          allowClear
                                    >
                                          <a-select-option v-for="item in actor" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item
                                    label="内容："
                                    :label-col="{ span: 3 }"
                                    :wrapper-col="{ span: 24 }"
                              >
                                    <a-textarea placeholder="" :rows="8" v-model="messages"/>
                              </a-form-item>
                              <a-button type="primary" block @click="sendMessages">发 送</a-button>
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
                                                <span slot="title">{{ item.title }}</span>
                                          </a-list-item-meta>
                                          <article-list-content :description="item.content" :updateAt="item.createtime" />
                                    </a-list-item>
                                    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
                                          <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable">加载更多</a-button>
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
import { infoList } from '@/api/common'
import {selectActor,sendMessage } from '@/api/admin'
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
                  offset:1,
                  btnDsiable:false,
                  pages:0,
                  actor:[],
                  selector:'',
                  messages:'',
                  title:'',
                 
            }
      },
      methods:{
            getInfoList(){
                  infoList('',this.offset).then(res => {
                        if(res.code == 1000){
                              let page = parseInt(this.pages)
                              this.data = res.page.rows;
                              this.pages = res.page.pages;
                              this.loading = false;
                        }
                  })
            },
            getPageMeta () {
                  // eslint-disable-next-line
                  this.pageTitle = this.$route.meta.title
            },
            loadMore () {
                  this.offset++
                  this.loadingMore = true;
                  this.loading = true;
                  infoList('',this.offset).then(res => {
                        if(res.code == 1000){
                              let page = parseInt(this.pages)
                              if (res.page.offset > page) {
                                    this.btnDsiable = true;
                                    this.$message.warning('已加载全部信息！');
                                    this.loadingMore = false;
                                    this.loading = false;
                                    return
                              }
                              this.data = this.data.concat(res.page.rows)
                              this.loading = false
                              this.loadingMore = false;
                              this.pages = res.page.pages;
                              this.loading = false;
                        }
                  })
                  
            },
            handleChange (value) {
                  this.selector = value;
            },
            filterOption(input, option) {
                  return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },
            getSelectActor(){
                  selectActor().then(res=>{
                        if (res.code == 1000) {
                              this.actor = res.data
                        }
                  })
            },
            postSendMessage(title, content, recipients){
                  if (recipients) {
                        sendMessage(title, content, recipients).then(res=>{
                        
                              if(res.code == 1000){
                                    this.$message.success('发送成功！');
                                    setTimeout(() => {
                                          window.location.reload();
                                    }, 1000);
                              }
                        })
                  }else{
                        this.$message.error('请选择发送人！');
                  }
                  
            },
            sendMessages(){
                  this.postSendMessage(this.title,this.messages,this.selector)
            }
      },
      mounted () {
            this.getPageMeta();
            this.getSelectActor();
            this.getInfoList();
      },
}
</script>
