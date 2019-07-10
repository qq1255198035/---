<template>
      <div id="sqjl">
            
            <div class="sqjl-header">
                  <a-row :gutter="2" type="flex" justify="start" align="middle">
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item :label="$t('admin.xzrq')" class="my-form-item" :wrapperCol="{span: 17, offset: 1}" :labelCol="{span: 5}">
                                          <a-locale-provider :locale="locale">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                          </a-locale-provider>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item :label="$t('admin.hdmc')" class="my-form-item" :wrapperCol="{span: 17, offset: 1}" :labelCol="{span: 5}">
                                          <a-input :placeholder="$t('admin.qxzhdmc')" v-model="condition"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="6">
                              <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
                        </a-col>
                  </a-row>
            </div>
            <div class="sqjl-content">
                  <div class="my-table">
                        <a-locale-provider :locale="locale">
                        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
                              <span slot="status" slot-scope="text">
                                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                              </span>
                              
                        </a-table>
                        </a-locale-provider>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>
#sqjl{
      margin: -24px -24px 0;
      .sqjl-header{
            background-color: #fff;
            margin-bottom: 20px;
            padding: 20px 50px;
           .input-box{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 .my-form-item{
                        margin: 0; 
                        width: 100%;
                        .my-picker{
                              width: 100%;
                        }
                  }
           }
            
      }
      .sqjl-content{
            margin: 20px 48px;
            background-color: #fff;
            .my-table{
                  padding: 20px;
            }
      }
}
</style>
<script>
import i18n from '@/lang/index'
import { applicationList } from "@/api/manager";
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const statusMap = {
      
      2: {
            status: 'processing',
            text: i18n.t('admin.dsp')
      },
      1: {
            status: 'success',
            text: i18n.t('admin.tg')
      },
      0: {
            status: 'error',
            text: i18n.t('admin.bh')
      },
      
}
export default {
     
      data(){
            return{
                  locale: lang[localStorage.getItem('lang')],
                  pageTitle: null,
                  columns: [
                        {
                              title: this.$t('admin.hdmc'),
                              dataIndex: 'campname'
                        },
                        {
                              title: this.$t('admin.hdsj'),
                              dataIndex: 'publishTime'
                        },
                        {
                              title: this.$t('admin.cjmx'),
                              dataIndex: 'username',
                        },
                        {
                              title: this.$t('admin.ccze'),
                              dataIndex: 'cost',
                        },
                        {
                              title: this.$t('admin.bz'),
                              dataIndex: 'details',
                              
                        },
                        {
                              title: this.$t('admin.zt'),
                              dataIndex: 'status',
                              scopedSlots: { customRender: 'status' }
                        },
                  ],
                  data: [],
                  startime:'',
                  endtime:'',
                  condition:'',
                  offset: 1,
                  loading: true,
                  pagination:{
                        total:0,
                        pageSize:10,
                  },
            }
      },
      methods:{
            getApplicationList(startime, endtime, condition, offset){
                  applicationList(startime, endtime, condition, offset).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              let key = 'key'
                              this.loading = false;
                              this.data = res.page.rows
                              this.pagination.total = parseInt(res.page.total)
                              this.data.map((item,index)=>{
                                    item[key] = index
                              })
                        }
                  })
            },
            changeDate(val,date){
                  this.startime = date[0];
                  this.endtime = date[1]
            },
            search(){
                  this.loading = true;
                  this.getApplicationList(this.startime,this.endtime,this.condition,1)
            },
            handleTableChange (pagination) {
                  this.loading = true;
                  this.offset = pagination.current;
                  this.getApplicationList(this.startime,this.endtime,this.condition,this.offset);
            },
      },
      mounted () {
            this.getApplicationList(this.startime,this.endtime,this.condition,this.offset)
      
      },
      filters: {
            statusFilter (type) {
                  return statusMap[type].text
            },
            statusTypeFilter (type) {
                  return statusMap[type].status
            }
      },
}
</script>
