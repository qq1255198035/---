<template>
      <div id="cjdhd">
            <div class="my-calendar">
                  <a-calendar @panelChange="onPanelChange">
                        <ul class="events" slot="dateCellRender" slot-scope="value">
                              <li v-for="item in getCellData(value.year(),value.month()+1,value.date())" :key="item.camp_id" @click="showModal(value,item.camp_id)">
                                    <a-badge status="success" :text="item.campname"/>
                                    
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
                                          {{actName}}
                                          </h2>
                                          <p>时间：{{publishTime}}</p>
                                          <p>分类：{{campCatalog}}</p>
                                          <p>参赛人数：{{campNum}}人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          {{address}}
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table"></a-table>
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
import { joinCampAll,searchDetail } from "@/api/manager";
import { axios } from '@/utils/request';
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'
export default {
      data() {
            return {
                  visible: false,
                  nowData: '',
                  nowMonth: '',
                  dateList:[],
                  actName:'',
                  publishTime:'',
                  campCatalog:'',
                  campNum:'',
                  address:'',
                  columns: [
                        {
                              title: '参加明星',
                              dataIndex: 'details'
                        },
                        {
                              title: '出场总额',
                              dataIndex: 'cost'
                        },
                        {
                              title: '已付款',
                              dataIndex: 'paid',
                        }
                  ],
                  data: []
            }
      },
      mounted(){
           
      },
      created(){
             var date = new Date();
             var year = date.getFullYear();
             var month = date.getMonth();
             this.getJoinCampAll(year,month+1)
      },
      methods: {
            getJoinCampAll(year,month){
                  joinCampAll(year,month).then(res=>{
                        if (res.code == 1000) {
                              this.dateList = res.data
                              console.log(res)
                        }
                  })
            },
                
            showModal(value,id) {
                  this.visible = true
                  this.nowData = value.date();
                  this.nowMonth = value.month();
                  this.getSearchDetail(id)
            },
            hideModal() {
                  this.visible = false
            },
            onPanelChange(value, mode) {
                  this.getJoinCampAll(value.year(),value.month()+1)
            },
            getCellData(year,month,date){
                  return this.dateList[year+ '-' + month + '-' + date];
            },
            getSearchDetail(id){
                  searchDetail(id).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.data = res.data.list;
                              let key = 'key'
                              this.data.map((item,index)=>{
                                    item[key] = index;
                              })
                              this.actName = res.data.campaign.name;
                              this.publishTime = res.data.campaign.publishTime;
                              this.campCatalog = res.data.campaign.campCatalog;
                              this.campNum = res.data.campaign.campNum;
                              this.address = res.data.campaign.address;
                              
                        }
                  })
            }
      }
}
            
</script>
