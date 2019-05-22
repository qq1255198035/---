<template>
      <div id="dkjl">
            <page-header :title="pageTitle"></page-header>
            <div class="dkjl-content">
                  <div class="input-box">
                        <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-date-picker class="my-picker"/>
                        </a-form-item>
                        <a-button type="primary" icon="search">搜 索</a-button>
                  </div>
                  <div class="my-stable">
                        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data">
                              <template slot="action">
                                    <a-button type="primary" ghost @click="$router.push({name: 'dkxq'})">查 看</a-button>
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
import { getServiceList } from '@/api/manage'
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
                  columns: [
                              
                              {
                                    title: '汇款公司',
                                    dataIndex: 'hkgs'
                              },
                              {
                                    title: '收款公司',
                                    dataIndex: 'skgs'
                              },
                              {
                                    title: '汇款时间',
                                    dataIndex: 'hksj',
                                   
                              },
                              {
                                    title: '收款时间',
                                    dataIndex: 'skss',
                                    
                              },
                              {
                                    title: '已付款',
                                    dataIndex: 'yfk',
                              
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
                        
                        data: [
                              {
                                    key: '1',
                                    hkgs: '李宁体育用品有限公司',
                                    skgs: '吉林省热动体育有限公司',
                                    hksj: '2019-3-25 15:45',
                                    skss: '2019-3-27 15:45',
                                    yfk: '$30000',
                                    bz: '明星出场费'
                              },
                              {
                                    key: '2',
                                    hkgs: '李宁体育用品有限公司',
                                    skgs: '吉林省热动体育有限公司',
                                    hksj: '2019-3-25 15:45',
                                    skss: '2019-3-27 15:45',
                                    yfk: '$30000',
                                    bz: '明星出场费'
                              },
                              {
                                    key: '3',
                                    hkgs: '李宁体育用品有限公司',
                                    skgs: '吉林省热动体育有限公司',
                                    hksj: '2019-3-25 15:45',
                                    skss: '2019-3-27 15:45',
                                    yfk: '$30000',
                                    bz: '明星出场费'
                              },
                              {
                                    key: '4',
                                    hkgs: '李宁体育用品有限公司',
                                    skgs: '吉林省热动体育有限公司',
                                    hksj: '2019-3-25 15:45',
                                    skss: '2019-3-27 15:45',
                                    yfk: '$30000',
                                    bz: '明星出场费'
                              },
                              {
                                    key: '5',
                                    hkgs: '李宁体育用品有限公司',
                                    skgs: '吉林省热动体育有限公司',
                                    hksj: '2019-3-25 15:45',
                                    skss: '2019-3-27 15:45',
                                    yfk: '$30000',
                                    bz: '明星出场费'
                              },
                        ],
            }
      },
      methods:{
           
            onSelectChange (selectedRowKeys) {
                  console.log('selectedRowKeys changed: ', selectedRowKeys);
                  this.selectedRowKeys = selectedRowKeys
            }
      },
      
      filters: {
            
      },
}
</script>
