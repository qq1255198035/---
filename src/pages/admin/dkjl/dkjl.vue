<template>
      <div id="dkjl">
            <page-header :title="pageTitle"></page-header>
            <div class="dkjl-content">
                  <div class="input-box">
                        <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-range-picker @change="changeDate" class="my-picker"/>
                        </a-form-item>
                        <a-button type="primary" icon="search" @click="search">搜 索</a-button>
                        <a-button type="primary" @click="$router.push({name:'dkxx'})" style="margin-left: 20px;">添加打款信息</a-button>
                  </div>
                  <div class="my-stable">
                        <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
                              <template slot="action" slot-scope="text,record">
                                    <a-button type="primary" ghost @click="$router.push({name: 'dkxq',params:{data:record}})">查 看</a-button>
                              </template>
                        </a-table>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>
#dkjl{
      margin: -24px -24px 0px;
      .dkjl-content{
            background-color: #fff;
            margin: 30px;
            .input-box{
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding: 20px 0;
                  .my-form-item{
                        margin: 0; 
                        width: 40%;
                        .my-picker{
                              width: 100%;
                        }
                  }
            }
            .my-stable{
                  border-top: 1px solid #ccc;
                  padding: 20px;
            }
      }
      
}
</style>
<script>
import { mixinsTitle } from "@/utils/mixin.js";
import HeadInfo from '@/components/tools/HeadInfo'
import { STable } from '@/components'

import { transferMoneyList } from "@/api/admin";
export default {
      components: {
            STable,
            HeadInfo
      },
      mixins:[mixinsTitle],
      data(){
            return{
                  pageTitle: null,
                  selectedRowKeys: [],
                  condition:'',
                  offset:'',
                  starttime: '',
                  endtime: '',
                  loading: true,
                  pagination:{
                        total:0,
                        pageSize:10,
                  },
                  columns: [
                              
                              {
                                    title: '汇款公司',
                                    dataIndex: 'payCompany'
                              },
                              {
                                    title: '收款公司',
                                    dataIndex: 'receiveCompany'
                              },
                              {
                                    title: '汇款时间',
                                    dataIndex: 'createTime',
                                   
                              },
                              {
                                    title: '未付款',
                                    dataIndex: 'balance',
                                    
                              },
                              {
                                    title: '已付款',
                                    dataIndex: 'payment',
                              
                              },
                              {
                                    title: '备注',
                                    dataIndex: 'bz',
                              
                              },
                              {
                                    title: '操作',
                                    dataIndex: 'action',
                                    scopedSlots: { customRender: 'action' },
                              }
                  ],
                        // 加载数据方法 必须为 Promise 对象
                        
                  data: [],
            }
      },
      methods:{
            getMoneyList(condition, offset, starttime, endtime){
                  transferMoneyList(condition, offset, starttime, endtime).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              let key = 'key'
                              this.loading = false;
                              this.data = res.page.rows
                              this.data.map((item,index)=>{
                                    item[key] = index
                              })
                        }
                  })
            },
            changeDate(val,date){
                  this.starttime = date[0];
                  this.endtime = date[1]
            },
            search(){
                  this.loading = true;
                  this.getMoneyList(this.condition,this.offset,this.starttime,this.endtime)
            },
            handleTableChange (pagination) {
                  this.loading = true;
                  this.offset = pagination.current;
                  this.getMoneyList(this.condition,this.offset,this.starttime,this.endtime)
            },
      },
      mounted(){
            this.getMoneyList(this.condition,this.offset,this.starttime,this.endtime)
      },
      filters: {
            
      },
}
</script>
