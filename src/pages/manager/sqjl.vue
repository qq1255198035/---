<template>
      <div id="sqjl">
            
            <div class="sqjl-header">
                  <a-row :gutter="2">
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-date-picker class="my-picker"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="6">
                              <div class="input-box">
                                    <a-form-item label="活动名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="Basic usage"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="7">
                              <div class="input-box">
                                    <a-form-item label="活动名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 5}">
                                          <a-select placeholder="请选择" style="width: 90%;">
                                                <a-select-option value="male">
                                                      male
                                                </a-select-option>
                                                <a-select-option value="female">
                                                      female
                                                </a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-button type="primary" icon="search">搜 索</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="sqjl-content">
                  <div class="my-table">
                        <a-table :columns="columns" :dataSource="data">
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
            text: '通过'
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
     
      data(){
            return{
                  pageTitle: null,
                  columns: [
                        {
                              title: '活动名称',
                              dataIndex: 'hdmc'
                        },
                        {
                              title: '活动时间',
                              dataIndex: 'hdss'
                        },
                        {
                              title: '参加明星',
                              dataIndex: 'cjmx',
                        },
                        {
                              title: '出厂总额',
                              dataIndex: 'ccze',
                        },
                        {
                              title: '备注',
                              dataIndex: 'remark',
                              
                        },
                        {
                              title: '状态',
                              dataIndex: 'status',
                              scopedSlots: { customRender: 'status' }
                        },
                  ],
                  data: [
                              {
                                    key: '0',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    hdss: '2019-03-29 10:00',
                                    cjmx: '灭霸',
                                    ccze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '2'
                              },
                              {
                                    key: '1',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    hdss: '2019-03-29 10:00',
                                    cjmx: '灭霸',
                                    ccze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '3'
                              },
                              {
                                    key: '2',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    hdss: '2019-03-29 10:00',
                                    cjmx: '灭霸',
                                    ccze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '2'
                              },
                        ],
            }
      },
      methods:{
           
      },
      mounted () {
            
      
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
