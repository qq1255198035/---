<template>
      <div id="cjdhd">
            <div class="my-calendar">
                  <a-locale-provider :locale="locale">
                  <a-calendar @panelChange="onPanelChange">
                        <ul class="events" slot="dateCellRender" slot-scope="value">
                              <li v-for="(item,index) in getCellData(value.year(),value.month()+1,value.date())" :key="index" @click="showModal(value,item.camp_id)">
                                    <a-badge status="success" :text="item.campname"/>
                              </li>
                        </ul>
                        <template slot="monthCellRender" slot-scope="value">
                              <div v-if="getMonthData(value.year(),value.month()+1)" class="notes-month">
                                    <span>{{$t('admin.nbycj')}}</span>
                                    <section>{{getMonthData(value.year(),value.month()+1)}}</section>
                                    <span>{{$t('admin.chd')}}</span>
                              </div>
                        </template>
                  </a-calendar>
                  </a-locale-provider>
            </div>
            <a-modal
                  :title="`${nowMonth+1} ${$t('admin.mouth')} ${nowData} ${$t('admin.daty')} ${$t('admin.hd')}`"
                  v-model="visible"
                  @ok="hideModal"
                  :okText="$t('admin.qr')"
                  :cancelText="$t('admin.qx')"
                  wrapClassName="my-popup"
                  :width="960"
            >
                  <div class="items">
                        <div class="title">
                              <a-col :span="4" class="item">
                                    <div class="profile-image">
                                          <a-avatar :size="96" :src="coverImg" class="img-circle" v-if="coverImg"/>
                                          <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                    </div>
                              </a-col>
                              <a-col :span="20" class="item">
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          {{actName}}
                                          </h2>
                                          <p>{{$t('admin.timer')}}：{{publishTime}}</p>
                                          <p>{{$t('admin.fl')}}：{{campCatalog}}</p>
                                          <p>{{$t('admin.csrs')}}：{{campNum}} {{$t('admin.people')}}</p>
                                    </div>
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
            .notes-month {
                  text-align: center;
                  font-size: 18px;
            }
            .notes-month section {
                  font-size: 20px;
                  font-weight: bold;
            }
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
                        padding: 0 20px;
                        .item{
                              display: flex;
                              justify-content: flex-start;
                              .profile-info{
                                    margin-right: 100px;
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
import { joinCampAll,searchDetail, joinCampAllYear } from "@/api/manager";
import { axios } from '@/utils/request';
import { ACCESS_TOKEN } from '@/store/mutation-types'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
import qs from 'qs'
export default {
      data() {
            return {
                  locale: lang[localStorage.getItem('lang')], 
                  visible: false,
                  nowData: '',
                  nowMonth: '',
                  dateList:[],
                  actName:'',
                  publishTime:'',
                  campCatalog:'',
                  coverImg:'',
                  campNum:'',
                  address:'',
                  columns: [
                        {
                              title: this.$t('admin.cjmx'),
                              dataIndex: 'details'
                        },
                        {
                              title: this.$t('admin.ccze'),
                              dataIndex: 'cost'
                        },
                        {
                              title: this.$t('admin.yfk'),
                              dataIndex: 'paid',
                        }
                  ],
                  data: [],
                  monthList:[]
            }
      },
      mounted(){
           
      },
      created(){
             var date = new Date();
             var year = date.getFullYear();
             var month = date.getMonth();
             this.getJoinCampAll(year,month+1)
             this.getJoinCampAllYear(year)
      },
      methods: {
            getJoinCampAllYear(year){
                  joinCampAllYear(year).then(res=>{
                        if (res.code == 1000) {
                              this.monthList = res.data
                              console.log(res)
                        }
                  })
            },
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
            getMonthData(year,month){
                  return this.monthList[year+ '-' + month];
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
                              this.coverImg = res.data.campaign.coverImg
                        }
                  })
            }
      }
}
            
</script>
