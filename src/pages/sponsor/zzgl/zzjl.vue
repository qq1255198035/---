<template>
      <div id="zzjl">
            <div class="zzjl-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="公司名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="请输入公司名称" v-model="name"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search" @click="search">搜 索</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="zzjl-content">
                  <div class="my-table">
                        <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
                              <span slot="status" slot-scope="text">
                                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                              </span>
                              
                        </a-table>
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
const statusMap = {
      20: {
            status: 'success',
            text: '通过'
      },
      30: {
            status: 'error',
            text: '驳回'
      },
}
export default {
      data () {
            return {
                        
                        starttime: '',
                        endtime: '',
                        condition: '',
                        offset: 1,
                        loading: true,
                        name:'',
                        selectedRowKeys: [],
                        columns: [
                              {
                                    title: '赞助活动名称',
                                    dataIndex: 'name'
                              },
                              {
                                    title: '推广形式',
                                    dataIndex: 'ssKind'
                              },
                              {
                                    title: '赞助形式',
                                    dataIndex: 'sponsorship',
                              },
                              {
                                    title: '现金赞助',
                                    dataIndex: 'cash',
                              },
                              {
                                    title: '实物赞助',
                                    dataIndex: 'product'
                              },
                              {
                                    title: '赞助总额',
                                    dataIndex: 'tolMoney',
                              },
                              {
                                    title: '备注',
                                    dataIndex: 'approval',
                                    
                              },
                              {
                                    title: '状态',
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
