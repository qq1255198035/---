<template>
      <div id="details">
            <glTitle :logo="logo" :title="titleName" :start="startTime" :type="type" :num="num" :stars="starList | filterLength" :sponsors="sponsorList | filterLength" :status="status | filterStatus" :price="money">
                  <span slot="b">
                        <a-icon type="environment" class="my-icon"/>{{adre}}
                  </span>
            </glTitle>
            <div class="details-content">
                  <div class="details-header">
                        <a-card :title="$t('issuer.cjhd.activityProgress')">
                              <div class="secetion">
                                    <a-steps :current="schedule">
                                          <a-popover slot="progressDot" slot-scope="{index, status, prefixCls}">
                                                <template slot="content">
                                                <span>step {{index}} status: {{status}}</span>
                                                </template>
                                                <span :class="`${prefixCls}-icon-dot`"></span>
                                          </a-popover>
                                          <a-step :title="$t('issuer.hdgl.createAnEvent')"/>
                                          <a-step :title="$t('issuer.cjhd.platformReview')" />
                                          <a-step :title="$t('issuer.cjhd.activityProgress')" />
                                          <a-step :title="$t('issuer.cjhd.okOver')"/>
                                    </a-steps>
                              </div>
                        </a-card>
                  </div>
                  <div class="details-main">
                        <a-locale-provider :locale="locale">
                        <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
                              <a-tab-pane key="1" :tab="$t('issuer.cjhd.hdxxs')">
                                    <a-card :bordered="false">
                                          <detail-list :title="$t('issuer.cjhd.hdjbxx')">
                                                <detail-list-item :term="$t('issuer.cjhd.hdzwmc')">{{name}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.cjhd.hdfl')">{{campCatalog}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.cjhd.number')">{{campNum}} {{$t('admin.people')}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.cjhd.hdywmc')">{{enName}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.cjhd.hdsj')">{{publishTime}} ~ {{endTime}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.accountInfo.contact')">{{contact}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.accountInfo.email')">{{email}}</detail-list-item>
                                                <detail-list-item :term="$t('issuer.accountInfo.telphone')">{{phone}}</detail-list-item>
                                          </detail-list>
                                          <detail-list>
                                                <detail-list-item :term="$t('issuer.cjhd.hddq')" class="my-item">
                                                      <a-table :columns="columns" :dataSource="data" size="small" :pagination="false" class="my-table"/>
                                                </detail-list-item>
                                                
                                          </detail-list>
                                    </a-card>               
                                    <div class="my-item-list">
                                          <h3>{{$t('issuer.cjhd.hdxq')}}</h3>
                                          <ul>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.Activities')}}：</span>
                                                      <p>{{ content }}</p>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.hdsp')}}：</span>
                                                      <video :src="video" controls width="200" height="150" v-if="video"></video>
                                                      <p v-else style="color: #ccc;">{{$t('issuer.cjhd.zwsp')}}</p>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.hdzp')}}：</span>
                                                      <div class="img-box" v-for="(item,index) in imgs" :key="index">
                                                            <img :src="item" alt="活动照片" v-if="item">   
                                                            <p v-else style="color: #ccc;">{{$t('issuer.cjhd.zwzp')}}</p>     
                                                      </div>
                                                      
                                                </li>
                                          </ul>
                                    </div>     
                                    <div class="my-item-list">
                                          <h3>{{$t('issuer.cjhd.hdtg')}}</h3>
                                          <ul>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.mainContractor')}}：</span>
                                                      <a-table :columns="columns1" :dataSource="data1" size="small" :pagination="false" class="my-table"/>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.szqz')}}：</span>
                                                      <div v-if="audiences.length > 0">
                                                            <a-tag v-for="(item,index) in audiences" :key="index" color="red" style="margin-bottom:10px">{{item}}</a-tag>
                                                      </div>
                                                      <p v-else style="color: #ccc;">{{$t('issuer.index.noData')}}</p>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.activityTrait')}}：</span>
                                                      <div v-if="campFeature.length > 0">
                                                            <a-tag v-for="(item,index) in campFeature" :key="index" color="cyan" style="margin-bottom:10px">{{item}}</a-tag>
                                                      </div>
                                                      <p v-else style="color: #ccc;">{{$t('issuer.index.noData')}}</p>
                                                </li>
                                          </ul>
                                    </div> 
                                    <div class="my-item-list">
                                          <h3>{{$t('issuer.cjhd.hdzz')}}</h3>
                                          <ul>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.zsjzrq')}}：</span>
                                                      <p>{{jzTime}}</p>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.zzyq')}}：</span>
                                                      <a-table :columns="columns2" :dataSource="data2" size="small" :pagination="false" class="my-table"/>
                                                </li>
                                                <li>
                                                      <span>{{$t('issuer.cjhd.hdyq')}}：</span>
                                                      <p>{{demand}}</p>
                                                </li>
                                          </ul>
                                    </div>  
                              </a-tab-pane>
                              <a-tab-pane key="2" :tab="$t('issuer.cjhd.zzxx')">
                                    <div v-if="dataName.length > 0">
                                          <div class="my-tables" v-for="(item,index) in dataName" :key="index">
                                                <h3>{{item.name}}<span> ( {{item.list.length}} ) </span></h3>
                                                <a-table :columns="columns3" :dataSource="item.list" size="middle"></a-table>
                                          </div>
                                    </div>
                                    <p v-else style="color: #ccc; text-align: center">{{$t('issuer.index.noData')}}</p>
                              </a-tab-pane>
                              <a-tab-pane key="3" :tab="$t('issuer.cjhd.mxxx')">
                                    <div class="my-tables">
                                          <a-table :columns="columns4" :dataSource="data4" size="middle"></a-table>
                                    </div> 
                              </a-tab-pane>
                        </a-tabs>
                        </a-locale-provider>
                        <div style="display: flex;justify-content: center;margin-top: 20px;">
                              <a-button type="primary" @click="$router.go(-1)">{{$t('admin.back')}}</a-button>
                        </div>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>

