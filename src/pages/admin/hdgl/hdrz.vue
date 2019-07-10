<template>
  <div id="hdsp">
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info :title="$t('issuer.hdgl.drz')" :content="notAuthenticationNum + $t('issuer.hdgl.ghd')" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info :title="$t('issuer.hdgl.yez')" :content="authentication + $t('issuer.hdgl.ghd')" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info :title="$t('issuer.index.totalPrice')" :content="allNum + $t('issuer.hdgl.ghd')"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :title="$t('login.hdlb')">

      <div slot="extra">
        <a-radio-group v-model="radioval" @change="onChange">
          <a-radio-button value="9">{{$t('issuer.hdgl.qb')}}</a-radio-button>
          <a-radio-button value="0">{{$t('issuer.hdgl.drz')}}</a-radio-button>
          <a-radio-button value="20">{{$t('issuer.hdgl.yez')}}</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" @search="onSearch"/>
      </div>
      <div class="my-stable">
            <a-locale-provider :locale="locale">
            <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
                  <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                  <template slot="operation" slot-scope="text,record">
                        <a href="javascript:;" @click="$router.push({path: '/hdgl/ckhd',query: { id: record.key}})">{{$t('issuer.hdgl.examine')}}</a>
                        <div style="display: inline-block" v-if="record.status == 0">
                              <a-divider type="vertical" />
                              <a-popconfirm
                                    v-if="data.length"
                                    :title="$t('issuer.hdgl.qrrz')"
                                    @confirm="confirm">
                                    <a href="javascript:;" @click="recordKey = record.key">{{$t('issuer.hdgl.rz')}}</a>
                              </a-popconfirm>
                        </div>
                  </template>
            </a-table>
            </a-locale-provider>
      </div>

    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { authenNumber,searchAuthenCampList,campAuthen } from '@/api/admin'
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
            status: 'processing',
            text: i18n.t('issuer.hdgl.yez')
      },
      0: {
            status: 'default',
            text: i18n.t('issuer.hdgl.drz')
      }
}

export default {
      
      components: {
            HeadInfo
      },
      data () {
            return {
                  locale: lang[localStorage.getItem('lang')],
                  selectedRowKeys: [],
                  radioval: "9",
                  authentication: '',
                  notAuthenticationNum: '',
                  allNum: '',
                  loading: true,
                  searchkey: '',
                  offset: 1,
                  recordKey: '',
                  pagination:{
                        total:0,
                        pageSize:10,
                  },
                  columns: [
                        {
                              title: this.$t('issuer.cjhd.xh'),
                              dataIndex: 'num'
                        },
                        {
                              title: this.$t('admin.hdmc'),
                              dataIndex: 'name'
                        },
                        {
                              title: this.$t('admin.hdlx'),
                              dataIndex: 'campCatalogVal',
                        },
                        {
                              title: this.$t('issuer.index.status'),
                              dataIndex: 'status',
                              scopedSlots: { customRender: 'status' }
                        },
                        {
                              title: this.$t('admin.ms'),
                              dataIndex: 'content',
                        },
                        {
                              title: this.$t('issuer.cjhd.cz'),
                              dataIndex: 'operation',
                              scopedSlots: { customRender: 'operation' },
                        }
                  ],
                  data: [],  
            }
      },
      filters: {
            statusFilter (type) {
                  return statusMap[type].text
            },
            statusTypeFilter (type) {
                  return statusMap[type].status
            }
      },
      mounted(){
            this.getauthenNumber();
            this.getAuthList(this.searchkey,this.offset,this.radioval)
      },
      methods:{
            //获取待认证、已认证数量
            getauthenNumber(){
                  authenNumber().then(res=>{
                        if(res.code == 1000){
                              this.authentication = res.authenticationNum;
                              this.notAuthenticationNum = res.notAuthenticationNum;
                              this.allNum = res.allNum
                        }
                  })
            },
            //获取认证活动列表
            getAuthList(key,page,filter){
                  searchAuthenCampList(key,page,filter).then(res => {
                        if(res.code == 1000){
                              let key = 'num'
                              this.pagination.total = parseInt(res.page.total);
                              this.loading = false;
                              this.data = res.page.rows;
                              this.data.map((item,index)=>{
                                    item[key] = (res.page.offset - 1).toString() + (index + 1)
                              })
                        }
                  })
            },
            // 过滤
            onChange(e){
                  this.loading = true;
                  console.log(this.radioval)
                  this.getAuthList(this.searchkey,this.offset,this.radioval);
            },
            //分页
            handleTableChange (pagination) {
                  this.loading = true;
                  this.offset = pagination.current;
                  this.getAuthList(this.searchkey,this.offset,this.radioval);
            },
            // 搜索
            onSearch (value) {
                  this.loading = true;
                  this.searchkey = value;
                  this.getAuthList(this.searchkey,this.offset,this.radioval);
            },
            // 通过认证
            postCampAuthen(campId, reject, agreement){
                  this.loading = true;
                  campAuthen(campId, reject, agreement).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              this.getauthenNumber();
                              this.getAuthList(this.searchkey,this.offset,this.radioval);
                              this.loading = false;
                        }
                  })
            },
            confirm () {
                  this.postCampAuthen(this.recordKey,'',20)
            },
           
      }
}
</script>

<style lang="less" scoped>
#hdsp{
	margin: 24px;
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
}
</style>
