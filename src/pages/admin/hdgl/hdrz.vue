<template>
  <div id="hdsp">
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="待认证" :content="notAuthenticationNum + '个活动'" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="已认证" :content="authentication + '个活动'" :bordered="true"/>
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
          <a-radio-button value="9">全部</a-radio-button>
          <a-radio-button value="0">待认证</a-radio-button>
          <a-radio-button value="20">已认证</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" @search="onSearch"/>
      </div>
      <div class="my-stable">
            <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
                  <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                  <template slot="operation" slot-scope="text,record">
                        <a href="javascript:;" @click="$router.push({name: 'ckhd',params: { id: record.key}})">查 看</a>
                        <div style="display: inline-block" v-if="record.status == 0">
                              <a-divider type="vertical" />
                              <a-popconfirm
                                    v-if="data.length"
                                    title="确定认证?"
                                    @confirm="confirm">
                                    <a href="javascript:;" @click="recordKey = record.key">认 证</a>
                              </a-popconfirm>
                        </div>
                  </template>
            </a-table>
      </div>

    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { authenNumber,searchAuthenCampList,campAuthen } from '@/api/admin'
const statusMap = {
      20: {
            status: 'processing',
            text: '已认证'
      },
      0: {
            status: 'error',
            text: '待认证'
      }
}

export default {
      
      components: {
            HeadInfo
      },
      data () {
            return {
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
                              this.pagination.total = parseInt(res.page.total)
                              this.loading = false;
                              this.data = res.page.rows
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
                              this.$message.success('操作成功 ！');
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
