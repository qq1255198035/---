<template>
      <div id="cjdhd">
            <div class="my-calendar">
                  <a-calendar class="">
                        <ul class="events" slot="dateCellRender" slot-scope="value">
                              <li v-for="item in getListData(value)" :key="item.content" @click="showModal(value)">
                                    <a-badge :status="item.type" :text="item.content" />
                              </li>
                        </ul>
                        <template slot="monthCellRender" slot-scope="value">
                              <div v-if="getMonthData(value)" class="notes-month">
                              <section>{{getMonthData(value)}}</section>
                              <span>Backlog number</span>
                              </div>
                        </template>
                  </a-calendar>
            </div>
            <a-modal
                  :title="`${nowMonth+1} 月 ${nowData} 日 活动 `"
                  v-model="visible"
                  @ok="hideModal"
                  okText="确认"
                  cancelText=""
                  wrapClassName="my-popup"
                  :width="960"
            >
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
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table">
                              
                        </a-table>
                        
                  </div>
            </a-modal>
      </div>
</template>
<style lang="less" scoped>
#cjdhd{
      .my-calendar{
            background-color: #fff;
      }
}
.my-popup{
      .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  width: 100%;
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
</style>
<script>
export default {
      data() {
            return {
                  visible: false,
                  nowData: '',
                  nowMonth: '',
                  columns: [
                        {
                              title: '参加明星',
                              dataIndex: 'cjmx'
                        },
                        {
                              title: '出场总额',
                              dataIndex: 'ccze'
                        },
                        {
                              title: '已付款',
                              dataIndex: 'yfk',
                        }
                  ],
                  data: [
                              {
                                    key: '0',
                                    cjmx: '斯蒂芬·赛维尔·马布里',
                                    ccze: '$ 4000万',
                                    yfk: '$ 4000万',    
                              },
                              {
                                    key: '1',
                                    cjmx: '斯蒂芬·赛维尔·马布里',
                                    ccze: '$ 4000万',
                                    yfk: '$ 4000万',    
                              },
                  ],
            }
      },
      methods: {
            getListData(value) {
                  let listData;
                  //value.month()
                  
                  switch (value.date()) {
                  case 8:
                  listData = [
                        { type: 'warning', content: '主教练培训.' },
                        { type: 'success', content: '体育电子游戏' },
                  ]; break;
                  case 10:
                  listData = [
                        { type: 'warning', content: '魔兽争霸' },
                        { type: 'success', content: '魁地奇争霸' },
                        { type: 'error', content: '五军之战' },
                  ]; break;
                  case 15:
                  listData = [
                        { type: 'warning', content: '长春马拉松' },
                        { type: 'success', content: '日本马拉松' },
                        
                  ]; break;
                  default:
                  }
                  return listData || [];
            },
            getMonthData(value) {
                  if (value.month() === 8) {
                  return 1394;
                  }
            },
            showModal(value) {
                  this.visible = true
                  this.nowData = value.date();
                  this.nowMonth = value.month();
                  console.log(value.year())
            },
            hideModal() {
                  this.visible = false
            },
      }
}
            
</script>
