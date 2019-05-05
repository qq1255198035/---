<template>
      <div id="zzjl">
            <div class="zzjl-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-date-picker class="my-picker"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="活动名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="Basic usage"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search">搜 索</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="zzjl-content">
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
      data () {
            return {
                        visible: false,
                        confirmLoading: false,
                        selectedRowKeys: [],
                        columns: [
                              {
                                    title: '赞助活动名称',
                                    dataIndex: 'hdmc'
                              },
                              {
                                    title: '推广形式',
                                    dataIndex: 'tgxs'
                              },
                              {
                                    title: '赞助形式',
                                    dataIndex: 'zzxs',
                              },
                              {
                                    title: '现金赞助',
                                    dataIndex: 'xjzz',
                              },
                              {
                                    title: '实物赞助',
                                    dataIndex: 'swzz'
                              },
                              {
                                    title: '赞助总额',
                                    dataIndex: 'zzze',
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
                        // 加载数据方法 必须为 Promise 对象
                        
                        // return this.$http.get('/service', {
                        //       params: Object.assign(parameter, this.queryParam)
                        // }).then(res => {
                        //       return res.result
                        // })
                        data: [
                              {
                                    key: '0',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    tgxs: '冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '2'
                              },
                              {
                                    key: '1',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    tgxs: '冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '3'
                              },
                              {
                                    key: '2',
                                    hdmc: '2019年吉林市马拉松比赛',
                                    tgxs: '冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    remark: 'XXXX驳回',
                                    status: '2'
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
}
</script>