#details{
      .details-content{
            padding:0 30px 20px;
		margin-top: 20px;
            .details-header{
                  margin:0 0 20px;
			.ant-card-bordered{
			border:0;}
                  .secetion{
                        padding: 20px 0;
                  }
            }
            .details-main{
                  background-color: #fff;
			padding: 20px;
                  .my-item-list{
                        padding:32px;
				margin: 0 32px;
                        width: 80%;
                        border-top: 1px solid #ccc;
                        h3{
                              font-size: 16px;
                              color: #333;
					margin-bottom: 24px;
                        }
                        ul{
                              padding: 0;
                              li{
                                    display: flex;
                                    align-items: flex-start;
                                    margin: 20px 0;
                                    .img-box{
                                          display: flex;
                                          justify-content: space-around;
                                          flex-wrap: wrap;
                                          img{
                                                border: 1px solid #ccc;
                                                border-radius: 5px;
                                                width: 200px;
                                                height: 150px;
                                                margin-right:20px;
                                          }
                                    }
                                    .my-table{
                                          width: 70%;
                                    }
                                    span{
                                          min-width: 70px;
                                          margin-right: 20px;
                                    }
                                    p{
                                          margin: 0;
                                          
                                    }
                                    
                              }
                        }
                  }
                  .my-item{
                        width: 50%;
                        display: flex;
                        justify-content: center;
                  }
                  .my-item-1{
                        margin-left: 50px;
                        display: flex;

                        img{
                              border: 1px solid #ccc;
                              border-radius: 5px;
                              width: 300px;
                              height: 150px;
                        }
                  }
                  .my-tables{
                        padding: 30px 40px 0;
                        h3{
                              margin-bottom: 20px;
                        }
                  }
                  
            }
      }
      
}
</style>
<script>
import glTitle from '@/components/glTitle/glTitle'
import DetailList from '@/components/tools/DetailList'
import imgUrl from '@/assets/a1.jpg'
import { campInformation,searchCampSponsor,searchCampStar,campHeadInfo } from '@/api/admin'
import { campSchedule } from "@/api/common";
import i18n from '@lang/index'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const DetailListItem = DetailList.Item
const columns = [
      {
            title: i18n.t('issuer.cjhd.dq'),
            dataIndex: 'area',
      }, {
            title: i18n.t('issuer.cjhd.xx'),
            dataIndex: 'address',
      }, 
];
const columns1 = [
      {
            title: i18n.t('issuer.cjhd.mainContractor'),
            dataIndex: 'workType',
      }, {
            title: i18n.t('issuer.cjhd.mc'),
            dataIndex: 'name',
      }, 
];
const columns2 = [
      {
            title: i18n.t('issuer.cjhd.tgxs'),
            dataIndex: 'ssKind',
      },    {
            title: i18n.t('issuer.cjhd.zzxs'),
            dataIndex: 'sponsorship',
      }, {
            title: i18n.t('issuer.cjhd.zzje'),
            dataIndex: 'money',
      },{
            title: i18n.t('issuer.cjhd.zzme'),
            dataIndex: 'num',
      },{
            title: i18n.t('issuer.cjhd.bz'),
            dataIndex: 'bz',
      },
];

