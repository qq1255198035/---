<template>
      <div id="zzjl">
            <div class="zzjl-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item :label="$t('admin.xzrq')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-locale-provider :locale="locale">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                          </a-locale-provider>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item :label="$t('admin.hdmc')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input :placeholder="$t('admin.qxzhdmc')" v-model="name"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="zzjl-content">
                  <div class="my-table">
                        <a-locale-provider :locale="locale">
                        <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
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
#zzjl{
      .zzjl-header{
            background-color: #fff;
            margin-bottom: 20px;
            padding: 20px 0;
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
      .zzjl-content{
            margin: 20px;
            background-color: #fff;
            .my-table{
                  padding: 20px;
            }
      }
}
</style>
<script>
import { searchSponsor } from "@/api/sponsor";
import i18n from '@/lang/index'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const statusMap = {
      20: {
            status: 'success',
            text: i18n.t('admin.tg')
      },
      30: {
            status: 'error',
            text: i18n.t('admin.bh')
      },
      11:{
            status: 'warning',
            text: i18n.t('issuer.hdgl.wsp')
      }
}
export default {
      data () {
            return {
                        locale: lang[localStorage.getItem('lang')],
                        starttime: '',
                        endtime: '',
                        condition: '',
                        offset: 1,
                        loading: true,
                        name:'',
                        selectedRowKeys: [],
                        columns: [
                              {
                                    title: this.$t('issuer.cjhd.zzhdmc'),
                                    dataIndex: 'name'
                              },
                              {
                                    title: this.$t('issuer.cjhd.tgxs'),
                                    dataIndex: 'ssKind'
                              },
                              {
                                    title: this.$t('issuer.cjhd.zzxs'),
                                    dataIndex: 'sponsorship',
                              },
                              {
                                    title: this.$t('issuer.cjhd.xjzz'),
                                    dataIndex: 'cash',
                              },
                              {
                                    title: this.$t('issuer.cjhd.swzz'),
                                    dataIndex: 'product'
                              },
                              {
                                    title: this.$t('issuer.cjhd.zzze'),
                                    dataIndex: 'tolMoney',
                              },
                              {
                                    title: this.$t('issuer.cjhd.bz'),
                                    dataIndex: 'approval',
                                    
                              },
                              {
                                    title: this.$t('admin.zt'),
                                    dataIndex: 'status',
                                    scopedSlots: { customRender: 'status' }
                              },
                        ],
                        data: [],
                        pagination:{
                              total:0,
                              pageSize:10,
                        },
                  }
      },
      mounted(){
            this.getSponsorList(this.name,this.starttime,this.endtime,this.offset)
      },
      methods:{
            changeDate(val,date){
                  this.starttime = date[0];
                  this.endtime = date[1]
            },
            search(){
                  this.getSponsorList(this.name,this.starttime,this.endtime,this.offset)
            },
            getSponsorList(name,startime, endtime, offset){
                  searchSponsor(name,startime, endtime, offset).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              let key = 'key';
                              this.data = res.page.rows;
                              this.pagination.total = parseInt(res.page.total);
                              this.loading = false;
                              this.data.map((item,index)=>{
                                    item[key] = index
                              })
                        }
                  })
            },
            handleTableChange (pagination) {
                  this.loading = true;
                  this.offset = pagination.current;
                  this.getSponsorList(this.name,this.starttime,this.endtime,this.offset)
            },
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
