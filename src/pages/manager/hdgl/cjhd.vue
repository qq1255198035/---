<template>
      <div id="cjdhd">
            <div class="my-calendar">
                  <a-calendar @panelChange="onPanelChange">
                        <ul class="events" slot="dateCellRender" slot-scope="value">
                              <li v-for="item in getJoinCampAll(value.year(),value.month() + 1,value.date())" :key="item.camp_id" @click="showModal(value)">
                                    <a-badge :text="item.campname"/>
                              </li>
                        </ul>
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
	margin: 24px;
      .my-calendar{
            background-color: #fff;
      }
}
.my-popup{
      .items{
                  background-color: #fff;
                  border-radius: 5px;
                  width: 100%;
                  padding: 20px 10px 0;
                  margin: 10px 0;
                  .my-table{
				margin: 20px 20px 0;
				border-top:1px solid #e8e8e8;
                  }
                  .title{
                        display: flex;
				margin-bottom: 20px;
                        .item{
                        display: flex;
                        justify-content: space-around;
                        .profile-info{
                              margin-left: 20px;
                              h2{color: #21C5C7 !important;}                              
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
import { joinCampAll } from "@/api/manager";
import { axios } from '@/utils/request';
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'
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
      mounted(){
           
      },
      created(){
             
      },
      methods: {
           
            
            async getJoinCampAll(year,month,date){
                  var listData = await axios.post('/vue/agent/searchMyJoinCampAll',qs.stringify({
                        token: this.$ls.get(ACCESS_TOKEN),
                        year: year,
                        month: month
                  }))
                  console.log(listData.data)
                  
                  return listData.data[year+ '-' + month + '-' + date]
                  
                  // joinCampAll(year, month).then(res=>{
                  //       if (res.code == 1000) {
                               
                  //              console.log(1)
                  //       }
                  // })
                  // console.log(2)
                 
                  //       console.log(listData)
                  //       return listData
            },
//             return axios({
//     url: '/vue/agent/searchMyJoinCampAll',
//     method: 'post',
//     data: qs.stringify({
//       token: Vue.ls.get(ACCESS_TOKEN),
//       year: year,
//       month: month
//     })
//   })
            
            showModal(value) {
                  this.visible = true
                  this.nowData = value.date();
                  this.nowMonth = value.month();
                  
            },
            hideModal() {
                  this.visible = false
            },
            onPanelChange(value, mode) {
                  console.log(value, mode);
            }
      }
}
            
</script>
