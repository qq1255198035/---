<template>
  <div id="hdsp">
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="待审批" :content="notApprovalNum + '个活动'" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="已审批" :content="approvalNum + '个活动'" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="总计" :content="allNum + '个活动'"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="活动列表">

      <div slot="extra">
        <a-radio-group v-model="radioval" @change="onChange">
          <a-radio-button value="9">
          全部
        </a-radio-button>
        <a-radio-button value="0">
          待审批
        </a-radio-button>
        <a-radio-button value="20">
          已审批
        </a-radio-button>
        <a-radio-button value="30">
          驳回
        </a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" @search="onSearch"/>
      </div>
      <div class="my-stable">
            <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
                  <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                  <template slot="operation" slot-scope="text,record">
                        <a href="javascript:;" @click="$router.push({path: '/hdgl/ckhd',query: { id: record.key}})">查 看</a>
                        <div style="display: inline-block;" v-if="record.status == 0">
                              <a-divider type="vertical"/>
                              <a-popconfirm
                                    title="选择操作"
                                    @confirm="confirm"
                                    @cancel="cancel"
                                    okText="通过" 
                                    cancelText="驳回"
                              >
                                    <a href="javascript:;" @click="recordKey = record.key">审 批</a>
                              </a-popconfirm>
                        </div>
                        
                  </template>
            </a-table>
      </div>
    </a-card>
            <a-modal
                  title=""
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
            >
                  <a-form-item label="原因">
                        <a-textarea placeholder="请输入原因" :autosize="{ minRows: 4 }" v-model="cancelReason"/>
                  </a-form-item>
            </a-modal>
      </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { approvalNumber,searchCampList,campApproval,campInformation } from '@/api/admin'
const statusMap = {
      0: {
            status: 'warning',
            text: '待审批'
      },
      20: {
            status: 'success',
            text: '已审批'
      },
      30: {
            status: 'error',
            text: '驳回'
      },
}
export default {
      components: {
            HeadInfo
      },

      data () {
            return {
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
                              title: '序号',
                              dataIndex: 'num'
                        },
                        {
                              title: '活动名称',
                              dataIndex: 'name'
                        },
                        {
                              title: '活动类型',
                              dataIndex: 'campCatalogVal',
                        },
                        {
                              title: '状态',
                              dataIndex: 'status',
                              scopedSlots: { customRender: 'status' }
                        },
                        {
                              title: '描述',
                              dataIndex: 'content',
                        },
                        {
                              title: '操作',
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
                              this.$message.success('操作成功 ！');
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
