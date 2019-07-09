<template>
  <div id="hdsp">
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info :title="$t('issuer.index.pending')" :content="notApprovalNum + $t('issuer.hdgl.ghd')" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info :title="$t('issuer.hdgl.ysp')" :content="approvalNum + $t('issuer.hdgl.ghd')" :bordered="true"/>
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
          <a-radio-button value="9">
          {{$t('issuer.hdgl.qb')}}
        </a-radio-button>
        <a-radio-button value="0">
          {{$t('issuer.index.pending')}}
        </a-radio-button>
        <a-radio-button value="20">
          {{$t('issuer.hdgl.ysp')}}
        </a-radio-button>
        <a-radio-button value="30">
          {{$t('issuer.hdgl.bh')}}
        </a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" @search="onSearch"/>
      </div>
      <div class="my-stable">
            <a-locale-provider :locale="locale">
            <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
                  <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                  <template slot="operation" slot-scope="text,record">
                        <a href="javascript:;" @click="$router.push({path: '/hdgl/ckhd',query: { id: record.key}})">{{$t('issuer.hdgl.examine')}}</a>
                        <div style="display: inline-block;" v-if="record.status == 0">
                              <a-divider type="vertical"/>
                              <a-popconfirm
                                    :title="$t('admin.xzcz')"
                                    @confirm="confirm"
                                    @cancel="cancel"
                                    :okText="$t('issuer.hdgl.tg')" 
                                    :cancelText="$t('issuer.hdgl.bh')"
                              >
                                    <a href="javascript:;" @click="recordKey = record.key">{{$t('admin.sp')}}</a>
                              </a-popconfirm>
                        </div>
                        
                  </template>
            </a-table>
            </a-locale-provider>
      </div>
    </a-card>
            <a-modal
                  title=""
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
            >
                  <a-form-item :label="$t('issuer.hdgl.yy')">
                        <a-textarea :placeholder="$t('admin.qsryy')" :autosize="{ minRows: 4 }" v-model="cancelReason"/>
                  </a-form-item>
            </a-modal>
      </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { approvalNumber,searchCampList,campApproval,campInformation } from '@/api/admin'
import i18n from '@lang/index'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const statusMap = {
      0: {
            status: 'warning',
            text: i18n.t('issuer.index.pending')
      },
      20: {
            status: 'success',
            text: i18n.t('issuer.hdgl.ysp')
      },
      30: {
            status: 'error',
            text: i18n.t('issuer.hdgl.bh')
      },
}
export default {
      components: {
            HeadInfo
      },

      data () {
            return {
                  locale: lang[localStorage.getItem('lang')],
                  visible: false,
                  confirmLoading: false,
                  loading: true,
                  offset: 1,
                  radioval: '9',
                  allNum: 0,
                  approvalNum: 0,
                  notApprovalNum: 0,
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
                              scopedSlots: { customRender: 'operation' }
                            
                        },
                       
                              
                      
                        
                  ],
                  data: [],
                  searchkey: '',
                  cancelReason: '',
                  recordKey: ''
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
      computed:{
           
      },
      mounted(){
            this.getApprovalNumber();
            this.getSearchCampList(this.searchkey,this.offset,this.radioval);
            //console.log(this.data)
      },
      methods:{
            //获取活动审批与待审批数量
            getApprovalNumber(){
                  approvalNumber().then(res => {
                        if(res.code == 1000){
                              this.allNum = res.allNum;
                              this.approvalNum = res.approvalNum
                              this.notApprovalNum = res.notApprovalNum
                        }
                  })
            },
            //获取活动列表
            getSearchCampList(key,page,filter){
                  searchCampList(key,page,filter).then(res => {
                        if(res.code == 1000){
                              let key = "num";
                              this.pagination.total = parseInt(res.page.total)
                              this.loading = false;
                              this.data = res.page.rows
                              this.data.map((item,index)=>{
                                    item[key] = (res.page.offset - 1).toString() + (index + 1)
                              })
                        }
                  })
            },
            //点击分页
            handleTableChange (pagination) {
                  this.loading = true;
                  this.offset = pagination.current;
                  this.getSearchCampList(this.searchkey,this.offset,this.radioval);
            },
             //搜索
            onSearch (value) {
                  this.loading = true;
                  this.searchkey = value
                  this.getSearchCampList(this.searchkey,this.offset,this.radioval);
            },
            //过滤
            onChange(e){
                  this.loading = true;
                  this.getSearchCampList(this.searchkey,this.offset,this.radioval);
            },
            //提交审批
            postCampApproval(campId, reject, agreement){
                  this.loading = true;
                  campApproval(campId, reject, agreement).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              this.getApprovalNumber();
                              this.getSearchCampList(this.searchkey,this.offset,this.radioval);
                              this.loading = false;
                        }
                  })
            },
            // 通过审批
            confirm(){
                  this.postCampApproval(this.recordKey,'',20)
                  
            },
            // 驳回审批 拉取驳回原因弹窗
            cancel() {
                  this.visible = true
            },
            // 提交驳回原因
            handleOk(e) {
                  this.confirmLoading = true;
                  this.visible = false;
                  this.confirmLoading = false;
                  this.postCampApproval(this.recordKey,this.cancelReason,30)
            },
            // 取消弹窗
            handleCancel(e) {
                  this.visible = false
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
