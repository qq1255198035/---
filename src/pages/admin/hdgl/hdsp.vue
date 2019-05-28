<template>
  <div id="hdsp">
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="待审批" content="8个活动" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="已审批" content="32个活动" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="总计" content="24个活动"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="活动列表">

      <div slot="extra">
        <a-radio-group>
          <!-- <a-radio-button>全部</a-radio-button>
          <a-radio-button>待审批</a-radio-button>
          <a-radio-button>已审批</a-radio-button> -->
          <a-radio-button value="全部">
          全部
        </a-radio-button>
        <a-radio-button value="待审批">
          待审批
        </a-radio-button>
        <a-radio-button value="已审批">
          已审批
        </a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <div class="my-stable">
            <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data">
                  <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                  <template slot="operation">
                        <a href="javascript:;" @click="$router.push({name: 'ckhd'})">查 看</a>
                        <a-divider type="vertical" />
                        <a-popconfirm
                              title="选择操作"
                              @confirm="confirm"
                              @cancel="cancel"
                              okText="通过" 
                              cancelText="驳回"
                              
                        >
                              <a href="javascript:;" v-if="popconfirmShow">审 批</a>
                        </a-popconfirm>
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
                        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }"/>
                  </a-form-item>
            </a-modal>
      </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'

const statusMap = {
      0: {
            status: 'default',
            text: '关闭'
      },
      1: {
            status: 'processing',
            text: '待审批'
      },
      2: {
            status: 'success',
            text: '已审批'
      },
      3: {
            status: 'error',
            text: '驳回'
      },
      4: {
            status: 'processing',
            text: '已认证'
      }
}

export default {
      
      components: {
            
            HeadInfo
      },
      data () {
            return {
                        visible: false,
                        confirmLoading: false,
                        selectedRowKeys: [],
                        columns: [
                              {
                                    title: '编号',
                                    dataIndex: 'number'
                              },
                              {
                                    title: '活动名称',
                                    dataIndex: 'hdmc'
                              },
                              {
                                    title: '活动类型',
                                    dataIndex: 'hdlx',
                              },
                              {
                                    title: '状态',
                                    dataIndex: 'status',
                                    scopedSlots: { customRender: 'status' }
                              },
                              {
                                    title: '描述',
                                    dataIndex: 'desc',
                              },
                              {
                                    title: '操作',
                                    dataIndex: 'operation',
                                    scopedSlots: { customRender: 'operation' },
                              }
                        ],
                        // 加载数据方法 必须为 Promise 对象
                        
                        // return this.$http.get('/service', {
                        //       params: Object.assign(parameter, this.queryParam)
                        // }).then(res => {
                        //       return res.result
                        // })
                        data: [
                              {
                                    key: 0,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '0',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: 1,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '1',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: 2,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '2',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: 3,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '3',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: 4,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '4',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: 5,
                                    number: '01',
                                    hdmc: '篮球比赛',
                                    hdlx: '篮球',
                                    status: '1',
                                    desc: '2016-09-21  08:50:08',
                              },
                        ],
                        
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
            popconfirmShow(){
                  
                  var res = this.data.map((item,index) =>{
                        return item.status == '1'
                  })
                  return res
                  
            },
            //todo
            getDataIndex(){
                  for(var i=0;i < this.data.length;i++){
                        return i
                  }
            }
      },
      mounted(){
            console.log(...this.popconfirmShow)
            console.log(this.getDataIndex)
      },
      methods:{
            confirm () {
                  this.$message.success('操作成功 ！');
            },
            cancel() {
                  this.visible = true
            },
            handleOk(e) {
                  this.ModalText = 'The modal will be closed after two seconds';
                  this.confirmLoading = true;
                  setTimeout(() => {
                  this.visible = false;
                  this.confirmLoading = false;
                  this.$message.success('操作成功');
                  //失败提示
                  //this.$message.error('This is a message of error');
                  }, 2000);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
            success () {
                  this.loading = true;
                  setTimeout(() => {
                        this.loading = false;
                        this.$message.success('操作成功');
                  }, 2000);
                  
            },
            onSelectChange (selectedRowKeys) {
                  console.log('selectedRowKeys changed: ', selectedRowKeys);
                  this.selectedRowKeys = selectedRowKeys
            }
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