const columns3 = [
      {
            title: i18n.t('issuer.cjhd.xh'),
            dataIndex: 'key',
            align: "center"
      }, 
      {
            title: i18n.t('issuer.cjhd.zzgsmc'),
            dataIndex: 'company',
            align: "center"
      }, 
      {
            title: i18n.t('issuer.cjhd.zzxs'),
            dataIndex: 'ssKind',
            align: "center"
      }, 
      {
            title: i18n.t('issuer.cjhd.xjzz'),
            dataIndex: 'cash',
            align: "center"
      },
      {
            title: i18n.t('issuer.cjhd.swzz'),
            dataIndex: 'productVal',
            align: "center"
      },
      {
            title: i18n.t('issuer.cjhd.zzze'),
            dataIndex: 'tolMoney',
            align: "center"
      },
      {
            title: i18n.t('issuer.cjhd.yfkje'),
            dataIndex: 'paid',
            align: "center"
      },
];
const columns4 = [
      {
            title: i18n.t('issuer.cjhd.xm'),
            dataIndex: 'name',
            align: "center"
      }, {
            title: i18n.t('issuer.cjhd.ccfy'),
            dataIndex: 'cost',
            align: "center"
      }, {
            title: i18n.t('issuer.accountInfo.contact'),
            dataIndex: 'contact',
            align: "center"
      }, {
            title: i18n.t('issuer.accountInfo.telphone'),
            dataIndex: 'phone',
            align: "center"
      },{
            title: i18n.t('issuer.accountInfo.email'),
            dataIndex: 'email',
            align: "center"
      },{
            title: i18n.t('issuer.accountInfo.companyTitle'),
            dataIndex: 'company',
            align: "center"
      },
];
export default {
      components:{
            glTitle,
            DetailList,
            DetailListItem
      },
      data() {
            return {
                  locale: lang[localStorage.getItem('lang')],
                  data:[],
                  columns,
                  data1:[],
                  columns1,
                  data2:[],
                  columns2,
                  dataName:[],
                 
                  columns3,
                  data4:[],
                  columns4,
                  imgUrl,
                  name: '',
                  enName: '',
                  campCatalog:'',
                  campNum:'',
                  publishTime: '',
                  endTime: '',
                  contact: '',
                  email: '',
                  phone: '',
                  content:'',
                  video: '',
                  jzTime: '',
                  imgs:[],
                  audiences: [],
                  campFeature:[],
                  demand:"",
                  titleName:'',
                  startTime: '',
                  adre: '',
                  type: '',
                  num:'',
                  starList: [],
                  sponsorList: [],
                  status: '',
                  logo:'',
                  money:'',
                  schedule:0
            }
      },
      mounted(){
            this.getCampInformation(this.$route.query.id);
            this.getSearchCampSponsor(this.$route.query.id);
            this.getSearchCampStar(this.$route.query.id);
            this.getCampHeadInfo(this.$route.query.id);
            this.getCampSchedule(this.$route.query.id)
            
      },
      computed:{
            
            
      },
      methods:{
            getCampSchedule(id){
                  campSchedule(id).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.schedule = parseInt(res.data.schedule - 1) 
                        }
                  })
            },
            getCampInformation(id){
                  campInformation(id).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              this.name = res.data.basic.name;
                              this.enName = res.data.basic.enName;
                              this.campCatalog = res.data.basic.campCatalog;
                              this.campNum = res.data.basic.campNum;
                              this.publishTime = res.data.basic.publishTime;
                              this.endTime = res.data.basic.endTime;
                              this.contact = res.data.basic.contact;
                              this.email = res.data.basic.email;
                              this.phone = res.data.basic.phone;
                              this.data = res.data.basic.newArea;
                              this.content = res.data.basic.content;
                              this.video = res.data.basic.video;
                              this.imgs = (res.data.basic.imgs || '').split(',');
                              this.data1 = res.data.campOrgList;
                              this.audiences = (res.data.basic.audiences || '').split(',');
                              this.campFeature = (res.data.basic.campFeature || '').split(',');
                              this.data2 = res.data.campSponsor;
                              this.demand = res.data.campSponsor.length ? res.data.campSponsor[0].demand : '';
                              this.jzTime = res.data.campSponsor.length ? res.data.campSponsor[0].endTime : ''
                        }
                  })
            },
            getSearchCampSponsor(id){
                  searchCampSponsor(id).then(res=>{
                        if(res.code == 1000){
                              let key = "key";
                              console.log(res)
                              this.dataName = res.data;
                              res.data.map((item,index)=>{
                                    item.list.map((aitem,aindex)=>{
                                          aitem[key] = aindex + 1
                                    })
                              })
                              console.log(this.dataName.length > 0)
                        }
                  })
            },
            getSearchCampStar(id){
                  searchCampStar(id).then(res=>{
                        if(res.code == 1000){
                              let key = "key";
                              console.log(res)
                              this.data4 = res.data;
                              this.data4.map((item,index)=>{
                                    item[key] = index
                              })
                        }
                  })
            },
            getCampHeadInfo(id){
                  campHeadInfo(id).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              this.logo = res.data.campain.coverImg;
                              this.titleName = res.data.campain.name;
                              this.status = res.data.campain.status;
                              this.money = res.data.amount;
                              this.startTime = res.data.campain.publishTime;
                              this.type = res.data.campain.campCatalog;
                              this.num = res.data.campain.campNum;
                              this.starList = res.data.starList;
                              this.adre = res.data.campain.area;
                              this.sponsorList = res.data.sponsorList;
                        }
                  })
            }
      },
      filters:{
            filterStatus(val){
                  switch (val) {
                        case 0 : return i18n.t('issuer.hdgl.wsp');
                        case 20 : return i18n.t('issuer.hdgl.ysp');
                        case 30 : return i18n.t('issuer.hdgl.bh');
                        case 40 : return i18n.t('issuer.hdgl.yez')
                  }
            },
            filterLength(val){
                  if(val.length > 4){
                        return val.slice(0,4)
                  }else{
                        return val
                  }
            }
            
      }
}
</script>
