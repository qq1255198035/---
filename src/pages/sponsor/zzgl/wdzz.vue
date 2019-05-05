<template>
      <div id="wdzz">
            <div class="input-box">
                  <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-date-picker class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search">搜 索</a-button>
            </div>
            <div class="wyzz-content">
                  <div class="items">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                          </h2>
                                          <p>时间：2019-01-02 11:50:00</p>
                                          <p>分类：篮球</p>
                                          <p>参赛人数：1300人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          吉林省 长春市长春市南关区卫星广场明珠花园
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table"></a-table>
                  </div>
                  <div class="items">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                          </h2>
                                          <p>时间：2019-01-02 11:50:00</p>
                                          <p>分类：篮球</p>
                                          <p>参赛人数：1300人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          吉林省 长春市长春市南关区卫星广场明珠花园
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table"></a-table>
                  </div>
            </div>
            
      </div>
</template>
<style lang="less" scoped>
#wdzz{
      padding: 20px;
      .input-box{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 0;
            background-color: #fff;
            .my-form-item{
                  margin: 0; 
                  width: 40%;
                  .my-picker{
                        width: 100%;
                  }
            }
      }
      .wyzz-content{
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            flex-wrap: wrap;
            .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  width: 48%;
                  padding: 20px 10px;
                  margin: 10px 0;
                  .my-table{
                        padding-top: 20px;
                  }
                  .title{
                        display: flex;
                        .item{
                        display: flex;
                        justify-content: space-around;
                        .profile-info{
                              margin-left: 20px;
                              
                              p{
                                    color: #999;
                                    margin-bottom: 0;
                              }
                              span{
                                    color: #999;
                              }
                              .no-margins {
                                    font-size: 16px;
                                    color: #333;
                                    margin-bottom: 0;
                                    
                              }
                              .my-icon{
                                    margin-right: 5px;
                              }
                        
                        }
                  }
                  }
                  
            }
            
      }
      
}
.my-modal{
      .my-form-item{
            margin-bottom: 10px;
      }
      .calc-price{
            display: flex;
            align-items: center;
            padding-left: 80px;
            .my-form-item{
                  margin: 0 20px;

            }
      }
      .my-divider{
            margin: 10px 0;
      }
      p{
            text-align: right;
            padding-right: 20px;
      }
}

</style>
<script>
export default {
      data(){
            return{
                  columns: [
                        {
                              title: '推广形式',
                              dataIndex: 'tgxs'
                        },
                        {
                              title: '赞助形式',
                              dataIndex: 'zzxs'
                        },
                        {
                              title: '现金赞助',
                              dataIndex: 'xjzz',
                        },
                        {
                              title: '实物赞助',
                              dataIndex: 'swzz',
                              
                        },
                        {
                              title: '赞助总额',
                              dataIndex: 'zzze',
                        },
                        {
                              title: '已付款',
                              dataIndex: 'yfk',
                        }
                  ],
                  data: [
                              {
                                    key: '0',
                                    tgxs: '冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    yfk: '$ 100万'
                              },
                              {
                                    key: '1',
                                    tgxs: '非冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    yfk: '$ 100万'
                              },
                              {
                                    key: '2',
                                    tgxs: '冠名',
                                    zzxs: '现金+实物',
                                    xjzz: '$ 890万',
                                    swzz: '30 * 衣服',
                                    zzze: '$ 890万',
                                    yfk: '$ 100万'
                              }
                             
                  ],
                 
            }
      },
      methods: {
            
      }
}
</script>
