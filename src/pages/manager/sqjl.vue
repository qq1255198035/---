<template>
      <div id="sqjl">
            
            <div class="sqjl-header">
                  <a-row :gutter="2" type="flex" justify="start" align="middle">
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item label="活动名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="Basic usage" v-model="condition"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="6">
                              <a-button type="primary" icon="search" @click="search">搜 索</a-button>
                        </a-col>
                  </a-row>
            </div>
            <div class="sqjl-content">
                  <div class="my-table">
                        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
                              <span slot="status" slot-scope="text">
                                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                              </span>
                              
                        </a-table>
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
import { applicationList } from "@/api/manager";
const statusMap = {
      
      2: {
            status: 'processing',
            text: '待审批'
      },
      1: {
            status: 'success',
            text: '通过'
      },
      0: {
            status: 'error',
            text: '驳回'
      },
      
}
export default {
     
      data(){
            return{
                  pageTitle: null,
                  columns: [
                        {
                              title: '活动名称',
                              dataIndex: 'campname'
                        },
                        {
                              title: '活动时间',
                              dataIndex: 'publishTime'
                        },
                        {
                              title: '参加明星',
                              dataIndex: 'username',
                        },
                        {
                              title: '出厂总额',
                              dataIndex: 'cost',
                        },
                        {
                              title: '备注',
                              dataIndex: 'details',
                              
                        },
                        {
                              title: '状态',
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
